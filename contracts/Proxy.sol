// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Proxy {
    address public implementation;
    address public owner;

    constructor(address _implementation) {
        implementation = _implementation;
        owner = msg.sender;
    }

    function upgrade(address _newImplementation) external {
        require(msg.sender == owner, "Only owner can upgrade");
        implementation = _newImplementation;
    }

    fallback() external {
        address impl = implementation;
        require(impl != address(0), "Implementation address is not set");
        (bool success, ) = impl.delegatecall(msg.data);
        require(success, "Delegatecall failed");
    }
}