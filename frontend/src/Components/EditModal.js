import React, { Component } from "react";
import moment from 'moment';
import { UpdateTradeProxy } from "../BackendProxy";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { currencyCodes } from "../currencyCodes";
import ErrorTable from './ErrorTable';
import CorrectionsTable from './CorrectionsTable';
import {TradeValidator} from '../TradeValidator.js';

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
        }
        return trade
    }

    updateTrade = () => {
        const tr = this.getTrade()
      
        
        let tradeErrors = TradeValidator.getListOfErrors(tr);
        if (tradeErrors.length === 0) {
          this.setState({errors: []})
          this.setState({corrections: []})
          this.callMethod(tr)
        }
        else {
          console.log(tradeErrors)
          this.setState({ errors: tradeErrors })
        } 
    }

    callMethod(tr) {
      function humanise(str) {
        let substrings = str.split('_');
        for (let i = 0; i < substrings.length; i++) {
          substrings[i] = substrings[i].charAt(0).toUpperCase() + substrings[i].slice(1);
        }
        return substrings.join(' ');
      }
      
      this.updateProxy.updateTrade(tr, tr["trade_id"])
            .then(trade => {
              window.alert("updated trade.")
              console.log(trade)
            })
            .catch(error => {
              console.log(error)
              console.log(tr)
              if (error.status == 409) {
                var corrections = error.data;
                var result = Object.keys(corrections).map(function(key) {
                  if (corrections[key][0]==null) {
                    return [humanise(key), "Ensure entry is as intended", corrections[key][1]];
                  }
                  return [humanise(key), corrections[key][0], corrections[key][1]];
                });
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

    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.updateTrade();
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
        window.location.reload();
    };

    hideModal2 = () => {
        this.setState({ show: false });
    };

    checkEditable = () => {
        var limit = new Date();
        limit.setDate(limit.getDate() - 7);
        limit = moment(limit).format('YYYY/MM/DD')
        var d = moment(this.props.date).format('YYYY/MM/DD');

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
                <Modal show={this.state.show} handleClose={this.hideModal2}>
                    <h1>In order for a trade to be editable, the trade must be less than a week old.</h1>
                    <h3>This trade was created on {moment(this.props.date).format('DD/MM/YYYY hh:mm:ss')}</h3>
                </Modal>
            </main>
        )
        else {
            return (
                <main>
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                      <div className="tradeform">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label style={this.setColours("Date Of Trade")}>Date of Trade: </Label>
                                <Input
                                    type="date"
                                    name="date_of_trade"
                                    onChange={this.handleChange}
                                    defaultValue={moment(this.props.date).format('YYYY-MM-DD')}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={this.setColours("Time Of Trade")}>Time of Trade: </Label>
                                <Input
                                    type="time"
                                    // step="1"
                                    name="time_of_trade"
                                    onChange={this.handleChange}
                                    defaultValue={moment(this.props.date).format('HH:MM:SS')}
                                    step="any"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={this.setColours("Trade Id")}>Trade ID: </Label>
                                <Input
                                    type="text"
                                    maxLength="200"
                                    name="trade_id"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.data.trade_id}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={this.setColours("Product")}>Product: </Label>
                                <Input
                                    type="text"
                                    name="product"
                                    maxLength="200"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.data.product}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={this.setColours("Buying Party")}>Buying Party: </Label>
                                <Input
                                    type="text"
                                    name="buying_party"
                                    maxLength="200"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.data.buying_party}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={this.setColours("Selling Party")}>Selling Party: </Label>
                                <Input
                                    type="text"
                                    name="selling_party"
                                    maxLength="200"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.data.selling_party}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={this.setColours("Notional Currency")}>Notional Currency: </Label>
                                <select name="notional_currency" onChange={this.handleChange} defaultValue={this.props.data.notional_currency}>
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
                                    defaultValue={this.props.data.notional_amount}
                                    step="any"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={this.setColours("Quantity")}>Quantity: </Label>
                                <Input
                                    type="number"
                                    name="quantity"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.data.quantity}
                                    step="any"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={this.setColours("Maturity Date")}>Maturity Date: </Label>
                                <Input
                                    type="date"
                                    name="maturity_date"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.data.maturity_date}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={this.setColours("Underlying Currency")}>Underlying Currency: </Label>
                                <select name="underlying_currency" onChange={this.handleChange} defaultValue={this.props.data.underlying_currency}>
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
                                    defaultValue={this.props.data.underlying_price}
                                    step="any"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label style={this.setColours("Strike Price")}>Strike Price: </Label>
                                <Input
                                    type="number"
                                    name="strike_price"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.data.strike_price}
                                    step="any"
                                />
                            </FormGroup>
                            <input type="submit" value="Submit for Checking" />
                            <input type="reset" value="Reset to previous values"/>
                        </Form>
                      </div>
                      <div className="errorbox">
                          <h3>Highlighted Errors:</h3>
                          {this.state.errors ? <ErrorTable errors={this.state.errors}/> : null }
                          {this.state.corrections ? <CorrectionsTable errors={this.state.corrections}/> : null }
                          <button onClick={this.manualOverride}> Manual Override </button>
                      </div>
                    </Modal>
                    <button type="button" onClick={this.showModal}>
                        Edit Trade
                    </button>
                </main>
            );
        }
    }
}

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button onClick={handleClose}>Close</button>
            </section>
        </div>
    );
};

export default EditModal;
