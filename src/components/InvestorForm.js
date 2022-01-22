import React, { Component } from 'react'
import { AwesomeButtonProgress } from 'react-awesome-button';
//import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.css'
 
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
//import afswLogo from '../token-logo.png'

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
      presaleAddress : "0xdf441e62C78Ff5627c5DCA0299189ea52058e873",//"0xD279A0eF79bcaCeaa48DF272B8E5580E79185a02",
      busdAddress : "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
      BusdContract : "",
      PresaleContract : "",
      contractName : "",
      //PresalePrice : "",
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
              "name": "user",
              "type": "address"
            }
          ],
          "name": "insuranceContract",
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
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "depositer",
              "type": "address"
            }
          ],
          "name": "viewConfirmedOrders",
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
          "name": "viewPendingDeposit",
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
          "name": "viewPendingTokenPayment",
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
      token0Addr : this.props.busdAddress, //busd tesnet
      token1Addr : this.props.sibmAddress,  //sibm testnet

      approved : "0",
      deposited : "0",
      pending : "0",
      received : "0"
    }
    this.execute = this.execute.bind(this);
  }
  
  /*componentDidMount = () => {
    this.isComponentMounted = true;
    //this.setDivSizeThrottleable();
    //window.addEventListener("resize", this.setDivSizeThrottleable);
  };*/

  /*componentWillUnmount = () => {
    this.isComponentMounted = false;
    //window.removeEventListener("resize", this.setDivSizeThrottleable);
  };*/

  async componentWillMount() {
    this.isComponentMounted = true;
    await this.loadPresaleContract();
    //window.removeEventListener("resize", this.setDivSizeThrottleable);
  };
  async loadPresaleContract()
    {
    const web3 = window.web3
    const bsChain = web3.eth
    this.state.presaleAddress = web3.utils.toChecksumAddress(this.state.presaleAddress);
    const PresaleContract = new bsChain.Contract(this.state.ps_ABI, this.state.presaleAddress);
    this.setState({PresaleContract});

    this.state.busdAddress = web3.utils.toChecksumAddress(this.state.busdAddress);
    const BusdContract = new bsChain.Contract(this.state.busd_ABI, this.state.busdAddress);
    this.setState({BusdContract});

    //let usd = await BusdContract.methods.balanceOf(this.props.account).call();
    //console.log("BUSD :: ", usd.toString());

    let contractName = await PresaleContract.methods.name().call();
    this.setState({contractName});  
    
    let tokenPrice = await PresaleContract.methods.orderBook().call();
    
    //let insuranceContract = await PresaleContract.methods.orderBook.insuranceContract(this.props.account).call();
    //console.log("insuranceContract ",insuranceContract);

    let price = tokenPrice.price;
    this.setState({tokenPrice : window.web3.utils.fromWei(price.toString(),'ether')}); 
    console.log("tokenPrice ",this.state.tokenPrice);
    } 

  async execute(){
    let usd
    usd = this.input.value.toString()
    //let result = window.confirm("Sell " + tokenAmount + ' Busb for ', this.state.tokenPrice,'BUSD');
    console.log("Buy " + usd / this.state.tokenPrice + ' Busb for ',usd ,' BUSD');
    //usd = window.web3.utils.toWei(usd,'ether');
    //console.log("Deposit ", usd);
    let usdConv = window.web3.utils.toWei(usd,'ether');
    let result = window.confirm("Request " + usd / this.state.tokenPrice + ' Busb for ', this.state.tokenPrice,'BUSD');
    let appr = await this.state.BusdContract.methods.approve(this.state.presaleAddress,usdConv).send({ from: this.props.account });//.call();
    console.log("approved :: ", appr, this.props.account);
    //let allow = await this.state.BusdContract.methods.allowance(this.props.account, this.state.presaleAddress).call();
    //console.log("allow :: ",allow.toString()); 
    this.setState({approved : appr});
    usdConv = usdConv / window.web3.utils.toWei(this.state.tokenPrice,'ether') * 1.02;
    console.log("usdConv :: ", usdConv)//this.state.tokenPrice);
    //await this.state.PresaleContract.methods.RequestPresaleBuyIn(usdConv).send({ from: this.props.account });//.call();
    //this.setState({deposited : usd});
  }

  render() {
    //
    const busdAddress ="0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
    const sibmAddress = "0x983Bd79E9c57Dd3A87a1de98b9996fD1672768B2";
    
    //this.props.setSwapPair(this.state.token0Addr, this.state.token1Addr);
    /*if (this.state.token0Img === busdLogo)
      {
      let tokenPrice = (this.state.token0Img === busdLogo) ? (this.state.output / this.props.swapPairPrice): (this.state.output * this.props.swapPairPrice);
      this.setState({tokenPrice})
      }*/
    /*
    <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    */

  //const busdBal = this.props.busdBalance;
  // const sibmBal = this.props.sibmBalance;
  // console.log("this.props.busdBalance ", this.props.busdBalance);
  // console.log("this.props.sibmBalance ", this.props.sibmBalance);

    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          
          //await
          this.execute();
          
          /*if (result)
            {
            tokenAmount = window.web3.utils.toWei(tokenAmount, 'Ether')
            this.props.swapTokens(tokenAmount, this.state.token0Addr, this.state.token1Addr)
            }*/
        }}>
         <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          }}>
            <h5>{this.state.contractName}</h5>
        </div>
        <table >
               <thead>
                <tr>
                  <th>BUSD Deposited</th>
                  <th>BUSD Approved </th>
                  <th>SIBM Pending </th>
                  <th>SIBM Received </th>
                </tr>
               </thead>
            <tbody>
            <tr>
              <td>{this.state.deposited}</td>   
              <td> <font color={"green"}> {this.state.approved} </font> </td>
              <td>{this.state.pending} </td>
              <td> {this.state.received}</td>
              </tr>
            </tbody>
            </table>  
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          }}>
          <select name="Exchanges" id="Exchanges" ref={(select) => { this.select = select }} onChange ={ (event) => {
                  if (this.select.value === "PCS"){
                    //this.setState({imgsrc : ethLogo})
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.ethBalance, 'Ether')})
                  }
                  else if (this.select.value  === "SIBM"){
                    //this.setState({imgsrc : tokenLogo});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')})
                  }

              }}>
                <option value="SIBM">SIBM Presale</option>
                
                
                
              </select>
          </div>     
        <div>
          <label className="float-left"><b>Token0</b></label>
          <span className="float-right text-muted">
            Balance: {this.state.token0Balance}
          </span>
        </div>
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
            placeholder="500"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={this.state.token0Img} height='34' alt=""/>
              &nbsp;&nbsp;&nbsp; 
              <select name="sellToken" id="sellToken" ref={(select3) => { this.select3 = select3 }} onChange ={ (event) => {
                 if (this.select3.value  === "BUSD"){
                    this.select4.value = "SIBM";
                    this.setState({token0Img : busdLogo});
                    this.setState({token0Addr : busdAddress});
                    this.setState({token0Balance : this.props.busdBalance});

                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  
                  //Exchange token
                  else if (this.select3.value  === "SIBM"){
                    this.setState({token0Img : sibmLogo});
                    this.setState({token0Addr : sibmAddress});
                    this.setState({token0Balance : this.props.sibmBalance});
                  }
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////
                
                  
                  //this.props.setSwapPair(this.state.token0Addr, this.state.token1Addr);
              }}>
              
              <option value="BUSD">BUSD</option>
              
            </select>
            </div>
          </div>
        </div>
        <div>
          <label className="float-left"><b>Token1</b></label>
          <span className="float-right text-muted">
            Balance: {this.state.token1Balance}
          </span>
        </div>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value= {this.state.output != '0'  ? this.state.output / this.state.tokenPrice : 0}
            disabled
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={this.state.token1Img} height='34' alt=""/>
              &nbsp;
              <select name="buyToken" id="buyToken" ref={(select4) => { this.select4 = select4 }} onChange ={ (event) => {
                   if (this.select4.value  === "BUSD"){
                    this.setState({token1Img : busdLogo});
                    this.setState({token1Addr : busdAddress});
                    this.setState({token1Balance : this.props.busdBalance});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  
                  //TAG exchange token
                  else if (this.select4.value  === "SIBM"){
                    this.setState({token1Img : sibmLogo});
                    //this.setState({token0Addr : sibmAddress});
                    this.setState({token1Balance : this.props.sibmBalance});
                  }
                //this.props.setSwapPair(this.state.token0Addr, this.state.token1Addr);  
                  
              }}>
                
                <option value="SIBM">SIBM</option>
            </select>
            </div>
          </div>
        </div>        
        <div className="mb-5">
          <span className="float-left text-muted">Exchange Rate</span>
          <span className="float-right text-muted">1 token0 = { 1 / parseFloat(this.state.tokenPrice).toFixed(10)} token1 </span>
        </div>
        
        <button type="submit" className="btn btn-primary btn-block btn-lg">Request Presale Tokens </button> 
      </form>



    );
  }
}

export default InvestorForm;
