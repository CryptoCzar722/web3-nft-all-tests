// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import './ShelbyNft.sol';
import './IUniswapV2Router02.sol';
import './IUniswapV2Factory.sol';
import './IERC20.sol';

contract AutoStakeNFT is ShelbyNft{
    using SafeMath for uint256;
    using SafeMathInt for int256;
    
    mapping(address => bool) IsAutoStakeEnabled;

    address public pancakeFactoryAddress;
    address public pancakeRouterAddress;
    address public autoStakingAddress0;
    string  public autoStakingName0;
    address public autoStakingAddress1;
    string  public autoStakingName1;
    uint constant deadline = 10 minutes;  //10 days;
    //Monetary % breakdown
    uint constant TREASURY_FEE    = 200;
    uint constant MARKETING_FEE   = 100;
    uint constant AUTO_STAKED_FEE = 500;
    uint constant PRICE_FEE       = 200;
    uint256 constant feeDenominator = 1000;

    IERC20 autoStakingContract0;
    IERC20 autoStakingContract1;
    IUniswapV2Router02 public pancakeRouter;
    //IUniswapV2Factory public pancakeFactory;
    constructor() {
       // auto-staking utility  -> token has get/set function
        autoStakingName0 = "Stake insured NFT"; //"Titano";
        //Stake test
        autoStakingAddress0  = 0x6E2B7421F1eaAFB590caf0A4fEa2E575f67cd4a3; //0xBA96731324dE188ebC1eD87ca74544dDEbC07D7f;
        //Stable test
        autoStakingAddress1 = 0x35851AA5aE1cC5c9E9B59727DECf8d57DFB71a06;
        //pair address
        //0x898dC09BeE42aa81169c2866eCb5d938230946cc
        autoStakingContract0 = IERC20(autoStakingAddress0);
        autoStakingContract1 = IERC20(autoStakingAddress1);
        //autoStakingName1 = "Libero";
        //autoStakingAddress1  = ;//0x0DFCb45EAE071B3b846E220560Bbcdd958414d78;
        //autoStakingContract1 = IERC20(autoStakingAddress1);
        ///////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////
        //mainnet
        //pancakeFactoryAddress = 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73;
        //pancakeRouterAddress  = 0x10ED43C718714eb63d5aA57B78B54704E256024E; 
        //testnet
        pancakeFactoryAddress = 0x6725F303b657a9451d8BA641348b6761A6CC7a17;  

        pancakeRouterAddress = 0xD99D1c33F9fC3444f8101754aBC46c52416550D1;
        pancakeRouter = IUniswapV2Router02(pancakeRouterAddress);  
    }

    function SetupAutoStake()internal{
        require(balanceOf(msg.sender) > 0, "You are not in the Group");
        IsAutoStakeEnabled[msg.sender] = true;
    }

    function mintNft() override public payable returns (uint256){
        require(msg.value >=  mintPrice, "Not enough BNB. Minting Costs 0.02 BNB");
        require(Nft_Id < 1001, "MINT SOLD OUT");
        totalSupply = Nft_Id;
        _mint(msg.sender,Nft_Id++);
        
        uint256 amountInX = msg.value * AUTO_STAKED_FEE / feeDenominator;
        uint256 amountIn0 = amountInX.div(2);
        

        address[] memory path0;
        path0[0] = pancakeRouter.WETH();
        path0[1] = autoStakingAddress0;
        uint256 amountOutMin0;
        pancakeRouter.swapExactETHForTokens(amountOutMin0, path0, address(this), deadline);
        //pancakeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(amountOutMin0, path0, address(this), deadline);

        return Nft_Id;
    }

    function AutoStakingPayment(address recipient, uint256 amount) public adminOnly 
        {
        //check contract and reciepnt deposit
        autoStakingContract0.approve(address(this), amount);
        autoStakingContract0.transfer(recipient, amount);
        }


    function AutoStakingChangeToken(uint8 tokenId, address contractAddress, string calldata name) public adminOnly 
        {
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

