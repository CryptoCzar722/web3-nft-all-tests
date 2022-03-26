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
import afswLogo from '../token-logo.png'
//import ethLogo from '../eth-logo.png'

import bnbLogo from '../bnb-logo.png'
import ethLogo from '../eth-logo.png'
import btcbLogo from '../btcb-logo.png'
import busdLogo from '../busd-logo.png'
import daiLogo from '../dai.png'
import dogeLogo from '../doge-logo.png'
import adaLogo from '../ada-logo.png'
import ltcLogo from '../ltc-logo.png'


import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class SwapForm extends Component {
  constructor(props) {
    super(props)
    //this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      output: '0',
      tokenPrice : '0',
      token0Img : bnbLogo,
      token1Img : busdLogo,
      token0Balance: this.props.bnbBalance,
      token1Balance: this.props.busdBalance,
      //
      token0Addr : "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      token1Addr : "0xe9e7cea3dedca5984780bafc599bd69add087d56"
    }
  }
  
  componentDidMount = () => {
    this.isComponentMounted = true;
    //this.setDivSizeThrottleable();
    //window.addEventListener("resize", this.setDivSizeThrottleable);
  };

  componentWillUnmount = () => {
    this.isComponentMounted = false;
    //window.removeEventListener("resize", this.setDivSizeThrottleable);
  };


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
    
    this.props.setSwapPair(this.state.token0Addr, this.state.token1Addr);
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
   
   const bnbBal = this.props.bnbBalance;
   const ethBal = this.props.ethBalance;
   const btcbBal = this.props.btcbBalance;
   const daiBal = this.props.daiBalance;
   const busdBal = this.props.busdBalance;
   const afswBal = this.props.afswBalance;
   //TAG change to input amounts later
   const adaBal = this.props.adaBalance;
   const ltcBal = this.props.ltcBalance;
   const dogeBal = this.props.dogeBalance;

    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let tokenAmount
          tokenAmount = this.input.value.toString()
          let result = window.confirm("Sell " + tokenAmount + ' BNB for ', tokenAmount * this.props.ethPrice,'BUSD');
          if (result)
            {
            tokenAmount = window.web3.utils.toWei(tokenAmount, 'Ether')
            this.props.swapTokens(tokenAmount, this.state.token0Addr, this.state.token1Addr)
            }
        }}>
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
                  else if (this.select.value  === "BSP"){
                    //this.setState({imgsrc : tokenLogo});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')})
                  }
                  else if (this.select.value  === "BBY"){
                    //this.setState({imgsrc : tokenLogo});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')})
                  }

              }}>
                <option value="PCS">Pancakeswap</option>
                <option value="BSP">Biswap</option>
                <option value="BBY">BabySwap</option>
              </select>
            <select name="OrderType" id="OrderType" ref={(select2) => { this.select2 = select2 }} onChange ={ (event) => {
                  if (this.select2.value === "Market"){
                    //this.setState({imgsrc : ethLogo})
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.ethBalance, 'Ether')})
                  }else if (this.select2.value  === "limit"){
                    //this.setState({imgsrc : tokenLogo});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')})
                  }

              }}>
                <option value="MKT">Market</option>
                <option value="LMT">Limit</option>
                <option value="RCG">Recurring</option>
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
                output: tokenAmount// * this.props.swapPairPrice
              })   
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
                    this.setState({token0Balance : bnbBal});
                    //this.setState({tokenCount : this.props.ethBalance})
                  }
                  else if (this.select3.value  === "DAI"){
                    this.setState({token0Img : daiLogo});
                    this.setState({token0Addr : daiAddress});
                    this.setState({token0Balance : daiBal});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  else if (this.select3.value  === "ETH"){
                    this.setState({token0Img : ethLogo});
                    this.setState({token0Addr : ethAddress});
                    this.setState({token0Balance : ethBal});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  else if (this.select3.value  === "BUSD"){
                    this.setState({token0Img : busdLogo});
                    this.setState({token0Addr : busdAddress});
                    this.setState({token0Balance : busdBal});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  else if (this.select3.value  === "BTCB"){
                    this.setState({token0Img : btcbLogo});
                    this.setState({token0Addr : btcbAddress});
                    this.setState({token0Balance : btcbBal});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  //Exchange token
                  else if (this.select3.value  === "AFSW"){
                    this.setState({token0Img : afswLogo});
                    //this.setState({token0Addr : afswAddress});
                    this.setState({token0Balance : afswBal});
                  }
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////
                  else if (this.select3.value  === "DOGE"){
                    this.setState({token0Img : dogeLogo});
                    this.setState({token0Addr : dogeAddress});
                    this.setState({token0Balance : dogeBal});
                  }
                  else if (this.select3.value  === "LTC"){
                    this.setState({token0Img : ltcLogo});
                    this.setState({token0Addr : ltcAddress});
                    this.setState({token0Balance : ltcBal});
                  }
                  else if (this.select3.value  === "ADA"){
                    this.setState({token0Img : adaLogo});
                    this.setState({token0Addr : adaAddress});
                    this.setState({token0Balance : adaBal});
                  }
                  
                  this.props.setSwapPair(this.state.token0Addr, this.state.token1Addr);
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
            value= {this.state.output * this.props.swapPairPrice}
            disabled
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={this.state.token1Img} height='32' alt=""/>
              &nbsp;
              <select name="buyToken" id="buyToken" ref={(select4) => { this.select4 = select4 }} onChange ={ (event) => {
                  if (this.select4.value === "BNB"){
                    this.setState({token1Img : bnbLogo});
                    this.setState({token1Addr : bnbAddress});
                    this.setState({token1Balance : bnbBal});
                    //this.setState({tokenCount : this.props.ethBalance})
                  }
                  else if (this.select4.value  === "DAI"){
                    this.setState({token1Img : daiLogo});
                    this.setState({token1Addr : daiAddress});
                    this.setState({token1Balance : daiBal});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  else if (this.select4.value  === "ETH"){
                    this.setState({token1Img : ethLogo});
                    this.setState({token1Addr : ethAddress});
                    this.setState({token1Balance : ethBal});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  else if (this.select4.value  === "BUSD"){
                    this.setState({token1Img : busdLogo});
                    this.setState({token1Addr : busdAddress});
                    this.setState({token1Balance : busdBal});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  else if (this.select4.value  === "BTCB"){
                    this.setState({token1Img : btcbLogo});
                    this.setState({token1Addr : btcbAddress});
                    this.setState({token1Balance : btcbBal});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')})
                  }
                  //TAG exchange token
                  else if (this.select4.value  === "AFSW"){
                    this.setState({token1Img : afswLogo});
                    //this.setState({token0Addr : afswAddress});
                    this.setState({token1Balance : afswBal});
                  }
                  /////////////////////////////////////////////////////////////////////////////////////////////////////////
                  else if (this.select4.value  === "DOGE"){
                    this.setState({token1Img : dogeLogo});
                    this.setState({token1Addr : dogeAddress});
                    this.setState({token1Balance : dogeBal});
                  }
                  else if (this.select4.value  === "LTC"){
                    this.setState({token1Img : ltcLogo});
                    this.setState({token1Addr : ltcAddress});
                    this.setState({token1Balance : ltcBal});
                  }
                  else if (this.select4.value  === "ADA"){
                    this.setState({token1Img : adaLogo});
                    this.setState({token1Addr : adaAddress});
                    this.setState({token1Balance : adaBal});
                  }
                this.props.setSwapPair(this.state.token0Addr, this.state.token1Addr);  
                  
              }}>
                <option value="BUSD">BUSD</option>
                <option value="BNB">BNB</option>
                <option value="ETH">ETH</option>
                <option value="BTCB">BTCB</option>
                <option value="LTC">LTC</option>
                <option value="DOGE">DOGE</option>
                <option value="ADA">ADA</option>
                <option value="DAI">DAI</option>
                <option value="AFSW">AFSW</option>
            </select>
            </div>
          </div>
        </div>        
        <div className="mb-5">
          <span className="float-left text-muted">Exchange Rate</span>
          <span className="float-right text-muted">1 token0 = {parseFloat(this.props.swapPairPrice).toFixed(2)} token1 </span>
        </div>
        
        <button type="submit" className="btn btn-primary btn-block btn-lg">Swap Tokens </button>
        
      </form>



    );
  }
}

export default SwapForm;
