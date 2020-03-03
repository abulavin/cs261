import React from 'react';

import {
    NavLink,
    HashRouter
} from "react-router-dom";

const Buttons = () => (
    <HashRouter>
        <div className = "NavBtns">
            <button>
                <NavLink to="/Settings">Settings</NavLink>            
            </button>

            <button>
                <NavLink to="/Guide">User Guide</NavLink>            
            </button>
            
        </div>
    </HashRouter>
  )
  
  export default Buttons