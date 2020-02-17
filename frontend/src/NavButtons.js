import React from 'react';
import { Button, Icon} from 'semantic-ui-react';
// Just experimenting with button styles 
// import Settings from "../Settings.js";
import {
    NavLink,
    HashRouter
} from "react-router-dom";

const Buttons = () => (
    <HashRouter>
    <div className = "NavBtns">
        <Button>
            <NavLink to="/Settings">Settings</NavLink>            
        </Button>

        <Button>
            <NavLink to="/Feedback">Submit Feedback</NavLink>            
        </Button>

        <Button>
            <NavLink to="/Guide">User Guide</NavLink>            
        </Button>
        
    </div>
    </HashRouter>
  )
  
  export default Buttons