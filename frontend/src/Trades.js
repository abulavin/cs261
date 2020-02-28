import React, { Component } from "react";
import { GetTradeProxy, DeleteTradeProxy } from "./BackendProxy";
import {Label } from "reactstrap";
import Clock from 'react-live-clock';
import Table from './Components/Table.js';

class Trades extends Component {

  state = {
    tr: []
  }

  constructor(props) {
    super(props);
    this.getProxy = new GetTradeProxy();
    this.deleteProxy = new DeleteTradeProxy();
  }

  componentDidMount() {
    this.getProxy.getListOfTrades()
      .then(trades => console.log(trades))
        
        // this.setState({tr: trades.results})
        // console.log(this.state.tr)
      // })
      .catch(error => { throw error });
  }

  getTrades = () => {
    
  }

  getTradesByPage = (page) => {
    this.props.getListOfTrades(page)
      .then(trades => console.log(trades))
      .catch(error => { throw error });
  }

  getTradeByID = (tradeID) => {
    tradeID = 'TEST101'
    this.props.getProxy.getTradeByID(tradeID)
      .then(trade => console.log(trade));
  }

  render() {
    return (
      <React.Fragment>
        <div className = "tradetitle">
          <h2> Use this page to edit, delete and view trades.</h2>
          <h5> Trades are only editable if they are not older than a week.</h5>
         
          <h4 className = "datetime"> Current Date and Time (GMT):
            <Clock format=" dddd, DD MMMM YYYY, HH:mm:ss" interval={1000} ticking={true}/>
            {/* timezone={} */}
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
          <Table data={this.state.tr}/>
        </div>

      </React.Fragment>
    );
  }

}

export default Trades;
