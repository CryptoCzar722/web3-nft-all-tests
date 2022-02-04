import React, { Component } from 'react'
import sibmLogo from '../sibm-logo.png'


import './App.css'

class NFTCard extends Component {
        
        constructor(props) {
          super(props);
          this.state = { 
              test: ""
            };
          //  this.rollDoneCallback1 = this.rollDoneCallback1.bind(this);
        }
 
        componentDidMount() {

        }
        
        async componentWillMount() {
        }

        async componentWillUnmount() {
          
        }
        
        render() {
            //console.log(new Date());
          return (
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                }}>
            <div className='card'>
                <div className='card-content'>
                    <div className='card-content_overlay'></div>
                    <svg
                        className='card-content_overlay-eye'
                        width='48'
                        height='48'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <g fill='none' fill-rule='evenodd'>
                        <path d='M0 0h48v48H0z' />
                        <path
                            d='M24 9C14 9 5.46 15.22 2 24c3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15Zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10Zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6Z'
                            fill='#FFF'
                            fill-rule='nonzero'
                        />
                        </g>
                    </svg>

                    <img className='card-content_img' src={this.props.nftImageUri} alt='' width = "125" height = "220" />
                    </div>
                    <div className='card-content_details'>
                        <p className='card-content_details-title'>Equilibrium #3429</p>
                        <p className='card-content_details-explanation'>
                            Our Equilibrium collection promotes balance and calm.
                        </p>
                    </div>
                    <div className='card-content_meta'>
                        <div className='card-content_meta-left'>
                        <p>0.041 bnb</p>
                        </div>
                        <div className='card-content_meta-right'>
                        <svg
                            className='card-content_meta-left-clock'
                            viewBox='0 2 20 15'
                            width='17'
                            height='17'
                        >
                            <path
                            d='M8.305 2.007a6.667 6.667 0 1 0 0 13.334 6.667 6.667 0 0 0 0-13.334Zm2.667 7.334H8.305a.667.667 0 0 1-.667-.667V6.007a.667.667 0 0 1 1.334 0v2h2a.667.667 0 0 1 0 1.334Z'
                            fill='#8BACD9'
                            />
                        </svg>
                        <p>3 days left</p>
                        </div>
                    </div>
                    <div className='card-content_user'>
                    <img className='card-content_user-avatar' src={sibmLogo} alt='Avatar' />
                    <div className='card-content_user-name'>
                        <p>
                        Owner <span> </span>
                        </p>
                    </div>
                    </div>
            </div>
           </form>
          );
        }
      }
      
      export default NFTCard;
  
     

      