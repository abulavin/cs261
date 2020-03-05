import React, { Component } from "react";
import ReportTable from './Components/ReportTable.js';
import { GetReportProxy } from "./BackendProxy";
import {Input, Label } from "reactstrap";


class Reports extends Component {
  constructor(props){
    super(props);
    this.reportProxy = new GetReportProxy();
    this.state = {
      rep: [],
      count: 2,
      date: ""
    }
  }

  componentDidMount() {
    this.reportProxy.getListOfReports()
      .then(reports => {
        this.setState({rep: reports.results})
        console.log(reports)
      })
  }

  getListOfReports = () => {
      this.reportProxy.getListOfReports()
          .then(reports => this.setState({rep: reports.results}));
  }

  getReportsAfter = () => {
      this.reportProxy.getReportsAfter(this.state.date)
          .then(reports => this.setState({rep: reports.results}));
  }

  getReportsBefore = () => {
      this.reportProxy.getReportsBefore(this.state.date)
          .then(reports => this.setState({rep: reports.results}))
  }
  
  getReportsOn = () => {
      this.reportProxy.getReportsOn(this.state.date)
          .then(reports => this.setState({rep: reports.results}));
  }

  handleChange = (event) => {
    let val = event.target.value
    this.setState({date: val})
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h2> Use this page to view and download reports.</h2>
          <Label>Enter a date: </Label>
          <Input 
                id="reportinput"
                type="date" 
                name="reportinput" 
                placeholder="Enter date.."
                onChange={this.handleChange}
          />
          <button onClick={this.getReportsAfter}>Get Reports After {this.state.date}</button>
          <button onClick={this.getReportsBefore}>Get Reports Before {this.state.date}</button>
          <button onClick={this.getReportsOn}>Get Reports On {this.state.date}</button>
          <button onClick={this.getListOfReports}>Get all reports</button>
        </div>

        {this.state.rep ? <ReportTable data={this.state.rep}/> : null }
  
    </React.Fragment>
    );
  }
}
export default Reports;
