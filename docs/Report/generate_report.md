**Retrieve Reports**
----
  Generate a report of the current days trades so far.

* **URL**

  /reports/generate/

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Success Response:**
  
  A successful response will have a status code of 200. The json will be wrapped in a pagination object to give infomation about the results returned and the page number. Make sure to index the `results` to get the list of report objects.

  * **Code:** 200 <br />
    **Content:** Will return the generated PDF report. 
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR  <br />
    **Content:** `{ error : "*error that has happened server side*" }`

* **Sample Call:**

  ``` js    
  $.ajax({
    url: "/reports/generate/",
    dataType: "json",
    type : "POST",
    success : function(r) {
      console.log(r);
    }
  });
  ```