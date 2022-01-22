//SPDX-License-Identifier: UNLICENSED
//bnb only

//each person will have their own insurance contract
pragma solidity ^0.8.2;

import './IERC20.sol';

//make this an escrow type contract 
contract SibmPresaleInsurance{

    address agent;    
    address busd;
    IERC20 busdContract;
    
    modifier onlyAgent(){
        require(msg.sender == agent);
        _;
    } 

    constructor(address _agent) {
        //import cast address msg.sender to address payable
        agent = _agent; //msg.sender;
        //BUSD contract init
        busd = 0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee;
        busdContract = IERC20(busd);
    }

    //return Busd    
    function InsurancePayoutBusd(address recipient, uint256 amount) public onlyAgent 
        {
        //check contract and reciepnt deposit
        busdContract.approve(address(this), amount);
        busdContract.transfer(recipient, amount);
        }

    function StableBalance() public view returns(uint){
        return busdContract.balanceOf(address(this));
    }

    function SafeAddress() public view returns(address){
        return address(this);
    }

}




    //tag add other coins
    //mapping (address => string) public depositedCoin;


