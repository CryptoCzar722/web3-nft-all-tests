// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the substraction of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator.
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}


import './IUniswapV2Router02.sol';
import './IUniswapV2Factory.sol';
import './IERC20.sol';

//1. user buys in with bnb -> it is swapped for titano
//2. user can compound growth or take profit 
//
contract ssCompounder{
    using SafeMath for uint256;

    string name = "SS BNB Compounder";
    uint256  dao_fee = 5;
    uint256  dev_fee = 3;
    address dev;

    struct Vote {
        bool voteCast;
        uint voteWeight;
        string vote;
    }

    struct Proposal {
        //change router 
        //change token 0 or 1
        uint8 propType;
        address token0;
        address token1;
        address router;
        uint daoFeeRequest;
        uint votingDeadline;
        bool concensus;
    }

    struct daoStaking{
        address tokenAddress;
        string tokenName;
        IERC20 tokenInstance;
    }

    daoStaking [2]daoStakingArray;
    Proposal DaoProposal;
    //mapping (uint8 => daoStaking) daoStakingArray;
    mapping (address => Vote) daoVotingMap;
    mapping (address => uint256) buyInMap;
    mapping (address => uint256) nextCompoundMap;
    mapping (address => uint256) rewardsMap;

    address public pancakeRouterAddress;
    IUniswapV2Router02 public pancakeRouter;

    //events
    event investReceived(address, uint256);
    event compoundReceived(address, uint256);
    event canceledReceived(address, uint256);
    //
    constructor(){
        dev = msg.sender;

        daoStakingArray[0].tokenAddress  = 0x4e3cABD3AD77420FF9031d19899594041C420aeE;
        daoStakingArray[0].tokenName     = "Titano";
        daoStakingArray[0].tokenInstance = IERC20(daoStakingArray[0].tokenAddress);
        //EX for second token
        daoStakingArray[1].tokenAddress  = 0xE5bA47fD94CB645ba4119222e34fB33F59C7CD90;
        daoStakingArray[1].tokenName     = "Safuu";
        daoStakingArray[1].tokenInstance = IERC20(daoStakingArray[1].tokenAddress);
        //router
        pancakeRouterAddress  = 0x10ED43C718714eb63d5aA57B78B54704E256024E;
        pancakeRouter = IUniswapV2Router02(pancakeRouterAddress);
    }

    modifier devOnly(){
        require(msg.sender == dev, "only dev-admin can trigger dao");
        _;
    }

    function Invest() public payable{
        require(msg.value >= 0.005 ether, "Minimum is 0.005 bnb");
        buyInMap[msg.sender] += msg.value;
        nextCompoundMap[msg.sender] = block.timestamp + 6 hours;
        //
        uint deadline = 10 minutes;
        uint256 amountToSwap = msg.value * ((100 - dao_fee - dev_fee) /   100);
        uint256 amountInSwap = amountToSwap / 2;
        //
        for(uint coin = 0; coin < 2; coin++)
            {
            address[] memory path;
            path[0] = pancakeRouter.WETH();
            path[1] = daoStakingArray[coin].tokenAddress;
            uint256 [] memory amountOutMin = pancakeRouter.getAmountsOut(amountInSwap,path);
            pancakeRouter.swapExactETHForTokens{value: amountInSwap}(amountOutMin[0], path, address(this), deadline);
            rewardsMap[msg.sender] += amountOutMin[0];
            }
        emit investReceived(msg.sender, msg.value);
    }

    function Compound() public  {
        require(buyInMap[msg.sender] > 0, "sender has not bought in");
        require(block.timestamp > nextCompoundMap[msg.sender], "Not time yet");
        nextCompoundMap[msg.sender] = block.timestamp + 6 hours;


    }

    function StakingClaim() public
        {
        require(buyInMap[msg.sender] > 0, "sender has not bought in");
        require(block.timestamp > nextCompoundMap[msg.sender], "Not time yet");
        uint256 payout = 0;
        (daoStakingArray[0].tokenInstance).approve(address(this), payout);
        (daoStakingArray[0].tokenInstance).transfer(msg.sender, payout);
        }

    function DaoMakeProposal() public {
        
    }
    
    function DaoChangeToken(uint token, address newToken) public {
        //add check for dao vote complete
        daoStakingArray[token].tokenAddress  = newToken;
        daoStakingArray[token].tokenInstance = IERC20(daoStakingArray[token].tokenAddress);
        daoStakingArray[token].tokenName     = daoStakingArray[token].tokenInstance.name();
    }

    function DaoChangeRouter(address router) public {
            //router
        pancakeRouterAddress  = router;
        pancakeRouter = IUniswapV2Router02(pancakeRouterAddress);
    }


    function getToken0Balance() public view returns(uint256) {
        return (daoStakingArray[0].tokenInstance).balanceOf(address(this));
    }
    function getToken1Balance() public view returns(uint256) {
        return (daoStakingArray[1].tokenInstance).balanceOf(address(this));
    }
    
    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
}