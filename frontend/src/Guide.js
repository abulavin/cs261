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
            <TabLink to="reports">Viewing and Generating Reports</TabLink>
            <TabLink to="settings">Changing Settings</TabLink>
            <TabLink to="error">Error Correction Module</TabLink>

            <TabContent for="adding">
              <div className="guidecontents">
                <p>To add a new trade, navigate to the NEW TRADE page in the navigation menu.</p>
                <p>
                Here you are presented with two main panels. On the left panel, you should enter all details of the derivative trade.
                On the right panel, all identified submission errors will be presented upon pressing the submit trade button - located at the bottom of the left panel.
                </p>
                <p>
                Things to take note of:
                </p>
                <p>
                - When entering dates, utilise the calendar (accessed with the arrow) to pick dates more easily.
                </p>
                <p>
                - The trade cannot be submitted until all highlighted errors in the right panel have been dealt with.
                </p> 
                <p>
                - If you feel an entry has been wrongly highlighted, you can manually override it using the button.
                </p>
                <p>
                - Values can be reset using the "Reset all values" button
                </p>
                <p>
                  Once submitted, the new trade can be viewed on the EDIT/DELETE/VIEW TRADES page.
                </p>
              </div>
            </TabContent>
            <TabContent for="viewing">
              <div className="guidecontents">
                To view trades, navigate to the EDIT/DELETE/VIEW TRADES
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