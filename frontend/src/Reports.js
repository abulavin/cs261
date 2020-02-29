import React, { Component } from "react";
import { GetReportProxy } from "./BackendProxy";

class Reports extends Component {

    constructor() {
        super()
        this.reportProxy = new GetReportProxy();
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
            <div>
                <h2> This will be the reports page!</h2>
                <button onClick={this.getListOfReports}>Get reports</button>
                <button onClick={this.getReportsAfter}>Get After 2020-02-28</button>
                <button onClick={this.getReportsBefore}>Get reports before 2020-02-28</button>
                <button onClick={this.getReportsOn}>Get reports on 2020-02-28</button>
            </div>
        );
    }
}

export default Reports;