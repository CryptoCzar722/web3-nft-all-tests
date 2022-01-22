//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.2;

//import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";


//our customized ERC20 interface
import './ISIBM20.sol';
import './IERC20.sol';

import './SibmPresaleInsurance.sol';


//LP pool Exchange Contract
contract SibmPresale{
    //
    /*mapping (address => uint256) public deposits;
    mapping (address => uint256) public pendingOrder;
    mapping (address => uint256) public pendingTokenPayment;
    mapping (address => uint256) public orderId;*/
    //definitions
    //total supply is total games
    string public name = "SIBM: Insured Presale"; 
    address admin; 
    //
    address token;
    address busd;
    ISIBM20 tokenContract;
    IERC20 busdContract;



    struct OrderBook { 
        mapping (address => uint256) pendingOrder;
        mapping (address => uint256) pendingTokenPayment;
        mapping (address => uint256) order_id;
        mapping (address => uint256) startBlock;
        mapping (address => uint256) finishBlock;

        mapping (address => uint256) confirmedOrders;
        mapping (address => address) insuranceContract;
        
        uint orderCount;
        uint TokensSold;
        uint TokenSupply;
        //address lastDeposit;
        uint256 price;
    }

    OrderBook public orderBook;

    constructor() 
        {
        admin = msg.sender;
        //set up token inteface for payments
        token = 0x983Bd79E9c57Dd3A87a1de98b9996fD1672768B2;
        busd = 0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee;
        tokenContract = ISIBM20(token);
        busdContract = IERC20(busd);
        //
        orderBook.orderCount = 0;
        orderBook.price = 375000000000;
        orderBook.TokenSupply = tokenContract.balanceOf(address(this));

        }

    modifier onlyOwner() 
        {
        require(admin == msg.sender, "You are not the owner");
        _;
        }
    function TranfserOwner(address newOwner) public onlyOwner 
        {
        admin = newOwner;
        }
    //important we will migrate to a new contract at some point
    function airDropToken(address recipient, uint256 amount) public onlyOwner 
        {
        //check contract and reciepnt deposit
        tokenContract.approve(address(this), amount);
        tokenContract.transfer(recipient, amount);
        }
    
    function airDropBusd(address recipient, uint256 amount) public onlyOwner 
        {
        //check contract and reciepnt deposit
        busdContract.approve(address(this), amount);
        busdContract.transfer(recipient, amount);
        }    
    
    function SetPoolToken(address tokenAddress) public onlyOwner 
        {
        token = tokenAddress;
        tokenContract = ISIBM20(token);
        }
    
    function SetPoolStable(address usdAddress) public onlyOwner 
        {
        busd = usdAddress;
        busdContract = IERC20(busd);
        }
    
    function ApprovePendingTransaction(address transactor) public onlyOwner 
        {
        address receivee = address(0);
        require(transactor != receivee, 'Address cannot be zero');
        receivee = transactor;
        require((tokenContract.balanceOf(address(this)) / 4) > orderBook.pendingTokenPayment[receivee],"Request too much consider refund or airdrop");
        require(orderBook.pendingOrder[receivee] >= busdContract.balanceOf(orderBook.insuranceContract[receivee]), "payment not received");
        //tokenContract.approve(address(this), orderBook.pendingTokenPayment[receivee]);
        //tokenContract.transferFrom(address(this), receivee, orderBook.pendingTokenPayment[receivee]);// * 995 / 1000);
        tokenContract.approve(address(this), orderBook.pendingTokenPayment[receivee]);
        tokenContract.transfer(transactor, orderBook.pendingTokenPayment[receivee]);
        //Order book logic TAG
        orderBook.confirmedOrders[receivee] = busdContract.balanceOf(orderBook.insuranceContract[receivee]);//orderBook.pendingOrder[receivee];
        orderBook.TokensSold += orderBook.pendingTokenPayment[receivee];
        orderBook.TokenSupply = tokenContract.balanceOf(address(this));
        orderBook.finishBlock[receivee] = block.timestamp;
        orderBook.order_id[receivee] = pack_order_data(msg.sender ,orderBook.pendingTokenPayment[receivee], orderBook.orderCount, orderBook.startBlock[receivee], orderBook.finishBlock[receivee]);
        delete orderBook.pendingOrder[receivee];
        delete orderBook.pendingTokenPayment[receivee];
        }
    
    function pack_order_data(address buyer , uint256 amount , uint orderCount, uint startTime, uint endTime) internal pure returns(uint)
        {
        return uint(keccak256(abi.encodePacked(buyer, amount, orderCount,startTime,endTime))); //block.difficulty, block.timestamp
        }

    receive() external payable 
        {
        revert("ERROR: BNB IS NOT ACCEPTED BY THIS CONTRACT");
        }

    function insuranceContract(address user) public view returns(address)
        {
        return orderBook.insuranceContract[user];
        }
    
    function BusdBalance() public view returns(uint)
        {
        uint amount = busdContract.balanceOf(msg.sender);
        return amount;
        }
    
    function TokenBalance() public view returns(uint)
        {
        uint amount = tokenContract.balanceOf(msg.sender);
        return amount;
        }

    function RequestPresaleBuyIn(uint256 amount) public
        {
        uint256 balance = busdContract.balanceOf(msg.sender);
        uint256 quantity = amount * orderBook.price;
        require(quantity <= balance, "ERROR: You do not have enough Busd");
        //require(amount < (PresaleTokenBalance() / 4) , "ERROR: There are not enough tokens for the sale");
        //Setup Insurance Contract for each depositer
        SibmPresaleInsurance insurance = new SibmPresaleInsurance(admin);
        orderBook.insuranceContract[msg.sender] = insurance.SafeAddress();
        
        //  receive bsud
        //require(busdContract.approve(msg.sender, quantity * 105 / 100), "approve Failed");
                                                    //orderBook.insuranceContract[msg.sender]
        require(busdContract.transferFrom(msg.sender, address(this), quantity), "transfer from Failed");
        //require(busdContract.transferFrom(msg.sender, address(this), quantity), "transfer from Failed");
        
        orderBook.pendingOrder[msg.sender] = quantity;
        orderBook.pendingTokenPayment[msg.sender] = amount * 99 / 100; //1% fee
        
        orderBook.orderCount++;
        orderBook.startBlock[msg.sender] = block.timestamp;
        orderBook.order_id[msg.sender] = pack_order_data(msg.sender ,amount, orderBook.orderCount, orderBook.startBlock[msg.sender], 0);
        }
    
    /*function RequestPresaleSellOut(uint256 amount) public
        {
        require(amount <= (tokenContract.balanceOf(msg.sender)), "ERROR: You do not have enough tokens");
        uint256 quantity = amount * orderBook.price;
        require(amount < (PresaleTokenBalance() / 4), "ERROR: There are not enough tokens for the sale");
        require(quantity < (PresaleBusdBalance() / 4), "ERROR: Sale has too high of price impact");
        
        //  receive LP tokens
        tokenContract.approve(msg.sender, quantity);
        tokenContract.transferFrom(msg.sender, address(this), quantity);// * 995 / 1000);
        
        orderBook.pendingOrder[msg.sender] = quantity;
        orderBook.pendingTokenPayment[msg.sender] = quantity;
        }*/


    function PresaleTokenBuyRate(uint256 quantity) public view returns(uint)
        {
        uint256 amount = orderBook.price * quantity;
        return amount;
        }
    
    function PresaleTokenSellRate(uint256 quantity) public view returns(uint)
        {
        uint256 amount = orderBook.price * quantity * 995 / 1000;
        return amount;
        }
    
    function PresaleTokenBalance() public view returns(uint)
        {
        uint amount = tokenContract.balanceOf(address(this));
        return amount;
        }
    function PresaleBusdBalance() public view returns(uint)
        {
        uint amount = busdContract.balanceOf(address(this));
        return amount;
        }

    function viewConfirmedOrders(address depositer) public view returns(uint)
        {
        return orderBook.confirmedOrders[depositer];
        }
    function viewPendingDeposit(address depositer) public view returns(uint)
        {
        return orderBook.pendingOrder[depositer];
        }

    function viewPendingTokenPayment(address depositer) public view returns(uint)
        {
        return orderBook.pendingTokenPayment[depositer];
        }

    function HasPayed(address depositer) public view returns(bool)
        {
        return (orderBook.confirmedOrders[depositer] > 0) ? true : false;
        }
}