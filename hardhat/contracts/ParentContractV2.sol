// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./TokenCreator.sol";
import "hardhat/console.sol";

// error NotOwnerOfToken();
error ChildHasAllreadyBeenAddedByAParent();

/// @title A contract for parents to supply (pocket) money as a stream to their child(ren)
/// @author Bram Mathijssen
/// @notice This contract is used by both the parent as the children
/// @dev Currently under construction
contract ParentContractV2 {
    address public owner;
    TokenCreator public tokenCreator;
    uint public currentTime;

    // safe to delete? uint public contractDeployedTime;
    // safe to delete? address public contractAddress;

    // safe to delete? list of all the created token addresses
    address[] public s_createdTokenAddresses;

    // NOTE: Check if we can make this a address to address maping where a parent has multiple token addresses
    // NOTE: So this way we could save gas, since we dont want to loop over our token list when we claim
    // mapping of parent addresses to the coins they minted on this contract
    mapping(address => Token[]) public parentToTokensMapping;

    // NOTE: Possibly convert this to a nested mapping like in the v2 version of this contract.
    // mapping of a parent address to a child struct
    // safe to delete? mapping(address => Child[]) public parentToChildMapping;

    // TESTING:
    // parents address mapped to a mapping of the childs address mapped to the child struct.
    // this way a parent can have multiple children linked to it instead of an array which makes it more easy/cheap to retrieve the data
    // instead of using a for loop
    mapping(address => mapping(address => Child)) public parentToChildMappingNested;

    // https://ethereum.stackexchange.com/questions/4272/getting-key-from-solidity-mapping-by-value
    // mapping of a child to a parent address -> Bidirectional relation
    mapping(address => address) public childToParentMapping;

    enum ClaimPeriod {
        DAILY,
        WEEKLY,
        MONTHLY
    }

    struct Child {
        string name;
        address childAddress;
        address tokenPreference;
        uint256 baseAmount; // the base amount of tokens to be claimed
        uint256 claimableAmount; // the amount which can be claimed, based on the claim period: daily, weekly, monthly
        bool claimValid;
        ClaimPeriod claimPeriod; // claimperiod: daily, weekly, monthly
        uint nextClaimPeriod;
    }

    // NOTE: possibly dont need to use a struct for tokens since we only need the tokenAddress
    struct Token {
        uint256 supply;
        address tokenAddress;
        string name;
        string symbol;
    }

    // TODO: Add Events
    event ChildAdded(address indexed parentAddress, address childAddress, Child child);
    event TokenCreated(address indexed parentAddress, address tokenAddress, Token token);
    event AllowanceClaimed(address indexed parentAddress, address indexed childAddress, Child child, address tokenAddress, uint timestamp);

    constructor() {
        owner = msg.sender;
        // safe to delete? contractAddress = address(this);
    }

    // https://stackoverflow.com/questions/71226909/how-to-check-if-one-value-exists-in-an-array
    // with this modifier we check if the parent owns the selected token (so if the parent address has minted the token before)
    modifier hasMinted(address _tokenAddress) {
        Token[] memory tokens = parentToTokensMapping[msg.sender];
        bool tokenFound = false;

        // Complexity: O(N)
        // Chosen for this solution because the parent realistically only owns a couple of tokens which makes an O(N) complexity acceptable
        for (uint i = 0; i < tokens.length; i++) {
            console.log("looping: ", i);
            if (tokens[i].tokenAddress == _tokenAddress) {
                console.log("token with address", tokens[i].tokenAddress);
                tokenFound = true;
                break;
            }
        }
        if (!tokenFound) {
            console.log("Token not found :(");
            revert NotOwnerOfToken();
        }
        // executes only if a token has been found
        _;
    }

    // creates a new ERC20 Token by deploying the TokenCreator contract
    function createNewToken(uint256 _supply, string memory _contractName, string memory _contractSymbol) public {
        address createdTokenAddress = address(new TokenCreator(_supply, _contractName, _contractSymbol));

        s_createdTokenAddresses.push(createdTokenAddress);
        Token memory token = Token({supply: _supply, tokenAddress: createdTokenAddress, name: _contractName, symbol: _contractSymbol});
        parentToTokensMapping[msg.sender].push(Token({supply: _supply, tokenAddress: createdTokenAddress, name: _contractName, symbol: _contractSymbol}));
        emit TokenCreated(msg.sender, createdTokenAddress, token);
    }

    // add an require that tests if the child's address which is being added doesn't appear in the childToParentMapping already
    // this would mean the child is already added by another parent, and a child can only be mapped to 1 parent.
    // also if child already exists then revert
    function addChild(string memory _name, address _childAddress, address _tokenPreference, uint256 _baseAmount) public hasMinted(_tokenPreference) {
        require(childToParentMapping[_childAddress] == address(0), "Child has already been added by another parent!");
        uint _nextClaimPeriod = getCurrentTime() + 1 weeks;
        uint256 _claimAbleAmount = calculateClaimableAmount(_baseAmount, ClaimPeriod.WEEKLY);

        Child memory child = Child({name: _name, childAddress: _childAddress, tokenPreference: _tokenPreference, baseAmount: _baseAmount, claimableAmount: _claimAbleAmount, claimValid: false, claimPeriod: ClaimPeriod.WEEKLY, nextClaimPeriod: _nextClaimPeriod});

        // safe to delete? parentToChildMapping[msg.sender].push(child);

        // bidirectional mapping: a parent is linked to (multiple) childs, and a child can be linked to only 1 parent.
        parentToChildMappingNested[msg.sender][_childAddress] = child;
        childToParentMapping[_childAddress] = msg.sender;

        emit ChildAdded(msg.sender, _childAddress, child);
    }

    // this function will be called by the child
    // add check which makes sure only the token which has been saved as tokenPreference is able to be claimed
    // TO DO: IERC20 token argument can be removed 
    function claim(address _tokenToBeClaimed) public {
        bool tokenExists = false;
        uint _currentTime = getCurrentTime();

        // gets the address of the child's parent (so the parent of whom calls this contract)
        address childsParent = childToParentMapping[msg.sender];

        // check if the token which is being claimed exists in the mapping of the child's parent
        Token[] memory tokens = parentToTokensMapping[childsParent];
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i].tokenAddress == _tokenToBeClaimed) {
                tokenExists = true;
            }
        }
        
        // if the child's parent owns the token we can continue, else revert
        require(tokenExists == true, "Token is not owned by your parent");

        Child storage child = parentToChildMappingNested[childsParent][msg.sender];

        // checks if the claimed token is the same as the child's current token preference, else revert
        require(child.tokenPreference == _tokenToBeClaimed, "The claimed token is not your selected token");

        // child.tokenPreference == token;

        console.log("current time:", _currentTime, ". Next Claim period is: ", child.nextClaimPeriod);

        // Here we check if the current time has reached the nextClaimPeriod time, if it did then the claim is valid
        if (_currentTime >= child.nextClaimPeriod) {
            console.log("Claim Valid! ");
            child.claimValid = true;
        }

        // if the claim is valid we can continue, else revert
        require(child.claimValid == true, "Sorry your claim period is not valid");

        child.claimValid = false; // re-entrancy guard to set it back to false BEFORE sending the tokens.

        // setting the childs nextClaimPeriod based on the chosen ClaimMoment -> daily, weekly, monthly
        // the next claim period is based on the current nextClaimPeriod + the respective claimPeriod (1day, 1week, 1month)
        // this way unclaimed tokens can be caught up
        if (child.claimPeriod == ClaimPeriod.DAILY) {
            child.nextClaimPeriod = child.nextClaimPeriod + 1 days;
        } else if (child.claimPeriod == ClaimPeriod.WEEKLY) {
            child.nextClaimPeriod = child.nextClaimPeriod + 1 weeks;
        } else if (child.claimPeriod == ClaimPeriod.MONTHLY) {
            child.nextClaimPeriod = child.nextClaimPeriod + 4 weeks;
        }

        // sends the amount which has been specified
        IERC20(_tokenToBeClaimed).transfer(msg.sender, child.claimableAmount);
        // token.transfer(msg.sender, child.claimableAmount);
        emit AllowanceClaimed(childsParent, msg.sender, child, _tokenToBeClaimed, getCurrentTime());
    }

    // NOTE: Should be internal
    // with this function we calculate the claimable amount based on the base amount,
    // daily = -10%
    // weekly = base
    // monthly = +10%
    function calculateClaimableAmount(uint256 _baseAmount, ClaimPeriod _claimPeriod) public pure returns (uint256) {
        uint256 _claimAbleAmount;
        if (_claimPeriod == ClaimPeriod.DAILY) {
            uint256 dailyAmount = _baseAmount - ((_baseAmount / 100) * 10);
            _claimAbleAmount = dailyAmount / 7;
        } else if (_claimPeriod == ClaimPeriod.WEEKLY) {
            _claimAbleAmount = _baseAmount;
        } else if (_claimPeriod == ClaimPeriod.MONTHLY) {
            uint256 monthlyAmount = _claimAbleAmount = _baseAmount + ((_baseAmount / 100) * 10);
            _claimAbleAmount = monthlyAmount * 4;
        }

        return _claimAbleAmount;
    }

    // change name and move to getters
    function getBalanceTest(IERC20 token) public view returns (uint256) {
        uint256 erc20balance = token.balanceOf(msg.sender);

        return erc20balance;
    }

    // TODO: this should be an internal function which can only be called by an public function
    function _claim() internal {}

    // TO DO: Possibly move all Timer functions to a seperate (lib) contract
    // getters
    function getCurrentTime() public view returns (uint256) {
        return block.timestamp;
    }

    // gets the parent of the msg.sender
    function getChildsParent() public view returns (address) {
        address childsParent = childToParentMapping[msg.sender];
        return childsParent;
    }

    // safe to delete
    // function getChildsNextClaimPeriod() public view returns (uint256) {
    //     address childsParent = getChildsParent();
    //     Child memory child = parentToChildMappingNested[childsParent][msg.sender];

    //     return child.nextClaimPeriod;
    // }

    // helper function to get next claimperiod (unix) and claimperiod(enum)
    function getChildsNextClaimPeriod() public view returns (uint256, ClaimPeriod) {
        address childsParent = getChildsParent();
        Child memory child = parentToChildMappingNested[childsParent][msg.sender];

        uint256 nextClaimPeriod = child.nextClaimPeriod;
        ClaimPeriod claimPeriod = child.claimPeriod;
        return (nextClaimPeriod, claimPeriod);
    }

    // SETTER Functions

    // with these functions a child is able to change their individual claim periods: hourly (?), daily, weekly or monthly
    function setChildClaimMomentDaily() public {
        address childsParent = getChildsParent();

        // NOTE: We made this storage so the value is saved
        Child storage child = parentToChildMappingNested[childsParent][msg.sender];
        child.claimPeriod = ClaimPeriod.DAILY;

        // sets the next claim period to 1 day
        child.nextClaimPeriod = getCurrentTime() + 1 days;

        // sets new claimable amount according to new claim period
        uint256 newClaimableAmount = calculateClaimableAmount(child.baseAmount, ClaimPeriod.DAILY);

        child.claimableAmount = newClaimableAmount;
    }

    function setChildClaimMomentWeekly() public {
        address childsParent = getChildsParent();

        // NOTE: We made this storage so the value is saved to storage
        // sets the ClaimPeriod to weekly
        Child storage child = parentToChildMappingNested[childsParent][msg.sender];
        child.claimPeriod = ClaimPeriod.WEEKLY;

        // sets the next claim period to 1 week
        child.nextClaimPeriod = getCurrentTime() + 1 weeks;

        // sets new claimable amount according to new claim period
        uint256 newClaimableAmount = calculateClaimableAmount(child.baseAmount, ClaimPeriod.WEEKLY);

        child.claimableAmount = newClaimableAmount;
    }

    function setChildClaimMomentMonthly() public {
        address childsParent = getChildsParent();

        // NOTE: We made this storage so the value is saved to storage
        Child storage child = parentToChildMappingNested[childsParent][msg.sender];
        child.claimPeriod = ClaimPeriod.MONTHLY;

        // sets the next claim period to 4 week
        child.nextClaimPeriod = getCurrentTime() + 4 weeks;

        // sets new claimable amount according to new claim period
        uint256 newClaimableAmount = calculateClaimableAmount(child.baseAmount, ClaimPeriod.MONTHLY);

        child.claimableAmount = newClaimableAmount;
    }

    // TODO: Check if the child's parent owns the selected token
    function setChildTokenPreference(address tokenAddress) public {
        address childsParent = getChildsParent();
        Child storage child = parentToChildMappingNested[childsParent][msg.sender];
        child.tokenPreference = tokenAddress;
    }

    /// testing -> safe to delete
    function test() public view returns (address) {
        return msg.sender;
    }

    /// testing -> safe to delete
    uint256 public nextWeek;

    /// testing -> safe to delete
    function setNextWeek() public {
        nextWeek = block.timestamp + 1 weeks;
    }
}
