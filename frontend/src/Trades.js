import React, { Component } from "react";
import { GetTradeProxy, DeleteTradeProxy } from "./BackendProxy";

class Trades extends Component {

  constructor(props) {
    super(props);
    this.props.getProxy = new GetTradeProxy();
    this.props.deleteProxy = new DeleteTradeProxy();
  }

  getTrades = () => {
    this.props.getProxy.getListOfTrades()
      .then(trades => console.log(trades))
      .catch(error => { throw error });
  }

  getTradesByID = (tradeID) => {
    tradeID = "TEST101";
    this.props.getProxy.getTradeByID(tradeID)
      .then(trade => console.log(trade));
  }

  deleteTradeByID = (tradeID) => {
    tradeID = "TEST101";
    this.props.deleteProxy.deleteTrade(tradeID);
  }

  render() {
    return (
      <div>
        <h2> This will be the editing/deleting/viewing trades page!</h2>
        <button onClick={this.getTrades}>Get Trades</button>
        <button onClick={this.getTradesByID}>Get Trade TEST101</button>
        <button onClick={this.deleteTradeByID}>Delete TEST101</button>
      </div>
    );
  }
}

export default Trades;