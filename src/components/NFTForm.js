import React, { Component } from 'react';
//import { useState } from 'react'
import './App.css';
import Switch from 'react-ios-switch';
import FormData from 'form-data';
//import sibmLogo from '../sIcon.ico'
import sibmLogo from '../sibm-logo.png';
import pixelPeep0 from '../pixelPeep0.png';
import pixelPeep1 from '../pixelPeep1.png';
import pixelPeep2 from '../pixelPeep2.png';
import pixelPeep3 from '../pixelPeep3.png';
import pixelPeep4 from '../pixelPeep4.png';
import pixelPeep5 from '../pixelPeep5.png';

import p682 from '../682.png';
import p683 from '../683.png';
import p684 from '../684.png';

import NFTCard from './NFTCard'

// ...

//import {Card} from 'Card.js';
//import { ColorExtractor } from 'react-color-extractor'
//import { colors } from "Colors.js";
//import { Card, Icon, Image } from 'semantic-ui-react';
//import { Container, Header, List } from "semantic-ui-react";

//import {ProductCard} from 'react-ui-cards';
//import {Card} from 'react-ui-cards';
//import {CryptoCard} from 'react-ui-cards';
//import {NewsHeaderCard} from 'react-ui-cards';

//import AwesomeButtonProgress from 'react-awesome-button/src/components/AwesomeButtonProgress';

const pinataSDK = require('@pinata/sdk');
//add .ENV file
const pinata = pinataSDK('0f3f630bec73946940bd', 'c59ada21cf8e2eac1d19b2eb7177ff6d5d95f4c6a2b962a6d74959c3a7b132e9');
const axios = require('axios');


/*
export const NftCard = () => <ProductCard
photos={[
    'https://i.imgur.com/jRVDeI8.jpg',
    'https://i.imgur.com/raPe27t.jpg'
]}
price='$99'
productName='JPG'
description='NFT for sale'
buttonText='Add to cart'
url=''
/>
*/
//import Identicon from 'identicon.js';
//var QRCode = require('qrcode.react');

// <img src = {this.state.nftImageUri[this.state.nftIdx]} onClick = {this.updateNft}  width = {150} height = {150}/>    

class NFTForm extends Component {

