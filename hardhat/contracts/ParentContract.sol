// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TokenCreator.sol";
import "hardhat/console.sol";

// Parent Contract is deployed only once to the goerli network 
contract ParentContract {

    TokenCreator public tokenCreator;
    address [] public createdTokenAddresses;

    // mapping of parent addresses to the coins they minted on this contract
    mapping(address => address[]) parentToTokensMapping;

    // what do we need on contract deployment?
    constructor() {}

    function createNewToken(uint256 supply, string memory contractName, string memory contractSymbol) public{
        address createdToken = address(new TokenCreator(supply, contractName, contractSymbol));

        createdTokenAddresses.push(createdToken);
        parentToTokensMapping[msg.sender].push(createdToken);
    }
}
