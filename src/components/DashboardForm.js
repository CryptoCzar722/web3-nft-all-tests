import React, { Component } from 'react'
//import { useTable } from 'react-table';
//import { PieChart } from 'react-minimal-pie-chart';
import Chart from "react-apexcharts";

/*import {CryptoCard} from 'react-ui-cards';
export const Crypto = () => <CryptoCard
    currencyName='Smart Insurance'
    currencyPrice='0.0000001'
    icon = {sibmLogo}
    currencyShortName='SIBM'
    trend = "10"
    trendDirection={-1}
    chartColor='blue'
    chartData={[0,1,2,3,1,3,4]}
/>*/

class DashboardForm extends Component {
  constructor(props) {
    super(props)
    //this.onSubmit = this.onSubmit.bind(this)
    this.statePie = {
      options: {},
        series: [this.props.bnbBalance * this.props.PancakeArbPrice,this.props.ethBalance * this.props.PancakeEthArbPrice, this.props.btcbBalance * this.props.PancakeBtcbArbPrice, this.props.busdBalance * 0, this.props.daiBalance * 0, this.props.afswBalance * 0.00000001],
        //labels: ['BNB', 'WETH', 'BTCB', 'BUSD', 'DAI', 'AFSW'],
        dataLabels : ['BNB', 'WETH', 'BTCB', 'BUSD', 'DAI', 'AFSW'] 
    }
    
    this.localTime = 0

    this.state = {
      time : "",
      tickCounter : 8,
      options: {
        chart: {
          id: "realtime",
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
            speed: 1
                  }
            },
          toolbar: {
            show: false
          },
        },
        yaxis: {
          tickAmount: 6,
          max : this.props.ethBalance * this.props.ethPrice* 1.03,
          min : this.props.ethBalance * this.props.ethPrice * 0.97,
        },
        xaxis: {
          //type: 'category',
          //tickAmount: 8,
          //range : 15,
          //overwriteCategories: true,
          categories: [0,0,0,0,0,0,0,0]
        }
      },
      series: [
        {
          name: "series-1",
          data: [this.props.ethBalance * this.props.ethPrice, 0, 0, 0, 0, 0, 0, 0]
        }
      ],
      newSeries: [
        {
          name: "series-1",
          data: [this.props.ethBalance * this.props.ethPrice, 0, 0, 0,0,0, 0, 0]
        }
      ],
      newOptions : {
        chart: {
          id: "realtime",
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
            speed: 1
                  }
            },
          toolbar: {
            show: false
          },
        },
        yaxis: {
          max : this.props.ethBalance * this.props.ethPrice* 1.05,
          min : this.props.ethBalance * this.props.ethPrice * 0.95,
        },
        xaxis: {
          //type: 'category',
          //tickAmount: 8,
          //range : 15,
          //overwriteCategories: true,
          categories: [1,1,1,1,1,1,1,1]
        }
      }
    };

  this.state2 = { 
    options :{
          series: [{
          data: [this.props.ethBalance * this.props.ethPrice*1.2, this.props.ethBalance * this.props.ethPrice*1.16, this.props.ethBalance * this.props.ethPrice*1.13, this.props.ethBalance * this.props.ethPrice*1.17, this.props.ethBalance * this.props.ethPrice*1.03, this.props.ethBalance * this.props.ethPrice*0.95, this.props.ethBalance * this.props.ethPrice*1.1,this.props.ethBalance * this.props.ethPrice]
        }],
          chart: {
          id: 'realtime',
          height: 350,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Dynamic Updating Chart',
          align: 'left'
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime',
          range: 10,
        },
        yaxis: {
          max : this.props.ethBalance * this.props.ethPrice* 1.05,
          min : this.props.ethBalance * this.props.ethPrice * 0.95,
        }
        }
      };
    }

  async tick(){
      //const newSeries = [];
      /*this.state.series.map((s) => {
        const data = s.data.map(() => {
          return this.props.ethBalance * this.props.ethPrice;  //this.props.ethBalance * 
        })
        s.data
        newSeries.push({data})
      })*/
      
      /*
      const d = new Date();
      let dateTime = d.toLocaleTimeString(); //getSeconds()
      //console.log(this.state.newOptions.xaxis.categories.length, " new array length");
      //console.log(this.state.options.xaxis.categories.length, " old array length");
      //console.log("type ", typeof(this.state.options.xaxis.categories))
      //console.log(this.state.options.xaxis.categories.length)
      /////////////////////////////////////////
      //Updates graph live time when state is updateed
      if (this.state.tickCounter > 0)
      {
        this.state.newSeries[0].data.length = 8
        this.state.newSeries[0].data[this.state.newSeries[0].data.length - 8] = this.state.newSeries[0].data[this.state.newSeries[0].data.length - 7]; 
        this.state.newSeries[0].data[this.state.newSeries[0].data.length - 7] = this.state.newSeries[0].data[this.state.newSeries[0].data.length - 6]; 
        this.state.newSeries[0].data[this.state.newSeries[0].data.length - 6] = this.state.newSeries[0].data[this.state.newSeries[0].data.length - 5];
        this.state.newSeries[0].data[this.state.newSeries[0].data.length - 5] = this.state.newSeries[0].data[this.state.newSeries[0].data.length - 4];
        this.state.newSeries[0].data[this.state.newSeries[0].data.length - 4] = this.state.newSeries[0].data[this.state.newSeries[0].data.length - 3];
        this.state.newSeries[0].data[this.state.newSeries[0].data.length - 3] = this.state.newSeries[0].data[this.state.newSeries[0].data.length - 2];
        this.state.newSeries[0].data[this.state.newSeries[0].data.length - 2] = this.state.newSeries[0].data[this.state.newSeries[0].data.length - 1];
        this.state.newSeries[0].data[this.state.newSeries[0].data.length  - 1 ] = this.props.ethBalance * this.props.ethPrice; 
        
        //console.log(this.state.tickCounter,"before add - ",this.state.newOptions.xaxis.categories);
      this.state.newOptions.xaxis.categories.length = 8
      this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 8] = this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 7]; 
      this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 7] = this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 6]; 
      this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 6] = this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 5];
      this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 5] = this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 4];
      this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 4] = this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 3];
      this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 3] = this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 2];
      this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 2] = this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length - 1];
      this.state.newOptions.xaxis.categories[this.state.newOptions.xaxis.categories.length  - 1 ] = dateTime; 
      
      //console.log(" 0 after add - ",this.state.newOptions.xaxis.categories[6]);  
      //console.log("lg ",this.state.series[0].data)
      this.setState({options : {xaxis : {categories : this.state.newOptions.xaxis.categories}}})
      //this.setState({
      //  series: {categories : this.state.newCategories}
      //}) 
      this.state.tickCounter--
      //console.log(" 1 after add - ",this.state.newOptions.xaxis.categories);
      //console.log(" 1 after add - ",newOptions.xaxis.categories);
        
      }
      else 
        {
        this.setState({tickCounter : 8})
        }
      
        this.setState({
          series: this.state.newSeries
          })
      */

      const d2 = new Date();
      let dateTime2 = d2.toLocaleTimeString();
      this.setState({
        time: dateTime2
      })
      }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
    /*
    live chart - hard to keep historical data could query from bscscan block later
    <div id = "Chart" className="mixed-chart">
        <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            width="550"
          />
          </div>

          <tr>
              <td>DOGE </td>
              <td> {parseFloat(this.props.dogeBalance).toFixed(4)}</td>
              <td> ${parseFloat(this.props.PancakeDogeArbPrice * this.props.dogeBalance).toFixed(2)}</td>
              <td> <font color={"green"}>${parseFloat(this.props.PancakeDogeArbPrice).toFixed(2)} </font></td>
            </tr> 
    */
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <form className="md">
        <div>
           BNB Balance : ${parseFloat(this.props.bnbBalance * this.props.PancakeArbPrice).toFixed(5)} @ {this.state.time}
          </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
            }}>
        <Chart options={this.statePie.options} series={this.statePie.series} type="donut" width="280" />
        </div>
        <div>&nbsp;&nbsp;&nbsp; </div>
        <div className="input-group mb-4">
          <input
            type= "text"
            value = {this.state.toAddress}
            ref={(input2) => { this.input2 = input2 }}
            onChange={(event) => {
              
                //web3.eth.getBalance(this.state.address)
                const etherAddress = this.input2.value.toString()
                this.setState({
                  toAddress: etherAddress
                })
              }}
            //styles = {input2}
            //ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="Add Token By Contract"
          required />
          <button type="submit" className="btn btn-primary btn-block btn-sm">Add Asset</button>
        </div>
        <table>
               <thead>
                <tr>
                  <th>Token</th>
                  <th>Amount</th>
                  <th>Value</th>
                  <th>Price</th>
                </tr>
               </thead>
            <tbody>
            <tr>
              <td>BNB </td>
              <td> {parseFloat(this.props.bnbBalance).toFixed(4)}</td>
              <td>  ${parseFloat(this.props.PancakeArbPrice * this.props.bnbBalance).toFixed(2)} </td>
              <td>  <font color={(this.props.BiswapArbPrice < this.props.PancakeArbPrice) ? "red" :"green"}>${parseFloat(this.props.PancakeArbPrice).toFixed(2)} </font></td>
            </tr>
            <tr>
              <td>ETH </td>
              <td> {parseFloat(this.props.ethBalance).toFixed(4)}</td>
              <td> ${parseFloat(this.props.PancakeEthArbPrice * this.props.ethBalance).toFixed(2)}</td>
              <td>  <font color={(this.props.BiswapEthArbPrice < this.props.PancakeEthArbPrice) ? "red" :"green"}>${parseFloat(this.props.PancakeEthArbPrice).toFixed(2)} </font></td>
            </tr>
            <tr>  
              <td>BTCB </td>
              <td> {parseFloat(this.props.btcbBalance).toFixed(4)}</td>
              <td> ${parseFloat(this.props.PancakeBtcbArbPrice * this.props.btcbBalance).toFixed(2)}</td>
              <td>  <font color={(this.props.BiswapBtcbArbPrice < this.props.PancakeBtcbArbPrice) ? "red" :"green"}>${parseFloat(this.props.PancakeBtcbArbPrice).toFixed(2)} </font></td>
            </tr>
            <tr>
              <td>ADA </td>
              <td> {parseFloat(this.props.adaBalance).toFixed(4)}</td>
              <td> ${parseFloat(this.props.PancakeAdaArbPrice * this.props.adaBalance).toFixed(2)}</td>
              <td> <font color={"green"}>${parseFloat(this.props.PancakeAdaArbPrice).toFixed(2)} </font></td>
            </tr> 
            <tr>
              <td>LTC </td>
              <td> {parseFloat(this.props.ltcBalance).toFixed(4)}</td>
              <td>${parseFloat(this.props.PancakeLtcArbPrice * this.props.ltcBalance).toFixed(2)}</td>
              <td> <font color={"green"}>${parseFloat(this.props.PancakeLtcArbPrice).toFixed(2)} </font></td>
            </tr>  
            <tr>
              <td>DAI </td>
              <td> {parseFloat(this.props.daiBalance).toFixed(4)}</td>
              <td> 1.00 </td>
              <td> 1.00 </td>
            </tr> 
            <tr>  
              <td>BUSD </td>
              <td> {parseFloat(this.props.busdBalance).toFixed(4)}</td>
              <td> 1.00 </td>
              <td> 1.00 </td>
            </tr>
            <tr>
              <td>DOGE </td>
              <td> Coming Soon </td>
              <td> I/P </td>
              <td> I/P </td>
            </tr> 
            <tr>
              <td>AVAX </td>
              <td> Coming Soon </td>
              <td> I/P </td>
              <td> I/P </td>
            </tr>
            <tr>
              <td>AFSW </td>
              <td> {parseFloat(this.props.afswBalance).toFixed(4)}</td>
              <td>  <font color={"red"}>${parseFloat(0.0000001 * this.props.afswBalance).toFixed(2)}</font></td>
              <td>  <font color={"red"}>Coming Soon </font></td>
            </tr>  
            </tbody>
          </table> 
      </form>
     
    );
  }
}

