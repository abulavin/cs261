**Retrieve Reports**
----
  Retrieve all reports, or filter reports by a given date or a range of dates.

* **URL**

  /reports/

* **Method:**

  `GET`
  
*  **URL Params**

   You can filter the reports by date by passing params as shown below. You can pass multiple params on the same request.

   The number of trades returned is paginated by 100. This means only 100 objects will be returned per page. You access the first page without the need for any urls params but to access the following pages use the param: `?page=2`.

   **Optional:**
 
   `date=2020-01-13` will return all reports generated on 2020-01-13 </br>
   </br>`date__gte=2020-01-13` will return all reports generated on or after 2020-01-13
   </br>`date__lte=2020-01-13` will return all reports generated on or before 2020-01-13

* **Success Response:**
  
  A successful response will have a status code of 200. The json will be wrapped in a pagination object to give infomation about the results returned and the page number. Make sure to index the `results` to get the list of report objects.

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "count": 126,
        "next": [null](http://127.0.0.1:8000/reports/?page=2),
        "previous": null,
        "results": [
            {
                "date": "2020-02-28",
                "report": "reports/2020-02-28/2/"
            },
            {
                "date": "2020-02-10",
                "report": "reports/2020-02-10/3/"
            },
        ]
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR  <br />
    **Content:** `{ error : "*error that has happened server side*" }`

* **Sample Call:**

  ``` js    
  $.ajax({
    url: "/reports/?date__gte=2020-01-23",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
  ```