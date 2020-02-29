/**
 * @module BackendProxy 
 */

import axios from 'axios';
import { TradeValidator, checkerFunctions } from './TradeValidator';

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

    getFilteredTrades(filter) {
        if(filter !== undefined) {
            let urlParameters = '';
            for(attribute in filter) {
                if(attribute in TradeValidator.tradeProperties) {
                    const checkerFunction = checkerFunctions[attribute];
                    const value = filter[attribute]
                    if(!checkerFunction(value)) {
                        throw new Error(`Invalid filter value for attribute ${attribute}: ${value}`);
                    }
                    urlParameters += `${attribute}=${value}&`
                }
            }
            if(urlParameters !== '') {
                urlParameters = '?' + urlParameters.substring(0, urlParameters.length);
                this.getRequest(urlParameters);
            }
        } else {
            throw new Error("Invalid filter: " + filter);
        }
    }
}
export class GetReportProxy extends BackendProxy {

    constructor() {
        super('/reports');
    }

    /**
     * Get a list of most recently generated reports
     * @param {number} page Page number, default 1
     * @alias module:BackendProxy
     */
    getListOfReports(page = 1) {
        return this.makeGetRequestPromise("?page=" + page);
    }

    /**
     * Get the URLs of reports generated on or after `date`
     * @param {string} date Generation date of report in YYYY-MM-DD format
     * @param {number} page Results page number
     * @alias module:BackendProxy
     */
    getReportsAfter(date, page = 1) {
        if (!TradeValidator.dateOfTradeIsValid(date))
            throw new Error("Invalid query date: " + date);

        const urlParameters = `?date__gte=${date}&page=${page}`;
        return this.makeGetRequestPromise(urlParameters);
    }

    /**
     * Get the URLs of report generated on or before `date`
     * @param {string} date Generation date of report in YYYY-MM-DD format
     * @param {number} page Results page number
     * @alias module:BackendProxy
     */
    getReportsBefore(date, page = 1) {
        if (!TradeValidator.dateOfTradeIsValid(date))
            throw new Error("Invalid query date: " + date);

        const urlParameters = `?date__lte=${date}&page=${page}`;
        return this.makeGetRequestPromise(urlParameters);
    }

    /**
     * Get the URLs of reports generated on the same day as `date`
     * @param {string} date Generation date of report in YYYY-MM-DD format 
     * @param {number} page Page number of results
     * @alias module:BackendProxy
     */
    getReportsOn(date, page = 1) {
        if (!TradeValidator.dateOfTradeIsValid(date))
            throw new Error("Invalid query date: " + date);

        const urlParameters = `?date=${date}&page=${page}`;
        return this.makeGetRequestPromise(urlParameters);
    }

    makeGetRequestPromise(urlParameter) {
        return new Promise(resolve => {
            this.getRequest(urlParameter)
                .then(response => {
                    console.log(response.status + " " + response.statusText);
                    resolve(response.data);
                })
                .catch(error => { throw error });
        })
    }

}