import React, { Component } from "react";
import { GetTradeProxy, DeleteTradeProxy, UpdateTradeProxy } from "./BackendProxy";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Clock from 'react-live-clock';
import Table from './Components/Table.js';

class Trades extends Component {

  constructor(props) {
    super(props);
    this.getProxy = new GetTradeProxy();
    this.deleteProxy = new DeleteTradeProxy();
    this.state = {
      tr: [],
      count: 1,
      chosen: "",
      searchinput: "",
      filter: {}
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
      this.getProxy.getFilteredTrades(filter)
                   .then(filteredTrades => {
                    this.setState({tr: []})
                    this.setState({tr: filteredTrades.results})
                    this.setState({searchinput: ""})
                    console.log(filteredTrades.results) })
  }

  getFilterCurrency = (filter) => {
    filter = {
      notional_currency: "USD"
    }
    this.getProxy.getFilteredTrades(filter)
                 .then(filteredTrades => {
                  this.setState({tr: []})
                  this.setState({tr: filteredTrades.results})
                  console.log(filteredTrades.results) })
}

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val})
    console.log(nam, val)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.chosen, this.state.searchinput)
    console.log(this.state.filter)
    this.setState({filter: this.state.filter[this.state.chosen] = this.state.searchinput})
    this.getFilteredTrades(this.state.filter);
    this.setState({filter: {}})
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
          <select id="currfilter" name="chosen" onChange={this.getFilterCurrency}>
            <option> - </option>
            <option value="USD" >USD</option>
          </select>
          <button onClick={this.refreshPage}> Remove Filters </button>
        </div>
        <div>
          <Form>
            <FormGroup>
              <Label>Search by heading: </Label>
              <select id="headingfilter" name="chosen" onChange={this.handleChange}>
                <option> - </option>
                <option value="date_of_trade" >Date of Trade</option>
                <option value="trade_id" >Trade ID</option>
                <option value="product" >Product</option>
                <option value="buying_party" >Buying Party</option>
                <option value="selling_party" >Selling Party</option>
                <option value="notional_amount" >Notional Amount</option>
                <option value="quantity" >Quantity</option>
                <option value="notional_currency" >Notional Currency</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Input 
                id="searchinput"
                type="text" 
                name="searchinput" 
                placeholder="Search for .."
                onChange={this.handleChange}/>
              <button onClick={this.handleSubmit}>Apply Search</button>
            </FormGroup>
          </Form>
        </div>
        <div className="tradetable">
          {/* if page number == max page number then disable next page button */}
          <button onClick={this.getPrevPageTrade}> previous page </button>
          <button onClick={this.getTradesByPage}> next page </button>
          {this.state.tr ? <Table data={this.state.tr}/> : null }
          <button onClick={this.getPrevPageTrade}> previous page </button>
          <button onClick={this.getTradesByPage}> next page </button>
        </div>
       
      </React.Fragment>
    );
  }
}
export default Trades;
