//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.2;

import './UniswapV2Library.sol';
import './IUniswapV2Router02.sol';
import './IUniswapV2Pair.sol';
import './IUniswapV2Factory.sol';
import './IERC20.sol';

contract Arbitrage {
  address public pancakeFactory;
  uint constant deadline = 10 minutes;  //10 days;
  IUniswapV2Router02 public biswapRouter;

  constructor() {
    //address _pancakeFactory, address _biswapRouter
    pancakeFactory = 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73; //_pancakeFactory;  
    biswapRouter = IUniswapV2Router02(0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8);  //_biswapRouter);

    //,address _biswapFactory, address _pancakeRouter
    //pancakeRouter = IUniswapV2Router02(_pancakeRouter);
    //biswapFactory = _biswapFactory;
  }
  
  function startArbitrage(
    address token0, //pass both token addresses
    address token1, 
    uint amount0, //one is zero
    uint amount1 // other is the flashloan amount
  ) external {
    address pairAddress = IUniswapV2Factory(pancakeFactory).getPair(token0, token1);
    require(pairAddress != address(0), 'This pool does not exist');
    IUniswapV2Pair(pairAddress).swap(
      amount0, 
      amount1, 
      address(this), 
      bytes('not empty')
    );
  }

  function pancakeCall(
    address _sender, 
    uint _amount0, 
    uint _amount1,
    bytes calldata _data
  ) external {
    address[] memory path = new address[](2);
    uint amountToken = _amount0 == 0 ? _amount1 : _amount0;
    
    address token0 = IUniswapV2Pair(msg.sender).token0();
    address token1 = IUniswapV2Pair(msg.sender).token1();

    require(
      msg.sender == UniswapV2Library.pairFor(pancakeFactory, token0, token1), 
      'Unauthorized'
    ); 

    require(_amount0 == 0 || _amount1 == 0);

    path[0] = _amount0 == 0 ? token1 : token0;
    path[1] = _amount0 == 0 ? token0 : token1;

    IERC20 token = IERC20(_amount0 == 0 ? token1 : token0);
    
    token.approve(address(biswapRouter), amountToken);

    uint amountRequired = UniswapV2Library.getAmountsIn(
      pancakeFactory, 
      amountToken, 
      path
    )[0];
    uint amountReceived = biswapRouter.swapExactTokensForTokens(
      amountToken, 
      amountRequired, 
      path, 
      msg.sender, 
      deadline
    )[1];

    IERC20 otherToken = IERC20(_amount0 == 0 ? token0 : token1);
    otherToken.transfer(msg.sender, amountRequired);
    otherToken.transfer(tx.origin, amountReceived - amountRequired);
  }
}
