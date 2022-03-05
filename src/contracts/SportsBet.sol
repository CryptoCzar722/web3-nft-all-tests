//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.2;

contract SportsBet{
    uint256 maxBet = 10 ether;
    uint256 minBet = 0.005 ether;

    uint public totalSupply = 0;

    address agent;
    //mapping (address => uint256) public deposits;
    struct Bet {
        //bool Active;
        bool Accepted;
        uint256 Value;
        uint256 Fee;
        uint    endTime;
        address Caller;
        address Taker;
        address CallerVote;
        address TakerVote;
        address Winner;
        string memo;
    }
    string public name = "Smart Bets"; 
    string public symbol = "SMBET";
    mapping (address => Bet) BetList;

    constructor() {
        agent = msg.sender;
    }

    modifier onlyAgent(){
        require(msg.sender == agent);
        _;
    }

    modifier onlyActiveBets() {
        require(msg.sender == BetList[msg.sender].Caller || msg.sender == BetList[msg.sender].Taker,"You don have a bet open");
        require(BetList[msg.sender].endTime >= block.timestamp, "Bet already ended");
        _;
    }

    //Bet Writable function: Start new bet, cancel existing bet
    function CreateBet(address betReceiver, uint end, string calldata memo) public payable{
        require(msg.value >= minBet && msg.value <= maxBet   , " Bets must be > 0.001  & < 10 bnb");
        require(BetList[msg.sender].endTime == 0, "You have active bets");
        require(bytes(memo).length < 15, "MEMO too long");
        // 2% fee        
        uint256 value = msg.value * 980 / 1000;
        uint256 fee = msg.value - value;
        totalSupply++;
        Bet memory newBet = Bet(false,value,fee,end,msg.sender,betReceiver,address(0),address(0),address(0), memo);
        BetList[msg.sender]  = newBet;
        BetList[betReceiver] = newBet; 
    }

    function ExtendBet(uint newEnd) public onlyActiveBets{
        BetList[msg.sender].endTime = newEnd; 
    }

    function CancelBet() public onlyActiveBets{
        //BetList[msg.sender].Active = false; 
        BetList[BetList[msg.sender].Caller].endTime = 0;
        BetList[BetList[msg.sender].Taker].endTime = 0;
        if(BetList[BetList[msg.sender].Caller].Value != 0){
            payable(BetList[msg.sender].Caller).transfer(BetList[msg.sender].Value + (BetList[msg.sender].Fee / 2));
        }
        if(BetList[BetList[msg.sender].Taker].Value != 0){
            payable(BetList[msg.sender].Taker).transfer(BetList[msg.sender].Value + (BetList[msg.sender].Fee / 2));
        }
        totalSupply--;
    }
    
    //
    function ViewBetChallanges() public view onlyActiveBets returns(Bet memory){
        require(msg.sender == BetList[msg.sender].Taker,"You dont have any bet challanges");
        return BetList[msg.sender];
    }

    function ViewBetPlaced() public view onlyActiveBets returns(Bet memory){
        //require(BetList[msg.sender].Active == true,"You dont have active bets");
        return BetList[msg.sender];
    }

    function BetAcceptionStatus() public view onlyActiveBets returns(bool){
        return BetList[msg.sender].Accepted;
    }

    function AcceptBet() public onlyActiveBets payable{
        require(msg.value >= BetList[msg.sender].Value + BetList[msg.sender].Fee, "INCORRECT amount");
        uint256 value = msg.value * 980 / 1000;
        uint256 fee = msg.value - value;
        BetList[msg.sender].Value += value;
        BetList[msg.sender].Fee += fee;
        //update both mappings
        BetList[BetList[msg.sender].Caller].Value += value;
        BetList[BetList[msg.sender].Caller].Fee += fee;
        BetList[msg.sender].Accepted = true;
    }
    
    function BetVoteWinner(address winner) public onlyActiveBets{ 
        require(BetList[msg.sender].Accepted == true,"Your bet is not accepted");

        if(msg.sender == BetList[msg.sender].Caller){
            BetList[msg.sender].CallerVote = winner;
        }
        else if(msg.sender == BetList[msg.sender].Taker){
            BetList[msg.sender].TakerVote = winner;
        }                 
    }

    function BetPayWinner() public onlyActiveBets{ 
        require(BetList[msg.sender].TakerVote != address(0) && BetList[msg.sender].CallerVote != address(0),"Your bets outcome was not confirmed by both parties");
        
        BetList[BetList[msg.sender].Caller].endTime = 0;
        BetList[BetList[msg.sender].Taker].endTime = 0;
        
        if(BetList[msg.sender].TakerVote == BetList[msg.sender].CallerVote){
            payable(BetList[msg.sender].Winner).transfer(BetList[msg.sender].Value); 
        }
        else{
            payable(BetList[msg.sender].Taker).transfer(BetList[msg.sender].Value + (BetList[msg.sender].Fee / 2)); 
            payable(BetList[msg.sender].Caller).transfer(BetList[msg.sender].Value); 
        }                
    }

}





