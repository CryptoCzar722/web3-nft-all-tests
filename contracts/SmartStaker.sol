// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import './IUniswapV2Router02.sol';
import './IUniswapV2Factory.sol';
import './IERC20.sol';
import './ShelbyNft.sol';

contract SmartStaker is ShelbyNft{
    using SafeMath for uint256;
    using SafeMathInt for int256;
    
    mapping(address => bool) IsAutoStakeEnabled;
    
    address public autoStakingAddress0;
    string  public autoStakingName0;
    address public autoStakingAddress1;
    string  public autoStakingName1;
    address public adminWallet;
    /////////////////////////////////////
    address public pancakeFactoryAddress;
    address public pancakeRouterAddress;

    address mintAddress;
    //Monetary % breakdown
    uint constant TREASURY_FEE           = 200;
    uint constant MARKETING_FEE          = 100;
    //titano/libero and other auto stakers can have up to 20% fee
    uint constant PRICE_FEE              = 200;
    uint constant AUTO_STAKED_ALLOCATION = 500;
    uint256 constant feeDenominator = 1000;

    IERC20 autoStakingContract0;
    IERC20 autoStakingContract1;
    IUniswapV2Router02 public pancakeRouter;
    //IUniswapV2Factory public pancakeFactory;
    constructor() {
        adminWallet = msg.sender;
        ///////////////////////////////////////////////////////////////////
        //auto-staking utility  -> token has get/set function
        autoStakingName0 = "Titano";
        autoStakingAddress0  = 0xBA96731324dE188ebC1eD87ca74544dDEbC07D7f;
        autoStakingContract0 = IERC20(autoStakingAddress0);
        ///////////////////////////////////////////////////////////////////
        autoStakingName1 = "Libero";
        autoStakingAddress1  = 0x0DFCb45EAE071B3b846E220560Bbcdd958414d78;
        autoStakingContract1 = IERC20(autoStakingAddress1);
        ///////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////
        //mainnet
        pancakeFactoryAddress = 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73;
        pancakeRouterAddress  = 0x10ED43C718714eb63d5aA57B78B54704E256024E; 
        //testnet
        //pancakeFactoryAddress = 0x6725F303b657a9451d8BA641348b6761A6CC7a17;  
        //pancakeRouterAddress = 0xD99D1c33F9fC3444f8101754aBC46c52416550D1;
        pancakeRouter = IUniswapV2Router02(pancakeRouterAddress); 
    }

    function SetupAutoStake()internal{
        require(balanceOf(msg.sender) > 0, "You are not in the Group");
        IsAutoStakeEnabled[msg.sender] = true;
    }
    
   function mintNft(uint256 deadline) override public payable returns (uint256){
        require(block.timestamp <= deadline, "Expired");
        require(msg.value >=  mintPrice, "Not enough BNB. Minting Costs 0.02 BNB");
        require(Nft_Id < 1001, "MINT SOLD OUT");
        totalSupply = Nft_Id;
        _mint(msg.sender,Nft_Id++);
        
        /*
        #	Name	        Type	    Data
        0	amountOutMin	uint256	    16531380036092891379574 (wei)
        1	path	        address[]	0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c      WETH
                                        0xBA96731324dE188ebC1eD87ca74544dDEbC07D7f      TITANO
        2	to	            address	    addres(this)                                    Contract
        3	deadline	    uint256	    1640617736
        //////////////////////////////////////////////////////////////////////////////////////////
        0	amountOutMin	uint256	    16531380036092891379574 (wei)
        1	path	        address[]	0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c      WETH
                                        0x0dfcb45eae071b3b846e220560bbcdd958414d78      LIBERO
        2	to	            address	    addres(this)                                    Contract
        3	deadline	    uint256	    1640617736
        */
        uint256 amountInX = msg.value.mul(AUTO_STAKED_ALLOCATION).div(feeDenominator);
        uint256 amountInSwap = amountInX.div(2);
        ///////////////////////////////////////////////////////////////////////////////
        address[] memory path0;
        path0[0] = pancakeRouter.WETH();
        path0[1] = autoStakingAddress0;
        ///////////////////////////////////////////////////////////////////////////////
        address[] memory path1;
        path1[0] = pancakeRouter.WETH();
        path1[1] = autoStakingAddress1;
        ///////////////////////////////////////////////////////////////////////////////
        uint256 [] memory amountOutMin0 = pancakeRouter.getAmountsOut(amountInSwap,path0);  
        uint256 [] memory amountOutMin1 = pancakeRouter.getAmountsOut(amountInSwap,path1);
        ///////////////////////////////////////////////////////////////////////////////
        pancakeRouter.swapExactETHForTokens{value: amountInSwap}(amountOutMin0[0], path0, address(this), deadline);
        pancakeRouter.swapExactETHForTokens{value: amountInSwap}(amountOutMin1[0], path1, address(this), deadline);
        return Nft_Id;
    }

    function AutoStakingPayment(address recipient, uint256 amount) public 
        {
        //require(msg.sender== adminWallet, "Only admin can autopay");
        //check contract and reciepnt deposit
        autoStakingContract0.approve(address(this), amount);
        autoStakingContract0.transfer(recipient, amount);
        }
    
    function AutoStakingClaim() public
        {
        require(balanceOf(msg.sender) > 0, "Only admin can autopay");
        uint256 payout = autoStakingContract0.balanceOf(address(this)) / nftsMinted();
        autoStakingContract0.approve(address(this), payout);
        autoStakingContract0.transfer(msg.sender, payout);
        }


    function AutoStakingChangeToken(uint8 tokenId, address contractAddress, string calldata name) public //adminOnly 
        {
            require(msg.sender== adminWallet, "ADMIN ONLY");
            if (tokenId == 0)
                {
                autoStakingName0 = name;
                autoStakingAddress0 = contractAddress;
                autoStakingContract0 = IERC20(autoStakingAddress0);
                }
           /* else if (tokenId == 1)
                {
                autoStakingName1 = name;
                autoStakingAddress1 = contractAddress;
                autoStakingContract1 = IERC20(autoStakingAddress1);
                }*/
        }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
library SafeMathInt {
    int256 private constant MIN_INT256 = int256(1) << 255;
    int256 private constant MAX_INT256 = ~(int256(1) << 255);

    function mul(int256 a, int256 b) internal pure returns (int256) {
        int256 c = a * b;

        require(c != MIN_INT256 || (a & MIN_INT256) != (b & MIN_INT256));
        require((b == 0) || (c / b == a));
        return c;
    }

    function div(int256 a, int256 b) internal pure returns (int256) {
        require(b != -1 || a != MIN_INT256);

        return a / b;
    }

    function sub(int256 a, int256 b) internal pure returns (int256) {
        int256 c = a - b;
        require((b >= 0 && c <= a) || (b < 0 && c > a));
        return c;
    }

    function add(int256 a, int256 b) internal pure returns (int256) {
        int256 c = a + b;
        require((b >= 0 && c >= a) || (b < 0 && c < a));
        return c;
    }

    function abs(int256 a) internal pure returns (int256) {
        require(a != MIN_INT256);
        return a < 0 ? -a : a;
    }
}


library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;

        return c;
    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}

