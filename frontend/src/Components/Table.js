import React, { Component } from "react";
import EditModal from './EditModal.js';
import DeleteModal from './DeleteModal.js';

export default class Table extends Component {
// pass json as property to the component to display data in table form
  constructor(props){
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    
  }
  // use this function to get the table heading values
  getKeys = function(){
    return Object.keys(this.props.data[0]);
  }
  // use this function to populate header with headings
  getHeader = function(){
    // var keys = this.getKeys();
    // return keys.map((key, index)=>{
    // return <th key={key}>{key.toUpperCase()}</th>
    // })
  }
  // use this function to iterate through the json and return body part of the table
  getRowsData = function(){
    var items = this.props.data;
    var keys = this.getKeys();
    return items.map((row, index)=>{
      return <tr key={index}>
        <RenderRow key={index} data={row} keys={keys}/>
        <td><EditModal date={this.props.data[index].date_of_trade}/></td>
        <td><DeleteModal id={this.props.data[index].trade_id}/></td>      
      </tr>
    })
  }

  // create function so if trade date to current date is within a week, then render edit button

  // create function that deletes a row from the table

  // render drop down menu for each row with delete function

  // IF trade is editable, then add EDIT option in the drop down menu
  
  render() {
    if (!this.props.data[0]) return null;
    return (
      <React.Fragment>
        {/* {console.log(this.props.data)} */}
        <div className="tradetable">
            {/* onkeyup search for item function */}
            <input type="text" id="searchinput" onkeyup="" placeholder="Search for .."></input>
            <table id="tableview">
            <thead>
                <tr>
                    <th>Date of Trade</th>
                    <th>Trade ID</th>
                    <th>Product</th>
                    <th>Buying Party</th>
                    <th>Selling Party</th>
                    <th>Notional Amount</th>
                    <th>Quantity</th>
                    <th>Notional Currency</th>
                    <th>Maturity Date</th>
                    <th>Underlying Price</th>
                    <th>Underlying Currency</th>
                    <th>Strike Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
          
            <tbody>
                {this.getRowsData()}
                    
            </tbody>
            </table>
        </div>
       
      </React.Fragment>
    );
  }

}
// use this to return individual rows of the table
const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
    })
}


 