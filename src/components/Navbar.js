import React, { Component, useEffect } from 'react'
import FlipCountdown from '@rumess/react-flip-countdown';
import './App.css'

import BackendService from "../Services/backend-service";

//import Identicon from 'identicon.js';
//import { useEthers, useEtherBalance } from "@usedapp/core";
//import FireBase from "./Firebase";
//var QRCode = require('qrcode.react');

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgRef : 'idc'
    }
    
  }
  /*changeImg(){
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
  }*/
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
    //this.changeImg = this.changeImg.bind(this);
  }

  // Arbitrage Finance Swap  
//TAG add back 
// <button className="btn btn-primary btn-block centered" style ={{width : '150px', height : '35px'}} type="button" onClick = {this.props.connectWallet} >{this.props.connectionString}</button>
// <button onClick = {() => (state.button = "wllt")}  type="submit" value = "wllt" id = "connect-wallet">{ !this.props.account? 'Connect Wallet' : this.props.account }</button>
//

async handleWallet(){
  if (this.props.account)
    {
    console.log("DIS");
    let chk = [];
    chk = await BackendService.checkAddress(this.props.account);
    console.log("checkAddress :: ",chk);
    const keys = Object.keys(chk)
    console.log("keys :: ", keys);  
    console.log("keys.length :: ",keys.length)
    
    //this.setState({account : 0});
    this.props.setAccount("");
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
    //if (!BackendService.getAddr(accounts[0])){
      let data = {
        account : accounts[0],
        whitelist : true,
        airdrop : true
      };
      BackendService.create(data)
        .then(() => {
          console.log("Created new item successfully!");
        })
        .catch((e) => {
          console.log(e);
        });
     /* } 
      else{
        console.log("Already in data base");
      }*/
  } 
}

/*useEffect(
  () =>
    onSnapshot(db, (snapshot) =>
    console.log(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))  
    //setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    ),
  []
);

    const state = {
      button: ""
    };
    const addWhiteList = event => {
      event.preventDefault()
          console.log(state.button);
          if (state.button === "whtlst"){
            console.log("Whitelist button ::", this.props.account)
            state.button = 0;
            }
          else if (state.button === "wllt"){
            this.handleWallet();
            state.button = 0;
            }
          }*/
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow" onSubmit={event =>
        event.preventDefault()
        }>
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.etherscan.io"
          target="_blank"
          rel="noopener noreferrer"
        >
         Shelby Peeps NFT Mint        
        </a>
        <div style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right"
                }}>
          <FlipCountdown
                hideYear
                //hideMonth
                monthTitle='Months'
                dayTitle='Days'
                hourTitle='Hours'
                minuteTitle='Minutes'
                secondTitle='Seconds'
                theme = 'dark'
                size='small' // Options (Default: medium): large, medium, small, extra-small.
                endAt={'2022-3-18 12:00:00'} // Date/Time
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