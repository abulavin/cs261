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

    getTradeByID = (tradeID) => {
        tradeID = 'TEST101'
        this.props.getProxy.getTradeByID(tradeID)
            .then(trade => console.log(trade));
    }

    getFilteredTrades = (filter) => {

    }

    render() {
        return (
            <div>
                <h2> This will be the editing/deleting/viewing trades page!</h2>
                <button onClick={this.getFilteredTrades}>Get Trades</button>
            </div>
        );
    }
}
export default Trades;