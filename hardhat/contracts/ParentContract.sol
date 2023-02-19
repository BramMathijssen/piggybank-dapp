// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./TokenCreator.sol";
import "hardhat/console.sol";

error NotOwnerOfToken();

/// @title A contract for parents to supply (pocket) money as a stream to their child(ren)
/// @author Bram Mathijssen
/// @notice This contract is used by both the parent as the children
/// @dev Currently under construction
contract ParentContract {
    TokenCreator public tokenCreator;
    uint public currentTime;
    uint public contractDeployedTime;

    // global contractwide claim times based on the childs preference: daily, weekly or monthly
    // TO DO: We want to automatically go to the next claim moment after the claim moment has been reached
    // Maybe use Chainlink keepers?
    uint256 public claimMomentDaily;
    uint256 public claimMomentWeekly;
    uint256 public claimMomentMonthly;

    // list of all the created token addresses
    address[] public s_createdTokenAddresses;


    // NOTE: Check if we can make this a address to address maping where a parent has multiple token addresses
    // NOTE: So this way we could save gas, since we dont want to loop over our token list when we claim
    // mapping of parent addresses to the coins they minted on this contract
    mapping(address => Token[]) public parentToTokensMapping;

    // NOTE: Possibly convert this to a nested mapping like in the v2 version of this contract.
    // mapping of a parent address to a child struct
    mapping(address => Child[]) public parentToChildMapping;

    // https://ethereum.stackexchange.com/questions/4272/getting-key-from-solidity-mapping-by-value
    // mapping of a child to a parent address -> Bidirectional relation
    mapping(address => address) public childToParentMapping;


    struct Child {
        string name;
        address childAddress;
        address tokenPreference;
        uint256 amount;
    }

    struct Token {
        uint256 supply;
        address tokenAddress;
        string name;
        string symbol;
    }

    // on contract deployment we want to set the claim times
    constructor(){
        contractDeployedTime = getCurrentTime();
        claimMomentDaily = setClaimMomentDaily();
        claimMomentWeekly = setClaimMomentWeekly();
        claimMomentMonthly = setClaimMomentMonthly();
    }


    // https://stackoverflow.com/questions/71226909/how-to-check-if-one-value-exists-in-an-array
    modifier hasMinted(address _tokenAddress) {
        Token[] memory tokens = parentToTokensMapping[msg.sender];
        bool tokenFound = false;

        // Complexity: O(N)
        // Chosen for this solution because the parent realistically only owns a couple of tokens which makes an O(N) complexity acceptable
        for(uint i = 0; i < tokens.length; i++){
            console.log("looping: ", i);
            if(tokens[i].tokenAddress == _tokenAddress){
                console.log("token with address", tokens[i].tokenAddress);
                tokenFound = true;
                break;
            }           
        }
        if(!tokenFound){
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
        parentToTokensMapping[msg.sender].push(Token({supply: _supply, tokenAddress: createdTokenAddress, name: _contractName, symbol: _contractSymbol}));
    }

    // OLD -> add a child to an parent (Maybe Better Solution)
    function addChild(string memory _name, address _childAddress, address _tokenPreference, uint256 _amount) public hasMinted(_tokenPreference) {
        Child memory child = Child({name: _name, childAddress: _childAddress, tokenPreference: _tokenPreference, amount: _amount}); 

        // bidirectional mapping: a parent is linked to (multiple) childs, and a child can be linked to only 1 dad.
        parentToChildMapping[msg.sender].push(child);
        childToParentMapping[_childAddress] = msg.sender;
    }

    // this function will be called by the child
    function claim(IERC20 token, address _tokenToBeClaimed, uint256 _amount) public {
        bool tokenExists = false;

        // gets the address of the child's parent (so the parent of whom calls this contract)
        address childsParent = childToParentMapping[msg.sender];

        // check if the token which is being claimed exists in the mapping of the child's parent
        Token[] memory tokens = parentToTokensMapping[childsParent];
        for(uint i = 0; i < tokens.length; i++){
            if(tokens[i].tokenAddress == _tokenToBeClaimed){
                address addy1 = tokens[i].tokenAddress; // for testing purpose
                address addy2 = _tokenToBeClaimed; // for testing purpose
                console.log("addy1: ", addy1, "addy2:", addy2); // for testing purpose
                console.log("Token Found!"); // for testing purpose
                tokenExists = true;
            }
        }

        require(tokenExists == true, "Token is not owned by your parent");

        // TODO check if the claim period is valid


        // send the token to the msg.sender
        token.transfer(msg.sender, _amount);
    }

    function getBalanceTest(IERC20 token) public view returns(uint256){
        uint256 erc20balance = token.balanceOf(msg.sender);

        return erc20balance;
    }


    // this should be an internal function which can only be called by an public function 
    function _claim() internal {

    }

    // TO DO: Possibly move all Timer functions to a seperate (lib) contract
    // getters
    function getCurrentTime() public view returns(uint256){
        return block.timestamp;
    }

    // constructor functions
    function setClaimMomentDaily() public view returns(uint256){
        uint current = getCurrentTime();
        return current + 1 days;
    }


    function setClaimMomentWeekly() public view returns(uint256) {
        uint current = getCurrentTime();
        return current + 1 weeks;
    }


    function setClaimMomentMonthly() public view returns(uint256) {
        uint current = getCurrentTime();
        return current + 4 weeks;
    }

    // setter functions
    function setClaimMomentDaily2() public {
        uint current = getCurrentTime();
        claimMomentDaily =  current + 1 days;
    }


    function setClaimMomentWeekly2() public   {
        uint current = getCurrentTime();
        claimMomentWeekly = current + 1 weeks;
    }


    function setClaimMomentMonthly2() public {
        uint current = getCurrentTime();
        claimMomentMonthly = current + 4 weeks;
    }

}
