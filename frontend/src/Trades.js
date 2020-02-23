import React, { Component } from "react";
import { GetTradeProxy } from "./BackendProxy";
 
class Trades extends Component {

  getTrades() {
    let proxy = new GetTradeProxy();
    console.log(proxy.getListOfTrades());
  }

  render() {
    return (
      <div>
        <h2> This will be the editing/deleting/viewing trades page!</h2>
        <div onClick={this.getTrades()}>Get Trades</div>
      </div>
    );
  }
}
 
export default Trades;