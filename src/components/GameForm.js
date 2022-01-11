import React, { Component } from 'react'
import bnbLogo from '../bnb-logo.png'
import sibmLogo from '../sibm-logo.png'
import './App.css'
//SI BM token 
//0x983Bd79E9c57Dd3A87a1de98b9996fD1672768B2
import FlipCountdown from '@rumess/react-flip-countdown';

import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'

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

class GameForm extends Component {
        
        constructor(props) {
          super(props);
          this.state = { 
              //
              lastNumber : 3,
              lastNumber2 : 3,
              //Game logic
              rollTime : 3,
              //old logic
              gamePrize : "",
              lastWinner : "",
              accountDeposited : "",
              contractName : "",
              GameContract : "",
              gameAddress : "0x1B8Cddc541496527f02dc8c1EFa9386D6a21c318",
              //0xf5929fA042C1bE63ed7803f6776CC2c639fabA2a
              //0x5AB86CCeFf88A75ba2c25edC77C05F9922402E90
              game_ABI: [
                {
                  "inputs": [],
                  "stateMutability": "nonpayable",
                  "type": "constructor"
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
                      "name": "",
                      "type": "address"
                    }
                  ],
                  "name": "deposits",
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
                  "name": "getBalance",
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
                  "name": "lastWinner",
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
                  "name": "pickWinner",
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
                  "name": "players",
                  "outputs": [
                    {
                      "internalType": "address payable",
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
                      "name": "depositer",
                      "type": "address"
                    }
                  ],
                  "name": "viewDeposit",
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
                      "name": "withdrawee",
                      "type": "address"
                    },
                    {
                      "internalType": "uint256",
                      "name": "returnAmount",
                      "type": "uint256"
                    }
                  ],
                  "name": "withDraw",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "stateMutability": "payable",
                  "type": "receive"
                }
              ]
            };
            this.rollDoneCallback1 = this.rollDoneCallback1.bind(this);
            this.rollDoneCallback2 = this.rollDoneCallback2.bind(this);
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
          await this.loadGameContract();
          this.rollAll();
        }

        async componentWillUnmount() {
          clearInterval(this.interval);
        }
        
        
        rollAll() {
       //     this.reactDice2.rollAll()
          }
         
          async rollDoneCallback1(num) {
            console.log(`You rolled a ${num}`)
            //await this.state.GameContract.methods.setMove(this.props.address,num).call();
            this.setState({lastNumber : num});
            console.log("Last Number (1) -", this.state.lastNumber);  
          }
          async rollDoneCallback2(num) {
            console.log(`You rolled a ${num}`)
            //await this.state.GameContract.methods.setMove(this.props.address,num).call();
            this.setState({lastNumber2 : num});
            console.log("Last Number (2) -", this.state.lastNumber2);  
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
                width='255'
                height='255'
                src= {sibmLogo}
                alt=""
              />
              </div>
              <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
                <ReactDice
                numDice={1}
                rollDone={this.rollDoneCallback1}
                defaultRoll = {3}
                faceColor ={(this.state.lastNumber == 0) ? "#42f5f2" : "red"}
                disableIndividual = {this.state.lastNumber ? true : false}
                dotColor ={"black"}
                rollTime = {2}
                rollAll = {true}
                ref={dice => this.reactDice2 = dice} 
                />
                <ReactDice
                numDice={1}
                rollDone={this.rollDoneCallback2}
                faceColor ={(this.state.lastNumber2 == 0) ? "#42f5f2" : "red"}
                disableIndividual = {this.state.lastNumber2 ? true : false}
                defaultRoll = {3}
                dotColor ={"black"}
                rollTime = {2}
                rollAll = {true}
                ref={dice => this.reactDice3 = dice} 
                />
                <h1>{this.state.lastNumber + this.state.lastNumber2}</h1>
                </div>
          <div>
          <span className="float-right text-muted">
            BNB: {this.props.bnbBalance}
          </span>
          </div>
        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {
              const tokenAmount = this.input.value.toString()
              this.setState({tokenAmount : tokenAmount})
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
        <div className="input-group-append">
            <div className="input-group-text">
              <img src={bnbLogo} height='32' alt=""/>
              &nbsp;&nbsp;&nbsp;
              <div>BNB</div>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <span className="float-left text-muted">Estimated Gas</span>
          <span className="float-right text-muted">{this.props.gasPrice} USD</span>
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg">Send atleast $1 in BNB to Play </button>
           <div>Roll a 6 to Win!</div>
            </form>
          );
        }
      }
      
      export default GameForm;
  
     

      