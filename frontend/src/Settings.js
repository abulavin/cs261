import React, { Component } from "react";
 
class Settings extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <h2> Use this page to change settings.</h2>
          <h4 id="settingsname">Error Correction Module:  </h4>
          <div class="toggle-switch">
            <input type="checkbox" class="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
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