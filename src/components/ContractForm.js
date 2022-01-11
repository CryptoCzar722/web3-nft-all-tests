import React, { Component } from 'react'
import insuranceLogo from '../Insurance.png'

class ContractForm extends Component {
        
        constructor(props) {
          super(props);
          this.state = { seconds : 0};//localStorage.getItem("Timer")  };
        }
        
        tick() {
            localStorage.setItem('Timer', 0)
            //console.log('time tick ',parseInt(localStorage.getItem("Timer").toString()))
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
          this.interval = setInterval(() => this.tick(), 100);
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
              Variable Smart Contracts Coming Soon!
            </div>
            <div>
              Seconds: {this.state.seconds / 10} 
            </div>
            <div>
            <img src= {insuranceLogo}/>
            </div>
            
            </form>
          );
        }
      }
      
      export default ContractForm;
  