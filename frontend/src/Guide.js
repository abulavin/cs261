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
                To view trades, navigate to the EDIT/DELETE/VIEW TRADES page where you will be presented with the table of trades
                <p> Sorting is done with the drop down menu to select the heading, and then whether it is ascending/descending order.</p>
                <p> Searching is done with the search by and the drop down menu to select the heading to search within.</p>
                <p> Filter can be done by Notional Currency and Underlying Currency with the drop down menu.</p>
                <p> To edit a trade, click on the EDIT button (trades older than a week old cannot be edited)</p>
                <p> To delete a trade, click on the DELETE button and then specify the reason for deletion</p>
                <p> Navigating through pages is done through the PREVIOUS PAGE and NEXT PAGE buttons, with the counter at the top of the table. </p>
              </div></TabContent>
            <TabContent for="reports">
              <div className="guidecontents">
                To view reports, navigate to the REPORTS page where you will be presented with the table of reports.
                <p> Searching by date is done using the date picker.</p>
                <p> Once a date is selected, choose whether to get reports BEFORE, ON or AFTER that date.</p>
                <p> Remove your filter by clicking GET ALL TRADES</p>
                <p> A daily report can be generated on demand with the button GENERATE DAILY REPORT. This will not be stored in the database.</p>
                <p> Clicking on VIEW REPORT will open a PDF in a new window.</p>
                <p> Clicking on DOWNLOAD REPORT will download the PDF file to your default downloads folder, which can be changed within the browser.</p>
              </div>
            </TabContent>
            <TabContent for="settings">
              <div className="guidecontents">
                To change settings, navigate to the SETTINGS page.
                <p> Here you will be able to turn the error correction module ON and OFF.</p>
                <p> Turning it off will mean all new trades and edited trades will not be subject to error checking.</p>
                <p> Do so at your own risk! </p>
              </div> 
            </TabContent>
            <TabContent for="error">
              <div className="guidecontents">
                The error correction module works by comparing values that you enter, to previous trends and data patterns.
                <p> We use sophisticated machine learning techniques to ensure 100% accuracy and sensible suggestions.</p>
              </div>
            </TabContent>
          </Tabs>

          
        </React.Fragment>
    );
  }
}
 
export default Guide;