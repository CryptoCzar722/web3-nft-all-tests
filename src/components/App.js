//sibm token address
//0xf39Bf099716516B1200d4876E07D810337dbb893

// bitbucket app password
//pJb8kJ2gxdKfHzDubQdk
//not needed?
//import { BscConnector } from '@binance-chain/bsc-connector'
//old apis. work arounds with current apis seem to be good
//import etherscan-api from 'etherscan-api';
//import axios from "axios";
//import Tx from ('ethereumjs-tx').Transaction
//
//import Token from '../abis/Token.json'
//import EthSwap from '../abis/EthSwap.json'


import React, { Component } from 'react'
import Web3 from 'web3'
//environment variable storage
import {CHECK_SUM} from './RegisterMap'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

//import Axios from 'Axios';
//const https = require("https");
//const axios = require("axios");
//var xhr = new XMLHttpRequest();
//const express = require('express');
//const app = express();
//var cors = require('cors')

const ethers = require('ethers');

var apiEth = require('etherscan-api').init('MG6DXYGV5GKX25REQ5RD4DX7VE3XH454CP', 'ropsten');
//var apiBsc = require('bscscan-api').init('MTSGA1HKX331WIATG1GGIPQQUV7A4ABSXW', 'mainnet');
//use to save all token pairs
//var fs = require('fs');
//1. Import coingecko-api
//const CoinGecko = require('coingecko-api');
//2. Initiate the CoinGecko API Client
//const CoinGeckoClient = new CoinGecko();
//3. Make calls
//var func = async() => {
//  let data = await CoinGeckoClient.ping();};
 //API's
    /*
    var balance = api.account.balance(accounts[0]);
    balance.then(function (balanceData) {
    console.log("BNB balance BSC Scan - ", balanceData);
    });
    //COINGECKO
    let daiData = await CoinGeckoClient.coins.fetchCoinContractInfo('0x1f9840a85d5af5bf1d1762f925bdaddc4201f984');
    console.log("contract Coin gecko - ", daiData.data.name)
    */

class App extends Component {
  async componentWillMount() 
      {
      console.log("loading");
      //this.setState({ loading: true })
      await this.loadWeb3()
      //await this.loadBlockchainData()
      await this.LoadTokens();
      //await this.checkWalletChanged()
      //this.setState({ loading: false })  
      console.log("done");
    }

