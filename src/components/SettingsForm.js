import React, { Component } from 'react'
import './App.css'

class SettingsForm extends Component {
  constructor(props) {
    super(props)
    //this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      output: '0',
      privKey : '',
      etherAmount : '0',
    }
  }
  
  render() {
    return (
      <form className="mb-4" onSubmit={(event) => {
        event.preventDefault()
        let privKey =  this.input.value.toString()
        console.log("Key Lenght : ", privKey.trim().length);
        if (privKey.trim().length > 0){
        //let ethAmount
          //ethAmount = this.input.value.toString()
          //ethAmount = window.web3.utils.toWei(ethAmount, 'Ether')
          //window.confirm("Set Private Key : ", this.state.privkey);
          //this.props.sendTokens(this.state.etherAmount, this.state.toAddress)
          /*<div>
                <label className="float-left"><b>Key : {this.props.privateKey}</b></label>
            </div>*/
          this.props.setPrivateKey(privKey.toString())
        }
        else {
            this.props.setPrivateKey(" ");
            localStorage.getItem(" ")
        }
        }}>
        <div className="input-group mb-4">
            <div>
                <label className="float-left"><b>Account : {this.props.account}</b></label>
            </div>
            <div>
                <label className="float-left" ><b>Private Key : {(this.props.privateKey !== " " )? "Found" : "Not Found" }</b></label>
            </div>
        </div>
        <div>
                <label className="float-left"><b>Enter Private Key</b></label>
            </div>

        <div className="input-group mb-4">
          <input
            type="text"
            //value = {this.props.privateKey}
           /*8 onChange={(event) => {
                this.setState({
                    privKey: this.input.value.toString()
                  })
              }
            }*/
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder= {this.props.privateKey}
            />
            </div>
        <div className="mb-5">
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-sm">Add Private Key </button>
        <button type = "submit" className="btn btn-secondary btn-block btn-sm">Clear Key </button>
        <p> Note: This website can be used without entering your Private Key. Syncing your Private Key will give you access to autotmated trading features such as Arbitrage, Limit orders, and accumulation orders.</p>
      </form>
    );
  }
}

export default SettingsForm;
