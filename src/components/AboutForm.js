import React, { Component } from 'react'
import sibmLogo from '../sibm-logo.png'
import './App.css'
//SI BM token 
//0x983Bd79E9c57Dd3A87a1de98b9996fD1672768B2
import FlipCountdown from '@rumess/react-flip-countdown';

//import Deck from "react-poker";
//import "react-poker/styles.css"
//import "react-poker/styles.css"

//TAG TO DO game contracts 
//broken
//0x5Bf93f59C29d9792Ec589EDf07713090596515a0
//new
//
//contract intertactions run out of gas 
//3X gas
//0x2b69318d414c4F215ac9D156C3814F1bF75De94e
// posts last winner

class AboutForm extends Component {
        
        constructor(props) {
          super(props);
          this.state = { 
              gamePrize : "",
              lastWinner : "",
              accountDeposited : "",
              contractName : "",
              GameContract : "",
              gameAddress : "",
              game_ABI: ""
            };
          //  this.rollDoneCallback1 = this.rollDoneCallback1.bind(this);
          //  this.rollDoneCallback2 = this.rollDoneCallback2.bind(this);
        }
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
      //add black jack logic
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
        
        async loadGameContract()
          {
          const web3 = window.web3
          const bsChain = web3.eth
          const GameContract = new bsChain.Contract(this.state.game_ABI, this.state.gameAddress);
          this.setState({GameContract});
          let contractName = await GameContract.methods.name().call();
          this.setState({contractName});
            
          let accountDeposited = await GameContract.methods.deposits(this.props.account).call();
          this.setState({accountDeposited});
          console.log("deposited -", accountDeposited);

          let gamePrize = await GameContract.methods.getBalance().call();
          this.setState({gamePrize});
      
          let lastWinner = await this.state.GameContract.methods.lastWinner().call();
          this.setState({lastWinner});
          console.log("Last Winner -", lastWinner);  
          } 
        componentDidMount() {
          //localStorage.setItem('Timer', 0)
          //this.onFinished = this.onFinished.bind(this);
        }
        
        async componentWillMount() {
        }

        async componentWillUnmount() {
          clearInterval(this.interval);
        }
        render() {
            //console.log(new Date());
          return (
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                //this.setState({rollTime : this.state.tokenAmount})
                this.setState({lastNumber : 0})
                this.setState({lastNumber2 : 0})        
                console.log("rollTime - ",this.state.rollTime);
                //this.props.sendTokens(this.state.tokenAmount, this.state.gameAddress)
                }}>
              <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <FlipCountdown
                hideYear
                hideMonth
                dayTitle='Days'
                hourTitle='Hours'
                minuteTitle='Minutes'
                secondTitle='Seconds'
                theme = 'dark'
                size='medium' // Options (Default: medium): large, medium, small, extra-small.
                endAt={'2022-1-20 12:00:00'} // Date/Time
            />
           </div>
           <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <img
              onClick = {this.changeImg}   
              className="ml-2"
                width='75'
                height='75'
                src= {sibmLogo}
                alt=""
              />
              
              </div>
              <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
                SIBM : Smart Insurance Burn Mechanism will be launched on PancakeSwap and sibmtransfer.nft when the count down completes. 
                The bnb lottery and airdrop will take place until the launch, from there on only the game will be available. 
                Happy Trading!
            </div>
           </form>
          );
        }
      }
      
      export default AboutForm;
  
     

      