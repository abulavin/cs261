import axios from 'axios';

class BackendProxy {

    constructor(url) {
        this.url = window.location.host + url + "/";
    }

    post(data) {
        let jsonString = JSON.stringify(data);
        axios.post(this.url, jsonString)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
             })
            .finally(() => {

            });
    }

    delete(tradeID) {
        let deleteURL = this.url + tradeID;
        axios.delete(deleteURL)
            .then(response => {

            })
            .catch(error => {
                alert(error);
            });
    }

    get(tradeID="") {
        let tradeURL = this.url + tradeID;
        axios.get(this.url)
            .then(success => {

            })
            .catch(error => {
                alert(error)
            });
    }

    put(tradeID="", data) {
        let tradeURL = this.url + tradeID;
        let jsonString = JSON.stringify(data);
        axios.put(tradeURL, jsonString)
            .then(success => {

            })
            .catch(error => {

            });
    }

}

export class CreateTradeProxy extends BackendProxy {

    constructor() { 
       super('/trades');
    }

    createTrade(trade) {
        this.post(trade);
    }

}