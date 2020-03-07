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

    postRequest(data, parameters = "") {
        // Data must be plain JS object (not a string) in order for
        // the Content-Type header to be set to application/json.
        // Otherwise server will return Bad Request
        const postURL = this.url + parameters;
        return axios.post(postURL, data);
    }

    postBlobRequest(parameters = "") {
        const putURL = this.url + parameters;
        return axios({
            url: putURL,
            method: 'post',
            responseType: 'blob'
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

    getBlobRequest(parameters = "") {
        let getURL = this.url + parameters;
        return axios.get(getURL, {
            responseType: 'blob'
        });
    }

    putRequest(data, parameters = "") {
        let putURL = this.url
        if (parameters)
            putURL += parameters;

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

    getSettings(override = false) {
        let parameters = '?'
        if (override === Settings.OVERRIDE || !window.settings.check) {
            parameters += 'no_check=true'
        }
        parameters += '&t=' + window.settings.tParam;
        return parameters
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
     * @param {bool} override Set to Settings.override to disable error detection module checks 
     * @alias module:BackendProxy
     */
    createTrade(trade, override = false) {
        TradeValidator.validateTrade(trade);
        let parameters = this.getSettings(override);
        return new Promise((resolve, reject) => {
            this.postRequest(trade, parameters)
                .then(response => {
                    console.log("POST", response.status, response.statusText);
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response.data);
                })
        })
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
        const pageParam = '?page=' + page;
        console.log(pageParam)
        return new Promise((resolve, reject) => {
            this.getRequest(pageParam)
                .then(response => resolve(response.data))
                .catch(error => { reject(error) });
        });
    }
    // retrieves sorted trades based on attribute given and the direction of sorting (desc/asc)
    getSortedTrades(heading, direction) {
        let param = "";
        if (direction == "desc") {
            param = '?ordering:-' + heading;
        }
        if (direction == "asc") {
            param = '?ordering=' + heading;
        }
        console.log(param)
        return new Promise((resolve, reject) => {
            this.getRequest(param)
                .then(response => resolve(response.data))
                .catch(error => { reject(error) });
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

    /**
     * Get trades filtered by a set of attributes e.g
     * ```js
     * filter = {
     *      notional_currency: "USD",
     *      buying_party: "Google"
     * }
     * ```
     * will return all trade entries where `notional_currency` is "USD" and `buying_party` is "Google".
     * An empty or undefined filter will return a list of most recent trades, analogously to getListOfTrades.
     * Any attribute-value pairs where the attribute is not a known trade attribute or the value is invalid are ignored in the query.
     * @param {*} filter attribute-value pairs for sorting derivative trade entries
     * @param {number} page Results page number
     * @alias module:BackendProxy
     */
    getFilteredTrades(filter, page = 1) {
        let urlParameters = '?page=' + page;
        if (filter !== undefined) {
            for (const attribute in filter) {
                if (TradeValidator.tradeProperties.includes(attribute)) {
                    const checkerFunction = checkerFunctions[attribute];
                    const value = filter[attribute];
                    if (!checkerFunction(value)) {
                        console.error(`Invalid filter value for attribute ${attribute}: ${value}. Ignoring`);
                    } else {
                        urlParameters += `&${attribute}=${value}`;
                    }
                } else {
                    console.error(`Unknown trade attribute ${attribute}. Ignoring`);
                }
            }
        }
        return new Promise(resolve => {
            this.getRequest(urlParameters).then(response => resolve(response.data));
        });
    }
}
export class UpdateTradeProxy extends BackendProxy {

    constructor() {
        super('/trades');
    }

    /**
     * Partially update a derivative trade with ID `tradeID` by only specifying the attributes that change e.g
     * ```js
     * updates = {
     *      buying_party = "ABC123",
     *      selling_party = "BCD456"
     * }
     * ```
     * Any invalid values will throw an error.
     * @param {*} updates object containing `attribute: value` pairs to be updated for trade with id `tradeID`
     * @param {string} tradeID ID of the updated trade
     * @alias module:BackendProxy
     */
    partiallyUpdateTrade(updates, tradeID) {
        for (const prop in updates) {
            const checkerFunction = checkerFunctions[prop];
            if (!checkerFunction(updates[prop]))
                throw new Error("Invalid update to property " + prop + ": " + updates[prop]);
        }
        this.patchRequest(updates, tradeID)
    }

    /**
     * Replace an existing trade with `updatedTrade`.
     * The input trade must include all trade attributes.
     * An invalid/incomplete trade will throw an error.
     * @param {*} updatedTrade Object representing a complete derivative trade
     * @param {string} tradeID ID of the derivative trade to be edited.
     * @param {bool} override Set to Settings.OVERRIDE to disable error detection module checks
     * @alias module:BackendProxy
     */
    updateTrade(updatedTrade, tradeID, override = false) {
        if (!TradeValidator.tradeIDisValid(tradeID))
            throw new Error('Invalid trade ID; got: ' + tradeID);
        TradeValidator.validateTrade(updatedTrade);

        let parameters = `${tradeID}/${this.getSettings(override)}`
        this.putRequest(updatedTrade, parameters)
    }
}

export class GetReportProxy extends BackendProxy {

    constructor() {
        super('/reports');
    }

    generateDailyReport() {
        return new Promise((resolve, reject) => {
            this.postBlobRequest("generate/").then(response => {
                resolve(response.data);
            })
                .catch(error => {
                    reject(error.response);
                })
        });
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

    getReportURL(url) {
        return new Promise(resolve => {
            this.getBlobRequest(url)
                .then(response => {
                    console.log(response.status + " " + response.statusText);
                    resolve(response.data);
                })
                .catch(error => { throw error });
        })
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

export const Settings = {
    OVERRIDE: true,
}