  async loadWeb3() 
  {
        if (window.ethereum) 
          {
          window.web3 = new Web3(window.ethereum)      
          //console.log("window.ethereum")
          const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
          //const ethersProvider = new ethers.providers.JsonRpcProvider(window.ethereum)
          const etherSigner = ethersProvider.getSigner()
          await window.ethereum.enable()
          this.setState({ethersProvider : ethersProvider})
          this.setState({etherSigner : etherSigner})
          }
          
        /*else if (window.web3) {
          console.log("window.web3.cuurentProvider")
          window.web3 = new Web3(window.web3.currentProvider)
        }*/
        else {
          //let ethereum = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
         /*
          https://data-seed-prebsc-2-s1.binance.org:8545/
          https://data-seed-prebsc-1-s2.binance.org:8545/
          https://data-seed-prebsc-2-s2.binance.org:8545/
          https://data-seed-prebsc-1-s3.binance.org:8545/
          https://data-seed-prebsc-2-s3.binance.org:8545/
          */
         // window.web3 = new Web3(ethereum)      
          //console.log("window.ethereum")
         /* const ethersProvider = new ethers.providers.Web3Provider(ethereum)
          //const ethersProvider = new ethers.providers.JsonRpcProvider(window.ethereum)
          const etherSigner = ethersProvider.getSigner()
          await window.ethereum.enable()
          this.setState({ethersProvider : ethersProvider})
          this.setState({etherSigner : etherSigner})*/
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
          }
      const web3 = window.web3
      const bsChain = web3.eth 
      
      this.setState({bsChain : bsChain});
      //TAG 11/22
      const accounts = await bsChain.getAccounts()
      this.setState({ account: accounts[0] })
      let bnbBalance = await bsChain.getBalance(this.state.account) ;
      this.setState({bnbBalance : window.web3.utils.fromWei(bnbBalance, 'ether').toString()});
      
      //this.setState({ loading: false })

      /*
      //Load all contracts that are needed 
                               //Pancake                                    - Baby                                        - Biswap
      const factAddrSwap = ['0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da', '0x858E3312ed3A876947EA49d572A7C42DE08af7EE']//'0x381fEfaDAB5466BFf0e8e96842e8e76A143E8F73'] 
      const routerAddrSwap = ['0x10ED43C718714eb63d5aA57B78B54704E256024E', '0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd', '0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8']//'0x7f1F846bc6B252bDEE65f61491A879f0AD7ee926']
      const factABI = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[],"name":"INIT_CODE_PAIR_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]  
      const routerABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
      const pairABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
      let bUsdAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
      bUsdAddress = web3.utils.toChecksumAddress(bUsdAddress);
      let bnbAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
      bnbAddress = web3.utils.toChecksumAddress(bnbAddress);

      const PancakeFactory = bsChain.Contract(factABI,factAddrSwap[0]);
      const BabyFactory    = bsChain.Contract(factABI,factAddrSwap[1]);
      const BiswapFactory   = bsChain.Contract(factABI,factAddrSwap[2]);
      
      const PancakeRouter  = bsChain.Contract(routerABI,routerAddrSwap[0]);
      const BabyRouter     = bsChain.Contract(routerABI,routerAddrSwap[1]);
      const BiswapRouter    = bsChain.Contract(routerABI,routerAddrSwap[2]);
      //main pair on main exchange
      let pairBnb_Usd = await PancakeFactory.methods.getPair(bUsdAddress, bnbAddress).call();
      let pairBnb_UsdBiswap = await BiswapFactory.methods.getPair(bUsdAddress, bnbAddress).call();
      let pairBnb_UsdBaby = await BabyFactory.methods.getPair(bUsdAddress, bnbAddress).call();
      //arbitrage
      let BwEthAddress = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";
      let pairEth_Usd = await PancakeFactory.methods.getPair(bUsdAddress, BwEthAddress).call();
      let pairEth_UsdBiswap = await BiswapFactory.methods.getPair(bUsdAddress, BwEthAddress).call();
      let pairEth_UsdBaby = await BabyFactory.methods.getPair(bUsdAddress, BwEthAddress).call();
      
      const btcbAddress = "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c";
      let pairBtcb_Usd = await PancakeFactory.methods.getPair(bUsdAddress, btcbAddress).call();
      let pairBtcb_UsdBiswap = await BiswapFactory.methods.getPair(bUsdAddress, btcbAddress).call();
      let pairBtcb_UsdBaby = await BabyFactory.methods.getPair(bUsdAddress, btcbAddress).call();
      //new 12 - 15
      //to do
      const dogeAddress = "0xba2ae424d960c26247dd6c32edc70b295c744c43";
      const adaAddress= "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47";
      const ltcAddress = "0x4338665cbb7b2485a8855a139b75d5e34ab0db94";
      let pairAda_Usd = await PancakeFactory.methods.getPair(bUsdAddress, adaAddress).call();
      let pairAda_UsdBiswap = await BiswapFactory.methods.getPair(bUsdAddress, adaAddress).call();
      let pairLtc_Usd = await PancakeFactory.methods.getPair(bUsdAddress, ltcAddress).call();
      let pairLtc_UsdBiswap = await BiswapFactory.methods.getPair(bUsdAddress, ltcAddress).call();
      let pairDoge_Usd = await PancakeFactory.methods.getPair(bUsdAddress, dogeAddress).call();
      let pairDoge_UsdBiswap = await BiswapFactory.methods.getPair(bUsdAddress, dogeAddress).call();
      //
      const BnbUsdContract = await bsChain.Contract(pairABI, pairBnb_Usd);
      const BnbUsdContractBiswap = await bsChain.Contract(pairABI, pairBnb_UsdBiswap);
      const BnbUsdContractBaby = await bsChain.Contract(pairABI, pairBnb_UsdBaby);

      const EthUsdContract = await bsChain.Contract(pairABI, pairEth_Usd);
      const EthUsdContractBiswap = await bsChain.Contract(pairABI, pairEth_UsdBiswap);

      const BtcbUsdContract = await bsChain.Contract(pairABI, pairBtcb_Usd);
      const BtcbUsdContractBiswap = await bsChain.Contract(pairABI, pairBtcb_UsdBiswap);
      //new 12 - 15
      const AdaUsdContract = await bsChain.Contract(pairABI, pairAda_Usd);
      const AdaUsdContractBiswap = await bsChain.Contract(pairABI, pairAda_UsdBiswap);
      const LtcUsdContract = await bsChain.Contract(pairABI, pairLtc_Usd);
      const LtcUsdContractBiswap = await bsChain.Contract(pairABI, pairLtc_UsdBiswap);
      const DogeUsdContract = await bsChain.Contract(pairABI, pairDoge_Usd);
      const DogeUsdContractBiswap = await bsChain.Contract(pairABI, pairDoge_UsdBiswap);
      
      //arbitrage bot
      this.setState({pairBnb_Usd : pairBnb_Usd});
      this.setState({pairBnb_UsdBiswap : pairBnb_UsdBiswap});
      this.setState({pairBnb_UsdBaby : pairBnb_UsdBaby});

      this.setState({pairEth_Usd : pairEth_Usd});
      this.setState({pairEth_UsdBiswap : pairEth_UsdBiswap});
      this.setState({pairEth_UsdBaby : pairEth_UsdBaby});

      this.setState({pairBtcb_Usd : pairBtcb_Usd});
      this.setState({pairBtcb_UsdBiswap : pairBtcb_UsdBiswap});
      this.setState({pairBtcb_UsdBaby : pairBtcb_UsdBaby});

      this.setState({pairAda_Usd : pairAda_Usd});
      this.setState({pairAda_UsdBiswap : pairAda_UsdBiswap});

      this.setState({pairLtc_Usd : pairLtc_Usd});
      this.setState({pairLtc_UsdBiswap : pairLtc_UsdBiswap});

      this.setState({pairDoge_Usd : pairDoge_Usd});
      this.setState({pairDoge_UsdBiswap : pairDoge_UsdBiswap});

      //
      this.setState({BnbUsdContract : BnbUsdContract});
      this.setState({BnbUsdContractBiswap : BnbUsdContractBiswap});
      this.setState({BnbUsdContractBaby : BnbUsdContractBaby});
      //
      this.setState({EthUsdContract : EthUsdContract});
      this.setState({EthUsdContractBiswap : EthUsdContractBiswap});
      //
      this.setState({BtcbUsdContract : BtcbUsdContract});
      this.setState({BtcbUsdContractBiswap : BtcbUsdContractBiswap});

      this.setState({AdaUsdContract : AdaUsdContract});
      this.setState({AdaUsdContractBiswap : AdaUsdContractBiswap});

      this.setState({LtcUsdContract : LtcUsdContract});
      this.setState({LtcUsdContractBiswap : LtcUsdContractBiswap});

      this.setState({DogeUsdContract : DogeUsdContract});
      this.setState({DogeUsdContractBiswap : DogeUsdContractBiswap});
      
      //
      this.setState({PancakeFactory : PancakeFactory});
      this.setState({BiswapFactory : BiswapFactory});
      this.setState({BabyFactory : BabyFactory});
      //
      this.setState({FactoryContracts :this.state.FactoryContracts.concat([PancakeFactory])})
      this.setState({FactoryContracts :this.state.FactoryContracts.concat([BabyFactory])})
      this.setState({FactoryContracts :this.state.FactoryContracts.concat([BiswapFactory])})
      //
      this.setState({PancakeRouter : PancakeRouter});
      this.setState({BiswapRouter: BiswapRouter});
      this.setState({BabyRouter : BabyRouter});
      //
      this.setState({RouterContracts :this.state.RouterContracts.concat([PancakeRouter])})
      this.setState({RouterContracts :this.state.RouterContracts.concat([BabyRouter])})
      this.setState({RouterContracts :this.state.RouterContracts.concat([BiswapRouter])})
        //TAG fix
        let accCheck = localStorage.getItem('AccountAddress')
        if (accCheck === null || accCheck === "")
          {
          localStorage.setItem('AccountAddress', "");
          }
       */   
          //axios.get("https://api.pancakeswap.info/api/v2/summary").then(response=>{console.log(response)}).catch(error=>{
          //  console.log("ERROR",error);
          //  });
          /*var url = "https://api.pancakeswap.info/api/v2/summary";
          xhr.open("GET", url);

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
            }};
          xhr.send();*/

          /*axios.get('https://api.pancakeswap.info/api/v2/summary').then(result=>{
            console.log(result);
          }).catch(error =>{
            console.log(error);
          })*/
  /*  https.get('https://api.pancakeswap.info/api/v2/summary', (response) =>{
            let data = ''
            response.on(data,(chunk) => {
              data += chunk;
            });
          
            response.on('end', ()=>{
              console.log("HTTPS =>", data);
            })
          }).on('error', (error)=>{
            console.log(error);
          })*/
  }

