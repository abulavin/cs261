/**
 * @module BackendProxy 
 */

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
        // the Content-Type header to be set to application/json.
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
        let putURL;
        if (parameters)
            putURL = this.url + parameters + '/';
        else
            putURL = this.url;

        axios.put(putURL, data)
            .then(response => {
                console.log("Put Status: " + response.status);
                console.log("Updated Object:");
                console.log(response.data);
            })
            .catch(error => { throw error });
    }

    patchRequest(data, parameters = "") {
        let putURL;
        if (parameters)
            putURL = this.url + parameters + '/';
        else
            putURL = this.url;

        axios.patch(putURL, data)
            .then(response => {
                console.log("Put Status: " + response.status);
                console.log("Updated Object:");
                console.log(response.data);
            })
            .catch(error => { throw error });
    }
}

export class CreateTradeProxy extends BackendProxy {

    constructor() {
        super('/trades');
    }

    /**
     * Send a derivative trade object to the server.
     * Throws an exception if the trade or one of its attributes are invalid.
     * @param {object} trade Object representing a derivative trade
     * @alias module:BackendProxy
     */
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
     * Delete the trade with ID `tradeID`.
     * If the ID is invalid or doesn't exist an exception is thrown.
     * @param {string} tradeID Trade ID
     * @alias module:BackendProxy
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

    /**
     * Retrieve an object containing 100 derivative trades, total derivative trade count, and the URLs of the next page and last page.
     * If page number isn't specified the 1st page is retrieved by default.
     * @alias module:BackendProxy
     * @param {number} page Page number of derivative trade list
     */
    getListOfTrades(page = 1) {
        page = page < 1 ? 1 : page;
        const pageParam = '?page=' + page;
        return new Promise((resolve, reject) => {
            this.getRequest(pageParam)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => { throw error });
        });
    }

    /**
     * Returns an object of trade with ID `tradeID`
     * Throws an exception if this ID is invalid.
     * Any errors stemming from performing the HTTP request e.g 404 are also thrown to the caller.
     * @param {string} tradeID Trade ID
     * @alias module:BackendProxy
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
export class UpdateTradeProxy extends BackendProxy {

    constructor() {
        super('/trades');
    }

    partiallyUpdateTrade(updates, tradeID) {
        const checkerFunctions = {
            date_of_trade: TradeValidator.dateOfTradeIsValid,
            trade_id: TradeValidator.tradeIDisValid,
            product: TradeValidator.productPriceIsValid,
            buying_party: TradeValidator.stringLengthIsValid,
            selling_party: TradeValidator.stringLengthIsValid,
            notional_amount: TradeValidator.productPriceIsValid,
            quantity: TradeValidator.productQuantityIsValid,
            notional_currency: TradeValidator.currencyCodeIsValid,
            maturity_date: TradeValidator.dateOfTradeIsValid,
            underlying_price: TradeValidator.productPriceIsValid,
            underlying_currency: TradeValidator.currencyCodeIsValid,
            strike_price: TradeValidator.productPriceIsValid
        }
        for (const prop in updates) {
            const checkerFunc = checkerFunctions[prop];
            if (!checkerFunc(updates[prop]))
                throw new Error("Invalid update to property " + prop + ": " + updates[prop]);
        }
        this.patchRequest(updates, tradeID)
    }

    updateTrade(updatedTrade) {
        TradeValidator.validateTrade(updatedTrade);
        const tradeID = updatedTrade.trade_id;
        this.putRequest(updatedTrade, tradeID)
    }
}

export class GetReportProxy extends BackendProxy {

    constructor() {
        super('/reports');
    }

    getListOfReports() {
        return this.makeGetRequestPromise();
    }

    getReportsAfter(date) {
        if (!TradeValidator.dateOfTradeIsValid(date))
            throw new Error("Invalid query date: " + date);

        return this.makeGetRequestPromise("?date__gte=" + date);
    }

    getReportsBefore(date) {
        if (!TradeValidator.dateOfTradeIsValid(date))
            throw new Error("Invalid query date: " + date);

        return this.makeGetRequestPromise("?date__lte=" + date);
    }

    getReportsOn(date) {
        if (!TradeValidator.dateOfTradeIsValid(date))
            throw new Error("Invalid query date: " + date);

        return this.makeGetRequestPromise("?date=" + date);
    }

    makeGetRequestPromise(urlParameter) {
        return new Promise(resolve => {
            this.getRequest(urlParameter).then(response => {
                console.log(response.status + " " + response.statusText);
                resolve(response.data);
            })
        })
    }

}