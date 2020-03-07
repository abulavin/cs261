import React, { Component } from "react";
import { CreateTradeProxy } from "./BackendProxy";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { currencyCodes } from './currencyCodes';
import {TradeValidator} from './TradeValidator.js';
import ErrorTable from './Components/ErrorTable';
import CorrectionsTable from './Components/CorrectionsTable';

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
      errors: [],
      corrections: []
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
    console.log(trade);
    function humanise(str) {
      let substrings = str.split('_');
      for (let i = 0; i < substrings.length; i++) {
        substrings[i] = substrings[i].charAt(0).toUpperCase() + substrings[i].slice(1);
      }
      return substrings.join(' ');
    }

    const tradeErrors = TradeValidator.getListOfErrors(trade);
    if (tradeErrors.length === 0) {
      this.setState({ errors: [] })
      this.createProxy.createTrade(trade)
        .then(trade => {
          window.alert("Submitted trade")
          console.log(trade)
        })
        .catch(error => {
          if (error.status == 409) {
            let corrections = error.data;
            let result = Object.keys(corrections).map(function (key) {
              return [humanise(key), corrections[key][0], corrections[key][1]];
            });
            console.log(result)
            this.setState({ corrections: result })
          }
          console.log(error)
        });
    }
    else {
      console.log(tradeErrors)
      this.setState({ errors: tradeErrors })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let confirm = window.confirm("Are you sure you want to submit this trade?");
    if (confirm) {
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
            {this.state.errors ? <ErrorTable errors={this.state.errors}/> : null }
            {this.state.corrections ? <CorrectionsTable errors={this.state.corrections}/> : null }
        <button disabled={!isEnabled} onClick={this.nextTrade}>New Trade</button>
        </div>
      </React.Fragment>
    );
  }
}

export default NewTrade;