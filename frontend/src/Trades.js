import React, { Component } from "react";
import { GetTradeProxy, DeleteTradeProxy, UpdateTradeProxy } from "./BackendProxy";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Clock from 'react-live-clock';
import Table from './Components/Table.js';
import { currencyCodes } from "./currencyCodes";

class Trades extends Component {

  constructor(props) {
    super(props);
    this.getProxy = new GetTradeProxy();
    this.deleteProxy = new DeleteTradeProxy();
    this.updateProxy = new UpdateTradeProxy();
    this.state = {
      tr: [],
      count: 1,
      maxpage: 0,
      chosen: "",
      searchinput: "",
      filter: {}
    }
  }

  componentDidMount() {
    this.getProxy.getListOfTrades()
      .then(trades => {
        this.setState({tr: trades.results})
        var maxPages = Math.ceil(trades.count/100);
        this.setState({maxpage: maxPages})
        console.log(this.state.tr)
      })
      .catch(error => { throw error });
  }
  
  getTradesByPage = () => {
    if (this.state.count!=this.state.maxpage) {
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
            console.log(error)
            alert("No more pages")
          });
    }
    else {
      return null
    }
  }

  getPrevPageTrade = () => {
    if (this.state.count == 1) {
      return null
    }
    else {
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
  }

  refreshPage () {
    window.location.reload();
  }

  getFilteredTrades = (filter) => {
      this.getProxy.getFilteredTrades(filter)
                   .then(filteredTrades => {
                    if (filteredTrades.results.length == 0) {
                      alert("No trades found")
                    }
                    else {
                      this.setState({tr: []})
                      this.setState({tr: filteredTrades.results})
                      console.log(filteredTrades.results) 
                    }
                  })
                    
  }

  getFilterCurrency = (event,filter) => {
    filter = {
      [event.target.name]: event.target.value
    }
    console.log(filter)
    
    this.getProxy.getFilteredTrades(filter)
                 .then(filteredTrades => {
                  if (filteredTrades.results.length == 0) {
                    alert("No trades found")
                  }
                  else {
                    this.setState({tr: []})
                    this.setState({tr: filteredTrades.results})
                    console.log(filteredTrades.results) 
                  }
                })
  }

  getSortedTrades = () => {
    this.getProxy.getSortedTrades(this.state.sort,this.state.dir)
                 .then(sortedTrades => {
                  if (sortedTrades.results.length == 0) {
                    alert("No trades found")
                  }
                  else {
                    this.setState({tr: []})
                    this.setState({tr: sortedTrades.results})
                    console.log(sortedTrades.results) 
                  }
                })
                  
  }

  handleSort = (event) => {
    let val = event.target.value;
    this.setState({sort: val})
  }
  handleDir = (event) => {
    let val = event.target.value;
    this.setState({dir: val})
  }
  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val})
    console.log(nam, val)
  }

  handleSubmit = (event) => {
    // this.setState({tr: []})
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
          <Label>Sort Table By: </Label>
          <select class="customselect" onChange={this.handleSort}>
            <option> - </option>
            <option value="date_of_trade">Date of Trade</option>
            <option value="notional_amount">Notional Amount</option>
            <option value="quantity">Quantity</option>
            <option value="maturity_date">Maturity Date</option>
            <option value="underlying_price">Underlying Price</option>
            <option value="strike_price">Strike Price</option>
          </select>
          <Label>Ascending/Descending:</Label>
          <select class="customselect" onChange={this.handleDir}> 
            <option> - </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button onClick={this.getSortedTrades}>Sort Table</button>
          <Label>Filter notional currency: </Label>
          <select class="customselect" id="currfilter" name="notional_currency" onChange={this.getFilterCurrency}>
            <option> - </option>
            {currencyCodes.map((text,i) => (
                <option key={i} value={text}>
                    {text}
                </option>
            ))}
          </select>
          <Label>Filter underlying currency: </Label>
          <select class="customselect" id="currfilter" name="underlying_currency" onChange={this.getFilterCurrency}>
            <option> - </option>
            {currencyCodes.map((text,i) => (
                <option key={i} value={text}>
                    {text}
                </option>
            ))}
          </select>
          <button onClick={this.refreshPage}> Remove Filters </button>
        </div>
        <div>
          <Label>Search by heading: </Label>
          <Form>
            <FormGroup>
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
                <option value="maturity_date" >Maturity Date</option>
                <option value="underlying_price" >Underlying Price</option>
                <option value="strike_price" >Strike Price</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Input 
                id="searchinput"
                type="text" 
                name="searchinput" 
                placeholder="Search for .."
                onChange={this.handleChange}
              />
              <button onClick={this.handleSubmit}>Apply Search</button>
            </FormGroup>
          </Form>
        </div>
        <div className="tradetable">
          <h4> Current page: {this.state.count} / {this.state.maxpage}</h4>
          <button onClick={this.getPrevPageTrade}> previous page </button>
          <button onClick={this.getTradesByPage}> next page </button>
          {console.log(this.state.tr)}
          {this.state.tr ? <Table data={this.state.tr}/> : null }
        </div>
        <div>
          <button onClick={this.getPrevPageTrade}> previous page </button>
          <button onClick={this.getTradesByPage}> next page </button>
        </div>
       
      </React.Fragment>
    );
  }
}
export default Trades;
