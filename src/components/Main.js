import React, { Component } from 'react'
import NFTForm from './NFTForm'
import SwapForm from './SwapForm'
import SendForm from './SendForm'
import BridgeForm from './BridgeForm'
import DashboardForm from './DashboardForm'
import SettingsForm from './SettingsForm'
//import LimitForm from './LimitForm'
import BotForm  from './BotForm'
//import SniperForm  from './SniperForm'
import ContractForm from './ContractForm'
import LotteryForm from './LotteryForm'
import GameForm from './GameForm'
import AboutForm from './AboutForm'
//import BlackjackForm from './BlackjackForm'
//TAG remove later
import InvestorForm from './InvestorForm'


class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'nft'
    }
  }


  render() {
    let content
    //change buy sell to limit and market order pages.
    /*if(this.state.currentForm === 'swap') {
      //content = <SwapForm
       updateBasePrice = {this.props.updateBaseTokenPrice}
        swapPairPrice = {this.props.swapPairPrice}
        setSwapPair= {this.props.setSwapPair}    
        swapTokens = {this.props.swapTokens}
        //buyTokens={this.props.buyTokens}
        ethPrice = {this.props.ethPrice}
        gasPrice = {this.props.gasPrice}

        //
        PancakeArbPrice ={this.props.PancakeArbPrice}
        BiswapArbPrice ={this.props.BiswapArbPrice}
        BabyArbPrice ={this.props.BabyArbPrice}
        //eth
        PancakeEthArbPrice ={this.props.PancakeEthArbPrice}
        BiswapEthArbPrice ={this.props.BiswapEthArbPrice}
        //btcb
        PancakeBtcbArbPrice ={this.props.PancakeBtcbArbPrice}
        BiswapBtcbArbPrice ={this.props.BiswapBtcbArbPrice}
        //
        ethBalance={this.props.ethBalance}
        bnbBalance={this.props.bnbBalance}
        btcbBalance={this.props.btcbBalance}
        busdBalance={this.props.busdBalance}
        daiBalance={this.props.daiBalance}
        adaBalance={this.props.adaBalance}
        dogeBalance={this.props.dogeBalance}
        ltcBalance={this.props.ltcBalance}
        sibmBalance={this.props.sibmBalance}

      ///>
    } */
    /*else if (this.state.currentForm === 'send') {
      content = <SendForm
        updateBasePrice = {this.props.updateBaseTokenPrice}
        swapPairPrice = {this.props.swapPairPrice}
        setSwapPair= {this.props.setSwapPair}
        sendTokens={this.props.sendTokens}
        ethPrice = {this.props.ethPrice}
        gasPrice = {this.props.gasPrice}
        tokenPairs = {this.props.tokenPairs}
      
        
        ethBalance={this.props.ethBalance}
        bnbBalance={this.props.bnbBalance}
        btcbBalance={this.props.btcbBalance}
        busdBalance={this.props.busdBalance}
        daiBalance={this.props.daiBalance}
        adaBalance={this.props.adaBalance}
        dogeBalance={this.props.dogeBalance}
        ltcBalance={this.props.ltcBalance}
        sibmBalance={this.props.sibmBalance}

      />
    }*/
    /*
    else if (this.state.currentForm === 'settings') {
      content = <SettingsForm
      account={this.props.account} 
      privateKey={this.props.privateKey}
      setPrivateKey = {this.props.setPrivateKey}
      />
    }
    else if (this.state.currentForm === 'insurance') {
      content = <ContractForm
      account={this.props.account} 
      privateKey={this.props.privateKey}
      setPrivateKey = {this.props.setPrivateKey}
      />
    }*/
   /* if (this.state.currentForm === 'lottery') {
      content = <LotteryForm
      gasPrice = {this.props.gasPrice}
      bnbBalance={this.props.bnbBalance}
      account={this.props.account} 
      privateKey={this.props.privateKey}
      setPrivateKey = {this.props.setPrivateKey}
      sendTokens={this.props.sendTokens}
      />
    }
    else*/ 
    if (this.state.currentForm === 'games') {
      content = 
       <GameForm
       account={this.props.account}
       gasPrice = {this.props.gasPrice}
       bnbBalance={this.props.bnbBalance}
       />
      /*<BlackjackForm
      //bnbBalance={this.props.bnbBalance}
      //account={this.props.account} 
      />*/
     
     }
     else if (this.state.currentForm === 'about') {
      content = 
       <AboutForm/>
      /*<BlackjackForm
      //bnbBalance={this.props.bnbBalance}
      //account={this.props.account} 
      />*/ 
     }
     else if(this.state.currentForm === 'presale') {
      content = <InvestorForm
        account={this.props.account}
       updateBasePrice = {this.props.updateBaseTokenPrice}
        swapPairPrice = {this.props.swapPairPrice}
        setSwapPair= {this.props.setSwapPair}    
        swapTokens = {this.props.swapTokens}
        //buyTokens={this.props.buyTokens}
        //ethPrice = {this.props.ethPrice}
        gasPrice = {this.props.gasPrice}

        //
        //PancakeArbPrice ={this.props.PancakeArbPrice}
        //BiswapArbPrice ={this.props.BiswapArbPrice}
        //BabyArbPrice ={this.props.BabyArbPrice}
        //eth
        //PancakeEthArbPrice ={this.props.PancakeEthArbPrice}
        //BiswapEthArbPrice ={this.props.BiswapEthArbPrice}
        //btcb
        //PancakeBtcbArbPrice ={this.props.PancakeBtcbArbPrice}
        //BiswapBtcbArbPrice ={this.props.BiswapBtcbArbPrice}
        //
        busdBalance={this.props.busdBalance}
        sibmBalance={this.props.sibmBalance}
        //
        busdAddress={this.props.busdAddress}
        sibmAddress={this.props.sibmAddress}

      />
    }
    else if (this.state.currentForm === 'nft') {
      content = <NFTForm
       account={this.props.account}
       />
     }
   /* else if (this.state.currentForm === 'dashboard') {
      content = <DashboardForm
      account={this.props.account} 
      ethPrice = {this.props.ethPrice}
      //
      PancakeArbPrice ={this.props.PancakeArbPrice}
      BiswapArbPrice ={this.props.BiswapArbPrice}
      BabyArbPrice ={this.props.BabyArbPrice}
      //eth
      PancakeEthArbPrice ={this.props.PancakeEthArbPrice}
      BiswapEthArbPrice ={this.props.BiswapEthArbPrice}
      //btcb
      PancakeBtcbArbPrice ={this.props.PancakeBtcbArbPrice}
      BiswapBtcbArbPrice ={this.props.BiswapBtcbArbPrice}
      //
      PancakeAdaArbPrice ={this.props.PancakeAdaArbPrice}
      BiswapAdaArbPrice ={this.props.BiswapAdaArbPrice}

      PancakeDogeArbPrice ={this.props.PancakeDogeArbPrice}
      BiswapDogeArbPrice ={this.props.BiswapDogeArbPrice}

      PancakeLtcArbPrice ={this.props.PancakeLtcArbPrice}
      BiswapLtcArbPrice ={this.props.BiswapLtcArbPrice}
      //
      //
      ethBalance={this.props.ethBalance}
      bnbBalance={this.props.bnbBalance}
      btcbBalance={this.props.btcbBalance}
      busdBalance={this.props.busdBalance}
      daiBalance={this.props.daiBalance}
      adaBalance={this.props.adaBalance}
      dogeBalance={this.props.dogeBalance}
      ltcBalance={this.props.ltcBalance}
      sibmBalance={this.props.sibmBalance}
      />
    }*/
   /* else if (this.state.currentForm === 'bot') {
     /* content = <BotForm
      account={this.props.account}
      //sniper
      pairDataTime = {this.props.pairDataTime}
      pairDataT0 = {this.props.pairDataT0}
      pairDataT1 = {this.props.pairDataT1}
      SniperBot = {this.props.SniperBot}
      BotActive = {this.props.BotActive}
      //arbitrage
      //ArbBotActive = {this.props.ArbBotActive}
      //ArbitrageBot = {this.props.ArbitrageBot}
      PancakeArbPrice ={this.props.PancakeArbPrice}
      BiswapArbPrice ={this.props.BiswapArbPrice}
      BabyArbPrice ={this.props.BabyArbPrice}
      //eth
      PancakeEthArbPrice ={this.props.PancakeEthArbPrice}
      BiswapEthArbPrice ={this.props.BiswapEthArbPrice}
      //btcb
      PancakeBtcbArbPrice ={this.props.PancakeBtcbArbPrice}
      BiswapBtcbArbPrice ={this.props.BiswapBtcbArbPrice}
      />
    }*/
    /*else if (this.state.currentForm === 'sniper') {
      content = <SniperForm
      account={this.props.account}
      pairDataTime = {this.props.pairDataTime}
      pairDataT0 = {this.props.pairDataT0}
      pairDataT1 = {this.props.pairDataT1}
      SniperBot = {this.props.SniperBot}
      BotActive = {this.props.BotActive}
      />
    }
    <button
              className="btn btn-outline-dark"
              onClick={(event) => {
                this.setState({ currentForm: 'sniper' })
              }}
            >
            Sniper
    </button>
    <button
                className="btn btn-outline-dark"
                onClick={(event) => {
                  this.setState({ currentForm: 'lottery' })
                }}
              >
              Giveaway
            </button>
    */
    /*else if (this.state.currentForm === 'bridge') {
      content = <BridgeForm
      account={this.props.account}
      ethBalance={this.props.bnbBalance}
      ethBalance={this.props.ethBalance}
      tokenBalance={this.props.tokenBalance}
      buyTokens={this.props.buyTokens}
      ethPrice = {this.props.ethPrice}
      gasPrice = {this.props.gasPrice}
      />
    }
    */
    
    return (
      <div id="content" className="mt-3">
    <div className="d-flex justify-content-between mb-3">
            <button
                className="btn btn-outline-dark"
                onClick={(event) => {
                  this.setState({ currentForm: 'presale' })
                }}
              >
              Presale
            </button>
          <button
                className="btn btn-outline-dark"
                onClick={(event) => {
                  this.setState({ currentForm: 'games' })
                }}
              >
              Games
          </button>
          <button
              className="btn btn-outline-dark"
              onClick={(event) => {
                this.setState({ currentForm: 'nft' })
              }}
            >
            NFT
          </button>
          <button
                className="btn btn-outline-dark"
                onClick={(event) => {
                  this.setState({ currentForm: 'about' })
                }}
              >
              About
          </button>
          </div>
        <div className="mb-4" >

          <div className="card-body">
            {content}
          </div>

        </div>

      </div>
    );
  }
}

