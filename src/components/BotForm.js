import React, { Component } from 'react';   
//

class ArbForm extends Component {   
  constructor(props) {
    super(props)
    this.state = {
    ArbActive : false,
    ArbContract : "",
    arb_ABI : [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "msg",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "val",
            "type": "address"
          }
        ],
        "name": "Log",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "msg",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "bytes",
            "name": "val",
            "type": "bytes"
          }
        ],
        "name": "Log",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "biswapRouter",
        "outputs": [
          {
            "internalType": "contract IUniswapV2Router02",
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
        "inputs": [
          {
            "internalType": "address",
            "name": "_sender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_amount0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_amount1",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "pancakeCall",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "pancakeFactory",
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
            "name": "token0",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "token1",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
          }
        ],
        "name": "startArbitrage",
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
        "inputs": [],
        "name": "biswapRouter",
        "outputs": [
          {
            "internalType": "contract IUniswapV2Router02",
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
        "inputs": [
          {
            "internalType": "address",
            "name": "_sender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_amount0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_amount1",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "pancakeCall",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "pancakeFactory",
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
            "name": "factory",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "router",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "token0",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "token1",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "_authorize",
            "type": "bool"
          }
        ],
        "name": "startArbitrage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],  */                                                      //  NEW                                      //  OLD
    arbAddress : "0x58817f0799c55CF5B0d32629b0C4793715399B8a",//"0x0da74d1406De5a3Fb04faA2230FE544E3A92eDf9",
    time : 0,
    timeStart : 0,
    timeEnd : 0,
    timerTotal : 10, //30,
    pancakeFactory : '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    biswapRouter : '0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8',
    //
    ethAddress :"0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    btcbAddress : "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
    bnbAddress :"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    //to do
    dogeAddress : "0xba2ae424d960c26247dd6c32edc70b295c744c43",
    adaAddress :"0x3ee2200efb3400fabb9aacf31297cbdd1d435d47",
    ltcAddress : "0x4338665cbb7b2485a8855a139b75d5e34ab0db94",
    //NOTE we always want one pair to be a stable coin 
    //stables 
    busdAddress :"0xe9e7cea3dedca5984780bafc599bd69add087d56",
    daiAddress : "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
    
    }
  }

  async componentWillMount() 
    {
    await this.loadArbitrageContract()
    } 

  async loadArbitrageContract()
  {
    const web3 = window.web3
    const bsChain = web3.eth
    const ArbContract = new bsChain.Contract(this.state.arb_ABI, this.state.arbAddress);
    this.setState({ArbContract});
    //console.log("Contract init : ", ArbContract);
  } 

  
  async checkForArbitrage()
    {
    if (!this.state.ArbActive)
      {
      console.log("bot waiting");
      }
    
    if (this.state.ArbActive)
      {
      //console.log("bot active");
      if (this.state.timeStart === 0 && this.props.BiswapArbPrice > this.props.PancakeArbPrice)
        {
          this.setState({timeStart : Date.now()});
          console.log("BNB ARBITRAGE FOUND ", this.state.timeStart);
          //execute arbitrage
          let flashLoanAmount = window.web3.utils.toWei('0.1','Ether')
          console.log("flashLoanAmount ->", flashLoanAmount);
          await this.state.ArbContract.methods.startArbitrage(this.state.bnbAddress,this.state.busdAddress,flashLoanAmount, 0).call();
          //await this.state.ArbContract.methods.startArbitrage(this.state.pancakeFactory, this.state.biswapRouter, this.state.bnbAddress,this.state.busdAddress,flashLoanAmount,0,0).call();
          
        }
      else if(this.state.timeStart == 0 && this.props.BiswapEthArbPrice > this.props.PancakeEthArbPrice)
        {
          this.setState({timeStart : Date.now()});
          console.log("ETH ARBITRAGE FOUND ", this.state.timeStart);
          //execute arbitrage
          let flashLoanAmount = window.web3.utils.toWei('0.01','Ether')
          console.log("flashLoanAmount ->", flashLoanAmount);
          await this.state.ArbContract.methods.startArbitrage(this.state.ethAddress,this.state.busdAddress,flashLoanAmount,0).call();
          //await this.state.ArbContract.methods.startArbitrage(this.state.pancakeFactory, this.state.biswapRouter, this.state.ethAddress,this.state.busdAddress,flashLoanAmount,0,0).call();
          
        }
      else if(this.state.timeStart == 0 && this.props.BiswapBtcbArbPrice > this.props.PancakeBtcbArbPrice)
        {
          this.setState({timeStart : Date.now()});
          console.log("BTC ARBITRAGE FOUND ", this.state.timeStart);
          //execute arbitrage
          let flashLoanAmount = window.web3.utils.toWei('0.001','Ether')
          console.log("flashLoanAmount ->", flashLoanAmount);
          await this.state.ArbContract.methods.startArbitrage(this.state.btcbAddress,this.state.busdAddress,flashLoanAmount,0).call();
          //await this.state.ArbContract.methods.startArbitrage(this.state.pancakeFactory, this.state.biswapRouter, this.state.btcbAddress,this.state.busdAddress,flashLoanAmount,0,0).call();
          
        }
      //allow new arbitrage to be found
      if (this.state.timeStart)
        {
          this.setState({timeEnd : Date.now()});
          //this.state.timeEnd = Date.now() //new Date();
          //this.state.timeEnd = this.state.timeEnd.toLocaleTimeString();
          this.setState({time : this.state.timerTotal - (this.state.timeEnd - this.state.timeStart) /1000});
          console.log("Time out : ", this.state.time)//this.state.time);
          if (this.state.time <= 0)
            {
            console.log("timer Done enable another swap");
            //tag remove later fro continual swaps
            this.setState({ArbActive : false}) 
            this.setState({timeStart : 0})  
            }
        }
      }

  }
  componentDidMount() 
    {
    this.interval = setInterval(() => this.checkForArbitrage(), 1000);
    //this.interval = setInterval(() => this.(), 100);
    }
       
  render() {  
  
    const state = {
      button: ""
    };
  
    const onSubmit = event => {
      event.preventDefault()
          console.log(state.button);
          if (state.button === "Arb"){
            if (this.state.ArbActive === false) 
              {
                this.setState({ArbActive : true});
                //this.props.ArbitrageBot();
                console.log("Bot st a", this.state.ArbActive);//this.props.ArbBotActive)
                
              }
            else 
              {
              //this.props.ArbitrageBot();
              this.setState({ArbActive : false});
              console.log("Bot st d", this.state.ArbActive);//this.props.ArbBotActive)
              }
            }
          if (state.button === "Sniper"){
            if (this.props.BotActive === false) 
              {
              this.props.SniperBot(true);
              console.log("Bot Active", this.props.BotActive)
              }
            else 
              {
              this.props.SniperBot(false);
              console.log("Bot Deactive", this.props.BotActive)
              }
              state.button = 0;
          }
          }
    
    return (  
        <form className="mb-3" onSubmit={onSubmit}>
          <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
            }}>
          <h2><strong>Arbitrage Bot</strong></h2>
          </div>
             <table>
               <thead>
                <tr>
                  <th>Pair </th>
                  <th>PancakeSwap</th>
                  <th>BiswapSwap</th>
                </tr>
               </thead>
            <tbody>
            <tr>
              <td>BNB / BUSD</td>
              <td>  <font color={(this.props.PancakeArbPrice > this.props.BiswapArbPrice) ? "red" :"green"}> ${parseFloat(this.props.PancakeArbPrice * 1.01).toFixed(2)} </font></td>
              <td>  <font color={(this.props.BiswapArbPrice > this.props.PancakeArbPrice) ? "red" :"green"}>${parseFloat(this.props.BiswapArbPrice* 1.01).toFixed(2)} </font></td>
              </tr>
              <tr>
              <td>ETH / BUSD</td>
              <td>  <font color={(this.props.PancakeEthArbPrice > this.props.BiswapEthArbPrice) ? "red" :"green"}>${parseFloat(this.props.PancakeEthArbPrice* 1.01).toFixed(2)} </font></td>
              <td>  <font color={(this.props.BiswapEthArbPrice > this.props.PancakeEthArbPrice) ? "red" :"green"}>${parseFloat(this.props.BiswapEthArbPrice* 1.01).toFixed(2)} </font></td>
              </tr>  
              <tr>  
                <td>BTCB </td>
                <td>  <font color={(this.props.PancakeBtcbArbPrice > this.props.BiswapBtcbArbPrice) ? "red" :"green"}> ${parseFloat(this.props.PancakeBtcbArbPrice* 1.01).toFixed(2)} </font></td>
                <td>  <font color={(this.props.BiswapBtcbArbPrice > this.props.PancakeBtcbArbPrice) ? "red" :"green"}>${parseFloat(this.props.BiswapBtcbArbPrice* 1.01).toFixed(2)} </font></td>
              </tr>
            </tbody>
          </table>  
          <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
            }}>
          <button onClick={() => (state.button = "Arb")} type="submit" name="btn"  className="btn btn-primary btn-block btn-lg" value = "Arb" style={{ maxWidth: '200px', justifyContent:'center'}}>{!this.state.ArbActive ? "Start Arbitrage Bot" : "Stop Arbitrage Bot"}</button>
          </div>  

          <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>



          
          <h2><strong>Sniper Bot</strong></h2>
          </div>  
             <table>
               <thead>
                <tr>
                  <th>Time </th>
                  <th>Token 0</th>
                  <th>Token 1</th>
                </tr>
               </thead>
            <tbody>
            <tr>
              <td>{this.props.pairDataTime}</td>
              <td>{this.props.pairDataT0}</td>
              <td>{this.props.pairDataT1}</td> 
              </tr>
            </tbody>
          </table> 
          <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
            }}>
          <button onClick={() => (state.button = "Sniper" )} type="submit" name="btn"  value = "Sniper" className="btn btn-primary btn-block btn-lg" style={{ maxWidth: '200px', justifyContent:'center'}}>{!this.props.BotActive ? "Start Sniper Bot" : "Stop Sniper Bot"}</button>
          </div>
        </form>
    )  
    }  
}  
export default ArbForm; 