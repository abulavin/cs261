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
      <Form onSubmit={this.props.trade ? this.editTrade : this.createTrade}>
        <FormGroup>
          <Label for="date">Date of Trade:</Label>
          <Input
            type="text"
            name="date"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.date_of_trade)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="id">Trade ID:</Label>
          <Input
            type="text"
            name="id"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.trade_id)}
            maxLength="200"
          />
        </FormGroup>
        <Button>Submit for checking</Button>
      </Form>
    );
  }
}

export default NewTrade;