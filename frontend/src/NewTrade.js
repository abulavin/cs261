import React, { Component } from "react";
import { CreateTradeProxy } from "./BackendProxy";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { currencyCodes } from './currencyCodes';
import {TradeValidator} from './TradeValidator.js';

class NewTrade extends Component {

  constructor() {
    super();
    this.createProxy = new CreateTradeProxy();
    this.state = {
      date_of_trade: "",
      time_of_trade: "",
      trade_id: "",
      product: "",
      buying_party: "",
      selling_party: "",
      notional_amount: 0,
      quantity: 0,
      notional_currency: "GBP",
      maturity_date: "",
      underlying_price: 0,
      underlying_currency: "GBP",
      strike_price: 0,
      error_message: "",
      errors: []
    }
  }

  sendTrade = () => {
    var day = this.state.date_of_trade
    var time_of_trade = this.state.time_of_trade
    var trade_id = this.state.trade_id
    var product = this.state.product
    var buying_party = this.state.buying_party
    var selling_party = this.state.selling_party
    var notional_amount = this.state.notional_amount
    var quantity = this.state.quantity
    var notional_currency = this.state.notional_currency
    var maturity_date = this.state.maturity_date
    var underlying_price = this.state.underlying_price
    var underlying_currency = this.state.underlying_currency
    var strike_price = this.state.strike_price

    var date_of_trade = day + " " + (time_of_trade)

    const trade = {
      date_of_trade,
      trade_id,
      product,
      buying_party,
      selling_party,
      notional_amount,
      quantity,
      notional_currency,
      maturity_date,
      underlying_price,
      underlying_currency,
      strike_price
    };

    if (TradeValidator.filterErroneousFields(trade) == {}) {
      this.createProxy.createTrade(trade)
      .then(trade => {
        window.alert("submitted trade.")
        console.log(trade)
      })
      .catch(error => {
        console.log(error)
        this.setState({errors: error})
        console.log(this.state.errors);
      });
    }
    else {
      console.log(TradeValidator.filterErroneousFields(trade))
      this.setState({errors: TradeValidator.filterErroneousFields(trade)})
    }
    
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var r = window.confirm("Are you sure you want to submit this trade?");
    if (r==true) {
      this.sendTrade();
    }
  }

  nextTrade = () => {
    if (this.state.errors.length == 0) {
      window.location.reload()
    }
    else {
      alert("There are still errors needed to be corrected")
    }
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }


  getRowsData = function(){
    var items = this.state.errors;
    return items.map((row, index)=>{
      return <tr key={index}>
        <td>{this.state.errors[index][0]}</td>
        <td>{this.state.errors[index][1]}</td>
      </tr>
    })
  }

  render() {
    const array = this.state.errors;
    const isEnabled = array.length == 0;
    return (
      <React.Fragment>
        <div className="tradetitles">
          <h2> Use this page to enter details of a derivative trade.</h2>
          <h5> Upon entry, all details will be error-checked and any issues will be highlighted.</h5>
        </div>
        <div className="tradeform">
          <Form>
            <FormGroup>
              <Label for="date">Date of Trade: </Label>
              <Input
                type="date"
                name="date_of_trade"
                onChange={this.handleChange}
              />
              <Label>(Must not be past current date)</Label>
            </FormGroup>
            <FormGroup>
              <Label for="time">Time of Trade: </Label>
              <Input
                type="time"
                name="time_of_trade"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="id">Trade ID: </Label>
              <Input
                type="text"
                maxLength="200"
                name="trade_id"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Label> (Must be in form of capital letters followed by numbers e.g. FRTT348)</Label>
            <FormGroup>
              <Label for="product">Product: </Label>
              <Input
                type="text"
                name="product"
                maxLength="200"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="buying">Buying Party: </Label>
              <Input
                type="text"
                name="buying_party"
                maxLength="200"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="selling">Selling Party: </Label>
              <Input
                type="text"
                name="selling_party"
                maxLength="200"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="currency">Notional Currency: </Label>
              <select name="notional_currency" onChange={this.handleChange}>
                <option> - </option>
                {currencyCodes.map((text, i) => (
                  <option key={i} value={text}>
                    {text}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="amount">Notional Amount: </Label>
              <Input
                type="number"
                name="notional_amount"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Quantity: </Label>
              <Input
                type="number"
                name="quantity"
                onChange={this.handleChange}
              />
              <Label>(Must be greater than 0)</Label>
            </FormGroup>
            <FormGroup>
              <Label for="maturity">Maturity Date: </Label>
              <Input
                type="date"
                name="maturity_date"
                onChange={this.handleChange}
              />
              <Label>(Must be past trade creation date)</Label>
            </FormGroup>
            <FormGroup>
              <Label for="underc">Underlying Currency: </Label>
              <select name="underlying_currency" onChange={this.handleChange}>
                <option> - </option>
                {currencyCodes.map((text, i) => (
                  <option key={i} value={text}>
                    {text}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="underprice">Underlying Price: </Label>
              <Input
                type="number"
                name="underlying_price"
                onChange={this.handleChange}
              />
              <Label>(Must be greater than 0)</Label>
            </FormGroup>
            <FormGroup>
              <Label for="strike">Strike Price: </Label>
              <Input
                type="number"
                name="strike_price"
                onChange={this.handleChange}
              />
              <Label>(Must be greater than 0)</Label>
            </FormGroup>
            <input type="reset" value="Reset all Values" />
          </Form>
          <button onClick={this.handleSubmit}> Submit for Checking</button>
        </div>

        <div className="errorbox">
          <h3>Highlighted Errors:</h3>
          <div>
           <table>
             <thead>
               <tr>
                  <th>Field</th>
                  <th>Error</th>
               </tr>
             </thead>
             <tbody>
               {this.getRowsData()}
             </tbody>
           </table>
          </div>
          
          <button disabled={!isEnabled} onClick={this.nextTrade}>New Trade</button>
        </div>
      </React.Fragment>
    );
  }
}

export default NewTrade;

// use this to return individual rows of the table
const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
    })
}