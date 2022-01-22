import React, { Component } from 'react'
//import { useState } from 'react'
import FormData from 'form-data';
import './App.css'

import Switch from 'react-ios-switch';

//import Identicon from 'identicon.js';
//var QRCode = require('qrcode.react');

//Exhange contract v0
//0x8B68984546d5BE5089eBf791533a10267df8D107
//exchange contract v0.1
//0x26a0f03E7A43C1cd77029e0B902DcBfFB5e1E9Fa
//0x26a0f03E7A43C1cd77029e0B902DcBfFB5e1E9Fa

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('0f3f630bec73946940bd', 'c59ada21cf8e2eac1d19b2eb7177ff6d5d95f4c6a2b962a6d74959c3a7b132e9');

const axios = require('axios');
const userApiKey = `0f3f630bec73946940bd`;
const userApiSecret = `c59ada21cf8e2eac1d19b2eb7177ff6d5d95f4c6a2b962a6d74959c3a7b132e9`;

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
            imgBuffer : "",
            revealImg: false,
            revealImg2: false,
            image: null,
            imageName: null,
            mint_market : true,
            pinataConnection : false,
            file : "",
            setFile : "",
            myipfsHash : "", 
            setIPFSHASH : ""
          };//localStorage.getItem("Timer")  };
          //this.onImageChange = this.onImageChange.bind(this);
          //this.handleFile = this.handleFile.bind(this);
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
          pinata.testAuthentication().then((result) => {
            //handle successful authentication here
              console.log(result);
              this.setState({pinataConnection : true});
            }).catch((err) => {
              //handle error here
              console.log(err);
              this.setState({pinataConnection : false});
          });
          
          //this.reveal = setInterval(() => this.tick(), 0);
        }
      
        componentWillUnmount() {
          clearInterval(this.interval);
        }

        onImageChange = event => {
          if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            console.log("IMG - ", img.name);
            
            this.setState({imageName : img.name})
            
            
            console.log("File location ", './'+img.name)  //this.state.setFile) 
            this.setState({setFile : './'+img.name})
            this.setState({
              image: URL.createObjectURL(img)
            });
            console.log("image - ", this.state.image);
          }
                     
       };

       async handleFile() {
        console.log("image - ", this.state.image);
        console.log('starting')
        const fileToHandle = this.state.setFile;
        // initialize the form data
        const formData = new FormData()
        // append the file form data to 
        formData.append("file", this.state.image)
        
        // call the keys from .env    
        // the endpoint needed to upload the file
        const url =  'https://api.pinata.cloud/pinning/pinFileToIPFS'
    
        const response = await axios.post(
          url,
          formData,
          {
              maxContentLength: "Infinity",
              headers:
                  {
                  "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 
                  'pinata_api_key': userApiKey,
                  'pinata_secret_api_key': userApiSecret
                  }
          }
        )
      console.log(response)
      // get the hash
      //setIPFSHASH(response.data.IpfsHash)
      this.setState({setIPFSHASH : response.data.IpfsHash});
    }
      
        render() {
          return (
            <form className="mb-0" onSubmit={(event) => {
                event.preventDefault()                
                //let ipfs = pinata.pinFileToIPFS(this.state.imageName)//, options)
                //console.log("ipfs pin ", ipfs);
                //this.state.IpfsPostImg();
                
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
                <h1> <font color={(!this.state.pinataConnection) ? "red" :"green"}>{this.state.pinataConnection} </font></h1> 
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
            <button onClick={this.handleFile}/*type="submit"*/ name="btn" className="btn btn-primary btn-block btn-lg" style={{ maxWidth: '325px', justifyContent:'center'}}> Mint Your Image</button>
            
            </div>
            </form>
          );
        }
      }
      
      export default NFTForm;
  