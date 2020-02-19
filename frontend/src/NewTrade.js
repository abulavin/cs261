import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "./index.js";

class NewTrade extends Component {
  state = {
    date_of_trade: "",
    trade_id: "",
    product: "",
    buying_party: "",
    selling_party: "",
    notational_amount: "",
    quantity: "",
    notational_currency: "",
    maturity_date: "",
    underlying_price: "",
    underlying_currency: "",
    strike_price: ""
  };

  // this was me trying to get the API interaction to work 
  componentDidMount() {
    if (this.props.trade) {
      const { date_of_trade, trade_id, product, buying_party, selling_party, notational_amount, quantity,notational_currency,maturity_date,underlying_price,underlying_currency,strike_price} = this.props.trade;
      this.setState({ date_of_trade, trade_id, product, buying_party, selling_party, notational_amount, quantity,notational_currency,maturity_date,underlying_price,underlying_currency,strike_price });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createTrade = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editTrade = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <React.Fragment>
        <div className="tradeform">
          <Form onSubmit={this.props.trade ? this.editTrade : this.createTrade}>
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