        constructor(props) {
          super(props);
          this.state = { 
            account : "",
            seconds : 0,
            imgBuffer : "",
            revealImg: false,
            revealImg2: false,
            image: sibmLogo,
            imageName: null,
            mint_market : false,
            //IPFS
            ipfsByteCount : "0",
            pinataConnection : false,
            nftCount : "",
            setFile : "",
            nftName : "",
            ipfsHash : "NONE",
            ipfsJSONHash : "",
            tokenUri : "",
            //nft contract       
            nftMintAddress : "0x96C742592c5b55C17c86B6a996c91C8A812BB91C", //"0x760e90639425f52c0295987BfB99046E4CFD72C3",    //"0x8A422D1Ea395721423eF544aC95c316e9CbF37f8",
            nftMintAbi : [
              {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "Approval",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                  }
                ],
                "name": "ApprovalForAll",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "Transfer",
                "type": "event"
              },
              {
                "inputs": [],
                "name": "Nft_Id",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "admin",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  }
                ],
                "name": "balanceOf",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "string",
                    "name": "tokenUri",
                    "type": "string"
                  }
                ],
                "name": "createNft",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "getApproved",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  }
                ],
                "name": "isApprovedForAll",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "name",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "ownerOf",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                  }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                  },
                  {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                  }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                  }
                ],
                "name": "supportsInterface",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "tokenURI",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "transferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              }
            ],
            /*[
              {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                  },
                  {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_ipfsHash",
                    "type": "string"
                  }
                ],
                "name": "Mint",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "Transfer",
                "type": "event"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "name": "OwnerToHash",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "string",
                    "name": "_ipfsHash",
                    "type": "string"
                  }
                ],
                "name": "mint",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "name",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "nftCounter",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "transfer",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              }
            ]*/
            nftMintContract : "",
            nftMintName : "",
            Nft_Id : "--",
            nftImageUri : [],
            nftImageName : ["Shelby Peep #0", "Shelby Peep #1", "Shelby Peep #2","Shelby Peep #3", "Shelby Peep #4", "Shelby Peep #5"],
            nftIdx : 0,
            Nfts_owned : 0,
            imgIdx : 0,
            nftRem : "--",
            nftSizeAvg : "--"
          };
          //this.loadMintContract = this.loadMintContract.bind(this);
          this.updateNft = this.updateNft.bind(this);
        }

        /*
//   console.log(" count :: ",count);
                  //this.setState({imgIdx : this.state.imgIdx + 1});

                 // if (this.state.imgIdx % 3 == 0)
                 // { console.log("br");
                 //   return <br/> }
                  //return 
        */
        async loadMintContract()
            {
            const web3 = window.web3
            const bsChain = web3.eth

            const accounts = await bsChain.getAccounts()
            //console.log("accounts :: ", accounts[0]);
            this.setState({account : accounts[0]});

            this.state.nftMintAddress = web3.utils.toChecksumAddress(this.state.nftMintAddress);
            const nftMintContract = new bsChain.Contract(this.state.nftMintAbi, this.state.nftMintAddress);
            this.setState({nftMintContract});
            
            let nftMintName = await nftMintContract.methods.name().call();
            this.setState({nftMintName}); 
            //console.log("nftMintName :: ",nftMintName);

            let Nft_Id = await nftMintContract.methods.Nft_Id().call();
            Nft_Id = Nft_Id.toString() - 1;
            //console.log("Nft_Id :: ",Nft_Id);
            this.setState({Nft_Id}); 
            
            for (let i = 0; i <= Nft_Id; i++)
              {
              let nftUri = await nftMintContract.methods.tokenURI(i).call();
              const response = await axios.get(nftUri)
              //console.log( " response :: ",response.data.image)
              this.state.nftImageUri.push(response.data.image)
              //this.setState({nftImageUri[i] : response.data.image}) 
              }
              console.log(this.state.nftImageUri);
            if (this.state.account)
              {
              let Nfts_owned = await nftMintContract.methods.balanceOf(this.state.account).call();
              this.setState({Nfts_owned : Nfts_owned.toString()})
              console.log("Nft_account :: ", this.state.Nfts_owned);
              }
            //TAG call the keys from .env
            const API_KEY = '0f3f630bec73946940bd';
            const API_SECRET = 'c59ada21cf8e2eac1d19b2eb7177ff6d5d95f4c6a2b962a6d74959c3a7b132e9';
            
            // the endpoint needed to upload the file
            const url =  `https://api.pinata.cloud/data/userPinnedDataTotal`
      
            const response = await axios.get(
              url,
              {
                headers: {
                    'pinata_api_key': API_KEY,
                    'pinata_secret_api_key': API_SECRET
                }
              }
              )
            console.log( " response :: ",response.data.pin_size_total / 1000)
          // get the hash
          this.setState({ipfsByteCount : response.data.pin_size_total / 1000})
          //now
          this.setState({nftRem : parseFloat((1000000 - this.state.ipfsByteCount) / (this.state.ipfsByteCount / this.state.Nft_Id)).toFixed(0)});
          this.setState({nftSizeAvg :this.state.ipfsByteCount / this.state.Nft_Id});
            }
      
        componentDidMount() {
          this.loadMintContract(); 

          pinata.testAuthentication().then((result) => {
            //handle successful authentication here
              console.log(result);
              this.setState({pinataConnection : true});
            }).catch((err) => {
              //handle error here
              console.log(err);
              this.setState({pinataConnection : false});
          });
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
            this.setState({setFile : event.target.files[0]})

            this.setState({
              image: URL.createObjectURL(img)
            });
            //console.log("image - ", this.state.image);
          }
                     
       };
       //tag remove later
       async updateNft(){
         if (this.state.nftIdx > this.state.Nfts_owned) 
            {
            this.setState({nftIdx : 0}) 
            }
          else this.setState({nftIdx : this.state.nftIdx + 1})
       }

       async PinFilethenMint(){
        // initialize the form data
        console.log("Pinning");
        const formData = new FormData()
        // append the file form data to 
        formData.append("file", this.state.setFile)
        //TAG call the keys from .env
        const API_KEY = '0f3f630bec73946940bd';
        const API_SECRET = 'c59ada21cf8e2eac1d19b2eb7177ff6d5d95f4c6a2b962a6d74959c3a7b132e9';
        // the endpoint needed to upload the file
        const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`
  
        const response = await axios.post(
          url,
          formData,
          {
              maxContentLength: "Infinity",
              headers: {
                  "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 
                  'pinata_api_key': API_KEY,
                  'pinata_secret_api_key': API_SECRET
              }
          })
          console.log(response.data.IpfsHash)
          // get the hash link
          this.setState({ipfsHash: "https://gateway.pinata.cloud/ipfs/"+response.data.IpfsHash+"/?preview=1"});
          console.log("ipfsHash ::", this.state.ipfsHash);
          
          if (this.state.ipfsHash != "NONE")
            {
            let tokenUri = {
              "name" : this.input.value.toString(),//this.state.nftName,
              "description" : "NFT minted with SIBM contracts",
              "image" : this.state.ipfsHash
            }
            console.log(tokenUri);
            
            const urlJs =  `https://api.pinata.cloud/pinning/pinJSONToIPFS`

            const response = await axios.post(
              urlJs,
              tokenUri,
              {
                  headers: {
                      'pinata_api_key': API_KEY,
                      'pinata_secret_api_key': API_SECRET
                  }
              })
              this.setState({ipfsJSONHash: "https://gateway.pinata.cloud/ipfs/"+response.data.IpfsHash})
              console.log("ipfsJSONHash :: ", this.state.ipfsJSONHash)
              let item_Id = await this.state.nftMintContract.methods.createNft(this.state.ipfsJSONHash).send({from :this.state.account});
              let result = window.confirm("IMPORTANT used for viewing in metamask! NFT Token ID : ", item_Id.toString());
            }
      }
    
        render() {
          let content
          if (this.state.mint_market) 
          {
            content =
            <form className="mb-0" onSubmit={(event) => {
              event.preventDefault()                
              this.PinFilethenMint();
              
              }}>
            <table>
             <thead>
              <tr>
                <th>NFT's Minted   </th>
                <th  width="20" >NFT's Remaining</th>
                <th>Avg. NFT Size (KB)</th>
              </tr>
             </thead>
            <tbody>
            <tr>
              <td>{this.state.Nft_Id} </td>
              <td> {this.state.nftRem} </td>
              <td> {this.state.nftSizeAvg} </td>
              </tr>
            </tbody>
            </table>

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
              { this.state.ipfsByteCount}KB / 1.0 GB   
               </div>
          <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
            }}>
          <img height="300" width="300" src={this.state.image} />
          </div>

          <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
            }}>
          <input type="file" name="myImage" onChange={this.onImageChange} />
          </div>


          <input
          type="text"
          onChange={(event) => {
            const nftName = this.input.value.toString()
            this.setState({
              nftName: nftName // * this.props.swapPairPrice
            }) 
           // console.log('nftName :: ', this.state.nftName); 
          }}
          ref={(input) => { this.input = input }}
          className="form-control form-control-lg"
          placeholder="Give your NFT a Name"
          required
          style={{ maxWidth: '650px', justifyContent:'center'}}
           />

          <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
            }}>
          <button onClick={this.handleFile}/*type="submit"*/ name="btn" className="btn btn-primary btn-block btn-lg" style={{ maxWidth: '650px', justifyContent:'center'}}> Mint Your Image</button>
          
          </div>
          <table>
             <thead>
              <tr>
                <th>NFT's Owned </th>
              </tr>
             </thead>
            <tbody>
            <tr>
              <td> {this.state.Nfts_owned} </td>
              </tr>
            </tbody>
            </table>
          </form>
          }
          else 
            {
            content =
            <form className="mb-6" onSubmit={(event) => {
            event.preventDefault()                
            //make offer / buy
            }}>    
             <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            }}>
                  <NFTCard nftImageUri = {p682} nftImageName = {this.state.nftImageName[0]} nftMintAddress = {this.state.nftMintAddress}/>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                  <NFTCard nftImageUri = {p683} nftImageName = {this.state.nftImageName[1]} nftMintAddress = {this.state.nftMintAddress}/>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                  <NFTCard nftImageUri = {p684} nftImageName = {this.state.nftImageName[2]} nftMintAddress = {this.state.nftMintAddress} />
              </div>
          </form>
          }
//<div className="card-body">
          return (
            <div className="mb-3" >
            <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
            <Switch
              checked={this.state.mint_market}
              onChange={checked => {this.setState({mint_market : !this.state.mint_market})}}
              offColor="blue"
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
            <b>{this.state.nftMintName}</b> :
            <b>NFT MarketPlace Coming Soon</b>
            }
              </div>
              {content}
            </div>
            
          );
        }
      }
      
      export default NFTForm;
  