export default Main;

/*
<div className="d-flex justify-content-between mb-3">
        <button
              className="btn btn-outline-dark"
              onClick={(event) => {
                this.setState({ currentForm: 'lottery' })
              }}
            >
            Giveaway
          </button>
        <button
              className="btn btn-outline-dark"
              onClick={(event) => {
                this.setState({ currentForm: 'dashboard' })
              }}
            >
            Dashboard
          </button>
          <button
              className="btn btn-outline-dark"
              onClick={(event) => {
                this.setState({ currentForm: 'swap' })
              }}
            >
            Swap
          </button>

          <button
              className="btn btn-outline-dark"
              onClick={(event) => {
                this.setState({ currentForm: 'insurance' })
              }}
            >
            Finance
          </button>

          <button
              className="btn btn-outline-dark"
              onClick={(event) => {
                this.setState({ currentForm: 'nft' })
              }}
            >
            NFT
          </button>
          <button
              className="btn btn-outline-dark"
              onClick={(event) => {
                this.setState({ currentForm: 'bridge' })
              }}
            >
            Bridge 
          </button>
          <button
              className="btn btn-outline-dark"
              onClick={(event) => {
                this.setState({ currentForm: 'bot' })
              }}
            >
            Bots
          </button>
          <button
              className="btn btn-outline-dark"
              onClick={(event) => {
                this.setState({ currentForm: 'send' })
              }}
            >
            Send
          </button>        
          <button
              className="btn btn-outline-dark"
              onClick={(event) => {
                this.setState({ currentForm: 'settings' })
              }}
            >
             Settings
          </button>
        </div>



*/