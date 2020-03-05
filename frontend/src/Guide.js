import React, { Component } from "react";
import { Tabs, TabLink, TabContent } from "react-tabs-redux";

class Guide extends Component {
  render() {
    return (
        <React.Fragment>
          <h2> This will be the user guide page!</h2>
          <Tabs className="tabs">
            <TabLink to="adding" default>Adding a new trade</TabLink>
            <TabLink to="viewing">Viewing, Editing and Deleting Trades</TabLink>
            <TabLink to="reports">Viewing Reports</TabLink>
            <TabLink to="settings">Changing Settings</TabLink>
            <TabLink to="error">Error Correction Module</TabLink>

            <TabContent for="adding">
              <div className="guidecontents">
                To add a new trade, navigate to the NEW TRADE page in the navigation menu
              </div>
            </TabContent>
            <TabContent for="viewing">
              <div className="guidecontents">
                To view trades
              </div></TabContent>
            <TabContent for="reports">
              <div className="guidecontents">
                To view reports
              </div>
            </TabContent>
            <TabContent for="settings">
              <div className="guidecontents">
                To change settings
              </div> 
            </TabContent>
            <TabContent for="error">
              <div className="guidecontents">
                The error correction module works by
              </div>
            </TabContent>
          </Tabs>

          
        </React.Fragment>
    );
  }
}
 
export default Guide;