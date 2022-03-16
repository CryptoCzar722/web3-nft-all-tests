import React, { Component } from 'react'
//import sibmLogo from '../sibm-logo.png'
import BackendService from "../Services/backend-service";
//import {AwesomeButtonProgress} from 'react-awesome-button';
//import "react-awesome-button/dist/styles.css";
//import styles from 'react-awesome-button/src/styles/themes/theme-blue';
import './App.css'

class NftWalletCard extends Component {
        
        constructor(props) {
          super(props);
          this.state = { 
              test: "",
              bnbPrice : 0.00,
              salePrice : "--",
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
            nftMintContract : "",
            offers: [
              {id: '0', name: 'NFT_ID : -- Offer : -0 '},
            ]
            };
        this.postListing = this.postListing.bind(this);
        this.removeListing = this.removeListing.bind(this);
        this.loadOffers = this.loadOffers.bind(this); 
        }
        componentDidMount() {
          this.loadMintContract();
        }
        async componentWillMount() {
        }

        async componentWillUnmount() {
          
        }
        async postSale(){
           // await this.props.mintNow();
        }
        async loadMintContract()
            {
            const web3 = window.web3
            const bsChain = web3.eth
            this.state.nftMintAddress = web3.utils.toChecksumAddress(this.state.nftMintAddress);
            const nftMintContract = new bsChain.Contract(this.state.nftMintAbi, this.state.nftMintAddress);
            this.setState({nftMintContract});
            console.log(nftMintContract);
            console.log("this.props.nftImageName --",this.props.nftImageName);
            }
        async postListing(saleDetails){
          //saleDetails.price = window.web3.utils.toWei(saleDetails.price, "ether");
          console.log("wei ",window.web3.utils.toWei(saleDetails.price, "ether")) 
          await this.state.nftMintContract.methods.ListSale(saleDetails.nft_id, window.web3.utils.toWei(saleDetails.price, "ether")).send({from : this.props.account});
        }
        async removeListing(saleDetails){
          await this.state.nftMintContract.methods.RemoveSale(saleDetails.nft_id).send({from : this.props.account});
       }
       async removeListing(saleDetails){
        await this.state.nftMintContract.methods.RemoveSale(saleDetails.nft_id).send({from : this.props.account});
     }
       async loadOffers(){
         console.log("loading offers");
          for (let i = 0 ; i < 5 ; i++){
            let offer  =  await this.state.nftMintContract.methods.offerList(this.props.nftImageName, i).call();
            if (window.web3.utils.fromWei(offer.offer.toString(),"ether") > 0){
              console.log("offer price -", offer.offer)
              let OfferX = 
                "NFT_ID : " + this.props.nftImageName +
                "Offer : " + window.web3.utils.fromWei(offer.offer.toString(),"ether");
              let allOffer = {id: offer.buyer.toString(), name: OfferX}
              this.state.offers.push(allOffer);
            }
            console.log(i,"- offer - ",window.web3.utils.fromWei(offer.offer.toString(),"ether"));
          }
       }

        //<p className='card-content_details-title'>Smart Peeps</p>
        render() {
          const state = {
            button: ""
          };

          const { offers } = this.state;

          let offersList = offers.length > 0
            && offers.map((item, i) => {
            return (
              <option key={i} value={item.id}>{item.name}</option>
            )
          }, this);
          return (
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault();
                let saleDetails = {
                  address : this.props.account,
                  nft_id : this.props.nftImageName,
                  price : this.state.bnbPrice
                }
                if (state.button == "list"){
                  let confirmation = prompt("Confirm Sale Price ", this.state.bnbPrice);
                  if (confirmation == this.state.bnbPrice){
                    confirmation = prompt("Confirm Nft Id ", this.props.nftImageName);
                    if (confirmation == this.props.nftImageName){
                      console.log("listing",saleDetails)
                      console.log("account ", this.props.account);
                      this.postListing(saleDetails);
                    }
                  }
                }
                else if (state.button == "delist"){
                  let confirmation = prompt("Confirm Delsit Id :", this.props.nftImageName);
                  console.log("delisting confirmation : ",confirmation)
                  if (confirmation == this.props.nftImageName)
                    {
                    console.log("delisting",saleDetails)
                    this.removeListing(saleDetails);
                    }
                }
                state.button = 0;
                /*this.setState({salePrice: this.state.bnbPrice});
                let confirmation = prompt("Confirm Sale Price ", this.state.bnbPrice);
                  if (confirmation == this.state.bnbPrice){
                      confirmation = prompt("Confirm Nft Id ", this.props.nftImageName);
                      if (confirmation == this.props.nftImageName){
                      
                    }
                  }*/
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
                    <span className="float-right text-muted">
                        BNB: {this.state.salePrice}
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
                      <button type="submit" onClick={() => (state.button = "list")}  className="btn btn-primary btn-block btn-lg">List Sale</button>
                      <button type="submit" onClick={() => (state.button = "delist")}  className="btn btn-primary btn-block btn-lg">De-List Sale</button>
                      <select style = {{'width': '500px'}} onClick={() => this.loadOffers()} >
                        {offersList}
                      </select>
                      <button type="submit" onClick={() => (state.button = "acceptOffer")}  className="btn btn-primary btn-block btn-lg">Accept Offer</button>
                    </div>
            </div>
           </form>
          );
        }
      }
      
      export default NftWalletCard;
  
     

      