  async checkWalletChanged()
  {
    window.ethereum.on("accountsChanged", accounts => {
       if (accounts.length > 0) 
          {
          this.setState({account: accounts[0] });
          this.getAccountBalance()
          }
         else this.setState({account: ""});
    });
  }

  async connectWallet(){
   /* const web3 = window.web3
    const bsChain = web3.eth
    this.setState({ loading: true })
    //TAG needs work
    let acc// = localStorage.setItem('AccountAddress');
    if (this.state.connectionString === "Connect")
      {
      await bsChain.getAccounts().then(function(accounts){
        acc = accounts[0];
        window.confirm("Connect - ", acc);
      });
      console.log("Account connect -", this.state.account)
      //this.setAccountAddres(acc)
      this.setState({connectionString : "Disconnect"})
      }
    else 
      {
      this.setAccountAddres("")
      this.setState({connectionString : "Connect"})
      }
    
      //this.loadBlockchainData();
    
    //this.refreshPage();
    this.setState({ loading: false })*/
  }


  async setPrivateKey(privKey)
    {
    this.setState({ privateKey: privKey })
    localStorage.setItem('privateKey', privKey)
    }
  
  async setAccountAddres(address)
    {
    this.setState({ account: address })
    localStorage.setItem('AccountAddress', address)
    }
  
  async getAccountBalance()
  {
    //const accounts = await bsChain.getAccounts()
    //this.setState({ account: accounts[0] })
    const bnbBalance = await window.web3.eth.getBalance(this.state.account)
    this.setState({ bnbBalance : window.web3.utils.fromWei(bnbBalance, "Ether") })
    console.log('BNB balance -', window.web3.utils.fromWei(bnbBalance, "Ether"))
  }

  async refreshPage() {
    window.location.reload(false);
  }

 
  async LoadGasFees()
  {
  const web3 = window.web3
  const bsChain = web3.eth 
  let gas = await bsChain.getGasPrice();
  gas  = bsChain.utils.fromWei(new bsChain.utils.BN(gas).toString(), 'ether')
  //console.log("Gas BNB", gas)
  //console.log("Gas USD", this.state.ethPrice * gas)
  this.setState({gasPrice : this.state.ethPrice * gas});  
  }

  async LoadTokens()
    {
     /* const ethAddress = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";
      const btcbAddress = "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c";
      const bnbAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
      //to do
      const dogeAddress = "0xba2ae424d960c26247dd6c32edc70b295c744c43";
      const adaAddress= "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47";
      const daiAddress = "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3";
      const ltcAddress = "0x4338665cbb7b2485a8855a139b75d5e34ab0db94";*/
      
      // TAG Testnet busd and sibm
      const busdAddress = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";// "0xe9e7cea3dedca5984780bafc599bd69add087d56";
      const sibmAddress = "0x983Bd79E9c57Dd3A87a1de98b9996fD1672768B2";

    const web3 = window.web3
    const bsChain = web3.eth
    const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_burner","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
    
    //const bnbContract = new bsChain.Contract(abi, bnbAddress);
    //const ethContract = new bsChain.Contract(abi, ethAddress);
    //const btcbContract = new bsChain.Contract(abi, btcbAddress);
    //new 12-15
    //const adaContract = new bsChain.Contract(abi, adaAddress);
    //const ltcContract = new bsChain.Contract(abi, ltcAddress);
    //const dogeContract = new bsChain.Contract(abi, dogeAddress);
    //const daiContract = new bsChain.Contract(abi, daiAddress);
    // TAG
    const busdContract = new bsChain.Contract(abi, busdAddress);
    const sibmContract = new bsChain.Contract(abi, sibmAddress);


    //this.setState({ token })
    if (this.state.account !== null)
      {
      //let bnbBalance = await bnbContract.methods.balanceOf(this.state.account).call()
      //let bnbBalance = await bsChain.getBalance(this.state.account) //.call();
      //let ethBalance = await ethContract.methods.balanceOf(this.state.account).call()
      //let btcbBalance = await btcbContract.methods.balanceOf(this.state.account).call()
      //let daiBalance = await daiContract.methods.balanceOf(this.state.account).call()
      let busdBalance = await busdContract.methods.balanceOf(this.state.account).call()
      let sibmBalance = await sibmContract.methods.balanceOf(this.state.account).call()
      //console.log("busdBalance", busdBalance);
      //console.log("sibmBalance", sibmBalance);
      //let adaBalance = await adaContract.methods.balanceOf(this.state.account).call()
      //let ltcBalance = await ltcContract.methods.balanceOf(this.state.account).call()
      //let dogeBalance = await dogeContract.methods.balanceOf(this.state.account).call()
      
      //this.setState({ adaBalance : window.web3.utils.fromWei(adaBalance.toString(), 'ether')})
      //this.setState({ ltcBalance : window.web3.utils.fromWei(ltcBalance.toString(), 'ether')})
      //this.setState({ dogeBalance : window.web3.utils.fromWei(dogeBalance.toString(), 'ether')})
      //this.setState({ bnbBalance : window.web3.utils.fromWei(bnbBalance.toString(), 'ether')})
      //this.setState({ ethBalance : window.web3.utils.fromWei(ethBalance.toString(), 'ether')})
      //this.setState({ btcbBalance : window.web3.utils.fromWei(btcbBalance.toString(), 'ether')})
      //this.setState({ daiBalance : window.web3.utils.fromWei(daiBalance.toString(), 'ether')})
      this.setState({ busdBalance : window.web3.utils.fromWei(busdBalance.toString(), 'ether')})
      this.setState({ sibmBalance : window.web3.utils.fromWei(sibmBalance.toString(),'ether')})
      //console.log("this.state.busdBalance", this.state.busdBalance);
      //console.log("this.state.sibmBalance", this.state.sibmBalance);

      }
  }

