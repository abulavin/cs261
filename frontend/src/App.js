import React from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import NewTrade from "./NewTrade";
import Trades from "./Trades";
import Reports from "./Reports";

// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        {/* <ul className = "iconsnav">
          <li><NavLink exact to="/">Global Settings</NavLink></li>
          <li><NavLink exact to="/">Submit Feedback</NavLink></li>
          <li><NavLink exact to="/">User Guide</NavLink></li>
        </ul> */}

        <h1>Derivative Trade Monitoring System</h1>
        <ul className = "header">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/NewTrade">New Trade</NavLink></li>
          <li><NavLink to="/Trades">Edit/Delete/View Trades</NavLink></li>
          <li><NavLink to="/Reports">View Reports</NavLink></li>
        </ul>

        <div className = "content">
          <Route exact path="/" component={Home}/>
          <Route path="/NewTrade" component={NewTrade}/>
          <Route path="/Trades" component={Trades}/>
          <Route path="/Reports" component={Reports}/>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
