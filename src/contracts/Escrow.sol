//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.2;

contract Escrow{
    address agent;
    mapping (address => uint256) public deposits;

    modifier onlyAgent(){
        require(msg.sender == agent);
        _;
    }
    
    constructor() {
        agent = msg.sender;
    }

    function deposit(address payee) public onlyAgent payable{
        uint256 amount = msg.value;
        deposits[payee] = deposits[payee] + amount;
    }
    
    function withdraw(address payable payee) public onlyAgent payable{
        uint256 paymentCashout = deposits[payee] * 995 / 1000; //* 0.995;
        //0.25% Escrow Fee
        uint256 paymentFee = deposits[payee] - paymentCashout;
        deposits[payee] = 0;
        payee.transfer(paymentCashout);
        payee.transfer(paymentFee);
    }
}