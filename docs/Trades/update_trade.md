**Update Trade**
----
  Update the all or some fields on a Derivative Trade.

* **URL**

  /trades/<trade_id>/

* **Method:**

  `PUT` | `PATCH`
  
*  **URL Params**

   None

* **Data Params**

  The trade can be updated in two ways: a complete update (PUT) or a partial update (PATCH).
  * PUT
  </br> You need to provide all fields, even the ones that don't change:
  ``` json
    {
        "date_of_trade": "2020-02-02",
        "trade_id": "1",
        "product": "1",
        "buying_party": "1",
        "selling_party": "1",
        "notional_amount": 1.0,
        "quantity": 1.0,
        "notional_currency": "1",
        "maturity_date": "2020-02-20",
        "underlying_price": 1.0,
        "underlying_currency": "1",
        "strike_price": 1.0
    }
    ```
  * PATCH
  </br> You only need to provide the fields that change: 
  ``` json
    {
        "notional_amount": 1.0,
        "quantity": 1.0,
    }
    ```

* **Success Response:**
  
  A successful response will have a status code of 200 and will return a json object of the trade.

  * **Code:** 200 <br />
    **Content:**
    ``` json
    {
        "date_of_trade": "2020-02-02",
        "trade_id": "1",
        "product": "1",
        "buying_party": "1",
        "selling_party": "1",
        "notional_amount": 1.0,
        "quantity": 1.0,
        "notional_currency": "1",
        "maturity_date": "2020-02-20",
        "underlying_price": 1.0,
        "underlying_currency": "1",
        "strike_price": 1.0
    }
    ```
 
* **Error Response:**

  An Error response may be due to incorrect fields being passed or incorrect data types. It may also be due to the Error Detection Module returning it's suggestions.

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ field_name : "field_error" }`

  OR

  If the trade is older than 7 days old, it is not available to be edited. 

  * **Code:** 401 <br />
    **Content:** `{ error : "Unauthorized" }`

  OR

  * **Code:** TODO: Error Detection Module Codes <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

  ``` js
  var trade_data = {
    "date_of_trade": "2020-02-02",
    "trade_id": "1",
    "product": "1",
    "buying_party": "1",
    "selling_party": "1",
    "notional_amount": 1.0,
    "quantity": 1.0,
    "notional_currency": "1",
    "maturity_date": "2020-02-20",
    "underlying_price": 1.0,
    "underlying_currency": "1",
    "strike_price": 1.0
  }
  
  $.ajax({
    url: "/trades/",
    dataType: "json",
    data: trade_data,
    type : "PUT",
    success : function(r) {
      console.log(r);
    }
  });

  -----------------------------------

  var trade_data = {
    "selling_party": "1",
    "maturity_date": "2020-02-20",
  }
  
  $.ajax({
    url: "/trades/",
    dataType: "json",
    data: trade_data,
    type : "PATCH",
    success : function(r) {
      console.log(r);
    }
  });
  ```

* **Notes:**

  When a trade is updated, a copy of the old data is kept (in the DerivativeTradeHistory table) so that it can be reported in future reports if neccesary.