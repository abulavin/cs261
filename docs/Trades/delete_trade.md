**Delete Trade**
----
  Delete a Derivative Trade.

* **URL**

  /trades/<trade_id>/

* **Method:**

  `DELETE`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**
  
  A successful Repsonse will return a status code of 204, with the trade being deleted from the database.

  * **Code:** 204 <br />
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "detail": "Not found."}`

* **Sample Call:**

  ``` js    
  $.ajax({
    url: "/trades/1/",
    dataType: "json",
    type : "DELETE",
    success : function(r) {
      console.log(r);
    }
  });
  ```

* **Notes:**

  When a trade is deleted, it is removed from the DerivativeTrade but a copy of it is kept in the 
  DerivativeTradeHistory so that it can be included in future reports if needed.