  async loadBlockchainData() 
    {
    // TAG Irrevelant ATM
    //console.log('Check Sum -', CHECK_SUM);
    const web3 = window.web3
    //Eth is the platform, since binance smart chain mirrors ether the api is the same
    //cast web3.eth to better naming convention for BSchain 
    const bsChain = web3.eth
    //switch case to display chain based on hex representation
    const chainID = window.web3.givenProvider.chainId;
    console.log("Chain ID - ", chainID);
    //TAG add back later
    /*if (chainID !== "0x38")
      { 
      this.setState({ loading: 0xEE });
      return; 
      }*/ 
   
   
      /*
    //Wallet payment method, I.E the chain connected
    switch(chainID)
      {
        //etc
        case 0x61:
          const bsChain = web3.eth
          break;
        case 0x1:  
          const ethChain = web3.eth
          break;
        case 0x:
          const polyChainL2 = web3.eth
          break;
        case 0x:  
          const arbitrumChainL2 = web3.eth
          break;
        }
      */
    //97 - 0x61 for testnet
    //56- 0x38 for main net
    
    //TAG 11/22
    const accounts = await bsChain.getAccounts()
    this.setState({ account: accounts[0] })
    //console.log("Account -", this.state.account)
    //console.log("Account before ", this.state.account)
   /*if (this.state.account !== null)
      {
      const etherBalance = await bsChain.getBalance(this.state.account)
      this.setState({ ethBalance : window.web3.utils.fromWei(etherBalance, "Ether") })
      console.log('BNB balance -', window.web3.utils.fromWei(etherBalance, "Ether"))
      }*/

    this.LoadTokens();  
    //  pancakeswap v2 factory contract
    //  testnet 
    //  '0x6725F303b657a9451d8BA641348b6761A6CC7a17'
    //PancakeSwap         //Pancake                                   - Baby                                        - Biswap
    //const factAddrSwap    = ['0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da', '0x381fEfaDAB5466BFf0e8e96842e8e76A143E8F73'] 
    //const routerAddrSwap  = ['0x10ED43C718714eb63d5aA57B78B54704E256024E', '0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd', '0x7f1F846bc6B252bDEE65f61491A879f0AD7ee926']
    //const factABI         = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[],"name":"INIT_CODE_PAIR_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]  
    //const routerABI       = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
    const pairABI         = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    const BUSD_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_burner","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]

    let factContract = []; 
    let routerContract = [];
    let pairCount = [];
    factContract.length = 3 
              
    for (let i =0; i < this.state.FactoryContracts.length; i++)
      {
      factContract[i] = this.state.FactoryContracts[i]//new bsChain.Contract( factABI, factAddrSwap[i]);
      routerContract[i] = this.state.RouterContracts[i]//new bsChain.Contract( routerABI, routerAddrSwap[i]);
      //pairCount[i] = await factContract[i].methods.allPairsLength().call()//.tokenCount().call()
      pairCount[i] = await this.state.FactoryContracts[i].methods.allPairsLength().call()
      console.log(i, "# of Pairs: ",pairCount[i].toNumber())
      }
    //clean addresses up,  'A' and 'a' checksum differently
    let bUsdAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
    let bUsdcAddress = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
    bUsdAddress = web3.utils.toChecksumAddress(bUsdAddress);
    let bnbAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
    bnbAddress = web3.utils.toChecksumAddress(bnbAddress);
    //
    for (let i =0; i < this.state.FactoryContracts.length; i++)
      {
      let pairBnb_Usd = await factContract[i].methods.getPair(bUsdAddress, bnbAddress).call();
      let pairContract = await bsChain.Contract(pairABI, pairBnb_Usd);
      let pairReserves = await pairContract.methods.getReserves().call() ;
      //function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
      //neither is accurate....... Well not 100% accruate maybe 6/10 coins
      //With router
      //let bnbPrice = await routerContract[i].methods.getAmountOut('1',pairReserves._reserve0.toString(),pairReserves._reserve1.toString()).call()
      //calculating ourselves
      let bnbPrice = (pairReserves._reserve1.toString() / (10 ** 18)) / (pairReserves._reserve0.toString()/ (10 ** 18));
      //factAddrSwap[i]
      console.log(pairBnb_Usd, "BNB price - ", parseFloat(bnbPrice).toFixed(3));
      if (i === 0)
        {
        this.setState({ethPrice: parseFloat(bnbPrice).toFixed(3)});
        }
      }

    //api
    let EtherScanPrice = await apiEth.stats.ethprice();
    EtherScanPrice = EtherScanPrice.result.ethusd;
    console.log("ETH price - ",parseFloat(EtherScanPrice).toFixed(3))
    
    //const 
    //let coinsListPancake = [] 
    let d = Date.now();
    //console.log(d);

    const getTokenName= async (abi,address) => {
      let tokenName = ""
      let tokenSymbol = ""
      let MyContract = new bsChain.Contract(abi,address);
      await MyContract.methods.name().call()
      .then(function(res) {
      tokenName = res;
      })
      tokenSymbol = await MyContract.methods.symbol().call();
      console.log(tokenName + " (" + tokenSymbol +")" ) ; 
      } 
      //iterate exchanges factories
    //iterate through exchanges currently we have 3
    /*let pairLength = []  
    for(let j = 0; j < 3; j++) 
      { 
        
        pairLength[j] = await factContract[j].methods.allPairsLength().call()
        //console.log("EX (",j,") ", pairLength[j].toNumber());
        
        //iterate through exchange pairs 
                        //pairLength[j]
      for(let i = 0; i < 1; i++)
        { 
        //pair ex. USD/ETH
        const pairAddress = await factContract[j].methods.allPairs(i).call()
        const pairContract = await bsChain.Contract(pairABI, pairAddress);
        let pairToken0 = await pairContract.methods.token0.call() 
        pairToken0 = web3.utils.toChecksumAddress(pairToken0)
        let pairToken1 = await pairContract.methods.token1.call() 
        pairToken1 = web3.utils.toChecksumAddress(pairToken1)
        if (pairToken0 === bUsdAddress)
          {
          //this.setState({PairContracts :  this.state.RouterContracts.concat([PancakeRouter])})
          getTokenName(BUSD_ABI,pairToken1);
          let pairReserves = await pairContract.methods.getReserves().call() 
          let Price = (pairReserves._reserve0.toString() / (10 ** 18)) / (pairReserves._reserve1.toString()  / (10 ** 18));
          if (Price < 1000)
            {
            //console.log(pairToken1, "1 Pair #",i, " $", parseFloat(Price).toFixed(18));  
            }
          //console.log("Reserve0 - ", pairReserves._reserve0.toString()," Reserve1 - ", pairReserves._reserve1.toString());
          }
        else if(pairToken1 === bUsdAddress)
          {
          getTokenName(BUSD_ABI,pairToken0);
          let pairReserves = await pairContract.methods.getReserves().call() 
          let Price = (pairReserves._reserve1.toString() / (10 ** 18))  / (pairReserves._reserve0.toString() / (10 ** 18))  ;
          //console.log("Reserve0 - ", pairReserves._reserve1.toString()," Reserve1 - ", pairReserves._reserve0.toString());
          if (Price < 1000)
            {
            //console.log(pairToken0, "0 Pair #",i, " $", parseFloat(Price).toFixed(18));  
            }
          }
        }
    }*/
    let d2 = Date.now();
    console.log("Start Up Time - ",(d2 - d)/ 1000, "s"); 
    
