**List Trades**
----
  Returns a list of all Derivative Trades in descending order of `date_of_trade`

* **URL**

  /trades/

* **Method:**

  `GET`
  
*  **URL Params**

   URL Params can be passed in order to filter the trades by each attribute. Multiple attributes can be filtered at once.
   Make sure that the attribute names are the same as the field defined in the `DerivativeTrade` class in `backend/trades/models.py`.
   For more infomation, [click here](https://django-filter.readthedocs.io/en/latest/index.html)

   **Optional:**
   <br />Examples:
   * `buying_party=google`
   * `notational_amount=5&notational_currency=GDP`

* **Data Params**

  None

* **Success Response:**
  
  A successful response will have a status code of 200 and will return a list of json objects in the form the same as below:

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
    url: "/trades/",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
  ```