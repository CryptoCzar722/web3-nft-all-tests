//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.2;

//import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
//our customized ERC20 interface
import './ISIBM20.sol';
import './IERC20.sol';

import './SibmPresaleInsurance.sol';

//LP pool Exchange Contract
contract SibmPresaleV3{
    string public name = "SIBM: Insured Presale V3"; 
    address admin; 
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    address token;
    address busd;
    ISIBM20 tokenContract;
    IERC20 busdContract;

    struct OrderBook {     
        uint orderCount;
        uint TokensSold;
        uint TokenSupply;
        //address lastDeposit;
        uint256 price;
    }

    mapping (address => uint256) public pendingOrder;
    mapping (address => uint256) public pendingTokenPayment;
    mapping (address => uint256) public order_id;
    mapping (address => uint256) public startBlock;
    mapping (address => uint256) public finishBlock;

    mapping (address => uint256) public confirmedOrders;
    mapping (address => address) public insuranceContracts;
    //mapping (address => string) public insuranceContractsName;

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
        require((tokenContract.balanceOf(address(this)) / 4) > pendingTokenPayment[receivee],"Request too much consider refund or airdrop");
        require(pendingOrder[receivee] >= busdContract.balanceOf(insuranceContracts[receivee]), "payment not received");
        //tokenContract.approve(address(this), orderBook.pendingTokenPayment[receivee]);
        //tokenContract.transferFrom(address(this), receivee, orderBook.pendingTokenPayment[receivee]);// * 995 / 1000);
        tokenContract.approve(address(this), pendingTokenPayment[receivee]);
        tokenContract.transfer(transactor, pendingTokenPayment[receivee]);
        //Order book logic TAG
        confirmedOrders[receivee] = busdContract.balanceOf(insuranceContracts[receivee]);//orderBook.pendingOrder[receivee];
        orderBook.TokensSold += pendingTokenPayment[receivee];
        orderBook.TokenSupply = tokenContract.balanceOf(address(this));
        finishBlock[receivee] = block.timestamp;
        order_id[receivee] = pack_order_data(msg.sender , pendingTokenPayment[receivee], orderBook.orderCount, startBlock[receivee], finishBlock[receivee]);
        delete pendingOrder[receivee];
        delete pendingTokenPayment[receivee];
        }
    
    function pack_order_data(address buyer , uint256 amount , uint orderCount, uint startTime, uint endTime) internal pure returns(uint)
        {
        return uint(keccak256(abi.encodePacked(buyer, amount, orderCount,startTime,endTime))); //block.difficulty, block.timestamp
        }

    receive() external payable 
        {
        revert("ERROR: BNB IS NOT ACCEPTED BY THIS CONTRACT");
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
        require(amount <= balance, "ERROR: You do not have enough Busd");
        //Setup Insurance Contract for each depositer
        SibmPresaleInsurance insurance = new SibmPresaleInsurance(admin, msg.sender);
        insuranceContracts[msg.sender] = insurance.SafeAddress();
        
        //  receive bsud
        //require(busdContract.approve(msg.sender, quantity * 105 / 100), "approve Failed");
                                                    //orderBook.insuranceContract[msg.sender]
        
        uint256 amount0 = amount / 2;
        uint256 amount1 = amount / 2;
        // 1/2 to insurance contract
        require(busdContract.transferFrom(msg.sender, insuranceContracts[msg.sender],amount0 ), "transfer from Failed");
        //1/2 to presale for LP pancakeswap 
        require(busdContract.transferFrom(msg.sender, address(this), amount1), "transfer from Failed");
        
        uint256 quantity = amount1 / orderBook.price;
        pendingOrder[msg.sender] = amount1;
        pendingTokenPayment[msg.sender] = quantity * 99 / 100 * 1e18; //1% fee
        
        orderBook.orderCount++;
        startBlock[msg.sender] = block.timestamp;
        order_id[msg.sender] = pack_order_data(msg.sender ,amount, orderBook.orderCount, startBlock[msg.sender], 0);
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

    function HasPayed(address depositer) public view returns(bool)
        {
        return (confirmedOrders[depositer] > 0) ? true : false;
        }
}