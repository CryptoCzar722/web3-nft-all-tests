//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.2;

//import './UniswapV2Library.sol';
import './IERC20.sol';

contract DiceV3{
    mapping(address => uint) public playerScore;
    mapping(address => uint) public rollCount;
    mapping(address => uint) public lastDie0;
    mapping(address => uint) public lastDie1;
    address public lastWinner;
    uint diceSides;
    //
    mapping (address => uint256) public deposits;
    address payable[] public players;
    //definitions
    //total supply is total games
    uint public totalSupply = 0;
    string public name = "Smart Insurance BM Game"; 
    uint public decimals = 18;
    address admin; 
    address token;
    IERC20 tokenContract;
    
    constructor() 
        { 
        diceSides = 6;
        playerScore[msg.sender] = 0;
        rollCount[msg.sender] = 0;
        admin = msg.sender;
        //set up token inteface for Payout / Airdrop
        token = 0x8e8582A47a7B1090225EdB0522Bb28c07b2922d7;
        tokenContract = IERC20(token);
        }   

    modifier onlyOwner() 
        {
        require(admin == msg.sender, "You are not the owner");
        _;
        }
    //important
    function airDrop(address recipient, uint256 amount) public onlyOwner 
        {
        //check contract and reciepnt deposit
        tokenContract.approve(address(this), amount);
        tokenContract.transfer(recipient, amount);
        }

    modifier onlyPlayer() 
        {
        require(HasPayedToPlay(msg.sender), "You have not payed to play");
        require(rollCount[msg.sender] >= 1, "You are out of Rolls"); 
        _;
        }

    //transfer functions
    function withdraw(address payee, uint256 amout) public onlyOwner payable
        {
        payable(payee).transfer(amout);
        //agent.transfer(paymentFee);
        //deposits[payee] = 0;
        //fees[agent] = 0;
        }

    function airdrop(address recipient, uint256 amount) public onlyOwner payable
        {
        //check contract and reciepnt deposit
        tokenContract.approve(address(this), amount);
        tokenContract.transfer(recipient, amount);
        }

    function airDropPayout(address recipient, uint256 amount) internal 
        {
        //check contract and reciepnt deposit
        tokenContract.approve(address(this), amount);
        tokenContract.transfer(recipient, amount);
        }

    receive() external payable {
        require(msg.sender != admin);
        require(msg.value >= 0.001 ether && msg.value <= 0.5 ether   , "Must send  > 0.001 bnb");

        deposits[msg.sender] += msg.value;
        rollCount[msg.sender] = 6;
        players.push(payable(msg.sender));
    }

    function getBalance() public view returns(uint)
        {
        return address(this).balance;
        }

    function getTokenBalance(address addr) public view returns(uint)
        {
        uint amount = tokenContract.balanceOf(addr);
        return amount;
        }

    function viewDeposit(address depositer) public view returns(uint)
        {
        return deposits[depositer];
        }

    function HasPayedToPlay(address depositer) public view returns(bool)
        {
        return (deposits[depositer] > 0) ? true : false;
        }

    function getScore(address owner) public view returns(uint)
        {
        return playerScore[owner]; 
        }

    function checkWinner(address owner) internal view returns(bool)
        {
        return (playerScore[owner] == 6) ? true : false; 
        }

    function random() internal view returns(uint)
        {
       return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, diceSides)));
        }
    
    function rollDice(address owner) public  onlyPlayer returns(uint) 
        {
        lastDie0[owner] = random() % 6;
        lastDie1[owner] = random() % 6;
        playerScore[owner] = 0;
        playerScore[owner] += lastDie0[owner]; 
        playerScore[owner] += lastDie1[owner]; 
        bool cWinner = checkWinner(owner);
        if (cWinner == true)
            {
            cWinner = false;
            playerScore[owner] = 0;
            rollCount[owner] = 0;
            lastWinner = owner;
            airDropPayout(owner, 100 ether);
            return 0xBEEF;
            }

        if (rollCount[owner] <= 1) 
            {
            rollCount[owner] = 0;
            playerScore[owner] = 0;
            //revert("Your turn is up, Send more bnb");
            }
        else 
            {
            rollCount[owner] = rollCount[owner] - 1;
            }

        return playerScore[owner];
        }
 

    /*function transfer(address to, uint value) public returns(bool){
        require(balanceOf(msg.sender) > value, "balances not available");
        balances[msg.sender] -= value; 
        balances[to] += value; 
        emit  Transfer(msg.sender,to,value);
        return true;    
    }

    function transferFrom(address from,address to, uint value) public returns(bool){
        require(balanceOf(from) > value, "balances not available");
        require(allowance[from][msg.sender] > value, "allowance not available");
        balances[from] -= value; 
        balances[to] += value; 
        emit Transfer(from,to,value);
        return true;
    }

    function approve(address spender, uint value) public returns(bool) {
       allowance[msg.sender][spender] = value; 
       emit Approval(msg.sender, spender,value);
       return true;
    }

    function burn(uint value) public {
        require(balanceOf(msg.sender) >= value, "balances not available");
        balances[msg.sender] -= value; 
        totalSupply -=value;
    }

    function mint(address to, uint value) public onlyOwner {
        balances[to] += value; 
        totalSupply += value;
    }
    */

}