import React, { Component } from "react";
import { CreateTradeProxy } from "./BackendProxy";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

class NewTrade extends Component {

  constructor() {
      super();
      this.createProxy = new CreateTradeProxy();
  }

  state = {
    date_of_trade: "2020-02-29 12:30",
    trade_id: "TEST101",
    product: "1",
    buying_party: "1",
    selling_party: "1",
    notional_amount: 1.0,
    quantity: 1.0,
    notional_currency: "USD",
    maturity_date: "2020-02-20",
    underlying_price: 1.0,
    underlying_currency: "USD",
    strike_price: 1.0
  }

  sendTrade = () => {
      const exampleTrade = {
          date_of_trade: "2020-02-29 12:30",
          trade_id: "TEST101",
          product: "1",
          buying_party: "1",
          selling_party: "1",
          notional_amount: 1.0,
          quantity: 1.0,
          notional_currency: "USD",
          maturity_date: "2020-02-20",
          underlying_price: 1.0,
          underlying_currency: "USD",
          strike_price: 1.0
      };
      this.createProxy.createTrade(exampleTrade);
  }

  render() {
    return (
      <React.Fragment>
        <div className="tradetitles">
          <h2> Use this page to enter details of a derivative trade.</h2>
          <h5> Upon entry, all details will be error-checked and any issues will be highlighted.</h5>
          <button className='NavBtn' onClick={this.sendTrade}>Send</button>
        </div>
        <div className="tradeform">
          <Form onSubmit={}>
            <FormGroup>
              <Label for="date">Date of Trade: </Label>
              <Input
                type="date"
              />
            </FormGroup>
            <FormGroup>
              <Label for="time">Time of Trade: </Label>
              <Input
                type="time"
              />
            </FormGroup>
            <FormGroup>
              <Label for="id">Trade ID: </Label>
              <Input
                type="text"
                maxLength="200"
              />
            </FormGroup>
            <FormGroup>
              <Label for="product">Product: </Label>
              <Input
                type="text"
                name="product"
                maxLength="200"
              />
            </FormGroup>
            <FormGroup>
              <Label for="buying">Buying Party: </Label>
              <Input
                type="text"
                name="buying"
                maxLength="200"
              />
            </FormGroup>
            <FormGroup>
              <Label for="selling">Selling Party: </Label>
              <Input
                type="text"
                name="selling"
                maxLength="200"
              />
            </FormGroup>
            <FormGroup>
              <Label for="currency">Notional Currency: </Label>
              <select id="currency" name="currency">
                <option value="GBP">GBP</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="notational">Notional Amount: </Label>
              <Input
                type="number"
                name="notational"
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Quantity: </Label>
              <Input
                type="number"
                name="quantity"
              />
            </FormGroup>
            <FormGroup>
              <Label for="maturity">Maturity Date: </Label>
              <Input
                type="date"
                name="maturity"
              />
            </FormGroup>
            <FormGroup>
              <Label for="underc">Underlying Currency: </Label>
              <select id="undercurr" name="undercurr">
                <option value="GBP">GBP</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="underprice">Underlying Price: </Label>
              <Input
                type="number"
                name="underprice"
              />
            </FormGroup>
            <FormGroup>
              <Label for="strike">Strike Price: </Label>
              <Input
                type="number"
                name="strike"

              />
            </FormGroup>
            <input type="submit" value="Submit for Checking"/>
            <input type="reset" value = "Reset all values"/>
          </Form>
        </div>

        <div className="errorbox">
          <h3>This is where highlighted errors will be displayed</h3>
          <Button>Next Trade</Button>
        </div>


      </React.Fragment>
    );
  }
}

export default NewTrade;
