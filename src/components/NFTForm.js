import React, { Component } from 'react'
import './App.css'

import Switch from 'react-ios-switch';

import Identicon from 'identicon.js';
var QRCode = require('qrcode.react');

//ADD QR code.

//Reveal nfts in marketplace
/*
 </div>

              <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}><p>Minting Coming Soon! Click image to unblur </p>
            </div> 
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            { this.props.account
              ? <img
                className="ml-2"
                width='350'
                height='350'
                src= {`data:image/png;base64,${new Identicon(this.props.account, 200).toString()}`}
                alt=""
                onClick = {this.reveal}
                style={this.state.revealImg ? {filter: 'blur(0)' }:{filter: 'blur(4rem)'}}
              />
              : <span></span>
            }
            
            { this.props.account
              ? <QRCode  onClick = {this.reveal2} style={this.state.revealImg2 ? {filter: 'blur(0)' }:{filter: 'blur(4rem)'}} size = '175' value= {this.props.account}  /> 
              : <span></span>
            }

*/


class NFTForm extends Component {
        
        constructor(props) {
          super(props);
          this.state = { 
            seconds : 0,
            revealImg: false,
            revealImg2: false,
            image: null,
            mint_market : true
          };//localStorage.getItem("Timer")  };
          this.onImageChange = this.onImageChange.bind(this);
        }
        
        tick() {
            localStorage.setItem('Timer', 0)
            //console.log('time tick ',parseInt(localStorage.getItem("Timer").toString()))
        if (parseInt(localStorage.getItem("Timer"),10) > 0 )
            {
            this.setState(state => ({
                seconds: localStorage.getItem("Timer").toString() + 1
            }));
            //localStorage.setItem('Timer', this.state.seconds)
            //this.props.SetTimer(this.state.seconds)
            }
        else 
            {
            this.setState(state => ({
                seconds: state.seconds + 1
            }));
            //localStorage.setItem('Timer', this.state.seconds)
            //this.props.SetTimer(this.state.seconds)
            }
            localStorage.setItem('Timer', this.state.seconds)
        }
        
        reveal(){
          //this.setState({revealImg : !this.state.revealImg});
          this.setState(state => ({
            revealImg: !this.state.revealImg
        }));
        }

        reveal2(){
          //this.setState({revealImg : !this.state.revealImg});
          this.setState(state => ({
            revealImg2: !this.state.revealImg2
        }));
        }
      
        componentDidMount() {
          //localStorage.setItem('Timer', 0)
          this.interval = setInterval(() => this.tick(), 1000);
          this.reveal = this.reveal.bind(this);
          this.reveal2 = this.reveal2.bind(this);
          //this.reveal = setInterval(() => this.tick(), 0);
        }
      
        componentWillUnmount() {
          clearInterval(this.interval);
        }

        onImageChange = event => {
          if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
              image: URL.createObjectURL(img)
            });
          }
        };
      
        render() {
          return (
            <form className="mb-0" onSubmit={(event) => {
                event.preventDefault()
                this.setState(state => ({
                    seconds: localStorage.getItem("Timer")
                  }));
                }}>

            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              }}>
              
              <Switch
                checked={this.state.mint_market}
                onChange={checked => {this.setState({mint_market : !this.state.mint_market})}}
                offColor="yellow"
              />
              
             </div>
             <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
              }}>
              {
              this.state.mint_market
              ?
              <b>NFT Minting</b> :
              <b>NFT MarketPlace Coming Soon</b>
              }
                </div>
            <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
              }}>
            <img height="250" width="250" src={this.state.image} />
            </div>

            <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
              }}>
            <input type="file" name="myImage" onChange={this.onImageChange} />
            </div>

            <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
              }}>
            <button type="submit" name="btn"  value = "Sniper" className="btn btn-primary btn-block btn-lg" style={{ maxWidth: '325px', justifyContent:'center'}}> Mint Your Image</button>
            
            </div>
            </form>
          );
        }
      }
      
      export default NFTForm;
  