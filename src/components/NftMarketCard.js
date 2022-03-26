import React, { Component } from 'react'

import './App.css'
import BackendService from "../Services/backend-service";

class NftMarketCard extends Component {
        
        constructor(props) {
          super(props);
          this.state = { 
              test: "",
              offers :[],
              bnbPrice : 0.00,
              salePrice : 0.02,
              account : "",
              nftMintAddress : "0x7cD0DBbb58050D57Ecd197a0c399e0Cb56beBA00",//"0xF260B394ec88A037751032A4d072eBa6aB64fA82",
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
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "offerId",
                    "type": "uint256"
                  }
                ],
                "name": "AcceptOffer",
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
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                  }
                ],
                "name": "MakeOffer",
                "outputs": [],
                "stateMutability": "payable",
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
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "offerId",
                    "type": "uint256"
                  }
                ],
                "name": "WithDrawMakeOffer",
                "outputs": [],
                "stateMutability": "payable",
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
                  },
                  {
                    "internalType": "uint256",
                    "name": "listTime",
                    "type": "uint256"
                  },
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
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
                    "name": "",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "name": "offerList",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "returnInProgress",
                    "type": "bool"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nft_id",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "offer",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "offerTime",
                    "type": "uint256"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
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
                    "name": "value",
                    "type": "uint256"
                  }
                ],
                "name": "payOut",
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
                    "internalType": "bool",
                    "name": "returnInProgress",
                    "type": "bool"
                  },
                  {
                    "internalType": "uint256",
                    "name": "nft_id",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "offer",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "offerTime",
                    "type": "uint256"
                  },
                  {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
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
            nftMintContract : ""
            };
          //  this.rollDoneCallback1 = this.rollDoneCallback1.bind(this);
        //this.postSale = this.postSale.bind(this);
        this.MakeOffer = this.MakeOffer.bind(this);
          
        }
        async loadOffers(){
          console.log("loading offers -> ",this.props.nftImageName);
           for (let i = 0 ; i < 5 ; i++){
             let offer  =  await this.state.nftMintContract.methods.offerList(this.props.nftImageName, i).call();
             if (window.web3.utils.fromWei(offer.offer.toString(),"ether") > 0){
               //console.log("offer price -", offer.offer)
               let OfferX = 
                 "NFT_ID : " + this.props.nftImageName +
                 "Offer : " + window.web3.utils.fromWei(offer.offer.toString(),"ether");
               let allOffer = {id: offer.buyer.toString(), name: OfferX}
               //console.log(i,"- offer - ",window.web3.utils.fromWei(offer.offer.toString(),"ether"));
               if (offer.buyer == this.state.account)
                {
                console.log("allOffer :",allOffer);
                this.state.offers.push(allOffer);
                }
              }
           }
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

            let nftsForsaleCount = await nftMintContract.methods.forsale_Count().call();
            console.log("nftsForsaleCount :: ",nftsForsaleCount.toNumber());
            this.setState({nftsForsaleCount: nftsForsaleCount.toNumber()});
            }

        async MakeOffer(nft_id, price){
          await await this.state.nftMintContract.methods.MakeOffer(nft_id).send({from : this.props.account, value : price});
        }

        async RemoveOffer(nft_id,offer_id){
          await await this.state.nftMintContract.methods.WithdrawMakeOffer(nft_id, offer_id).send({from : this.props.account});
        }

        componentDidMount() {
          this.loadMintContract();
            //this.mintButton = this.mintButton.bind(this);
        }
        
        async componentWillMount() {
        }

        async componentWillUnmount() {
          
        }

        next(){}

        //<p className='card-content_details-title'>Smart Peeps</p>
        render() {
          const state = {
            button: ""
          };
          return (
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault();
                if (state.button == "mk"){
                let offerDetails = {
                    account : this.props.account,
                    nft_id : this.props.nftImageName,
                    price : this.state.bnbPrice
                }
                console.log("offer details :: ", offerDetails);
                this.setState({salePrice: this.state.bnbPrice});
                //let confirmation = confirm(saleDetails);
                let confirmation = prompt("Confirm Offer Price ", this.state.bnbPrice);
                if (confirmation == this.state.bnbPrice){
                    confirmation = prompt("Confirm Nft Id ", this.props.nftImageName);
                    if (confirmation == this.props.nftImageName)
                      {
                      //set sale in database / smart contract
                      console.log("confirmation :: ",confirmation);
                      let wei = window.web3.utils.toWei(this.state.bnbPrice,"ether");
                      this.MakeOffer(this.props.nftImageName,wei);
                      }
                }
                else{
                console.log("con fail :: ",confirmation);
                }
              }
              else if (state.button == "rm"){
                //this.RemoveOffer(this.props.nftImageName);
                this.loadOffers();
                console.log("Removing offer");
              }
              state.button = 0;
                }}>
            <div className='card'>
                <div className='card-content'>
                    <div className='card-content_overlay'></div>
                    <img className='card-content_img' src={this.props.nftImageUri} alt='' width = "125" height = "220" />
                    </div>
                    <div className='card-content_details'>
                        <p className='card-content_details-explanation'>
                        Shelby #{this.props.nftImageName}
                        </p>
                    </div>
                    <div>
                    <label className="float-left"><b>BNB Sale Price:</b></label>
                    <span className="float-left text-muted">
                        Price: {this.props.nftImagePrice} BNB
                    </span>
                    <span className="float-right text-muted">
                        Your offer:  BNB
                    </span>
                    </div>
                    <div className="input-group mb-4">
                    <input
                        type= "number"
                        value = {this.state.bnbPrice}
                        ref={(input2) => { this.input2 = input2 }}
                        onChange={(event) => {
                            const val = this.input2.value.toString()
                            this.setState({bnbPrice: val})
                            //this.updatebgColor(val)
                            }}
                        className="form-control form-control-lg"
                        style ={{overflow: "hidden"}} 
                        placeholder=""
                    required />
                      <button type="submit" onClick={() => (state.button = "mk")} className="btn btn-primary btn-block btn-lg">Maker Offer</button>
                      <button type="submit" onClick={() => (state.button = "rm")} className="btn btn-primary btn-block btn-lg">Withdraw Offer</button>
                    </div>
            </div>
           </form>
          );
        }
      }
      
      export default NftMarketCard;
  
     

      