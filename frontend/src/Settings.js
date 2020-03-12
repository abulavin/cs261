import React, { Component } from "react";
import {Input} from 'reactstrap';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      on: window.settings.check
    }
  }

  toggleErrorDetection = () => {
    this.setState({ on: !this.state.on });
    window.settings.check = !this.state.on
  }

  handleChange = (event) => {
    document.getElementById('textInput').value = event.target.value;
    window.settings.tParam = event.target.value;
    console.log(window.settings.tParam);
  }

  render() {
    console.log(this.state.on);
    return (
      <React.Fragment>
        <div>
          <h2> Use this page to change settings.</h2>
          <h4 id="settingsname">Error Correction Module:</h4>
          <div class="toggle-switch">
            <input onChange={this.toggleErrorDetection} type="checkbox" class="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" checked={this.state.on} />
            <label class="toggle-switch-label" for="toggleSwitch">
              <span class="toggle-switch-inner"></span>
              <span class="toggle-switch-switch"></span>
            </label>
          </div>
          <div>
            <h4 id="settingsname">Threshold Parameter:</h4>
            <div class='toggle-switch'>
              <input onChange={this.handleChange} type="range" class='param-input' min='0.1' max='1' step='0.1' defaultValue={window.settings.tParam} /> 
            </div>
              <input type='text' id="textInput" value={window.settings.tParam}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Settings;