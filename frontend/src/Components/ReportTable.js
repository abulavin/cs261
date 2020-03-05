import React, { Component } from "react";
import { GetReportProxy, ReportURLProxy } from "../BackendProxy";
import {download} from "downloadjs";

export default class ReportTable extends Component {
    constructor(props){
        super(props);
        this.getRowsData = this.getRowsData.bind(this);
        this.reportProxy = new GetReportProxy();
        this.reportURLProxy = new ReportURLProxy();
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
                <button onClick={() => this.downloadReport(this.props.data[index])}> Download Report </button>
            </td>

        </tr>
        })
    }

    openReport = (link) => {
        this.reportURLProxy.getReportURL(link).then(report => {
            const pdf = new Blob(
              [report],
              {type: 'application/pdf'});
            console.log(report)
            //Build a URL from the file
            const fURL = URL.createObjectURL(pdf);
            //Open the URL on new Window
            window.open(fURL);
          })
          .catch(error => console.log(error.statusText, error.status));
    }

    downloadReport = (data) => {
        this.reportURLProxy.getReportURL(data.report).then(report => {
            const pdf = new Blob(
              [report],
              {type: 'application/pdf'});
            console.log(report)
            //Build a URL from the file
            const url = window.URL.createObjectURL(pdf);
            //Open the URL on new Window
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report-'+(data.date)+'.pdf');
            document.body.appendChild(link);
            link.click();
          })
          .catch(error => console.log(error.statusText, error.status));    
    }

    render() {
        if (!this.props.data[0]) return null;
        return (
            <React.Fragment>
                <div className="reporttable">
                    <table id="tableview">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>View</th>
                                <th>Download</th>
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