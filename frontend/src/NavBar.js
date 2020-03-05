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
                <li><NavLink to="/NewTrade">New Trade</NavLink></li>
                <li><NavLink exact to="/">Edit/Delete/View Trades</NavLink></li>
                <li><NavLink to="/Reports">Reports</NavLink></li>
            </ul>
        </div>
    </HashRouter>
    )

export default NavBar