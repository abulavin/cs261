import React, { Component } from "react";
import { GetReportProxy, ReportURLProxy } from "../BackendProxy";
import {download} from "downloadjs";

export default class CorrectionsTable extends Component {
    constructor(props){
        super(props);
        this.getRowsData = this.getRowsData.bind(this);

    }

    
    getRowsData = function(){
        var items = this.props.errors;
        return items.map((row, index)=>{
        return <tr key={index}>
            <td>{this.props.errors[index][0]}</td>
            <td>{this.props.errors[index][1]}</td>
            <td>{this.props.errors[index][2]}</td>
        </tr>
        })
    }
    render() {
        if (!this.props.errors[0]) return null;
        return (
            <React.Fragment>
                <div className="errortable">
                    <table>
                        <thead>
                        <tr>
                            <th>Field</th>
                            <th>Suggested Correction</th>
                            <th>Error</th>
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