export default DashboardForm;

/*
<PieChart
            text = "Portfolio"
            data={[
              { title: 'BTC', value: 5, color: '#E38627' },
              { title: 'ETH', value: 80, color: '#C13C37' },
              { title: 'DAI', value: 15, color: '#6A2135' },
            ]}
            radius = {25}
          />
        <tbody>
        <table>
        <tr>
          <th>Exchange</th>
          <th>Type</th>
          <th>Pairs</th>
          <th>Value</th>
          <th>Fees</th>
          <th>Date</th>
        </tr>
        <tr>
          <td>Sushiswap</td>
          <td>Limit</td>
          <td>WBTC/DAI</td>
          <td>1050.56</td>
          <td>0.50</td>
          <td>10/2/2021</td>
        </tr>
        <tr>
          <td>Uniswap</td>
          <td>Arbitrage</td>
          <td>DAI/ETH</td>
          <td>357.56</td>
          <td>0.24</td>
          <td>10/1/2021</td>
        </tr>
      </table>
      </tbody>


this.state.options.map((x) => {
        const xaxis = x.xaxis.map(() => {
          //const cat = x.xaxis.categories.map(() =>{
          return dateTime;  //this.props.ethBalance * 
        //})
        })
        newOptions.push({xaxis})
      })*/  
        //newSeries.push({ categories: date })
      
      //newSeries.push({ categories: date })
      /* this.state.options.map((s) => {
        const xaxis = s.axis.map((s) => {
          s.name = date;
          return date;
        })
        newSeries.push({ xaxis, categories: date })
      })*/


      
