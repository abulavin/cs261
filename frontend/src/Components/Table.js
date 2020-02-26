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
    // return Object.keys(this.props.data[0]);
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
  
  }

  // create function so if trade date to current date is within a week, then render edit button

  // create function that deletes a row from the table

  // render drop down menu for each row with delete function

  // IF trade is editable, then add EDIT option in the drop down menu
  
 
  render() {
    return (
      <React.Fragment>
        <div className="tradetable">
            {/* onkeyup search for item function */}
            <input type="text" id="searchinput" onkeyup="" placeholder="Search for .."></input>
            <table id="tableview">
            <thead>
                <tr>Headings from backend{this.getHeader()}
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>Rows from backend{this.getRowsData()}
                    <td> 
                        <EditModal/>
                        {/* if trade is editable, render edit button */}
                    </td>
                    <td> 
                        <DeleteModal/>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
       
      </React.Fragment>
    );
  }

}
// use this to return individual rows of the table
const RenderRow = (props) =>{
  
}


 