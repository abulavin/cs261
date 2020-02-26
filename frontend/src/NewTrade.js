import React, { Component } from "react";
import {CreateTradeProxy} from "./BackendProxy";
 
class NewTrade extends Component {

  constructor(props) {
    super(props);

    this.props.createProxy = new CreateTradeProxy();
  }

  render() {
    return (
      <div>
        <h2> This will be the trade creation page!</h2>
        <button className='NavBtn' onClick={this.sendTrade}>Send</button>
      </div>
    );
  }
}
 
export default NewTrade;