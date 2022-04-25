import React, { Component } from 'react'
//import ProgressButton from 'react-progress-button'
import ProgressBar from "@ramonak/react-progress-bar";
import FlipCountdown from '@rumess/react-flip-countdown';

//import { AwesomeButtonProgress } from 'react-awesome-button';
//import AwesomeButtonProgress from 'react-awesome-button/src/components/AwesomeButtonProgress';
//import "./Swap.css"
//import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.css'
 
//TAG FIRST $10 investment
// 0x88ed0A8ff7a40BBafDc338d9e50b6B71628C742C
//Best so far contract
//0x4a06469522989f991391055D8e175Dd591c0600a

/*
<AwesomeButtonProgress
          type="secondary"
          //style = "aws-btn"
          size="medium"
          action={(element, next) => console.log("printing")} //doSomethingThenCall(next)}
        >
          Primary
        </AwesomeButtonProgress>
*/

import sibmLogo from '../sibm-logo.png'
import busdLogo from '../busd-logo.png'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class InvestorForm extends Component {
  constructor(props) {
    super(props)
    //this.onSubmit = this.onSubmit.bind(this)
    this.state = {
    //TAG
    account : "",      //V3.1                                           //V3.0
      presaleAddress : "0x509739e0bb661F3b97ceF75d0552c45b9dc23c3F",      //"0x1532e8FDB5348c630593051E8D1B37d97383AEEE", //"0x60423E74c25c266F03736F23afC0b817880d7275"
      busdAddress : "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
      BusdContract : "",
      PresaleContract : "",
      uinsuranceContract : "",
      contractName : "",
      ps_ABI : [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "airDropBusd",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "airDropToken",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "transactor",
              "type": "address"
            }
          ],
          "name": "ApprovePendingTransaction",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "RequestPresaleBuyIn",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "usdAddress",
              "type": "address"
            }
          ],
          "name": "SetPoolStable",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
            }
          ],
          "name": "SetPoolToken",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "TranfserOwner",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        },
        {
          "inputs": [],
          "name": "BusdBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "confirmedOrders",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "finishBlock",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "depositer",
              "type": "address"
            }
          ],
          "name": "HasPayed",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "insuranceContracts",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "order_id",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "orderBook",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "orderCount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "TokensSold",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "TokenSupply",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "pendingOrder",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "pendingTokenPayment",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "PresaleBusdBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "PresaleTokenBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            }
          ],
          "name": "PresaleTokenBuyRate",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            }
          ],
          "name": "PresaleTokenSellRate",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "startBlock",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "TokenBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ],
      busd_ABI: [{"constant":false,"inputs":[],"name":"disregardProposeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"assetProtectionRole","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"r","type":"bytes32[]"},{"name":"s","type":"bytes32[]"},{"name":"v","type":"uint8[]"},{"name":"to","type":"address[]"},{"name":"value","type":"uint256[]"},{"name":"fee","type":"uint256[]"},{"name":"seq","type":"uint256[]"},{"name":"deadline","type":"uint256[]"}],"name":"betaDelegatedTransferBatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sig","type":"bytes"},{"name":"to","type":"address"},{"name":"value","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"seq","type":"uint256"},{"name":"deadline","type":"uint256"}],"name":"betaDelegatedTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"initializeDomainSeparator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"unfreeze","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newSupplyController","type":"address"}],"name":"setSupplyController","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"target","type":"address"}],"name":"nextSeqOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newAssetProtectionRole","type":"address"}],"name":"setAssetProtectionRole","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"freeze","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newWhitelister","type":"address"}],"name":"setBetaDelegateWhitelister","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"decreaseSupply","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isWhitelistedBetaDelegate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"whitelistBetaDelegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_proposedOwner","type":"address"}],"name":"proposeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"increaseSupply","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"betaDelegateWhitelister","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"proposedOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"unwhitelistBetaDelegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"wipeFrozenAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"EIP712_DOMAIN_HASH","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isFrozen","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"supplyController","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reclaimBUSD","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"currentOwner","type":"address"},{"indexed":true,"name":"proposedOwner","type":"address"}],"name":"OwnershipTransferProposed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldProposedOwner","type":"address"}],"name":"OwnershipTransferDisregarded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"}],"name":"AddressFrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"}],"name":"AddressUnfrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"}],"name":"FrozenAddressWiped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldAssetProtectionRole","type":"address"},{"indexed":true,"name":"newAssetProtectionRole","type":"address"}],"name":"AssetProtectionRoleSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"SupplyIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"SupplyDecreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldSupplyController","type":"address"},{"indexed":true,"name":"newSupplyController","type":"address"}],"name":"SupplyControllerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"seq","type":"uint256"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"BetaDelegatedTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldWhitelister","type":"address"},{"indexed":true,"name":"newWhitelister","type":"address"}],"name":"BetaDelegateWhitelisterSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"newDelegate","type":"address"}],"name":"BetaDelegateWhitelisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldDelegate","type":"address"}],"name":"BetaDelegateUnwhitelisted","type":"event"}] ,
      output: '500',
      tokenPrice : '0',
      token0Img : busdLogo,
      token1Img : sibmLogo,
      token0Balance: this.props.busdBalance, 
      token1Balance: this.props.sibmBalance,
      //
      approved : "0",
      deposited : "",
      pending : "0",
      received : "0"
    }
    this.executeInvestment = this.executeInvestment.bind(this);
  }

  async componentWillMount() {
    this.isComponentMounted = true;
    await this.loadPresaleContract();
    //window.removeEventListener("resize", this.setDivSizeThrottleable);
  };
  async loadPresaleContract()
    {
    const web3 = window.web3
    const bsChain = web3.eth

    const accounts = await bsChain.getAccounts()
    //console.log("accounts :: ", accounts[0]);
    this.setState({account : accounts[0]});
    //console.log("accounts :: ", this.state.account);

    this.state.presaleAddress = web3.utils.toChecksumAddress(this.state.presaleAddress);
    //const PresaleContract = new bsChain.Contract(this.state.ps_ABI, this.state.presaleAddress);
    //this.setState({PresaleContract});
    //let contractName = await PresaleContract.methods.name().call();
    //this.setState({contractName});  
    //let tokenPrice = await PresaleContract.methods.orderBook().call();
    //let insuranceContract = await PresaleContract.methods.orderBook.insuranceContract(this.state.account).call();
    //console.log("insuranceContract ",insuranceContract);
    //console.log("tokenPrice ",this.state.tokenPrice);
    } 

  async executeInvestment(){
    let usd
    usd = this.input.value.toString()
    let usdConv = window.web3.utils.toWei(usd,'ether');
    let result = window.confirm(usd.toString() + " usd for" + usd / this.state.tokenPrice + 'SIBM');
    let appr = await this.state.BusdContract.methods.approve(this.state.presaleAddress,usdConv).send({ from: this.props.account });//.call();
    //console.log("approved :: ", appr, this.props.account);
    
    //let allow = await this.state.BusdContract.methods.allowance(this.props.account, this.state.presaleAddress).call();
    //console.log("allow :: ",allow.toString()); 
    console.log("usdConv :: ", usdConv)//this.state.tokenPrice);
    await this.state.PresaleContract.methods.RequestPresaleBuyIn(usdConv).send({ from: this.props.account });
  }

  render() {
    //
    const busdAddress ="0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
    const sibmAddress = "0x983Bd79E9c57Dd3A87a1de98b9996fD1672768B2";

    /*
    <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    */

    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          this.executeInvestment();
        }}>
        <div className='cardWide'>
                <div className='card-content'>   
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                  }}>
                    <h1> SS BNB Compunder{/*this.state.contractName*/}</h1>
                </div>
        <hr className='hr'/>
          <div className='DivSpace'>
            <h4 className='tLeft'>Contract</h4> 
            <h4 className='tRight' >xxxxxx BNB </h4>
          </div>
        <hr className='hr'/>
          <div className='DivSpace'>
            <h4 className='tLeft'>Wallet </h4>
            <h4 className='tRight' > {this.props.bnbBalance < 1 ? parseFloat(this.props.bnbBalance).toFixed(4) : this.props.bnbBalance >= 1 ?  parseFloat(this.props.bnbBalance).toFixed(2) :  "NaN"} BNB </h4>
          </div>
        <hr className='hr'/>
          <div className="input-group mb-4">
            <input
                type="text"
                onChange={(event) => {
                  const tokenAmount = this.input.value.toString()
                  this.setState({
                    output: tokenAmount // * this.props.swapPairPrice
                  })   
                }}
                ref={(input) => { this.input = input }}
                className="form-control form-control-lg"
                placeholder="1.0"
                required />
              <div className="input-group-append">
                <div className="input-group-text">
                  <img src={this.state.token0Img} height='34' alt=""/>
                  &nbsp;&nbsp;&nbsp; 
                  <select name="sellToken" id="sellToken" ref={(select3) => { this.select3 = select3 }}>
                    <option value="BNB">BNB</option>
                </select>
                </div>
              </div>
            </div>
            <button type="submit" className="btn color-but btn-block btn-lg"> Start Compounding!</button> 
        <FlipCountdown
                hideYear
                hideMonth
                //monthTitle='Months'
                //dayTitle='Days'
                hideDay
                hourTitle='Hours'
                minuteTitle='Minutes'
                secondTitle='Seconds'
                theme = 'dark'
                size='small' // Options (Default: medium): large, medium, small, extra-small.
                //add end date to smart contract
                endAt={'2022-4-24 23:00:00'} // Date/Time
            />
      <hr className='hr'/>
        <div className='DivSpace'>
            <h4 className='tLeft'>Rewards </h4>
            <h4 className='tRight' > {}0 BNB</h4>
          </div>
      <hr className='hr'/>
        <div>
          <button type="submit" className="butInline btn color-but" > Claim Rewards</button> 
          <button type="submit" className="butInline btn color-but"> Re-Compound</button> 
        </div>
    </div>
