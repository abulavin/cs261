import React from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import NewTrade from "./NewTrade";
import Trades from "./Trades";
import Reports from "./Reports";
import Settings from "./Settings";
import Feedback from "./Feedback";
import Guide from "./Guide";
import NavButtons from "./NavButtons.js";
import NavBar from "./NavBar.js";

// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <div className = "header">
          <NavButtons/>
          <NavBar/>
        </div>
        <div className = "content">
          <Route exact path="/" component={Home}/>
          <Route path="/NewTrade" component={NewTrade}/>
          <Route path="/Trades" component={Trades}/>
          <Route path="/Reports" component={Reports}/>
          <Route path="/Settings" component={Settings}/>
          <Route path="/Feedback" component={Feedback}/>
          <Route path="/Guide" component={Guide}/>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
