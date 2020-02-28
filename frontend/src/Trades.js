import React, { Component } from "react";
import { GetTradeProxy, DeleteTradeProxy } from "./BackendProxy";
import {Label } from "reactstrap";
import Clock from 'react-live-clock';
import Table from './Components/Table.js';

class Trades extends Component {

  state = {
    tr: [],
    count: 2
  }

  constructor(props) {
    super(props);
    this.getProxy = new GetTradeProxy();
    this.deleteProxy = new DeleteTradeProxy();
  }

  componentDidMount() {
    this.getProxy.getListOfTrades()
      .then(trades => {
        this.setState({tr: trades.results})
        console.log(this.state.tr)
      })
      .catch(error => { throw error });
  }

  getTradesByPage = () => {
    this.setState({ 
      tr: [],
      count: this.state.count + 1 })
    console.log(this.state.count)
    this.getProxy.getListOfTrades(this.state.count)
        .then(trades => {
          this.setState({tr: trades.results})
          console.log(this.state.tr)
        })
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
          <h3 className = "datetime"> Use this page to edit, delete and view trades. Current Date and Time (GMT):
            <Clock format=" dddd, DD MMMM YYYY, HH:mm:ss" interval={1000} ticking={true}/>
            {/* timezone={} */}
          </h3>
        </div>

        <div className="tradeoptions">
          <button onClick={this.getTradesByPage}> next page </button>
          <Label>Filter by: </Label>
                <select id="heading" name="heading">
                  <option value="heading">Heading1</option>
                </select>
        </div>
        <div className="tradetable">
          {this.state.tr ? <Table data={this.state.tr}/> : null }
          <button onClick={this.getTradesByPage}> next page </button>
        </div>
        
      </React.Fragment>
    );
  }

}

export default Trades;
