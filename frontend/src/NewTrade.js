import React, { Component } from "react";
import {CreateTradeProxy} from "./BackendProxy";
 
class NewTrade extends Component {

  sendCreatePostRequest() {
    const exampleTrade =   {
      date_of_trade: "2020-02-02",
      trade_id: "1",
      product: "1",
      buying_party: "1",
      selling_party: "1",
      notational_amount: 1.0,
      quantity: 1.0,
      notational_currency: "1",
      maturity_date: "2020-02-20",
      underlying_price: 1.0,
      underlying_currency: "1",
      strike_price: 1.0
  };
    let proxy = new CreateTradeProxy();
    proxy.createTrade(exampleTrade);
  }

  render() {
    return (
      <div>
        <h2> This will be the trade creation page!</h2>
        <button className='NavBtn' onClick={this.sendCreatePostRequest}>Send</button>
      </div>
    );
  }
}
 
export default NewTrade;