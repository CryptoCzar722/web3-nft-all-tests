import React, { Component } from 'react'
import tokenLogo from '../token-logo.png'
import ethLogo from '../eth-logo.png'
import bnbLogo from '../bnb-logo.png'

class BridgeForm extends Component {
  constructor(props) {
    super(props)
    //this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      output: '0',
      imgsrc : bnbLogo,
      tokensrc : ethLogo
    }
  }

  render() {
    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let etherAmount
          etherAmount = this.input.value.toString()
          window.confirm("Sell " + etherAmount + ' ETH for DAI');
          etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
          
          this.props.buyTokens(etherAmount)
        }}>
          <select name="Exchanges" id="Exchanges" ref={(select) => { this.select = select }} onChange ={ (event) => {
                  if (this.select.value === "ETH"){
                    this.setState({imgsrc : ethLogo});
                    this.setState({tokensrc : bnbLogo});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.ethBalance, 'Ether')})
                  }else if (this.select.value  === "BSC"){
                    this.setState({imgsrc : bnbLogo});
                    this.setState({tokensrc : ethLogo});
                    //this.setState({imgsrc : tokenLogo});
                    //this.setState({tokenCount : window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')})
                  }

              }}>
                <option value="BSC">Binance Smart Chain</option>
                <option value="ETH">Ethereum Mainnet</option>
              </select>
        <div>
          <label className="float-left"><b>Input</b></label>
          <span className="float-right text-muted">
            Balance: {this.props.ethBalance}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {
              const etherAmount = this.input.value.toString()
              this.setState({
                output: etherAmount * this.props.bnbPrice
              })
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={this.state.imgsrc} height='32' alt=""/>
              &nbsp;&nbsp;&nbsp; 
            </div>
          </div>
        </div>
        <div>
          <label className="float-left"><b>Output</b></label>
          <span className="float-right text-muted">
            Balance: {this.props.bnbBalance}
          </span>
        </div>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={this.state.output}
            disabled
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={this.state.tokensrc} height='32' alt=""/>
              &nbsp; Token
            </div>
          </div>
        </div>
        <div className="mb-5">
          <span className="float-left text-muted">Exchange Rate</span>
          <span className="float-right text-muted">1 BNB = {this.props.ethPrice} DAI </span>
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg">Buy Tokens </button>
      </form>
    );
  }
}

export default BridgeForm;