    //Gas prices are in ether so we need ETH/USD price to display correct gas in USD
    //TAG
    //EX TODO
    // 0.000000005 
    //console.log("EGas price USD = ", Ethprice.result.ethusd * 0.000000005)
    //console.log("BGas price USD = ", bnbPrice * 0.000000005)

    this.LoadGasFees();
    //this.setState({ loading: false })

}

async getTokenName(abi,token0,token1){
    const web3 = window.web3
    const bsChain = web3.eth 
    /////////////////////////
    let tokenName = ""
    let tokenSymbol = ""
    let tokenName1 = ""
    let tokenSymbol1 = ""

    let MyContract = new bsChain.Contract(abi,token0);
    await MyContract.methods.name().call()
    .then(function(res) {
    tokenName = res;
    })
    tokenSymbol = await MyContract.methods.symbol().call();
    //
    let MyContract1 = new bsChain.Contract(abi,token1);
    await MyContract1.methods.name().call()
    .then(function(res) {
    tokenName1 = res;
    })
    
    tokenSymbol1 = await MyContract1.methods.symbol().call();
    const d = new Date();
    let date = d.toLocaleTimeString();
    //Make into arrays
    //this.setState({pairDataTime :this.state.pairDataTime.concat([date])})
    this.setState({pairDataTime: date});
    this.setState({pairDataT0: tokenName});
    this.setState({pairDataT1: tokenName1});
    
    console.log(tokenName+ " (" + tokenSymbol +")  / " + tokenName1 + " (" + tokenSymbol1 +")"); 
    }
