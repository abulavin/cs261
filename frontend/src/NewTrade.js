import React, { Component } from "react";
import {CreateTradeProxy} from "./BackendProxy";
 
class NewTrade extends Component {

  constructor(props) {
    super(props);

    this.props.createProxy = new CreateTradeProxy();
  }

  sendTrade = (trade) => {
      trade = {
        date_of_trade: "2020-02-02",
        trade_id: "TEST101",
        product: "1",
        buying_party: "1",
        selling_party: "1",
        notational_amount: 1.0,
        quantity: 1.0,
        notational_currency: "USD",
        maturity_date: "2020-02-20",
        underlying_price: 1.0,
        underlying_currency: "USD",
        strike_price: 1.0
    };
    this.props.createProxy.createTrade(trade);
  }

  render() {
    return (
      <div>
        <h2> This will be the trade creation page!</h2>
        <button className='NavBtn' onClick={this.sendTrade}>Send</button>
      </div>
    );
  }
}
 
export default NewTrade;