</div>  

          <div className='cardWide'>
                <div className='card-content'>
                <h2>Breakdown</h2>
                <hr
                    className='hr'
                />
                <text style={{textAlign: 'center'}}>Daily Return    X%</text>
                <h5>Yearly Reurn                   X,XXX%</h5>
                <h5>Dev Fee         X%</h5>
                </div>
          </div>  
   
          <div>
          <a href="https://www.bscscan.com/address/0xE2D26507981A4dAaaA8040bae1846C14E0Fb56bF" target="__blank">
          <img className="distanceImg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADWElEQVRo3u2av3HbMBSHPycunDsXcsWU4gSmJzA9ge0FaHkCyRPEnkDSBOJxActVSjFVylBdOsglOzYq0qUg7FAQSIkU+Cd3/t2pEIgD34cH4AEPhA91S0d1NWzZngP0lOIoFkHSaRBp+A1wCbgFVVdABLwAYSyCVesglu31gQFwB/QrNhMBU2B+iLcqgUiAbxLClBIJNKkCVBrEsr1HYMj2+DelFXAfiyCsBUTOgRng1ASgahKL4MEoiGV7LvBMfV7IUwRc7TPUPu0BMQAWLUBA6v2FZXs7310IkhlObcoh7chCfS6A6AM/gZOWQQC+np6d99fJ8iWvQpFHZrQznPI0sGzvphSInBduA8b5gB2L4OjtB9ySxhSdZnnzZWtoyYrfaWBIxSK4WCfLDaPXyfL36dn5F/QdeQL8WSfLUH2g88iIbg0pVUOdV3Qgd21bukM90s7OB5GTqW/wpREQyl9isN2hWnCs/L82CLAVkS3bGwFjA+33LNtzs/sxdWjdGAKZ6rYVsQgmhtrf0jtIzomuqlZ1GZxRpAWhmbhhSk+qx7Nz5HzPRhJgDrzK/5ekC0S/IQg/FsGjWpgF2deQq1gEkVpo2d6C+r3qxyK41z3YuY1XFOogpH40CWHZ3kCeViuBtCUVwkFZxv8HkIkC0UOzMz8u12ajSoCHWAS+Uv6MJm+QBVm1bXlGIelw2rDJsr0ZmwtKqAN5pSPSpYIkxEApjnQgIWnSrVOSc2KsgVhlg+L7ZC+bEDOgaE+IBfqM5oa96qo1bxBkugPCAX6RnxDciFsqSG6WwqAeSM/pfgHESEL0c6okKJ2+sfzGIvAt2xtT41G3aCsvU1DqyqTTVuZeFxCnHKaECkt5xgu7IACe1AJdQJxQLdseSoBS9xwyrzxm/+S4r7sc0iax5URT870J+khbSRLgG+V2zAnp/NrqqMJsvHwZpGv2CgOSCY5hSYA33cYimOse1HYZqhjfI40FQ6ofwArvS+q81e2RJjOuOTypkXugqgVEzi1XGu8aajaMRXC1q9Kht7ou6WrzdiXdM9kx7OGJSiByuIzYfZduQk+6JEOeSp0QM8ueUyNABFyUgYDu3bNXjlOd+fLh0EBr+lsUl38JO0dTLZGGR8ASg9+ifKhr+gvf9S3/pZ723AAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=" alt="" width="75" height="75" />
          </a>
          <a href="https://twitter.com/BakedBeansMiner" target="__blank">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAD0UlEQVRo3u2aMVbjOBjHf7BTbMF761Ru4247zAnGdNMRLuBJTsBwgiEnAE4A+AKEE+DpttvkBPJ0484UKbbbQjKjcaRYsmNIMf/3eM/Ykvz9pE9fPkmG39ovHey6wTBKAyBWf4GhSA4UpciKvQMJo3QCfAQmwNixWqWgnoBFKbLqXUBUz0+BCw/jt0HdA7ddR6oTSBilU+Aas+v01Ry48R0hL5AwSsfAHZAMAKCrAGalyHLXCn94QCTAM/D3wBAgR3p6NDp+WVerf3YGolzpEfjzDSB0fToaHY/X1eqpN4iCuHtjAF2xC8xWEOVOj+8IocMcrKtVbitgnewqvAqGiUxddWoLAIdbKj3uGQTAo+pgNxA1L5KBjCmAGRCVIjsAToEbQ7nKcC9A/n5tyOhaYZQK7L/WeQ/Iy1JkJqMJozRGhvcCeFBGf7W0EzUzgENDg9MtEEUpslNkOuGrmQ0CoBTZshTZqBTZieqsiy1tbQAeuhTStFAvnWF2B5vmpcic4FX28FV1VmEpNlXlzCBqeMfY9aL14CVwjtmXm3KCUO0WpcjOge8ttkysIMDnlvecNV66AKIWQ73XHmGUXmOZ1DZbmyBJS+VYjZoOUylXi5CZq5fRFn1xKBProfhD86FDA3fASfOm6vUr4Er5b+zYXh/FyMDwM/xq2e02VciweK9GYedytKPWvBTZFfzqWoFDxQXShR6GgPCwo9Zf9YXuWrFDxUSNRDEgiIsdG2UPPSoBjNXQD6mzLpV8QUAmbnGHeq3SgsSbgATA80AjM+laUQcpOsBY0+qOuvAsX9UX+mT3AQFDBtpHYZRe4b8/tqov9BFZejays3W8mhu+owFa57+CqA2xwqORZIeu1XU1mm+ANB84agKIMEqvu07+MErv6BapfklGmyCt+0cGBcgk78J3dBTEtEsHoNZGtTaWui3LXJNyZM6TewAEyDk26QgBcFKKbFn/88FQ4AH7KnGJDHnfkPMp77DWSBSET2c1lesQNpAbZAQJDM/GwC0y+/UFmKh2kx4AtebNG7ZdlC+0r9CWyDmVm9xKpTEx8gAoof8ZSq1cbYC0gyhD/mX4hZGvKuTcKJoPtuVaM9w2Ft5SlzaXtm5ir6vVj6PRcUm/yLJL3Zcim9sebt2NX1er5dHo+PsewLQurVvPR/YAxml/wOnE6h1hnDc5fA9DY2SCNx4YoEJO7HvXCs6HofAaAB6A/xju2GEBnPukPNDvg4ExMpWZ7hDg1hegN4gGFCiYM/xHaYnM7RZ9V5s7/ahG+6CmBvpoMPwFmTEv+35/8lv7rP8Bk+NXaD4vbEEAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAEnRFWHRFWElGOk9yaWVudGF0aW9uADGEWOzvAAAAAElFTkSuQmCC" alt="" width="75" height="75"/>
          </a>
          
          </div>
      </form>



    );
  }
}

