//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.2;

import './UniswapV2Library.sol';
import './IUniswapV2Router02.sol';
import './IUniswapV2Pair.sol';
import './IUniswapV2Factory.sol';
import './IERC20.sol';

contract Arb2 {

  event Log(string msg, address val);
  event Log(string msg, bytes val);

  address public pancakeFactory;
  address tokenPair;
  uint constant deadline = 10 minutes;  //10 days;
  IUniswapV2Router02 public biswapRouter;
  string public name = "AF Contract v2.1"; 
  bool authorize = false;

  constructor() {
    //address _pancakeFactory, address _biswapRouter
    //////
    //pancakeFactory = 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73; //_pancakeFactory;  
    //biswapRouter = IUniswapV2Router02(0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8);  //_biswapRouter);
    /////
    //,address _biswapFactory, address _pancakeRouter
    //pancakeRouter = IUniswapV2Router02(_pancakeRouter);
    //biswapFactory = _biswapFactory;
  }
  
  function startArbitrage(
    address factory,
    address router,
    //////////////////
    address token0, //pass both token addresses
    address token1, 
    uint amount0, //one is zero
    uint amount1, // other is the flashloan amount
    bool _authorize
  ) external {
    pancakeFactory = factory; 
    biswapRouter = IUniswapV2Router02(router);
    authorize = _authorize;
    address pairAddress = IUniswapV2Factory(pancakeFactory).getPair(token0, token1);
    tokenPair = pairAddress;
    require(pairAddress != address(0), 'This pool does not exist');
    //
    uint borrowAmount = (amount0 == 0) ? amount0 : amount1;
    address borrowToken = (amount0 == 0) ? token0 : token1;
    bytes memory data = abi.encode(borrowAmount,borrowToken);
    //
    IUniswapV2Pair(pairAddress).swap(
      amount0, 
      amount1, 
      address(this), 
      data
      //bytes('flashloan'),
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
    emit Log("msg.sender of FL", msg.sender);
    bytes memory data = abi.decode(borrowAmount,borrowToken);
    emit Log("_data of FL", _data);

    if (authorize == true)
      {
      require(
        msg.sender == tokenPair,  //UniswapV2Library.pairFor(pancakeFactory, token0, token1), 
        'Unauthorized Call'
      ); 
      require(_sender == address(this), "only AF Contract v2.1 may initiate");
      }

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
