 import React, { Component } from 'react'
//import ReactDOM from 'react-dom';
//import './App.css'
import Chart from "react-apexcharts";

class AccumulationForm extends Component {
        
        constructor(props) {
          super(props);
          this.state = { seconds : 0};//localStorage.getItem("Timer")  };
        }
        
        tick() {
            localStorage.setItem('Timer', 0)
            console.log('time tick ',parseInt(localStorage.getItem("Timer").toString()))
        if (parseInt(localStorage.getItem("Timer"),10) > 0 )
            {
            this.setState(state => ({
                seconds: localStorage.getItem("Timer").toString() + 1
            }));
            //localStorage.setItem('Timer', this.state.seconds)
            //this.props.SetTimer(this.state.seconds)
            }
        else 
            {
            this.setState(state => ({
                seconds: state.seconds + 1
            }));
            //localStorage.setItem('Timer', this.state.seconds)
            //this.props.SetTimer(this.state.seconds)
            }
            localStorage.setItem('Timer', this.state.seconds)
        }
      
        componentDidMount() {
          //localStorage.setItem('Timer', 0)
          this.interval = setInterval(() => this.tick(), 10);
        }
      
        componentWillUnmount() {
          clearInterval(this.interval);
        }
      
        render() {
          return (
            <form className="mb-0" onSubmit={(event) => {
                event.preventDefault()
                this.setState(state => ({
                    seconds: localStorage.getItem("Timer")
                  }));
                }}>

            <div>
              Seconds: {this.state.seconds / 100} 
            </div>
            
            </form>
          );
        }
      }
      
      export default AccumulationForm;
  