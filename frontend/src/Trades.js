import React, { Component } from "react";
import {Label } from "reactstrap";
import Clock from 'react-live-clock';
import Table from './Components/Table.js';
import EditModal from './Components/EditModal.js';
 
class Trades extends Component {
  render() {
    return (
      <React.Fragment>
        
        <div className = "tradetitle">
          <h2> Use this page to edit, delete and view trades.</h2>
          <h5> Trades are only editable if they are not older than a week.</h5>
          <h4 className = "datetime"> Current Date and Time (GMT):
            <Clock format=" dddd, DD MMMM YYYY, HH:mm:ss" interval={1000} ticking={true} timezone={'UK/GMT'} />
          </h4>
        </div>

        <div className="tradeoptions"> 
          <Label>Filter by: </Label>
                <select id="heading" name="heading">
                  <option value="heading">Heading1</option>
                </select>
        </div>
        <div className="tradetable">
          {/* this component accepts the JSON data */}
          <Table/>
        </div>
        <EditModal/>

      </React.Fragment>
    );
  }

}

export default Trades;

