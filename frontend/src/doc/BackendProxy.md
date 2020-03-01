<a name="module_BackendProxy"></a>

## BackendProxy

* [BackendProxy](#module_BackendProxy)
    * [CreateTradeProxy#createTrade(trade)](#exp_module_BackendProxy--CreateTradeProxy+createTrade)
    * [DeleteTradeProxy#deleteTrade(tradeID)](#exp_module_BackendProxy--DeleteTradeProxy+deleteTrade)
    * [GetTradeProxy#getListOfTrades(page)](#exp_module_BackendProxy--GetTradeProxy+getListOfTrades)
    * [GetTradeProxy#getTradeByID(tradeID)](#exp_module_BackendProxy--GetTradeProxy+getTradeByID)
    * [UpdateTradeProxy#partiallyUpdateTrade(updates, tradeID)](#exp_module_BackendProxy--UpdateTradeProxy+partiallyUpdateTrade)
    * [UpdateTradeProxy#updateTrade(updatedTrade)](#exp_module_BackendProxy--UpdateTradeProxy+updateTrade)
    * [GetReportProxy#getListOfReports(page)](#exp_module_BackendProxy--GetReportProxy+getListOfReports)
    * [GetReportProxy#getReportsAfter(date, page)](#exp_module_BackendProxy--GetReportProxy+getReportsAfter)
    * [GetReportProxy#getReportsBefore(date, page)](#exp_module_BackendProxy--GetReportProxy+getReportsBefore)
    * [GetReportProxy#getReportsOn(date, page)](#exp_module_BackendProxy--GetReportProxy+getReportsOn)

<a name="exp_module_BackendProxy--CreateTradeProxy+createTrade"></a>

### CreateTradeProxy#createTrade(trade)
Send a derivative trade object to the server.
Throws an exception if the trade or one of its attributes are invalid.

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| trade | <code>object</code> | Object representing a derivative trade |

<a name="exp_module_BackendProxy--DeleteTradeProxy+deleteTrade"></a>

### DeleteTradeProxy#deleteTrade(tradeID)
Delete the trade with ID `tradeID`.
If the ID is invalid or doesn't exist an exception is thrown.

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| tradeID | <code>string</code> | Trade ID |

<a name="exp_module_BackendProxy--GetTradeProxy+getListOfTrades"></a>

### GetTradeProxy#getListOfTrades(page)

Retrieve a Promise object resolving to an object containing 100 derivative trades, total derivative trade count, and the URLs of the next page and last page.
If page number isn't specified the 1st page is retrieved by default.

**Kind**: Exported function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| page | <code>number</code> | <code>1</code> | Page number of derivative trade list |

Example output (getting page 3):
The `results` field is an array of derivative trade objects
```json
{
    "count": 64615
    "next": "http://localhost:8000/trades/?page=4"
    "previous": "http://localhost:8000/trades/?page=2"
    "results": Array(100) [ {…}, {…}, {…}, … ]
}
```
Example usage
```javascript
const proxy = new GetTradeProxy();

// ...

proxy.getListOfTrades().then(function(data) {
    console.log(data.results)
});
```

### GetTradeProxy#getTradeByID(tradeID)
Returns an object of trade with ID `tradeID`
Throws an exception if this ID is invalid.
Any errors stemming from performing the HTTP request e.g 404 are also thrown to the caller.

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| tradeID | <code>string</code> | Trade ID |

<a name="exp_module_BackendProxy--UpdateTradeProxy+partiallyUpdateTrade"></a>

### UpdateTradeProxy#partiallyUpdateTrade(updates, tradeID)
Partially update a derivative trade with ID `tradeID` by only specifying the attributes that change e.g
```js
updates = {
     buying_party = "ABC123",
     selling_party = "BCD456"
}
```
Any invalid values will throw an error.

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| updates | <code>\*</code> | object containing `attribute: value` pairs to be updated for trade with id `tradeID` |
| tradeID | <code>string</code> | ID of the updated trade |

<a name="exp_module_BackendProxy--UpdateTradeProxy+updateTrade"></a>

### UpdateTradeProxy#updateTrade(updatedTrade, tradeID)
Replace an existing trade with `updatedTrade`.
The input trade must include all trade attributes.
An invalid/incomplete trade will throw an error.

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| updatedTrade | <code>\*</code> | Object representing a complete derivative trade |
| tradeID | <code>string</code> | ID of the derivative trade to be edited. |

<a name="exp_module_BackendProxy--GetTradeProxy+getFilteredTrades"></a>

### GetTradeProxy#getFilteredTrades(filter, page)
Get trades filtered by a set of attributes e.g
```js
filter = {
     notional_currency: "USD",
     buying_party: "Google"
}
```
will return all trade entries where `notional_currency` is "USD" and `buying_party` is "Google".
An empty or undefined filter will be ignored and `getFilteredTrades` returns a list of most recent trades, analogously to getListOfTrades.
Any attribute-value pairs where the attribute is not a known trade attribute or the value is invalid are ignored in the query. Check console for any ignored attributes

**Kind**: Exported function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filter | <code>\*</code> |  | attribute-value pairs for sorting derivative trade entries |
| page | <code>number</code> | <code>1</code> | Results page number |

<a name="exp_module_BackendProxy--GetReportProxy+getListOfReports"></a>

### GetReportProxy#getListOfReports(page)
Get a list of most recently generated reports

**Kind**: Exported function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| page | <code>number</code> | <code>1</code> | Page number, default 1 |

<a name="exp_module_BackendProxy--GetReportProxy+getReportsAfter"></a>

### GetReportProxy#getReportsAfter(date, page)
Get the URLs of reports generated on or after `date`

**Kind**: Exported function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>string</code> |  | Generation date of report in YYYY-MM-DD format |
| page | <code>number</code> | <code>1</code> | Results page number |

<a name="exp_module_BackendProxy--GetReportProxy+getReportsBefore"></a>

### GetReportProxy#getReportsBefore(date, page)
Get the URLs of report generated on or before `date`

**Kind**: Exported function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>string</code> |  | Generation date of report in YYYY-MM-DD format |
| page | <code>number</code> | <code>1</code> | Results page number |

<a name="exp_module_BackendProxy--GetReportProxy+getReportsOn"></a>

### GetReportProxy#getReportsOn(date, page)
Get the URLs of reports generated on the same day as `date`

**Kind**: Exported function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>string</code> |  | Generation date of report in YYYY-MM-DD format |
| page | <code>number</code> | <code>1</code> | Page number of results |