//Needs some work
  async SniperBot(Stop_Start){
    console.log("Bot State", this.state.BotActive)
    const factAddrSwap = ['0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da', '0x381fEfaDAB5466BFf0e8e96842e8e76A143E8F73'] 
    
    if (this.state.BotActive == false)//&& this.state.factoryPancakeSniper === false)
      {
      const factoryPancakeSniper = new ethers.Contract(
        factAddrSwap[0],
        [
            'event PairCreated(address indexed token0, address indexed token1, address pair, uint)',
            'function getPair(address tokenA, address tokenB) external view returns (address pair)'
        ],
        this.state.ethersProvider
      );
      this.setState({factoryPancakeSniper})
      const filter = factoryPancakeSniper.filters.PairCreated();
      const TOKEN_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_burner","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
      console.log('Starting Sniper');
      //activate
        factoryPancakeSniper.on(filter, async (token0, token1, pairAddress) => {
          let count = this.state.newPairCount + 1;
          this.setState({newPairCount : count})
          console.log("New Pair #",this.state.newPairCount, " [" + pairAddress +"] Tokens: [" + token0 + "]  [" + token1 + "]")
          this.getTokenName(TOKEN_ABI,token0, token1);
          //getTokenName(TOKEN_ABI,token1);
        })
        this.setState({BotActive : true})
      }
      else if (this.state.BotActive == true)
      {
        console.log("Stopping Sniper");
        this.setState({factoryPancakeSniper : false});
        this.state.factoryPancakeSniper.removeAllListeners("PairCreated");
        this.setState({BotActive : false})
      }
  }

  async priceFromSwapEvent(event){
    let token0AmountBigDecimal = event.args.amount0In;
    if (token0AmountBigDecimal.eq(0)) {
      token0AmountBigDecimal = event.args.amount0Out;
    }
  
    let token1AmountBigDecimal = event.args.amount1In;
    if (token1AmountBigDecimal.eq(0)) {
      token1AmountBigDecimal = event.args.amount1Out;
    }
    const token0AmountFloat = parseFloat(
      ethers.utils.formatUnits(token0AmountBigDecimal,18)
    );
    const token1AmountFloat = parseFloat(
    ethers.utils.formatUnits(token1AmountBigDecimal, 18)
    );
    if (token1AmountFloat > 0) {
      let priceOfToken0InTermsOfToken1 = token1AmountFloat / token0AmountFloat;
      priceOfToken0InTermsOfToken1 = parseFloat(priceOfToken0InTermsOfToken1).toFixed(2)
      return {priceOfToken0InTermsOfToken1, token0AmountFloat}
    }
  }

  async getTokenSymbol(address){
    const web3 = window.web3
    const bsChain = web3.eth 
    const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_burner","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
    //let tokenName = ""
    let tokenSymbol = ""
    let MyContract = new bsChain.Contract(abi,address);
    //await MyContract.methods.name().call()
    //.then(function(res) {
    //tokenName = res;
    //})
    tokenSymbol = await MyContract.methods.symbol().call();
    //console.log(tokenName + " (" + tokenSymbol +")" ) ; 
    return tokenSymbol;
    } 

  async setSwapPair(token0, token1)
  {
    const web3 = window.web3
    const bsChain = web3.eth 
    token0 = web3.utils.toChecksumAddress(token0);
    token1 = web3.utils.toChecksumAddress(token1);

    let pairAddr = await this.state.PancakeFactory.methods.getPair(token0, token1).call();
    const pairABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    const swapPair = await bsChain.Contract(pairABI, pairAddr)
    this.setState({swapPair})

  }

  //TAG do inputs : TBD
 async swapTokens(amountIn0,prmToken0, prmToken1){ //pairAddres token0, token1, 
  const web3 = window.web3
  const bsChain = web3.eth 
  let bnbAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
  bnbAddress = web3.utils.toChecksumAddress(bnbAddress);
  //The quote currency needs to be WBNB (we will pay with WBNB)
  prmToken0 = web3.utils.toChecksumAddress(prmToken0);
  prmToken1 = web3.utils.toChecksumAddress(prmToken1);

  let sym0 = await this.getTokenSymbol(prmToken0);
  let sym1 = await this.getTokenSymbol(prmToken1);
  //tag old
  /*if ((bnbAddress !== prmToken0) ||(bnbAddress !== prmToken1))
    {
    window.alert("You must have BNB as one pair");
    return 0;
    }*/

  let token0 = prmToken0
  let token1 = prmToken1
  let pairAddr = await this.state.PancakeFactory.methods.getPair(token0, token1).call();

  console.log(`
      New swap
      =================
      token0 ${sym0}: ${token0}
      token1 ${sym1}: ${token1}
      pairAddress: ${pairAddr}
    `);

    let tokenIn, tokenOut;
    tokenIn = token0;
    tokenOut = token1;
    // tag old programmatically limiting trades to wbnb pairs
    /*if(token0 === bnbAddress) {
      tokenIn = token0; 
      tokenOut = token1;
    }
    if(token1 === bnbAddress) {
      tokenIn = token1; 
      tokenOut = token0;
    }*/
  
    if(typeof tokenIn === 'undefined') {
      return;
    }
  
    //We buy for 0.1 BNB of the new token
    //ethers was originally created for Ethereum, both also work for BSC
    //'ether' === 'bnb' on BSC
    const amountIn = amountIn0  //bsChain.utils.toWei(amountIn0, 'ether');
    const amounts = await this.state.PancakeRouter.methods.getAmountsOut(amountIn, [tokenIn, tokenOut]).call();
    //Our execution price will be a bit different, we need some flexbility
    // TAG Figure out slippage math
    const amountOutMin = amounts[1] //.sub(amounts[1].div(33)); //amounts[1].toString() * 0.95 //
    console.log("amount -", amounts[1].toString(), " amountMin -",amountOutMin.toString())
    console.log(`
      Swapping Tokens
      =================
      tokenIn   ${sym0}: (${bsChain.utils.fromWei(amountIn.toString(), 'ether')})  ${tokenIn}
      tokenOut  ${sym1}: (${bsChain.utils.fromWei(amountOutMin.toString(), 'ether')}) ${tokenOut}
    `);
    //TAG sent transaction to router.
    /*const tx = await this.state.PancakeRouter.methods.swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      [tokenIn, tokenOut],
      this.state.address,
      Date.now() + 1000 * 60 * 10 //10 minutes
    ).call();
    const receipt = await tx.wait(); 
    console.log('Transaction receipt');
    console.log(receipt);
    */

  }

  async swapTokensPairPrices(amountIn0,prmToken0, prmToken1,){ //pairAddres token0, token1, 
    const web3 = window.web3
    const bsChain = web3.eth 
    let bnbAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    bnbAddress = web3.utils.toChecksumAddress(bnbAddress);
    //The quote currency needs to be WBNB (we will pay with WBNB)
    prmToken0 = web3.utils.toChecksumAddress(prmToken0);
    prmToken1 = web3.utils.toChecksumAddress(prmToken1);
  
    let sym0 = await this.getTokenSymbol(prmToken0);
    let sym1 = await this.getTokenSymbol(prmToken1);
    //tag old
    /*if ((bnbAddress !== prmToken0) ||(bnbAddress !== prmToken1))
      {
      window.alert("You must have BNB as one pair");
      return 0;
      }*/
  
    let token0 = prmToken0
    let token1 = prmToken1
    let pairAddr = await this.state.PancakeFactory.methods.getPair(token0, token1).call();
  
    console.log(`
        New swap
        =================
        token0 ${sym0}: ${token0}
        token1 ${sym1}: ${token1}
        pairAddress: ${pairAddr}
      `);
  
      let tokenIn, tokenOut;
      tokenIn = token0;
      tokenOut = token1;
      // tag old programmatically limiting trades to wbnb pairs
      /*if(token0 === bnbAddress) {
        tokenIn = token0; 
        tokenOut = token1;
      }
      if(token1 === bnbAddress) {
        tokenIn = token1; 
        tokenOut = token0;
      }*/
    
      if(typeof tokenIn === 'undefined') {
        return;
      }
    
      //We buy for 0.1 BNB of the new token
      //ethers was originally created for Ethereum, both also work for BSC
      //'ether' === 'bnb' on BSC
      const amountIn = amountIn0  //bsChain.utils.toWei(amountIn0, 'ether');
      const amounts = await this.state.PancakeRouter.methods.getAmountsOut(amountIn, [tokenIn, tokenOut]).call();
      //Our execution price will be a bit different, we need some flexbility
      // TAG Figure out slippage math
      const amountOutMin = amounts[1] //.sub(amounts[1].div(33)); //amounts[1].toString() * 0.95 //
      console.log("amount -", amounts[1].toString(), " amountMin -",amountOutMin.toString())
      console.log(`
        Swapping Tokens
        =================
        tokenIn   ${sym0}: (${bsChain.utils.fromWei(amountIn.toString(), 'ether')})  ${tokenIn}
        tokenOut  ${sym1}: (${bsChain.utils.fromWei(amountOutMin.toString(), 'ether')}) ${tokenOut}
      `);
    }

//WORKING
async sendTokens(ethSendAmount , addressTo)
  {
  const accounts = await window.web3.eth.getAccounts()
  const gas = await window.web3.eth.getGasPrice();
  window.web3.eth.sendTransaction({
      from: accounts[0], 
      to: addressTo, 
      value: window.web3.utils.toWei(ethSendAmount, 'ether'), 
      //gas: gas.toString() //gas user sets own gas currently
  })
    .then(function(receipt){
      console.log(receipt);
    });
  }

