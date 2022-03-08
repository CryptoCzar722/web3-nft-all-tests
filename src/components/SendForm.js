import React, { Component } from 'react'
import './App.css'
import bnbLogo from '../bnb-logo.png'

import NFTMpCard from './NFTMpCard'


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
