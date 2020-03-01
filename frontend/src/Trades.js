import React, { Component } from "react";
import { GetTradeProxy, DeleteTradeProxy, UpdateTradeProxy } from "./BackendProxy";
import {Label } from "reactstrap";
import Clock from 'react-live-clock';
import Table from './Components/Table.js';

class Trades extends Component {

  constructor(props) {
    super(props);
    this.getProxy = new GetTradeProxy();
    this.deleteProxy = new DeleteTradeProxy();
    this.updateProxy = new UpdateTradeProxy();
    this.state = {
      tr: [],
      count: 2
    }
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
        .catch(error => {
          return null
        });
  }

  getTradeByID = (tradeID) => {
    tradeID = 'TEST101'
    this.props.getProxy.getTradeByID(tradeID)
      .then(trade => console.log(trade));
  }

  updateTrade = (tradeID) => {
      tradeID = "TEST101";
      const updatedTrade = {
          date_of_trade: "2020-02-29 12:30",
          trade_id: "TEST101",
          product: "1",
          buying_party: "2",
          selling_party: "1",
          notional_amount: 1.0,
          quantity: 1.0,
          notional_currency: "USD",
          maturity_date: "2020-02-20",
          underlying_price: 1.0,
          underlying_currency: "USD",
          strike_price: 1.0
      };
      this.updateProxy.updateTrade(updatedTrade, tradeID);
  }

  getFilteredTrades = (filter) => {
      filter = {
          notional_currency: "USD"
      }
      this.getProxy.getFilteredTrades(filter)
                   .then(filteredTrades => console.log(filteredTrades));
  }

  render() {
    return (
      <React.Fragment>
        <div className = "tradetitle">
          <h3 className = "datetime"> Use this page to edit, delete and view trades. Current Date and Time (GMT):
            <Clock format=" dddd, DD MMMM YYYY, HH:mm:ss" interval={1000} ticking={true}/>
            {/* timezone={} */}
          </h3>
          <button onClick={this.updateTrade}>Update TEST101</button>
          <button onClick={this.partiallyUpdateTrade}>Partially Update TEST101</button>
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
        <button onClick={this.getFilteredTrades}>Get Filtered Trades</button>
      </React.Fragment>
    );
  }
}
export default Trades;
