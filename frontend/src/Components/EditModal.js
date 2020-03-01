import React, { Component } from "react";
import moment from 'moment';
import { UpdateTradeProxy } from "../BackendProxy";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

class EditModal extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.updateTrade = this.updateTrade.bind(this)
    this.updateProxy = new UpdateTradeProxy();
    this.state = { 
      show: false,
      date_of_trade: moment(this.props.date).format('YYYY-MM-DD'),
      time_of_trade: moment(this.props.date).format('hh:mm'),
      trade_id: this.props.data.trade_id,
      product: this.props.data.product,
      buying_party: this.props.data.buying_party,
      selling_party: this.props.data.selling_party,
      notional_amount: this.props.data.notional_amount,
      quantity: this.props.data.quantity,
      notional_currency: this.props.data.notional_currency,
      maturity_date: this.props.data.maturity_date,
      underlying_price: this.props.data.underlying_price,
      underlying_currency: this.props.data.underlying_currency,
      strike_price: this.props.data.strike_price,
      error_message: ""
    }
  }

  updateTrade = () => {
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
    console.log(date_of_trade)

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
    this.updateProxy.updateTrade(trade, this.props.data.trade_id);
    console.log(trade);
  }

  partiallyUpdateTrade = (tradeID) => {
    tradeID = "TEST101"
    const update = {
        buying_party: "7",
        selling_party: "7",
        date_of_trade: "2020-02-29 12:30"
    }
    this.updateProxy.partiallyUpdateTrade(update, tradeID);
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
    
    // let err = '';
    // if (nam === "age") {
    //   if (val !="" && !Number(val)) {
    //     err = <strong>Your age must be a number</strong>;
    //   }
    // }
    // this.setState({errormessage: err});
    // 
 
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.updateTrade();
    alert("You are submitting "+this.state.trade_id+this.state.notional_currency);
  }
  
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
    window.location.reload();
  };

  checkEditable = () => {
    var limit = new Date();
    limit.setDate(limit.getDate()-7);
    limit = moment(limit).format('MM/DD/YYYY hh:mm:ss')
    var d = moment(this.props.date).format('MM/DD/YYYY hh:mm:ss');

    if (d > limit) {
      return true
    }
    else {
      return false
    }
  }
  render() {
    // if current date is equal to or greater than the creation date + 7 then return modal with error message
    if (!this.checkEditable()) return (
      <main>
        <button type="button" onClick={this.showModal}>
          Edit Trade
        </button>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <h1>In order for a trade to be editable, the trade must be less than a week old.</h1>
          <h3>This trade was created on {moment(this.props.date).format('MM/DD/YYYY hh:mm:ss')}</h3>
        </Modal>
      </main>
    )
    return (
      <main>
        <Modal show={this.state.show} handleClose={this.hideModal}>
        <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="date">Date of Trade: </Label>
              <Input
                type="date"
                name="date_of_trade"
                onChange={this.handleChange}
                defaultValue={moment(this.props.date).format('YYYY-MM-DD')}
              />
            </FormGroup>
            <FormGroup>
              <Label for="time">Time of Trade: </Label>
              <Input
                type="time"
                // step="1"
                name="time_of_trade"
                onChange={this.handleChange}
                defaultValue={moment(this.props.date).format('HH:MM:SS')}
              />
            </FormGroup>
            <FormGroup>
              <Label for="id">Trade ID: </Label>
              <Input
                type="text"
                maxLength="200"
                name="trade_id"
                onChange={this.handleChange}
                defaultValue={this.props.data.trade_id}
              />
            </FormGroup>
            <FormGroup>
              <Label for="product">Product: </Label>
              <Input
                type="text"
                name="product"
                maxLength="200"
                onChange={this.handleChange}
                defaultValue={this.props.data.product}
              />
            </FormGroup>
            <FormGroup>
              <Label for="buying">Buying Party: </Label>
              <Input
                type="text"
                name="buying_party"
                maxLength="200"
                onChange={this.handleChange}
                defaultValue={this.props.data.buying_party}
              />
            </FormGroup>
            <FormGroup>
              <Label for="selling">Selling Party: </Label>
              <Input
                type="text"
                name="selling_party"
                maxLength="200"
                onChange={this.handleChange}
                defaultValue={this.props.data.selling_party}
              />
            </FormGroup>
            <FormGroup>
              <Label for="currency">Notional Currency: </Label>
              <select name="notional_currency" onChange={this.handleChange} defaultValue={this.props.data.notional_currency}>
                <option> - </option>
                <option value="GBP" >GBP</option>
                <option value="USD">USD</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="amount">Notional Amount: </Label>
              <Input
                type="number"
                name="notional_amount"
                onChange={this.handleChange}
                defaultValue={this.props.data.notional_amount}
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Quantity: </Label>
              <Input
                type="number"
                name="quantity"
                onChange={this.handleChange}
                defaultValue={this.props.data.quantity}
              />
            </FormGroup>
            <FormGroup>
              <Label for="maturity">Maturity Date: </Label>
              <Input
                type="date"
                name="maturity_date"
                onChange={this.handleChange}
                defaultValue={this.props.data.maturity_date}
              />
            </FormGroup>
            <FormGroup>
              <Label for="underc">Underlying Currency: </Label>
              <select name="underlying_currency" onChange={this.handleChange} defaultValue={this.props.data.underlying_currency}>
                <option> - </option>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="underprice">Underlying Price: </Label>
              <Input
                type="number"
                name="underlying_price"
                onChange={this.handleChange}
                defaultValue={this.props.data.underlying_price}
              />
            </FormGroup>
            <FormGroup>
              <Label for="strike">Strike Price: </Label>
              <Input
                type="number"
                name="strike_price"
                onChange={this.handleChange}
                defaultValue={this.props.data.strike_price}
              />
            </FormGroup>
            <input type="submit" value="Submit for Checking"/>
          </Form>
        </Modal>
        <button type="button" onClick={this.showModal}>
          Edit Trade
        </button>
      </main>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

export default EditModal;