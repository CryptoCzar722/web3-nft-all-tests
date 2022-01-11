import React, { Component } from 'react'
import tokenLogo from '../token-logo.png'

import './App.css'

import afswLogo from '../token-logo.png'
import bnbLogo from '../bnb-logo.png'
import ethLogo from '../eth-logo.png'
import btcbLogo from '../btcb-logo.png'
import busdLogo from '../busd-logo.png'
import daiLogo from '../dai.png'
import dogeLogo from '../doge-logo.png'
import adaLogo from '../ada-logo.png'
import ltcLogo from '../ltc-logo.png'

class SendForm extends Component {
  constructor(props) {
    super(props)
    //this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      firstRender : 0,
      output: '0',
      toAddress : '',
      tokenAmount : '0',
      token: '',
      token0Img : bnbLogo,
      token0Addr : "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      token0Balance : this.props.bnbBalance,
      busdAddress : "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      tokenCount: this.props.bnbBalance
    }
  }

  render() {
    const ethAddress = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";
    const btcbAddress = "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c";
    const bnbAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    //to do
    const dogeAddress = "0xba2ae424d960c26247dd6c32edc70b295c744c43";
    const adaAddress= "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47";
    const ltcAddress = "0x4338665cbb7b2485a8855a139b75d5e34ab0db94";
    //
    const busdAddress ="0xe9e7cea3dedca5984780bafc599bd69add087d56";
    const daiAddress = "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3";

    let coin = this.state.token0Addr;

    const bnbBal = this.props.bnbBalance;
   const ethBal = this.props.ethBalance;
   const btcbBal = this.props.btcbBalance;
   const daiBal = this.props.daiBalance;
   const busdBal = this.props.busdBalance;
   const afswBal = this.props.afswBalance;
   //TAG change to input amounts later
   const adaBal = this.props.afswBalance;
   const ltcBal = this.props.afswBalance;
   const dogeBal = this.props.afswBalance;

    //console.log(coin, "   ", busdAddress);
    if (coin === busdAddress) 
      { 
      console.log("busd seleted");
      //this.setState({token0Addr : daiAddress});
      //this.props.setSwapPair(this.state.token0Addr, daiAddress);
    //this.setState({token0Addr : busdAddress});                
    //  this.props.setSwapPai r(busdAddress,daiAddress);
      }
    else  
      {
      //console.log("coins seleted");
      //this.props.setSwapPair(this.state.token0Addr, busdAddress);
      }
    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          //let tokenAmount
          //tokenAmount = this.input.value.toString()
          //tokenAmount = window.web3.utils.toWei(tokenAmount, 'Ether')
          const address = this.state.toAddress;
          let result = window.web3.utils.isAddress(address)
          //console.log("Address exists : ", result) // => true
          if (result === true){
            window.confirm("Send " + this.state.tokenAmount + " to " + this.state.toAddress);
            this.props.sendTokens(this.state.tokenAmount, this.state.toAddress)
          }
          else{
            window.confirm("Address Does not exist");
          }
        }}>
        <div>
          <label className="float-left"><b>Amount</b></label>
          <span className="float-right text-muted">
            Balance: {this.state.token0Balance}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            //value = {this.state.tokenAmount}
            onChange={(event) => {
              const tokenAmount = this.input.value.toString()
              this.setState({tokenAmount : tokenAmount})
              /*this.setState({
                output: tokenAmount * this.props.swapPairPrice//this.props.ethPrice
              })*/
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={this.state.token0Img} height='32' alt=""/>
              &nbsp;&nbsp;&nbsp;
              <select name="sellToken" id="sellToken" ref={(select) => { this.select = select }} onChange ={ (event) => {
                  if (this.select.value === "BNB"){
                    this.setState({token0Img : bnbLogo})
                    this.setState({token0Addr : bnbAddress});
                    this.setState({token0Balance : bnbBal});
                    //this.setState({tokenCount : this.props.ethBalance})
                  }
                  else if (this.select.value  === "DAI"){
                    this.setState({token0Img : daiLogo});
                    this.setState({token0Addr : daiAddress});
                    this.setState({token0Balance : daiBal});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  else if (this.select.value  === "ETH"){
                    this.setState({token0Img : ethLogo});
                    this.setState({token0Addr : ethAddress});
                    this.setState({token0Balance : ethBal});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  else if (this.select.value  === "BUSD"){
                    this.setState({token0Img : busdLogo});
                    this.setState({token0Addr : busdAddress});
                    this.setState({token0Balance : busdBal});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  else if (this.select.value  === "BTCB"){
                    this.setState({token0Img : btcbLogo});
                    this.setState({token0Addr : btcbAddress});
                    this.setState({token0Balance : btcbBal});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  //Exchange token
                  else if (this.select.value  === "AFSW"){
                    this.setState({token0Img : afswLogo});
                    //this.setState({token0Addr : afswAddress});
                    this.setState({token0Balance : afswBal});
                  }
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////
                  else if (this.select.value  === "DOGE"){
                    this.setState({token0Img : dogeLogo});
                    this.setState({token0Addr : dogeAddress});
                    this.setState({token0Balance : dogeBal});
                  }
                  else if (this.select.value  === "LTC"){
                    this.setState({token0Img : ltcLogo});
                    this.setState({token0Addr : ltcAddress});
                    this.setState({token0Balance : ltcBal});
                  }
                  else if (this.select.value  === "ADA"){
                    this.setState({token0Img : adaLogo});
                    this.setState({token0Addr : adaAddress});
                    this.setState({token0Balance : adaBal});
                  }
                  
                  //this.props.setSwapPair(this.state.token0Addr, busdAddress);
              }}>
              <option value="BNB">BNB</option>
              <option value="ETH">ETH</option>
              <option value="BTCB">BTCB</option>
              <option value="LTC">LTC</option>
              <option value="DOGE">DOGE</option>
              <option value="ADA">ADA</option>
              <option value="BUSD">BUSD</option>
              <option value="DAI">DAI</option>
              <option value="AFSW">AFSW</option>
            </select>
            </div>
          </div>
        </div>
        <div>
          <label className="float-left"><b>Address</b></label>
          <span className="float-right text-muted">
            ~USD: {this.state.tokenAmount * this.props.swapPairPrice}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type= "text"
            value = {this.state.toAddress}
            ref={(input2) => { this.input2 = input2 }}
            onChange={(event) => {
              
                //web3.eth.getBalance(this.state.address)
                const etherAddress = this.input2.value.toString()
                this.setState({
                  toAddress: etherAddress
                })
              }}
            //styles = {input2}
            //ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder=""
          required />
        </div>
        <div className="mb-5">
          <span className="float-left text-muted">Estimated Gas</span>
          <span className="float-right text-muted">{this.props.gasPrice} USD</span>
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg">Send Tokens </button>
      </form>
    );
  }
}

export default SendForm;
