import React, { Component } from 'react';
import './App.css';
import Switch from 'react-ios-switch';
import sibmLogo from '../sibm-logo.png';

import NFTCard from './NFTCard'
//import NFTMpCard from './NFTMpCard'
import NftWalletCard from './NftWalletCard'
import bnbLogo from '../bnb-logo.png'
import p683 from '../683.png';
import noNft from '../noNft.png';
import BackendService from "../Services/backend-service";
/*
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<NFTCard nftImageUri = {p683} nftImageName = {this.state.nftImageName[1]} nftMintAddress = {this.state.nftMintAddress}/>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<NFTCard nftImageUri = {p684} nftImageName = {this.state.nftImageName[2]} nftMintAddress = {this.state.nftMintAddress} />              
*/

const pinataSDK = require('@pinata/sdk');
//add .ENV file
const pinata = pinataSDK('0f3f630bec73946940bd', 'c59ada21cf8e2eac1d19b2eb7177ff6d5d95f4c6a2b962a6d74959c3a7b132e9');
const axios = require('axios');

class NftWalletForm extends Component {

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
            //IPFS
            ipfsByteCount : "0",
            pinataConnection : false,
            //nft contract       
            nftMintAddress : "0xB30dAf287933EA6763617ee8614806A0144dA28f",//"0xFD3413e732D8b7BEb843b4eAd1589e248EC94C22",//"0x0F2DC6a9Bf491c7eB9f36267b0ec6173423a0BDA",//"0x96C742592c5b55C17c86B6a996c91C8A812BB91C",
            nftMintAbi:[
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
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                  }
                ],
                "name": "BuyNow",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                  }
                ],
                "name": "ListSale",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
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
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                  }
                ],
                "name": "RemoveSale",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "ReturnForsaleList",
                "outputs": [
                  {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "ReturnForsalePrices",
                "outputs": [
                  {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "name": "forsale",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "nft_id",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "name": "forsaleIdtracker",
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
                "name": "forsale_Count",
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
                "name": "mintNft",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "payable",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "mintPrice",
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
                "name": "nftsMinted",
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
                    "name": "employee",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  }
                ],
                "name": "payOut",
                "outputs": [],
                "stateMutability": "payable",
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "name": "sold",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "nft_id",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "sold_Count",
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
                    "name": "_tokenId",
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
                "stateMutability": "pure",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "tokenURINextMint",
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
                "name": "totalSupply",
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
            oldnftMintAbi : [
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
                "name": "CollectRoyalty",
                "outputs": [],
                "stateMutability": "nonpayable",
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
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  }
                ],
                "name": "clearRoyalty",
                "outputs": [],
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
                "name": "mintNft",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
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
                "name": "nftsMinted",
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
                    "name": "employee",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  }
                ],
                "name": "payOut",
                "outputs": [],
                "stateMutability": "payable",
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
                    "name": "_tokenId",
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
                "stateMutability": "pure",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "tokenURINextMint",
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
                "name": "totalSupply",
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
            nftMintContract : "",
            nftMintName : "",
            nftImageUri : [p683],
            nftImageName : "--", //["Shelby Peep #0", "Shelby Peep #1", "Shelby Peep #2","Shelby Peep #3", "Shelby Peep #4", "Shelby Peep #5"],
            nftIdx : 0,
            Nfts_owned : "--",
            Nfts_minted : "--",
            uriOwned : [noNft],
            idOwned : [],
            imgIdx : 0,
            Nft_Id : "--",
            nftRem : "--",
            nftSizeAvg : "--",
            nftOwnedIdx : 0,
            history: [
              { nft_id: 1, account: this.props.account, price: 21, b_s_o: 'wasi.com' },
              { nft_id: 2, account: this.props.account, price: 19, b_s_o: 'ali@email.com' },
              { nft_id: 3, account: this.props.account, price: 16, b_s_o: 'saad@email.com' },
              { nft_id: 4, account: this.props.account, price: 25, b_s_o: 'asad@email.com' }
              ]
          };
          //this.loadMintContract = this.loadMintContract.bind(this);
          //this.updateNft = this.updateNft.bind(this);
          this.mintNow = this.mintNow.bind(this);
          //this.incIdx = this.incIdx.bind(this);
        }
        renderTableData() {
          return this.state.history.map((history, index) => {
             const { nft_id, account, price, b_s_o } = history //destructuring
             return (
                <tr key={nft_id}>
                   <td>{nft_id}</td>
                   <td>{account}</td>
                   <td>{price}</td>
                   <td>{b_s_o}</td>
                </tr>
             )
          })
       }

        async mintNow(){
          let mintedID = await this.state.nftMintContract.methods.mintNft().send({ from: this.props.account, value : "20000000000000000" })
          console.log("mintedID :: ",mintedID);
          window.alert("Mint TX hash: ",mintedID.blockHash);
        }
        async findOwnedUri(){
          let i = 0
          for (i = 1 ; i <= 999; i++){
            let owner = await this.state.nftMintContract.methods.ownerOf(i).call();
            if (owner == this.props.account)
              {
              this.setState({nftOwnedIdx : 1});
                //console.log(i," Owned :: ",owner);
              let URI = await this.state.nftMintContract.methods.tokenURI(i).call();
              URI = await axios.get(URI);
              //console.log(i," uri :: ",URI.data.image);
              //this.setState({idOwned : i});
              this.state.idOwned.push(i); 
              //this.setState({uriOwned: URI.data.image});
              this.state.uriOwned.push(URI.data.image); 
              //console.log(i," uriOwned :: ",this.state.uriOwned);
              }
        }
          //console.log("Owners scanned");
        }

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
              
            this.updateMintData();
            
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
            //console.log( " response :: ",response.data.pin_size_total / 1000)
          // get the hash
          this.setState({ipfsByteCount : response.data.pin_size_total / 1000})
          //now
          this.setState({nftSizeAvg : this.state.ipfsByteCount / 1000});
          this.findOwnedUri()
            }

        async checkListed(){
          //let checkIdForsale = await 
          BackendService.checkIdForsale(this.state.nftOwnedIdx).then(out =>{
            console.log("checkIdForsale :: ",out);
          });
          //['0'].address);
          //this.interval = checkListed(() => this.checkListed(), 3000);
        }

        async updateMintData(){
          //console.log("updateMintImage");
          /*let nftImageUri = await this.state.nftMintContract.methods.tokenURINextMint().call();
          nftImageUri = await axios.get(nftImageUri);
          this.setState({nftImageUri : nftImageUri.data.image});
          let nftImageName = nftImageUri.data.name;
          this.setState({nftImageName});
          let mintBalance = await window.web3.eth.getBalance(this.state.nftMintAddress);
          mintBalance = window.web3.utils.fromWei(mintBalance.toString(),'ether')
          this.setState({mintBalance});*/
          //this.checkListed()
          
          if (this.state.account)
              {
              let Nfts_owned = await this.state.nftMintContract.methods.balanceOf(this.state.account).call();
              this.setState({nftRem : 1000 - this.state.Nfts_minted});
              if (Nfts_owned.toString() != this.state.Nfts_owned){
                this.setState({Nfts_owned : Nfts_owned.toString()})
                //console.log("Nfts_owned :: ", this.state.Nfts_owned);
              }
              let Nfts_minted = await this.state.nftMintContract.methods.nftsMinted().call();
              if (Nfts_minted.toString() != this.state.Nfts_minted){
                this.setState({Nfts_minted : Nfts_minted.toString()})
                //console.log("Nfts_owned :: ", this.state.Nfts_owned);
              }
              //console.log("Nfts_minted :: ", this.state.Nfts_minted);
              }
        }
        componentDidMount() {
          this.loadMintContract(); 
          this.interval = setInterval(() => this.updateMintData(), 3000);

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
        incIdx(){
          if (this.state.nftOwnedIdx < this.state.Nfts_owned)
            {
            this.setState({nftOwnedIdx :this.state.nftOwnedIdx+1})
            //console.log("inc :: ", this.state.nftOwnedIdx);
            }
        }
        decIdx(){
          if (this.state.nftOwnedIdx > 1)
            {
            this.setState({nftOwnedIdx :this.state.nftOwnedIdx-1})
            //console.log("dec :: ", this.state.nftOwnedIdx);
            }
        }

        render() {
          let content
          const state = {
            button: ""
          };
          content =
            <form className="mb-3" onSubmit={(event) => {
              event.preventDefault()
              if (state.button == "dec"){
                this.decIdx();
              }
              else if (state.button == "inc"){
                this.incIdx();
              }
              state.button = 0;
              }}>
          <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
            }}>
              <button style = {{'width': '50px'}} type="submit" onClick={() => (state.button = "dec")} className="btn btn-primary btn-block btn-lg" > {"<"} </button>
              <NftWalletCard nftMintContract = {this.state.nftMintContract} nftOwnedIdx = {this.state.nftOwnedIdx} account = {this.props.account} nftImageUri = {this.state.uriOwned[this.state.nftOwnedIdx]} nftImageName = {this.state.idOwned[this.state.nftOwnedIdx-1]}  nftMintAddress = {this.state.nftMintAddress}/>
              <button style = {{'width': '50px'}}  type="submit" onClick={() => (state.button = "inc")} className="btn btn-primary btn-block btn-lg" > {">"} </button>
          </div>
          </form>
          
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
          return (
            <div className="mb-3" >
            <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            }}>
            <b><h1>NFT Wallet</h1></b>
            </div>
              {content}
            </div>
            
          );
        }
      }
      
      export default NftWalletForm;
  