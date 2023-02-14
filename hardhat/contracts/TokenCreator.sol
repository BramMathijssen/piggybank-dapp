// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

abstract contract TokenCreator is ERC20 {

    constructor(uint256 initialSupply, string memory tokenNameInput, string memory symbolInput) ERC20(tokenNameInput, symbolInput) {
        _mint(msg.sender, initialSupply);
    }
}
