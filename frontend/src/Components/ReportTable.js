import React, { Component } from "react";
import ReportModal from './ReportModal.js';

export default class ReportTable extends Component {
    constructor(props){
        super(props);
        this.getRowsData = this.getRowsData.bind(this);
    }

    // use this function to iterate through the json and return body part of the table
    getRowsData = function() {
        var items = this.props.data;
        return items.map((row, index)=>{
        return <tr key={index}>
            {/* <RenderRow key={index} data={row} keys={keys}/> */}
            <td> {this.props.data[index].date}</td>
            <td>
                <button onClick={() => this.openReport(this.props.data[index].report)}> View Report </button> 
                {/* <ReportModal data={this.props.data[index].report}/>   */}
            </td>
            <td>
                <button onClick={() => this.downloadReport(this.props.data[index].report)}> Download Report </button>
            </td>
              
        </tr>
        })
    }

    openReport = (report) => {

    }

    downloadReport = (report) => { 

    }

    render() {
        if (!this.props.data[0]) return null;
        return (
            <React.Fragment>
                <div className="reporttable">
                    {/* onkeyup search for item function */}
                    <input type="text" id="searchinput" onkeyup="" placeholder="Search for .."></input>
                    <table id="tableview">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>View</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {this.getRowsData()}
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
    return props.keys.map((key, index)=>{
      return <td key={props.data[key]}>{props.data[key]}</td>
      })
  }