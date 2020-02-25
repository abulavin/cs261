import React, { Component } from "react";
import {Label } from "reactstrap";
import ReportModal from './Components/ReportModal.js';
 
class Reports extends Component {
  constructor(props){
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }
  // use this function to get the table heading values
  getKeys = function(){

  }
  // use this function to populate header with headings
  getHeader = function(){
  
  }
  // use this function to iterate through the json and return body part of the table
  getRowsData = function(){
  
  }
  render() {
    return (
      
      <React.Fragment>
      <div>
        <h2> Use this page to view and download reports.</h2>
      </div>

      <div className="reportoptions"> 
        <Label>Filter by: </Label>
              <select id="heading" name="heading">
                <option value="heading">Heading1</option>
              </select>
      </div>
      <div className="reporttable">
        {/* onkeyup search for item function */}
        <input type="text" id="searchinput" onkeyup="" placeholder="Search for .."></input>
        <table>
          <thead>
            <tr>Headings from backend{this.getHeader()}
                <th>View</th>
                <th>Download</th>
            </tr>
            </thead>
            <tbody>
                <tr>Rows from backend{this.getRowsData()}
                    <td> 
                        <ReportModal/>
                        {/* if trade is editable, render edit button */}
                    </td>
                    <td> 
                        <button > Download</button>
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
export default Reports;