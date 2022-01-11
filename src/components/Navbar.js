import React, { Component } from 'react'
import Identicon from 'identicon.js';
var QRCode = require('qrcode.react');

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

  componentDidMount() {
    this.changeImg = this.changeImg.bind(this);
  }

  // Arbitrage Finance Swap  
//TAG add back 
// <button className="btn btn-primary btn-block centered" style ={{width : '150px', height : '35px'}} type="button" onClick = {this.props.connectWallet} >{this.props.connectionString}</button>

render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow" onSubmit={(event) => {
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
                  justifyContent: "center",
                  alignItems: "center"
                }}>
  



        </div>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>

            { this.props.account
              ? ((this.state.imgRef == "idc") ? <img
              onClick = {this.changeImg}   
              className="ml-2"
                width='55'
                height='55'
                src= {`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                alt=""
              /> : <QRCode   onClick = {this.changeImg} size = {40} value= {this.props.account}  /> )
              : <span></span>
            }

          </li>
        </ul>
        
      </nav>
    );
  }
}

export default Navbar;
//<button type="submit" className="btn btn-primary btn-block btn-lg">Connect Wallet </button>
//style ={{float : 'left',width : '65px', height : '28px'}}