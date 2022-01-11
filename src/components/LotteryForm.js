import React, { Component } from 'react'
import lotteryLogo from '../lotteryLogo.png'
import sibmLogo from '../sibm-logo.png'
import bnbLogo from '../bnb-logo.png'
import './App.css'
//SI BM token 
//0x983Bd79E9c57Dd3A87a1de98b9996fD1672768B2
import FlipCountdown from '@rumess/react-flip-countdown';

import WheelComponent from 'react-wheel-of-prizes'
//airdrop
//broken
//0x5Bf93f59C29d9792Ec589EDf07713090596515a0
//new
//
//contract intertactions run out of gas 
//3X gas
//0x2b69318d414c4F215ac9D156C3814F1bF75De94e
// posts last winner
//0x078d8b8306614C76E4778E4B8513b08A595f5Dbb
//improved
//0x57c6E0Ac891E0003B67d7b14d4925EF7A4990a81
//import 'react-wheel-of-prizes/dist/index.css'

//import GaugeChart from 'react-gauge-chart'
/*
<div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              {this.state.days} Days {this.state.hours} Hours {this.state.minutes} Minutes {this.state.seconds} Seconds
            </div>

            <img width='250'
                height='250'
                 src= {lotteryLogo}/>
*/
class LotteryForm extends Component {
        
        constructor(props) {
          super(props);
          this.state = { 
              lotteryPrize : "",
              lastWinner : "",
              accountDeposited : "",
              contractName : "",
              LotteryContract : "",
              lotteryAddress : "0x57c6E0Ac891E0003B67d7b14d4925EF7A4990a81",
              lot_ABI: [
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
              ],
              days :'',
              hours : '',
              minutes : '',
              seconds : '',
              segments : [
                '1 token',
                '2 tokens',
                'Spin Again',
                '3 tokens',
                '4 tokens',
                'Spin Again',
              ],
              segColors : [
                '#815CD1',
                '#815CD1',
                '#815CD1',
                '#815CD1',
                '#815CD1',
                '#815CD1',
                /*'#EE4040',
                '#F0CF50',
                '#815CD1',
                '#3DA5E0',
                '#34A24F',
                '#F9AA1F',
                '#EC3F3F',
                '#FF9000'*/
              ]
            };
        }

        async loadLotteryContract()
          {
          const web3 = window.web3
          const bsChain = web3.eth
          const LotteryContract = new bsChain.Contract(this.state.lot_ABI, this.state.lotteryAddress);
          this.setState({LotteryContract});
          let contractName = await LotteryContract.methods.name().call();
          this.setState({contractName});
            
          let accountDeposited = await LotteryContract.methods.deposits(this.props.account).call();
          this.setState({accountDeposited});
          console.log("deposited -", accountDeposited);

          let lotteryPrize = await LotteryContract.methods.getBalance().call();
          this.setState({lotteryPrize});
          console.log("contract balance -", accountDeposited);

          

          let lastWinner = await this.state.LotteryContract.methods.lastWinner().call();
          this.setState({lastWinner});
          console.log("Last Winner -", lastWinner);  
          } 
        
        async componentWillMount(){
          await this.loadLotteryContract();
        }

        componentDidMount() {
          //localStorage.setItem('Timer', 0)
          this.onFinished = this.onFinished.bind(this);
        }
      
        componentWillUnmount() {
          clearInterval(this.interval);
        }
        
        
       async onFinished(winner){
          console.log(winner)
          //await this.state.ArbContract.methods.startArbitrage(this.state.bnbAddress,this.state.busdAddress,flashLoanAmount, 0).call();
          console.log("Name -", this.state.contractName); 
        }

        render() {
            //console.log(new Date());
          return (
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                this.props.sendTokens(this.state.tokenAmount, this.state.lotteryAddress)
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
            <table>
               <thead>
                <tr>
                  <th>Topic </th>
                  <th>Address</th>
                  <th>Value</th>
                </tr>
               </thead>
            <tbody>
            <tr>
              <td>Prize Pool</td>
              <td>  <font color={"red"}> {this.state.lotteryAddress} </font></td>
              <td> {window.web3.utils.fromWei(this.state.lotteryPrize.toString(),'ether')} </td>
              </tr>
              <tr>
              <td>Last winner</td>
              <td> <font color={"green"}> {this.state.lastWinner} </font> </td>
              <td>  </td>
              </tr>  
              <tr>  
                <td>Deposited </td>
                <td> {this.props.account}</td>
                <td>  <font color={"green"}>{window.web3.utils.fromWei(this.state.accountDeposited.toString())} </font></td>
              </tr>
            </tbody>
            </table>  
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
        <button type="submit" className="btn btn-primary btn-block btn-lg">Send BNB to Enter the Lottery / AirDrop </button>
            </form>
          );
        }
      }
      
      export default LotteryForm;
  
      /*
<div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <WheelComponent
              segments={this.state.segments}
              segColors={this.state.segColors}
              winningSegment='won 10'
              onFinished={(winner) => this.onFinished(winner)}
              primaryColor='black'
              contrastColor='white'
              buttonText=''
              buttonSize = {1}
              isOnlyOnce={false}
              size={95}
              upDuration={100}
              downDuration={1000}
              fontFamily='Arial'
            />
            </div>   



      <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <strong><h5>
            {this.state.contractName} - BSC Address : {this.state.lotteryAddress}

            </h5> </strong>
            </div>  
           <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <strong> <h3 style={{color:'Green'}}> Prize Pool : {window.web3.utils.fromWei(this.state.lotteryPrize.toString(),'ether')} BNB </h3></strong>
              </div>
            
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            
            Last Winner - <h8 style={{color:'Red'}}> {this.state.lastWinner} </h8> 
            </div>     
           <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <strong>
            Live Account: {this.props.account}
              </strong>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <strong>
            Has Deposited {window.web3.utils.fromWei(this.state.accountDeposited.toString())} BNB
              </strong>
            </div>


      
      */