export default InvestorForm;


/*
 <span className="float-right text-muted">
            Balance: {parseFloat(this.props.busdBalance).toFixed(2)}
          </span>




<div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          }}>
        SI Contract : {this.state.uinsuranceContract}
        </div>
            <table>
               <thead>
                <tr>
                  <th>BUSD Covered </th>
                  <th width="10" >BUSD in Policy</th>
                </tr>
               </thead>
            <tbody>
            <tr>
              <td> <font color={"green"}> ${parseFloat(window.web3.utils.fromWei(this.state.approved)).toFixed(2) * 2} </font> </td>
              <td><font color={"green"}> ${parseFloat(window.web3.utils.fromWei(this.state.approved)).toFixed(2)} </font></td>   
              </tr>
            </tbody>
            </table> 


<table>
               <thead>
                <tr>
                  <th width="10" >BUSD pending</th>
                  <th>BUSD Approved </th>
                  <th>SIBM Pending </th>
                  <th>SIBM Received </th>
                </tr>
               </thead>
            <tbody>
            <tr>
              <td><font color={"red"}> ${parseFloat(window.web3.utils.fromWei(this.state.approved)).toFixed(2)  > 0 ? 0.00 : parseFloat(this.state.deposited).toFixed(2)} </font></td>   
              <td> <font color={"green"}> ${parseFloat(window.web3.utils.fromWei(this.state.approved)).toFixed(2)} </font> </td>
              <td><font color={"red"}> {parseFloat(window.web3.utils.fromWei(this.state.pending)).toFixed(2)} </font> </td>
              <td> <font color={"green"}> {parseFloat(window.web3.utils.fromWei(this.state.received)).toFixed(2)} </font></td>
              </tr>
            </tbody>
            </table>  






*/