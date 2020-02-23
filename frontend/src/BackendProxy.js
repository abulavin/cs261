import axios from 'axios';
import {TradeValidator} from './TradeValidator';

class BackendProxy {

    constructor(url) {
        // Test URL
        this.url = 'http://localhost:8000' + url + "/";
    }

    postRequest(data) {
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

    deleteRequest(tradeID="") {
        let deleteURL = this.url + tradeID;
        axios.delete(deleteURL)
            .then(response => {
                console.log("Delete Status: " + response.status)
            })
            .catch(error => {
                alert(error);
            });
    }

    getRequest(tradeID="") {
        let tradeURL = this.url + tradeID;
        let tradeList
        axios.get(tradeURL)
            .then(response => {
                tradeList = response;
            })
            .catch(error => {
                alert(error)
            });
        return tradeList;
    }

    putRequest(data, tradeID) {
        let tradeURL = this.url + tradeID;
        let jsonString = JSON.stringify(data);
        axios.put(tradeURL, jsonString)
            .then(response => {

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
        TradeValidator.validateTrade(trade)
        this.postRequest(trade);
    }

}

export class DeleteTradeProxy extends BackendProxy {

    constructor() {
        super('/trades');
    }

    deleteTrade(tradeID) {
        if(!TradeValidator.tradeIDisNumerical(tradeID))
            throw new Error('Expected tradeID to be a number, got:' + tradeID);
        this.deleteRequest(tradeID);
    }

}

export class GetTradeProxy extends BackendProxy {

    constructor() {
        super('/trades');
    }

    getListOfTrades() {
        const tradeList = this.getRequest();
        return tradeList;
    }

    getTradeByID(tradeID) {
        if(!TradeValidator.tradeIDisNumerical(tradeID))
            throw new Error('Expected tradeID to be a number, got:' + tradeID);
        const trade = this.getRequest(tradeID);
        return trade;
    }

}
