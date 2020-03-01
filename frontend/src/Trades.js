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
    this.state = {
      tr: [],
      count: 1
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
    
    this.getProxy.getListOfTrades(this.state.count+1)
        .then(trades => {
          this.setState({tr: trades.results})
          console.log(this.state.tr)
        })
        .catch(error => {
          throw error;
        });
  }

  getPrevPageTrade = () => {
    this.setState({
      tr: [],
      count: this.state.count - 1 })
    console.log(this.state.count)
    this.getProxy.getListOfTrades(this.state.count-1)
        .then(trades => {
          this.setState({tr: trades.results})
          console.log(this.state.tr)
        })
        .catch(error => {
          throw error;
        });
  }

  getTradeByID = (tradeID) => {
    tradeID = 'TEST101'
    this.props.getProxy.getTradeByID(tradeID)
      .then(trade => console.log(trade));
  }

  refreshPage () {
    window.location.reload();
  }

  getFilteredTrades = (filter) => {
      filter = {
          notional_currency: "USD"
      }
      this.getProxy.getFilteredTrades(filter)
                   .then(filteredTrades => {
                    this.setState({tr: filteredTrades.results})
                    console.log(filteredTrades.results) })
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
          <Label>Filter by currency: </Label>
          <select id="heading" name="heading" onChange={this.getFilteredTrades}>
            <option> - </option>
            <option value="heading" >USD</option>
          </select>
        </div>
        <div className="tradetable">
          {/* if page number == max page number then disable next page button */}
          <button onClick={this.getPrevPageTrade}> previous page </button>
          <button onClick={this.getTradesByPage}> next page </button>
          {this.state.tr ? <Table data={this.state.tr}/> : null }
          <button onClick={this.getTradesByPage}> next page </button>
        </div>
        <button onClick={this.getFilteredTrades}>Filter to USD</button>
        <button onClick={this.refreshPage}> Remove Filters </button>
      </React.Fragment>
    );
  }
}
export default Trades;
