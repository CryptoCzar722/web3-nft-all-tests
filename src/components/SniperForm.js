import React, { Component } from 'react';  
//import ReactTable from "react-table";   
//import "react-table/react-table.css";  

class SniperForm extends Component {  
  render() {  
     const data = [{  
        name: 'Ayaan',  
        age: 26  
        },{  
         name: 'Ahana',  
         age: 22  
         },{  
         name: 'Peter',  
         age: 40      
         },{  
         name: 'Virat',  
         age: 30  
         },{  
         name: 'Rohit',  
         age: 32  
         },{  
         name: 'Dhoni',  
         age: 37  
         }]  
     const columns = [{  
       Header: 'Coin',  
       accessor: 'name'  
       },
       {  
       Header: 'Age',  
       accessor: 'age'  
       }
        ]  

    return (  
        <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
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
          }
        }>
          <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ maxWidth: '200px', justifyContent:'center'}}>{!this.props.BotActive ? "Start Sniper Bot" : "Stop Sniper Bot"}</button>
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
        </form>
    )  
    }  
}  
export default SniperForm; 