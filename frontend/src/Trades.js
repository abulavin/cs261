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

  getTradesByPage = (page) => {
    this.props.getListOfTrades(page)
      .then(trades => console.log(trades))
      .catch(error => { throw error });
  }

  getTradesByID = (tradeID) => {
    let id = this.ref.tradeID.value;
    console.log(id);
    // this.props.getProxy.getTradeByID(id)
    //   .then(trade => console.log(trade));
  }

  deleteTradeByID = (tradeID) => {
    let id = this.ref.tradeID.value;
    this.props.deleteProxy.deleteTrade(id);
  }

  render() {
    return (
      <div>
        <h2> This will be the editing/deleting/viewing trades page!</h2>
        <button onClick={this.getTrades}>Get Trades</button>
        <button onClick={this.getTradesByID}>Get Trade</button>
        <button onClick={this.deleteTradeByID}>Delete</button>
      </div>
    );
  }
}

export default Trades;