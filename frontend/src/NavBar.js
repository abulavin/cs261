import React from 'react';
import {
    NavLink,
    HashRouter
} from "react-router-dom";

const NavBar = () => (
    <HashRouter>
        <div className = "NavBar">
            <h1 id="title">Derivative Trade Monitoring System</h1>
            <ul className = "navmenu">
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/NewTrade">New Trade</NavLink></li>
                <li><NavLink to="/Trades">Edit/Delete/View Trades</NavLink></li>
                <li><NavLink to="/Reports">View Reports</NavLink></li>
            </ul>
        </div>
    </HashRouter>
    )

export default NavBar