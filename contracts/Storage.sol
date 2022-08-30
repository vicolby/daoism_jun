// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Storage is Ownable {
    uint counter;

    function sub() external onlyOwner {
        counter --;
    }

    function add() external onlyOwner {
        counter ++;
    }

    function read() external view returns (uint){
        return counter;
    }
}