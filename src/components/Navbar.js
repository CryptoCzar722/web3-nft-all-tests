import React, { Component } from 'react'
import Identicon from 'identicon.js';
import FlipCountdown from '@rumess/react-flip-countdown';
import './App.css'
//import { useEthers, useEtherBalance } from "@usedapp/core";

//var QRCode = require('qrcode.react');

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgRef : 'idc'
    }
    
  }
  changeImg(){
    //this.setState({revealImg : !this.state.revealImg});
    if (this.state.imgRef == "idc")
      {
      this.setState(state => ({
      imgRef: 'qr'
      }));
      }
    else
      {
      this.setState(state => ({
      imgRef: 'idc'
      }));
      }
  }
  async loadAccount(){
    const web3 = window.web3
    const bsChain = web3.eth
    const accounts = await bsChain.getAccounts()
    //console.log("accounts :: ", accounts[0]);
    this.props.setAccount(accounts[0]);
    //this.setState({account : accounts[0]});
  }
  componentDidMount() {
    this.loadAccount = this.loadAccount.bind(this);
    this.loadAccount();
    this.handleWallet = this.handleWallet.bind(this);
    this.changeImg = this.changeImg.bind(this);
  }

  // Arbitrage Finance Swap  
//TAG add back 
// <button className="btn btn-primary btn-block centered" style ={{width : '150px', height : '35px'}} type="button" onClick = {this.props.connectWallet} >{this.props.connectionString}</button>

async handleWallet(){
  if (this.props.account)
    {
    console.log("DIS");
    //this.setState({account : 0});
    this.props.setAccount(0);
    //await window.ethereum.disconnect();
    //await window.web3.eth.currentProvider.close();
    }
  else 
    {
    console.log("Con");
    const web3 = window.web3
    const bsChain = web3.eth
    const accounts = await bsChain.getAccounts()
    this.props.setAccount(accounts[0]);
    await window.ethereum.enable();
    }  
}

render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow" onSubmit={(event) => {
        event.preventDefault()
        //let ethAmount
        //ethAmount = this.input.value.toString()
        //ethAmount = window.web3.utils.toWei(ethAmount, 'Ether')
        const address = this.state.toAddress;
        let result = window.web3.utils.isAddress(address)
        window.confirm("Connecting wallet - ", address);
      }}>

        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.etherscan.io"
          target="_blank"
          rel="noopener noreferrer"
        >
         SIBM Lottery AirDrop         
        </a>
        <div style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right"
                }}>
          <FlipCountdown
                hideYear
                hideMonth
                dayTitle='Days'
                hourTitle='Hours'
                minuteTitle='Minutes'
                secondTitle='Seconds'
                theme = 'dark'
                size='small' // Options (Default: medium): large, medium, small, extra-small.
                endAt={'2022-2-18 12:00:00'} // Date/Time
            />

        </div>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            { /*this.state.account
              ? ((this.state.imgRef == "idc") ? <img
              onClick = {this.changeImg}   
              className="ml-2"
                width='55'
                height='55'
                src= {`data:image/png;base64,${new Identicon(this.state.account, 30).toString()}`}
                alt=""
              /> : <QRCode   onClick = {this.changeImg} size = {40} value= {this.state.account}  /> )
              : <span></span>*/
            }
        <button id = "connect-wallet" onClick = {this.handleWallet} >{ !this.props.account? 'Connect Wallet' : this.props.account }</button>
          </li>
        </ul>
        
      </nav>
    );
  }
}

export default Navbar;
//<button type="submit" className="btn btn-primary btn-block btn-lg">Connect Wallet </button>
//style ={{float : 'left',width : '65px', height : '28px'}}