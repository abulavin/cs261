import React, { Component } from "react";
import Clock from 'react-live-clock';
 
class Home extends Component {
  render() {
    return (
      <div>
        <h2> This will be the home page!</h2>
        <h4 className = "datetime"> Current Date and Time (GMT):
            <Clock format=" dddd, DD MMMM YYYY, HH:mm:ss" interval={1000} ticking={true} timezone={'UK/GMT'} />
        </h4>
          
      </div>
    );
  }
}
 
export default Home;