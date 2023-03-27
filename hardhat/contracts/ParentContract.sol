// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./TokenCreator.sol";

error ParentContract__NotOwnerOfToken();
error ParentContract__ChildHasAlreadyBeenAddedByAParent();
error ParentContract__TokenNotOwnedByParent();
error ParentContract__ClaimedTokenIsNotEqualToPreferedToken();
error ParentContract__ClaimMomentIsNotValid();

/// @title Crypto Piggybank.
/// @author Bram Mathijssen.
/// @notice A decentralized platform for parents to teach their children about cryptocurrencies.
contract ParentContract {
    /* Type declarations */
    /// @notice Enum to declare the available claim periods: daily, weekly, monthly.
    enum ClaimPeriod {
        DAILY,
        WEEKLY,
        MONTHLY
    }

    /* State Variables */
    /// @notice Contract which inherts from the ERC20 contract, used to create new tokens.
    TokenCreator private i_tokenCreator;

    /* Mappings */
    /// @notice Mapping of parent addresses to the tokens they have minted with the TokenCreator contract.
    mapping(address => Token[]) public parentToTokensMapping;

    /// @notice Nested mapping of a parent address mapped to a mapping of a child address to a child struct.
    mapping(address => mapping(address => Child)) public parentToChildMappingNested;

    /// @notice Mapping of a child address to a parent address.
    /// @dev Used as a bidirectional datastructure together with parentToChildMapping.
    mapping(address => address) public childToParentMapping;

    /* Structs */
    /** @notice A struct containing all the info related to a child.
    @param name The child's name.
    @param childAddress The child's address.
    @param tokenPreference The token which the child prefers to receive as allowance.
    @param baseAmount The base amount of allowance as given by the parent.
    @param claimableAmount The claimable amount of allowance, calculated based on the claimPeriod and baseAmount.
    @param claimValid Validity of the claim, based on the current time and nextClaimPeriod.
    @param claimPeriod The selected claimPeriod on which the child would like to claim their allowance.
    @param nextClaimPeriod The date on which the child will be eligible to claim their allowance.
  */
    struct Child {
        string name;
        address childAddress;
        address tokenPreference;
        uint256 baseAmount;
        uint256 claimableAmount;
        bool claimValid;
        ClaimPeriod claimPeriod;
        uint nextClaimPeriod;
    }

    ///@notice A struct containing all the info about the tokens created with the TokenCreator contract.
    struct Token {
        uint256 supply;
        address tokenAddress;
        string name;
        string symbol;
    }

    /* Events */
    event ChildAdded(address indexed parentAddress, address childAddress, Child child);
    event TokenCreated(address indexed parentAddress, address tokenAddress, Token token);
    event AllowanceClaimed(address indexed parentAddress, address indexed childAddress, Child child, address tokenAddress, uint timestamp);

    /* Modifiers */
    /** @dev This modifier checks if the msg.sender owns the given token.
     * Complexity: O(N), the parent realistically only owns a couple of tokens which makes an O(N) complexity acceptable.
     * @param _tokenAddress Address of the token which will be checked for ownership.
     */
    modifier hasMinted(address _tokenAddress) {
        Token[] memory tokens = parentToTokensMapping[msg.sender];
        bool tokenFound = false;

        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i].tokenAddress == _tokenAddress) {
                tokenFound = true;
                break;
            }
        }
        if (!tokenFound) {
            revert ParentContract__NotOwnerOfToken();
        }
        _;
    }

    /* Functions */
    /** @dev Mints new tokens with the TokenCreator contract and stores them in current contract, maps the token to the msg.sender.
     * @param _supply Total supply of the minted token.
     * @param _contractName Name of the minted token.
     * @param _contractSymbol Symbol of the minted token.
     */
    function createNewToken(uint256 _supply, string memory _contractName, string memory _contractSymbol) public {
        address createdTokenAddress = address(new TokenCreator(_supply, _contractName, _contractSymbol));

        Token memory token = Token({supply: _supply, tokenAddress: createdTokenAddress, name: _contractName, symbol: _contractSymbol});
        parentToTokensMapping[msg.sender].push(Token({supply: _supply, tokenAddress: createdTokenAddress, name: _contractName, symbol: _contractSymbol}));
        emit TokenCreated(msg.sender, createdTokenAddress, token);
    }

    /** @notice Parent function: Function for parent to add a new child.
     * @dev Child is added to parentToChildMapping and the parent is added to the childToParentMapping as bidirectional relationship.
     * @param _name Name of the child.
     * @param _childAddress Child's address.
     * @param _tokenPreference Address of the child's prefered token.
     * @param _baseAmount Base amount of allowance (claimableAmount will be determined based on this).
     */
    function addChild(string memory _name, address _childAddress, address _tokenPreference, uint256 _baseAmount) public hasMinted(_tokenPreference) {
        if (childToParentMapping[_childAddress] != address(0)) {
            revert ParentContract__ChildHasAlreadyBeenAddedByAParent();
        }
        if (parentToChildMappingNested[msg.sender][_childAddress].childAddress != address(0)) {
            revert ParentContract__ChildHasAlreadyBeenAddedByAParent();
        }

        uint _nextClaimPeriod = getCurrentTime() + 1 weeks;
        uint256 _claimAbleAmount = calculateClaimableAmount(_baseAmount, ClaimPeriod.WEEKLY);
        Child memory child = Child({name: _name, childAddress: _childAddress, tokenPreference: _tokenPreference, baseAmount: _baseAmount, claimableAmount: _claimAbleAmount, claimValid: false, claimPeriod: ClaimPeriod.WEEKLY, nextClaimPeriod: _nextClaimPeriod});

        parentToChildMappingNested[msg.sender][_childAddress] = child;
        childToParentMapping[_childAddress] = msg.sender;

        emit ChildAdded(msg.sender, _childAddress, child);
    }

    /** @notice Child Function: Function for child to claim their allowance.
     * @dev If the child's claim moment has ben reached it's able to claim, the next claim moment will be set based on the child's claimPeriod.
     * @param _tokenToBeClaimed Address of the token which will be claimed (should be the child's prefered token).
     */
    function claim(address _tokenToBeClaimed) public {
        bool tokenExists = false;
        uint _currentTime = getCurrentTime();
        address childsParent = childToParentMapping[msg.sender];
        Token[] memory tokens = parentToTokensMapping[childsParent];

        // Check if the token which is being claimed exists in the mapping of the child's parent.
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i].tokenAddress == _tokenToBeClaimed) {
                tokenExists = true;
            }
        }

        if (tokenExists != true) {
            revert ParentContract__TokenNotOwnedByParent();
        }

        Child storage child = parentToChildMappingNested[childsParent][msg.sender];

        // Checks if the claimed token is the same as the child's current token preference, else revert.
        if (child.tokenPreference != _tokenToBeClaimed) {
            revert ParentContract__ClaimedTokenIsNotEqualToPreferedToken();
        }

        // Check if the current time has reached the nextClaimPeriod time, if it did then the claim is valid.
        if (_currentTime >= child.nextClaimPeriod) {
            child.claimValid = true;
        }

        if (child.claimValid != true) {
            revert ParentContract__ClaimMomentIsNotValid();
        }

        child.claimValid = false; // re-entrancy guard: set valid back to false BEFORE sending the tokens.

        // The next claim period is based on the current nextClaimPeriod + the respective claimPeriod (1day, 1week, 1month).
        // This way unclaimed tokens can be caught up.
        if (child.claimPeriod == ClaimPeriod.DAILY) {
            child.nextClaimPeriod = child.nextClaimPeriod + 1 days;
        } else if (child.claimPeriod == ClaimPeriod.WEEKLY) {
            child.nextClaimPeriod = child.nextClaimPeriod + 1 weeks;
        } else if (child.claimPeriod == ClaimPeriod.MONTHLY) {
            child.nextClaimPeriod = child.nextClaimPeriod + 4 weeks;
        }

        IERC20(_tokenToBeClaimed).transfer(msg.sender, child.claimableAmount);
        emit AllowanceClaimed(childsParent, msg.sender, child, _tokenToBeClaimed, getCurrentTime());
    }

    /** @dev Calculates the child's claimable amount based on their baseAmount: daily = -10%, weekly = base, monthly = +10%.
     * @param _baseAmount The child's baseAmount allowance.
     * @param _claimPeriod The child's claimPeriod: daily,weekly,monhtly.
     * @return claimableAmount_ The child's claimable allowance.
     */
    function calculateClaimableAmount(uint256 _baseAmount, ClaimPeriod _claimPeriod) public pure returns (uint256 claimableAmount_) {
        if (_claimPeriod == ClaimPeriod.DAILY) {
            uint256 dailyAmount = _baseAmount - ((_baseAmount / 100) * 10);
            claimableAmount_ = dailyAmount / 7;
        } else if (_claimPeriod == ClaimPeriod.WEEKLY) {
            claimableAmount_ = _baseAmount;
        } else if (_claimPeriod == ClaimPeriod.MONTHLY) {
            uint256 monthlyAmount = claimableAmount_ = _baseAmount + ((_baseAmount / 100) * 10);
            claimableAmount_ = monthlyAmount * 4;
        }

        return claimableAmount_;
    }

    /* Getter Functions */
    /** @notice Gets the next claim moment and claim period of the child who called this function.
     * @return nextClaimPeriod the child's next available claim time.
     * @return claimPeriod The child's selected claimPeriod (daily, weekly, monthly).
     */
    function getChildsNextClaimPeriod() public view returns (uint256, ClaimPeriod) {
        address childsParent = getChildsParent();
        Child memory child = parentToChildMappingNested[childsParent][msg.sender];

        uint256 nextClaimPeriod = child.nextClaimPeriod;
        ClaimPeriod claimPeriod = child.claimPeriod;
        return (nextClaimPeriod, claimPeriod);
    }

    ///@notice Gets the current UNIX time from chain.
    function getCurrentTime() public view returns (uint256) {
        return block.timestamp;
    }

    ///@notice Child Function: Gets the parent address of the msg.sender.
    function getChildsParent() public view returns (address) {
        address childsParent = childToParentMapping[msg.sender];
        return childsParent;
    }

    /// @notice Helper function used to get the balance of an ERC20 token.
    function getERC20Balance(IERC20 token) public view returns (uint256) {
        uint256 erc20balance = token.balanceOf(msg.sender);

        return erc20balance;
    }

    /* Setter Functions */
    /** @notice Child Function: Sets the child's claimPeriod to daily,
     * by calling this function the nextClaimPeriod and claimableAmount will be set according to the claimPeriod.
     */
    function setChildClaimMomentDaily() public {
        address childsParent = getChildsParent();

        Child storage child = parentToChildMappingNested[childsParent][msg.sender];
        child.claimPeriod = ClaimPeriod.DAILY;
        child.nextClaimPeriod = getCurrentTime() + 1 days;

        uint256 newClaimableAmount = calculateClaimableAmount(child.baseAmount, ClaimPeriod.DAILY);

        child.claimableAmount = newClaimableAmount;
    }

    /** @notice Child Function: Sets the child's claimPeriod to weekly,
     * by calling this function the nextClaimPeriod and claimableAmount will be set according to the claimPeriod.
     */
    function setChildClaimMomentWeekly() public {
        address childsParent = getChildsParent();

        Child storage child = parentToChildMappingNested[childsParent][msg.sender];
        child.claimPeriod = ClaimPeriod.WEEKLY;
        child.nextClaimPeriod = getCurrentTime() + 1 weeks;

        uint256 newClaimableAmount = calculateClaimableAmount(child.baseAmount, ClaimPeriod.WEEKLY);

        child.claimableAmount = newClaimableAmount;
    }

    /** @notice Child Function: Sets the child's claimPeriod to Monthly,
     * by calling this function the nextClaimPeriod and claimableAmount will be set according to the claimPeriod.
     */
    function setChildClaimMomentMonthly() public {
        address childsParent = getChildsParent();

        Child storage child = parentToChildMappingNested[childsParent][msg.sender];
        child.claimPeriod = ClaimPeriod.MONTHLY;
        child.nextClaimPeriod = getCurrentTime() + 4 weeks;

        uint256 newClaimableAmount = calculateClaimableAmount(child.baseAmount, ClaimPeriod.MONTHLY);

        child.claimableAmount = newClaimableAmount;
    }

    /** @notice Child Function: Sets the child's prefered token for allowance.
     *  @param _tokenAddress The address of the token which the child would like to receive for allowance.
     */
    function setChildTokenPreference(address _tokenAddress) public {
        bool tokenFound = false;
        address childsParent = getChildsParent();

        // Check if child's parent owns the selected token.
        Token[] memory tokens = parentToTokensMapping[childsParent];

        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i].tokenAddress == _tokenAddress) {
                tokenFound = true;
                break;
            }
        }

        if (!tokenFound) {
            revert ParentContract__TokenNotOwnedByParent();
        }

        Child storage child = parentToChildMappingNested[childsParent][msg.sender];
        child.tokenPreference = _tokenAddress;
    }
}