async updateBaseTokenPrice()
  {
    //add input to get price from different exchange 0 1 2 
    if (!this.state.loading || this.state.ArbBotActive || this.state.BotActive)
      {
      //BNB
      //Pancake
      let pairReserves = await this.state.BnbUsdContract.methods.getReserves().call() ;
      let bnbPricePancake = (pairReserves._reserve1.toString() / (10 ** 18)) / (pairReserves._reserve0.toString()/ (10 ** 18));
      //tag
      this.setState({PancakeArbPrice : bnbPricePancake *0.99});
      //Biswap
      let pairReservesBiswap = await this.state.BnbUsdContractBiswap.methods.getReserves().call() ;
      let bnbPriceBiswap = (pairReservesBiswap._reserve1.toString() / (10 ** 18)) / (pairReservesBiswap._reserve0.toString()/ (10 ** 18));
      //tag
      this.setState({BiswapArbPrice : bnbPriceBiswap *0.99});
      //ETH
      //Pancake
      let pairReservesEth = await this.state.EthUsdContract.methods.getReserves().call() ;
      let ethPricePancake = (pairReservesEth._reserve1.toString() / (10 ** 18)) / (pairReservesEth._reserve0.toString()/ (10 ** 18));
      this.setState({PancakeEthArbPrice : ethPricePancake});
      //Biswap
      let pairReservesBiswapEth = await this.state.EthUsdContractBiswap.methods.getReserves().call() ;
      let ethPriceBiswap = (pairReservesBiswapEth._reserve1.toString() / (10 ** 18)) / (pairReservesBiswapEth._reserve0.toString()/ (10 ** 18));
      //tag
      this.setState({BiswapEthArbPrice : ethPriceBiswap});
      //BTCB
      //Pancake
      let pairReservesBtcb = await this.state.BtcbUsdContract.methods.getReserves().call() ;
      let BtcbPricePancake = (pairReservesBtcb._reserve1.toString() / (10 ** 18)) / (pairReservesBtcb._reserve0.toString()/ (10 ** 18));
      this.setState({PancakeBtcbArbPrice : BtcbPricePancake});
      //Biswap
      let pairReservesBiswapBtcb = await this.state.BtcbUsdContractBiswap.methods.getReserves().call() ;
      let btcbPriceBiswap = (pairReservesBiswapBtcb._reserve1.toString() / (10 ** 18)) / (pairReservesBiswapBtcb._reserve0.toString()/ (10 ** 18));
      this.setState({BiswapBtcbArbPrice : btcbPriceBiswap});
      //ADA
      //Pancake
      let pairReservesAda = await this.state.AdaUsdContract.methods.getReserves().call() ;
      let AdaPricePancake = (pairReservesAda._reserve1.toString() / (10 ** 18)) / (pairReservesAda._reserve0.toString()/ (10 ** 18));
      this.setState({PancakeAdaArbPrice : AdaPricePancake});
      // TAG Biswap doesnt have ADA
      //let pairReservesBiswapAda = await this.state.AdaUsdContractBiswap.methods.getReserves().call() ;
      //let adapriceBiswap = (pairReservesBiswapAda._reserve1.toString() / (10 ** 18)) / (pairReservesBiswapBtcb._reserve0.toString()/ (10 ** 18));
      //this.setState({BiswapBtcbArbPrice : adapriceBiswap});
      //LTC
      //Pancake
      let pairReservesLtc = await this.state.LtcUsdContract.methods.getReserves().call() ;
      let LtcPricePancake = (pairReservesLtc._reserve1.toString() / (10 ** 18)) / (pairReservesLtc._reserve0.toString()/ (10 ** 18));
      this.setState({PancakeLtcArbPrice : LtcPricePancake}); 
      //Biswap
      //let pairReservesBiswapLtc = await this.state.LtcUsdContractBiswap.methods.getReserves().call() ;
      //let ltcPriceBiswap = (pairReservesBiswapLtc._reserve1.toString() / (10 ** 18)) / (pairReservesBiswapLtc._reserve0.toString()/ (10 ** 18));
      //this.setState({BiswapLtcArbPrice : ltcPriceBiswap});
      
      //Pancake
      let pairReservesDoge = await this.state.DogeUsdContract.methods.getReserves().call() ;
      let DogePricePancake = 0;//(pairReservesDoge._reserve1.toString() / (10 ** 18)) / (pairReservesDoge._reserve0.toString()/ (10 ** 18));
      this.setState({PancakeDogeArbPrice : DogePricePancake}); 
      //Biswap
      //let pairReservesBiswapDoge = await this.state.DogeUsdContractBiswap.methods.getReserves().call() ;
      //let dogePriceBiswap = (pairReservesBiswapDoge._reserve1.toString() / (10 ** 18)) / (pairReservesBiswapDoge._reserve0.toString()/ (10 ** 18));
      //this.setState({BiswapDogeArbPrice : dogePriceBiswap});
      //this.setState({PancakeDogeArbPrice : dogePriceBiswap}); 



      //DAI
      //BUSD
      //let pairReservesBaby = await this.state.BnbUsdContractBaby.methods.getReserves().call() ;
      //let bnbPriceBaby = (pairReservesBaby._reserve1.toString() / (10 ** 18)) / (pairReservesBaby._reserve0.toString()/ (10 ** 18));
      const d = new Date();
      let date = d.toLocaleTimeString();
      //console.log(date, " updateBaseTokenPrice - ", parseFloat(bnbPricePancake).toFixed(3), " A: ", parseFloat(bnbPriceBiswap).toFixed(3), " B: ", parseFloat(bnbPriceBaby).toFixed(3));
      this.setState({ethPrice: parseFloat(bnbPricePancake).toFixed(3)});  
      }
  }

  async UpdateSwapPrices()
  {
    //Swap Pair
      //Pancake
      if (!this.state.loading  && this.state.swapPair)
        {
        let swapPairReserves = await this.state.swapPair.methods.getReserves().call() ;
        let swapPairPrice = (swapPairReserves._reserve1.toString() / (10 ** 18)) / (swapPairReserves._reserve0.toString()/ (10 ** 18));
        this.setState({swapPairPrice});
        }
  }

  componentDidMount() 
  {
   // this.interval = setInterval(() => this.updateBaseTokenPrice(), 3000);
   // this.interval = setInterval(() => this.UpdateSwapPrices(), 100);
  }

  constructor(props) {
    super(props)
    this.state = {
      //ethers
      ethersProvider : "",
      etherSigner : "",
      //sniper
      newPairCount : 0,
      pairDataTime: "N/A",
      pairDataT0 : "N/A",
      pairDataT1: "N/A",
      account: localStorage.getItem("AccountAddress"),
      privateKey : localStorage.getItem("privateKey"),
      factoryPancakeSniper : false,
      BotActive : false,
      //Arbitrage 
      ArbBotActive : false,
      //swapping contracts
      swapPair : "",
      swapPairPrice : "",
      //
      pairBnb_Usd : "",
      pairBnb_UsdBiswap : "",
      pairBnb_UsdBaby : "", 
      //Eth
      pairEth_Usd :"",
      pairEth_UsdBiswap :"",
      pairEth_UsdBaby :"",
      //bnb
      pancakeBnbUsdContract : "",
      BiswapBnbUsdContract : "",
      babyBnbUsdContract : "",
      //
      pancakeEthUsdContract : "",
      BiswapEthUsdContract : "",
      babyEthUsdContract : "",
      //
      pancakeBtcbUsdContract : "",
      BiswapBtcbUsdContract : "",
      babyBtcbUsdContract : "",
      //
      //
      PancakeArbPrice : "",
      BiswapArbPrice : "",
      BabyArbPrice : "",

      PancakeEthArbPrice : "",
      BiswapEthArbPrice : "",

      PancakeBtcbArbPrice : "",
      BiswapBtcbArbPrice : "",

      PancakeAdaArbPrice : "",
      BiswapAdaArbPrice : "",

      PancakeDogeArbPrice : "",
      BiswapDogeArbPrice : "",

      PancakeLtcArbPrice : "",
      BiswapLtcArbPrice : "",
      //BabyArbPrice : "",

      //timer : localStorage.getItem("Timer"),
      //token: {},
      bsChain : "",
      FactoryContracts: [],
      RouterContracts: [],
      ///////////////////
      ethBalance: '0',
      busdBalance: '0',
      btcbBalance: '0',
      bnbBalance: '0',
      daiBalance: '0',
      adaBalance : '0',
      ltcBalance : '0',
      dogeBalance : '0',
      sibmBalance : '0',
      ////////////////////
      ethPrice : '0',
      gasPrice : '0',
      loading: false,//true,
      tokenPairs : [],
      connectionString : 'Disconnect',
      PancakeFactory: "",
      BabyFactory: "",
      BiswapFactory: "",
      PancakeRouter: "",
      BabyRouter: "",
      BiswapRouter: "",
      BnbUsdContract : "",
      BnbUsdContractBiswap : "",
      BnbUsdContractBaby : "",
      EthUsdContract: "",
      EthUsdContractBiswap : "",
      BtcbUsdContract: "",
      BtcbUsdContractBiswap : "",
      //new 12 - 15
      AdaUsdContract: "",
      AdaUsdContractBiswap : "",
      LtcUsdContract: "",
      LtcUsdContractBiswap : "",
      DogeUsdContract: "",
      DogeUsdContractBiswap : ""


    }
    //next line is gold, allows app.js stats to be changed from functions called in other forms. DOPE.
    //This is how we will get data for entry into storage (local computer cache / database TBD) local storage.
    this.setAccountAddres = this.setAccountAddres.bind(this);
    this.setPrivateKey = this.setPrivateKey.bind(this);
    //this.connectWallet = this.connectWallet.bind(this);
    this.swapTokens = this.swapTokens.bind(this);
    this.SniperBot = this.SniperBot.bind(this);
    //this.ArbitrageBot = this.ArbitrageBot.bind(this);
    this.setSwapPair = this.setSwapPair.bind(this);
    //this.SetTimer = this.SetTimer.bind(this);
  }
  render() 
    {
    //loadPairs();
    let content
    if(this.state.loading === 0xEE) 
      {
      content = <p id="loader" className="text-center">Please Change to BSC Wallet</p>
      }
    else if(this.state.loading === true) 
      {
      content = <Loader
        type="Oval"
        color="#00BFFF"
        height={250}
        width={250}
        timeout={5000} //100 secs
      />  //<p id="loader" className="text-center">Loading...</p>
      } 
    else 
      {
      content = <Main
        //Sniper
        pairDataTime = {this.state.pairDataTime}
        pairDataT0 = {this.state.pairDataT0}
        pairDataT1 = {this.state.pairDataT1}
        BotActive = {this.state.BotActive}
        SniperBot = {this.SniperBot}
        //Arbitrage
        //ArbitrageBot = {this.ArbitrageBot}
        ArbBotActive = {this.state.ArbBotActive}
        PancakeArbPrice = {this.state.PancakeArbPrice}
        BiswapArbPrice =  {this.state.BiswapArbPrice}
        BabyArbPrice =  {this.state.BabyArbPrice}
        PancakeEthArbPrice = {this.state.PancakeEthArbPrice}
        BiswapEthArbPrice =  {this.state.BiswapEthArbPrice}

        PancakeBtcbArbPrice = {this.state.PancakeBtcbArbPrice}
        BiswapBtcbArbPrice =  {this.state.BiswapBtcbArbPrice}

        PancakeAdaArbPrice = {this.state.PancakeAdaArbPrice}
        BiswapAdaArbPrice =  {this.state.BiswapAdaArbPrice}

        PancakeDogeArbPrice = {this.state.PancakeDogeArbPrice}
        BiswapDogeArbPrice =  {this.state.BiswapDogeArbPrice}

        PancakeLtcArbPrice = {this.state.PancakeLtcArbPrice}
        BiswapLtcArbPrice =  {this.state.BiswapLtcArbPrice}
        //
        account={this.state.account}  
        privateKey={this.state.privateKey}
        /*
        ethBalance={this.state.ethBalance}
        bnbBalance={this.state.bnbBalance}
        btcbBalance={this.state.btcbBalance}
        daiBalance={this.state.daiBalance}
        adaBalance={this.state.adaBalance}
        dogeBalance={this.state.dogeBalance}
        ltcBalance={this.state.ltcBalance}
        */
        busdBalance={this.state.busdBalance}
        sibmBalance={this.state.sibmBalance}
        busdAddress={this.state.busdAddress}
        sibmAddress={this.state.sibmAddress}
        //working
        buyTokens={this.buyTokens}
        //
        swapTokens = {this.swapTokens}
        swapPairPrice = {this.state.swapPairPrice}
        setSwapPair= {this.setSwapPair}
        //needs work
        sendTokens={this.sendTokens}
        //request functions
        //updateBasePrice = {this.updateBaseTokenPrice}

        //
        ethPrice = {this.state.ethPrice}
        gasPrice = {this.state.gasPrice}
        tokenPairs = {this.state.tokenPairs}
        setPrivateKey = {this.setPrivateKey}
      />
      }
    return (

      <div>
        <Navbar account={this.state.account}  connectionString = {this.state.connectionString} connectWallet = {this.connectWallet} loadBlockchainData = {this.loadBlockchainData} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.etherscan.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                {content}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;














 //  Biswapswap factory
    //  '0x381fEfaDAB5466BFf0e8e96842e8e76A143E8F73'
    //  BabySwap
    //  0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da
    //  '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'  
    //  pancakeswap v2 factory contract
    //  mainnet 
    // '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
    //
