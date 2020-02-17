**Create Trade**
----
  Sumbit a Derivative Trade.

* **URL**

  /trades/

* **Method:**

  `POST` 
  
*  **URL Params**

   None

* **Data Params**

  The trade data should be send in json format in the body of the post request. It should be in the same format as below:
  ``` json
    {
        "date_of_trade": "2020-02-02",
        "trade_id": "1",
        "product": "1",
        "buying_party": "1",
        "selling_party": "1",
        "notational_amount": 1.0,
        "quantity": 1.0,
        "notational_currency": "1",
        "maturity_date": "2020-02-20",
        "underlying_price": 1.0,
        "underlying_currency": "1",
        "strike_price": 1.0
    }
    ```
    Make sure that all fields are present and that the correct data types are passed. Please view the `DerivativeTrade` class in `backend/trades/models.py` for more infomation on field types.

* **Success Response:**
  
  A successful Repsonse will return a status code of 200 along with the json form of the object just created. A successful repsonse means that the Error Detection Module has not found any issues with the submitted trade.

  * **Code:** 201 <br />
    **Content:** 
    ``` json
    {
        "date_of_trade": "2020-02-02",
        "trade_id": "1",
        "product": "1",
        "buying_party": "1",
        "selling_party": "1",
        "notational_amount": 1.0,
        "quantity": 1.0,
        "notational_currency": "1",
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

  * **Code:** TODO: Error Detection Module Codes <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

  ``` js
  var trade_data = {
    "date_of_trade": "2020-02-02",
    ...
  }
  
  $.ajax({
    url: "/trades/",
    dataType: "json",
    data: trade_data,
    type : "POST",
    success : function(r) {
      console.log(r);
    }
  });
  ```