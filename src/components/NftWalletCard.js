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
              salePrice : 0.02
            };
          //  this.rollDoneCallback1 = this.rollDoneCallback1.bind(this);
        this.postSale = this.postSale.bind(this);
        this.checkListed = this.checkListed.bind(this);
          
        }
        checkListed(){
          let checkIdForsale = BackendService.checkIdForsale(this.props.nftImageName);
          console.log("checkIdForsale :: ",checkIdForsale);//['0'].address);
          //this.interval = checkListed(() => this.checkListed(), 3000);
        }


        componentDidMount() {
            //this.mintButton = this.mintButton.bind(this);
            //this.interval = checkListed(() => this.checkListed(), 3000);
        }
        
        async componentWillMount() {
        }

        async componentWillUnmount() {
          
        }
        async postSale(){
           // await this.props.mintNow();
        }
        async IsSaleListed(id){
          let checkSale = BackendService.checkIdForsale(id);
          return checkSale;
        }
        //<p className='card-content_details-title'>Smart Peeps</p>
        render() {
          return (
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault();
                let saleDetails = {
                    address : this.props.account,
                    nft_id : this.props.nftImageName,
                    price : this.state.bnbPrice
                }
                let checkSale = this.IsSaleListed(this.props.nftImageName)
                console.log("check is listed :: ", checkSale);
                //if (checkSale < 1){
                  //console.log("Sale details :: ", saleDetails);
                  this.setState({salePrice: this.state.bnbPrice});
                  //let confirmation = confirm(saleDetails);
                  let confirmation = prompt("Confirm Sale Price ", this.state.bnbPrice);
                  if (confirmation == this.state.bnbPrice){
                      confirmation = prompt("Confirm Nft Id ", this.props.nftImageName);
                      if (confirmation == this.props.nftImageName){
                      //set sale in database / smart contract
                      let data = BackendService.createListing(saleDetails);
                      BackendService.createListing(saleDetails)
                      .then(() => {
                        console.log("Created new listing successfully!");
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                      console.log("BackendService data :: ",data);
                      }
                  }
                  console.log("con fail :: ",confirmation);
              /*  }
                else 
                {
                  alert("Sale Already Listed");
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
                      <button type="submit" className="btn btn-primary btn-block btn-lg">List Sale</button>
                    </div>
            </div>
           </form>
          );
        }
      }
      
      export default NftWalletCard;
  
     

      