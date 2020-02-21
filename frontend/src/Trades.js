import React, { Component } from "react";
import {Label } from "reactstrap";
 
class Trades extends Component {
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
          <h2> This will be the editing/deleting/viewing trades page!</h2>
        </div>

        <div className="tradeoptions"> 
          <Label>Filter by: </Label>
                <select id="heading" name="heading">
                  <option value="heading">Heading1</option>
                </select>
        </div>
        <div className="tradetable">
          <table>
            <thead>
              <tr>Headings from backend{this.getHeader()}</tr>
            </thead>
            <tbody>
              Rows from backend{this.getRowsData()}
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
 
export default Trades;

