import React, { Component } from 'react'

import './App.css'
import BackendService from "../Services/backend-service";

class NftMarketCard extends Component {
        
        constructor(props) {
          super(props);
          this.state = { 
              test: "",
              bnbPrice : 0.00,
              salePrice : 0.02
            };
          //  this.rollDoneCallback1 = this.rollDoneCallback1.bind(this);
        this.postSale = this.postSale.bind(this);
          
        }
        componentDidMount() {
            //this.mintButton = this.mintButton.bind(this);
        }
        
        async componentWillMount() {
        }

        async componentWillUnmount() {
          
        }

        next(){
            
        }
        async postSale(){
           // await this.props.mintNow();
        }
        //<p className='card-content_details-title'>Smart Peeps</p>
        render() {
          return (
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault();
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
                    if (confirmation == this.props.nftImageName){
                    //set sale in database / smart contract
                    console.log("confirmation :: ",confirmation);
                    }
                }
                console.log("con fail :: ",confirmation);
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
                      <button type="submit" className="btn btn-primary btn-block btn-lg">Buy Now</button>
                      <button disabled type="submit" className="btn btn-primary btn-block btn-lg">Make Offer</button>
                    </div>
            </div>
           </form>
          );
        }
      }
      
      export default NftMarketCard;
  
     

      