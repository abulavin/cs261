import React, { Component } from "react";

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      on: window.enableErrorDetection
    }
  }

  toggleErrorDetection = () => {
    this.setState({ on: !this.state.on });
    window.enableErrorDetection = !this.state.on
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
        </div>
      </React.Fragment>
    );
  }
}

export default Settings;