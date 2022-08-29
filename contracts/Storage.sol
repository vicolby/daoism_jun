// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Storage{
    uint counter;

    function decrease() external{
        counter --;
    }

    function increase() external{
        counter ++;
    }

    function read() external view returns (uint){
        return counter;
    }
}