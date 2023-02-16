// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TokenCreator.sol";
import "hardhat/console.sol";

contract ParentContract {
    TokenCreator public tokenCreator;

    // list of all the created token addresses
    address[] public s_createdTokenAddresses;

    // mapping of parent addresses to the coins they minted on this contract
    mapping(address => Token[]) parentToTokensMapping;

    // mapping of a parent address to a child struct
    mapping(address => Child[]) parentToChildMapping;

    // mapping of a parent to a mapping of children which will be receiving the pocket money to which token they prefer to receive
    // https://smartcontracthelper.com/solidity-mapping/
    mapping(address => mapping(address => Child)) parentToChildToTokenMapping;

    struct Token {
        uint256 supply;
        address tokenAddress;
        string name;
        string symbol;
    }

    // struct Child {
    //     string name;
    //     address childAddress;
    //     address tokenPreference;
    //     uint256 amount;
    // }

    struct Child {
        string name;
        address tokenPreference;
        uint256 amount;
    }

    // https://stackoverflow.com/questions/71226909/how-to-check-if-one-value-exists-in-an-array
    modifier hasMinted(address _tokenAddress) {
        Token[] memory tokens = parentToTokensMapping[msg.sender];

        // Complexity: O(N)
        // Chosen for this solution because the parent realistically only owns a couple of tokens which makes an O(N) complexity acceptable
        for(uint i = 0; i < tokens.length; i++){
            if(tokens[i].tokenAddress == _tokenAddress){
                _;
            }
        }
    }

    // ------------------------------- //
    // ------ PARENT FUNCTIONS ------- //
    // ------------------------------- //

    // creates a new ERC20 Token by deploying the TokenCreator contract
    function createNewToken(uint256 _supply, string memory _contractName, string memory _contractSymbol) public {
        address createdTokenAddress = address(new TokenCreator(_supply, _contractName, _contractSymbol));

        s_createdTokenAddresses.push(createdTokenAddress);
        parentToTokensMapping[msg.sender].push(Token({supply: _supply, tokenAddress: createdTokenAddress, name: _contractName, symbol: _contractSymbol}));
    }

    // OLD -> add a child to an parent
    // function addChild(string memory _name, address _childAddress, address _tokenPreference, uint256 _amount) public  {
    //     Child memory child = Child({name: _name, childAddress: _childAddress, tokenPreference: _tokenPreference, amount: _amount});
    //     parentToChildMapping[msg.sender].push(child);
    // }

    function addChildv2(string memory _name, address _childAddress, address _tokenPreference, uint256 _amount) public hasMinted(_tokenPreference) {
        parentToChildToTokenMapping[msg.sender][_childAddress] = Child({name: _name, tokenPreference: _tokenPreference, amount: _amount});
        //parentToChildMapping[msg.sender].push(child);
    }

    // ------------------------------- //
    // ------ CHILD FUNCTIONS -------  //
    // ------------------------------- //

    // TODO

    // function changeTokenPreference(address _tokenPreference, address _parentAddress) public {
    //     Child[] memory child = parentToChildMapping[_parentAddress];

    //     if (child.childAddress == msg.sender) {
    //         child.tokenPreference = _tokenPreference;
    //         parentToChildMapping[_parentAddress] = child;
    //     }
    // }

    // configure which token to send to the child in a certain timeframe
}
