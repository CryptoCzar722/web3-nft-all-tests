import React, { Component } from 'react'

import BotTrackerForm  from './BotTrackerForm'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'botTracker'
    }
  }

  render() {
    let content
    
    if (this.state.currentForm === 'botTracker') {
      content = <BotTrackerForm
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
   }
    return (
      <div id="content" className="mt-3">
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
