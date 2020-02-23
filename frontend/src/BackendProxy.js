import axios from 'axios';
import { TradeValidator } from './TradeValidator';

/**
 * Base class to provide HTTP request functionality for
 * trade operations
 */
class BackendProxy {

    constructor(url) {
        this.url = window.location.origin + url + "/";
    }

    postRequest(data) {
        // Data must be plain JS object (not a string) in order for
        // content type to be set to application/json.
        // Otherwise server will return Bad Request
        axios.post(this.url, data)
            .then(response => {
                console.log("Trade ID: " + response.data.trade_id + " created.");
            })
            .catch(error => { throw error });
    }

    deleteRequest(parameters = "") {
        let deleteURL = this.url + parameters;
        axios.delete(deleteURL)
            .then(response => console.log("Delete Status: " + response.status))
            .catch(error => { throw error });
    }

    getRequest(parameters = "") {
        let getURL = this.url + parameters;
        return axios.get(getURL);
    }

    putRequest(data, parameters = "") {
        const putURL = this.url + parameters;
        axios.put(putURL, data)
            .then(response => console.log(response.status))
            .catch(error => { throw error });
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

    /**
     * Delete the trade with ID `tradeID`
     * If the ID is invalid an exception is thrown.
     * @param {string} tradeID Trade ID
     */
    deleteTrade(tradeID) {
        if (!TradeValidator.tradeIDisValid(tradeID))
            throw new Error('Invalid trade ID; got: ' + tradeID);
        this.deleteRequest(tradeID);
    }
}

export class GetTradeProxy extends BackendProxy {

    constructor() {
        super('/trades');
    }

    getListOfTrades() {
        return new Promise((resolve, reject) => {
            this.getRequest()
                .then(response => resolve(response.data))
                .catch(error => { throw error });
        });
    }

    /**
     * Returns an object of trade with ID `tradeID`
     * Throws an exception if this ID is invalid.
     * Any errors stemming from performing the HTTP request
     * e.g 404 are also thrown to the caller.
     * @param {string} tradeID Trade ID
     */
    getTradeByID(tradeID) {
        if (!TradeValidator.tradeIDisValid(tradeID))
            throw new Error('Invalid trade ID; got: ' + tradeID);
        else {
            return new Promise((resolve) => {
                this.getRequest(tradeID)
                    .then(response => resolve(response.data))
                    .catch(error => { throw error });
            });
        }
    }
}
