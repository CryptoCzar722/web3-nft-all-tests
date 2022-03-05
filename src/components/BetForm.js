import React, { Component } from 'react'

//test net
//correctly build in fees
//withdraw works
//0x3B99515040aC7E5cd462333b7ebcE697c8dA75ea
import './App.css'
import bnbLogo from '../bnb-logo.png'

class BetForm extends Component {
  constructor(props) {
    super(props)
    //this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      firstRender : 0,
      output: '0',
      toAddress : '',
      tokenAmount : '0',
      memo : "Memo: LA > Chicago by 15.",
      token: '',
      token0Img : bnbLogo,
      token0Addr : "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      busdAddress : "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      tokenCount: this.props.bnbBalance,
      bgColor : "white",
      bgColorMemo : "white"
    }
    this.updatebgColor = this.updatebgColor.bind(this);
    //this.input = this.input.bind(this);
    //this.input2 = this.input2.bind(this);
    //this.input3 = this.input3.bind(this);
  }

  updatebgColorMemo(){
    const memo = this.input3.value.toString()
    console.log("memo.length ::", memo.length);
    if (memo.length < 20 && memo.length > 3)
            {
            this.state.bgColorMemo = "#3bff68";
            this.setState({
            memo: memo
            })
            }
        else 
            {
            this.state.bgColorMemo = "#f25d50";
            this.setState({
                memo: memo
                })
            }
}

    updatebgColor(val){
        const etherAddress = val//this.input.value.toString()
        let result = window.web3.utils.isAddress(etherAddress)
        console.log(result)
        if (result === true)
            {
            this.state.bgColor = "#3bff68";
            this.setState({
            toAddress: etherAddress
            })
            }
        else 
            {
            this.state.bgColor = "#f25d50";
            this.setState({
                toAddress: etherAddress
                })
            }
    }
  render() {
    const bnbAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    //console.log("Child Rendered");
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
            //TAG send TX for bet creation
            //this.props.sendTokens(this.state.tokenAmount, this.state.toAddress)
          }
          else{
            window.confirm("Address Does not exist");
          }
        }}>
        <div>
          <label className="float-left"><b>Bet Memo</b></label>
        </div>
        <div className="input-group mb-4">
          <input
            type= "text"
            value = {this.state.memo}
            ref={(input3) => { this.input3 = input3 }}
            onChange={(event) => {
                const val = this.input3.value.toString()
                this.updatebgColorMemo(val)
                }}
            className="form-control form-control-lg"
            style={{background: this.state.bgColorMemo}} 
            placeholder=""
          required />
        </div>
        <div>
          <label className="float-left"><b>Opponent Address</b></label>
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
                const val = this.input2.value.toString()
                this.updatebgColor(val)
                }}
            className="form-control form-control-lg"
            style={{background: this.state.bgColor}} 
            placeholder=""
          required />
        </div>
        <div>
          <label className="float-left"><b>Amount</b></label>
          <span className="float-right text-muted">
            Balance: {this.props.bnbBalance}
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
              <select name="sellToken" id="sellToken" ref={(select3) => { this.select3 = select3 }} onChange ={ (event) => {
                  if (this.select3.value === "BNB"){
                    this.setState({token0Img : bnbLogo})
                    this.setState({token0Addr : bnbAddress});
                    this.setState({token0Balance : this.props.bnbBal});
                    //this.setState({tokenCount : this.props.ethBalance})
                  }                  
                  this.props.setSwapPair(this.state.token0Addr, this.state.token1Addr);
              }}>
              <option value="BNB">BNB</option>
            </select>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <span className="float-left text-muted">Estimated Gas</span>
          <span className="float-right text-muted">{this.props.gasPrice} BNB</span>
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg">Place Bet! </button>
      </form>
    );
  }
}

export default BetForm;
