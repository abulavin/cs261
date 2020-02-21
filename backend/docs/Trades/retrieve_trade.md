**Retrieve Trade**
----
  Return the json object for a given Derivative Trade.

* **URL**

  /trades/<trade_id>/

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**
  
  A successful Repsonse will return a status code of 200 along with the json form of the trade.

  * **Code:** 200 <br />
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

   * **Code:** 500 INTERNAL SERVER ERROR  <br />
    **Content:** `{ error : "*error that has happened server side*" }`

* **Sample Call:**

  ``` js    
  $.ajax({
    url: "/trades/1/",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
  ```