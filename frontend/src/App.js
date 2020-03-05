import React from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import NewTrade from "./NewTrade";
import Trades from "./Trades";
import Reports from "./Reports";
import Settings from "./Settings";
import Guide from "./Guide";
import NavButtons from "./NavButtons.js";
import NavBar from "./NavBar.js";

import './App.css';

// This can be changed via the dev console so be careful
window.enableErrorDetection = true;

function App() {
  return (
    <HashRouter>
      <div className="App">
        <div className = "header">
          <NavButtons/>
          <NavBar/>
        </div>
        <div className = "content">
          <Route exact path="/" component={Trades}/>
          <Route path="/NewTrade" component={NewTrade}/>
          <Route path="/Reports" component={Reports}/>
          <Route path="/Settings" component={Settings}/>
          <Route path="/Guide" component={Guide}/>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
