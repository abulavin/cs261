import React, { Component } from "react";
import { CreateTradeProxy } from "./BackendProxy";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { currencyCodes } from './currencyCodes';
import {TradeValidator} from './TradeValidator.js';
import ErrorTable from './Components/ErrorTable';
import CorrectionsTable from './Components/CorrectionsTable';
import {Settings} from './BackendProxy';

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
      notional_currency: "",
      maturity_date: "",
      underlying_price: 0,
      underlying_currency: "",
      strike_price: 0,
      error_message: "",
      errors: [],
      corrections: []
    }
  }

  getTrade = () => {
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

    return trade
  }

  sendTrade = () => {
    const trade = this.getTrade()

    function humanise(str) {
      let substrings = str.split('_');
      for (let i = 0; i < substrings.length; i++) {
        substrings[i] = substrings[i].charAt(0).toUpperCase() + substrings[i].slice(1);
      }
      return substrings.join(' ');
    }

    const tradeErrors = TradeValidator.getListOfErrors(trade);
    if (tradeErrors.length === 0) {
      this.setState({errors: []})
      this.setState({corrections: []})
      this.createProxy.createTrade(trade)
      .then(trade => {
        window.alert("submitted trade.")
        console.log(trade)
      })
      .catch(error => {
        if (error.status == 409) {
          var corrections = error.data;
          var result = Object.keys(corrections).map(function(key) {
            if (corrections[key][0]==null) {
              return [humanise(key), "Ensure entry is as intended", corrections[key][1]];
            }
            return [humanise(key), corrections[key][0], corrections[key][1]];
          });
          console.log(result)
          this.setState({corrections: result})
        }
        if (error.status == 400) {
          var corrections = error.data;
          var result = Object.keys(corrections).map(function(key) {
            return [humanise(key), corrections[key][0]];
          });
          console.log(result)
          this.setState({errors: result})
        }
        console.log(error)
      });
    }
    else {
      console.log(tradeErrors)
      this.setState({ errors: tradeErrors })
    }
  }

  manualOverride = () => {
    const trade = this.getTrade()
    let confirm = window.confirm("Are you sure you want to submit this trade?");
      if (confirm) {
        const tradeErrors = TradeValidator.getListOfErrors(trade);
        if (tradeErrors ==0 ) {
          this.createProxy.createTrade(trade, Settings.OVERRIDE)
          .then(trade => {
            window.alert("submitted trade.")
            console.log(trade)
            this.setState({errors: []})
            this.setState({corrections: []})
          })
          .catch (error => {
            console.log(error)
          })
        }
        else {
          console.log(tradeErrors)
          this.setState({ errors: tradeErrors })
        }
      }
   
  }

  setColours = (name) => {
    const stylered = {
      backgroundColor: 'red'
    }
    const style = {
      backgroundColor: 'lightgrey'
    }
    const styleorange = {
      backgroundColor: 'orange'
    }

    for (let i=0;i<this.state.errors.length;i++) {
      if (this.state.errors[i][0]==(name)) {
        return stylered
      }
    }

    for (let i=0;i<this.state.corrections.length;i++) {
      if (this.state.corrections[i][1]=="Ensure entry is as intended" && this.state.corrections[i][0]==(name)) {
        return styleorange
      }
      if (this.state.corrections[i][0]==(name)) {
        return stylered
      }
    }

    return style
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let confirm = window.confirm("Are you sure you want to submit this trade?");
    if (confirm) {
      this.sendTrade();
    }
  }

  nextTrade = () => {
    if (this.state.errors.length == 0 && this.state.corrections.length == 0) {
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

    const array2 = this.state.corrections;
    const isEnabled2 = array2.length > 0;
    return (
      <React.Fragment>
        <div className="tradetitles">
          <h2> Use this page to enter details of a derivative trade.</h2>
        </div>
        <div className="tradeform">
          <button onClick={this.handleSubmit}> Submit for Checking</button>
          <Form>
            <FormGroup>
              <Label style={this.setColours("Date Of Trade")}>Date of Trade: </Label>
              <Input
                type="date"
                name="date_of_trade"
                onChange={this.handleChange}
              />
              <label class="tip">(Should not be past current date)</label>
            </FormGroup>
            <FormGroup>
              <Label style={this.setColours("Time Of Trade")}>Time of Trade: </Label>
              <Input
                type="time"
                name="time_of_trade"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label style={this.setColours("Trade Id")}>Trade ID: </Label>
              <Input
                type="text"
                maxLength="200"
                name="trade_id"
                onChange={this.handleChange}
              />
            </FormGroup>
            <label class="tip"> (Capital letters followed by numbers e.g. FRTT348)</label>
            <FormGroup>
              <Label style={this.setColours("Product")}>Product: </Label>
              <Input
                type="text"
                name="product"
                maxLength="200"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label style={this.setColours("Buying Party")}>Buying Party: </Label>
              <Input
                type="text"
                name="buying_party"
                maxLength="200"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label style={this.setColours("Selling Party")}>Selling Party: </Label>
              <Input
                type="text"
                name="selling_party"
                maxLength="200"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label style={this.setColours("Notional Currency")}>Notional Currency: </Label>
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
              <Label style={this.setColours("Notional Amount")}>Notional Amount: </Label>
              <Input
                type="number"
                name="notional_amount"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label style={this.setColours("Quantity")}>Quantity: </Label>
              <Input
                type="number"
                name="quantity"
                onChange={this.handleChange}
              />
              <label class="tip">(Must be greater than 0)</label>
            </FormGroup>
            <FormGroup>
              <Label style={this.setColours("Maturity Date")}>Maturity Date: </Label>
              <Input
                type="date"
                name="maturity_date"
                onChange={this.handleChange}
              />
              <label class="tip">(Must be past trade creation date)</label>
            </FormGroup>
            <FormGroup>
              <Label style={this.setColours("Underlying Currency")}>Underlying Currency: </Label>
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
              <Label style={this.setColours("Underlying Price")}>Underlying Price: </Label>
              <Input
                type="number"
                name="underlying_price"
                onChange={this.handleChange}
              />
              <label class="tip">(Must be greater than 0)</label>
            </FormGroup>
            <FormGroup>
              <Label style={this.setColours("Strike Price")}>Strike Price: </Label>
              <Input
                type="number"
                name="strike_price"
                onChange={this.handleChange}
              />
              <label class="tip">(Must be greater than 0)</label>
            </FormGroup>
            <input class="btn" type="reset" value="Reset all Values" />
          </Form>
        </div>

        <div className="errorbox">
            <h3>Highlighted Errors:</h3>
            {this.state.errors ? <ErrorTable errors={this.state.errors}/> : null }
            {this.state.corrections ? <CorrectionsTable errors={this.state.corrections}/> : null }
        <div className="newtradebtn">
          <button disabled={!isEnabled} onClick={this.nextTrade}>New Trade</button>
        </div>
        <div className="manualbtn">
          <button disabled={!isEnabled2} onClick={this.manualOverride}> Manually Override All Fields </button>
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewTrade;
