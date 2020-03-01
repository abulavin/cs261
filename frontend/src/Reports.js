import React, { Component } from "react";
import ReportTable from './Components/ReportTable.js';
import { GetReportProxy } from "./BackendProxy";
import {Label } from "reactstrap";


class Reports extends Component {
  constructor(props){
    super(props);
    this.reportProxy = new GetReportProxy();
    this.state = {
      rep: [],
      count: 2
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
          .then(reports => console.log(reports));
  }

  getReportsAfter = (date) => {
      this.reportProxy.getReportsAfter("2020-02-28")
          .then(reports => console.log(reports));
  }

  getReportsBefore = (date) => {
      this.reportProxy.getReportsBefore("2020-02-28")
          .then(reports => console.log(reports))
  }
  getReportsOn = (date) => {
      this.reportProxy.getReportsOn("2020-02-28")
          .then(reports => console.log(reports));
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h2> Use this page to view and download reports.</h2>
          <button onClick={this.getListOfReports}>Get reports</button>
          <button onClick={this.getReportsAfter}>Get After 2020-02-28</button>
          <button onClick={this.getReportsBefore}>Get reports before 2020-02-28</button>
          <button onClick={this.getReportsOn}>Get reports on 2020-02-28</button>
        </div>

        <div className="reportoptions">
          <Label>Filter by: </Label>
                <select id="heading" name="heading">
                  <option value="heading">Heading1</option>
                </select>
        </div>
        {this.state.rep ? <ReportTable data={this.state.rep}/> : null }
  
    </React.Fragment>
    );
  }
}
export default Reports;
