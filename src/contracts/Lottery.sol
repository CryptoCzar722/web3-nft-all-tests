//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.2;

contract LotteryV3 {

    string public name = "AFSW Lottery";
    
    //uint public prize;
    //list of players registered in lotery
    //change to mapping for ease of access
    address payable[] public players;
    //  ||||  EX ||||
    //mapping (address => uint256) public players;
    mapping (address => uint256) public deposits;
    uint256 depositCount;
    address public admin;
    address public lastWinner;
    
    constructor() {
        admin = msg.sender;
        depositCount = 0;
        //automatically adds admin on deployment *** test only 
        players.push(payable(admin));
        
    }
    
    modifier onlyOwner() {
        require(admin == msg.sender, "You are not the owner");
        _;
    }

    receive() external payable {
        require(msg.sender != admin);
        require(msg.value >= 0.01 ether && msg.value <= 0.5 ether   , "Must send  > 0.01 bnb");
        //require((viewDeposit(msg.sender)  + msg.value) <= 0.5 ether, "Cannot deposit more than once bnb");
        //take value ($$) into memory
        depositCount = depositCount + 1;
        deposits[msg.sender] = msg.value;
        players.push(payable(msg.sender));
    }

    function withDraw(address withdrawee, uint256 returnAmount) public {
        //players can leave the pool for 95% of entry amount
        //not working
        //require(msg.sender == withdrawee, 'Only Depositer can withdraw');
        //repayment will only ensure 97.5% 
        require(returnAmount <= ((viewDeposit(withdrawee) * 975) / 1000), "2.5% fee due to GAS");
        deposits[withdrawee] = deposits[withdrawee] - returnAmount;
        uint arrayPos = pullPlayersPos(withdrawee);
        //remove player address from array that the winner is selected from.
        delete players[arrayPos];
        payable(withdrawee).transfer(returnAmount);
        //pay admin remaining 2.5%?
    }

    function viewDeposit(address depositer) public view returns(uint){
        return deposits[depositer];
    }
    
    function getBalance() public view returns(uint){ //onlyOwner
        return address(this).balance;
    }
    
    
    
    //private functions
    /*function isContract(address _addr) private returns (bool isContract){
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
    }*/

    function pullPlayersPos(address depositer) internal view returns(uint){
       // address payable[] public players;
        //uint [] removal;
        for (uint i = 0; i < players.length; i++)
            {   
            if (players[i] == depositer)
                {
                return i;
                }
            }
        revert("Address not found");
    }

    function random() internal view returns(uint){
       return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function pickWinner() public onlyOwner {
        //require(players.length >= 3 , "Not enough players in the lottery");
        
        address payable winner;
        //selects the winner with random number
        uint temp = random() % players.length;
        winner = players[temp];
        //transfers balance to winner
        require(winner != address(0),'winner 0x0 selected');
        //gets only 70% of funds in contract
        winner.transfer((getBalance() * 75) / 100); 
        //gets remaining amount AKA 25% -> must make admin a payable account
        payable(admin).transfer(getBalance()); 
        lastWinner = winner;
        //resets the plays array once someone is picked
        resetLottery();   
    }

    function resetLottery() internal {
        players = new address payable[](0);
        //mapping (address => uint256) public deposits;
        //Loop through mapping of deposits clear players array position 
       /* for (uint256 i = 0; i < depositCount; i++)
        {
        deposits[players[i]] = 0;
        }*/
    }
}


//Deposits { ( address 0 : uint256) , ( address 1 : uint256) , ( address 2 : uint256), ( address 3 : uint256)}
//players [address 0, address 1, address 2, address 3]


