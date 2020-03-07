/**
 * Utility module for validating trades
 * @module TradeValidator
 */
import {currencyCodes} from './currencyCodes';

function humanise(str) {
    var i, f = str.split('_');
    for (i=0; i<f.length; i++) {
      f[i] = f[i].charAt(0).toUpperCase() + f[i].slice(1);
    }
    return f.join(' ');
  }
  

export const TradeValidator = {

    tradeAttributes: [
        'date_of_trade',
        'trade_id',
        'product',
        'buying_party',
        'selling_party',
        'notional_amount',
        'quantity',
        'notional_currency',
        'maturity_date',
        'underlying_price',
        'underlying_currency',
        'strike_price'
    ],

    /**
     * Validates the fields of the derivative trade one-by-one to be valid at basic level.
     * Throws an exception if any fields are invalid.
     * @param {Object} trade Object representing a trade entry
     * @alias module:TradeValidator
     */
    validateTrade: function (trade) {
        try {
            if (trade !== undefined) {
                this.tradeHasAllNecessaryProperties(trade);
                this.tradeHasNoUndefinedProperties(trade);

                let errorMessage = '';
                for (const tradeAttribute in this.filterErroneousAttributes(trade)) {
                    errorMessage += `Invalid value for attribute ${tradeAttribute}: ${trade[tradeAttribute]}\n`;
                }
                if (errorMessage.length > 0) {
                    errorMessage = "Trade has invalid attributes.\n" + errorMessage;
                    this.throwError(errorMessage);
                }
                return true;
            } else {
                this.throwError("Input trade is undefined.");
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Filter a derivative trade to only have the erroneous attributes.
     * @param {object} trade Derivative trade object
     */
    getListOfErrors: function (trade) {
        let invalidTradeAttributes = this.filterErroneousAttributes(trade)
        let errors = [];
        for (const tradeAttribute in invalidTradeAttributes) {
            let attributeValue = trade[tradeAttribute];

            if(tradeAttribute === 'date_of_trade') {
                this.handleDateError(attributeValue).forEach(error => errors.push(error));
            } else if (!attributeValue) {
                errors.push([humanise(tradeAttribute), "Enter a value"]);
            } else {
                errors.push([humanise(tradeAttribute), attributeValue]);
            }
        }
        return errors;
    },

    handleDateError(date) {
        let errors = []
        if(this.dateEmpty(date)) {
            errors.push(["Date Of Trade", "Enter a value"]);
            errors.push(["Time Of Trade", "Enter a value"]);
        } else {
            let dateSubstring = date.split(' ')[0]
            let timeSubstring = date.split(' ')[1]
            if (!this.dateSubstringCorrect(dateSubstring)) {
                errors.push(["Date Of Trade", dateSubstring])  
            }
            if (!this.timeSubstringCorrect(timeSubstring)) {
                errors.push(["Time Of Trade", timeSubstring])
            }
        }
        return errors
    },

    dateEmpty(date) {
        return !(date && date.trim());
    },

    /**
     * Filter a derivative trade to only have the erroneous attributes.
     * @param {object} trade Derivative trade object
     */
    filterErroneousAttributes: function(trade) {
        let errors = {};
        for (const tradeAttribute in trade) {
            const attributeIsCorrect = checkerFunctions[tradeAttribute];
            const attributeValue = trade[tradeAttribute];
            if (!attributeIsCorrect(attributeValue)) {
                errors[tradeAttribute] = attributeValue;
            }
        }
        return errors;
    },

    /**
     * Returns true if the trade has all attributes necessary.
     * Throws an exception with an error listing the missing fields otherwise.
     * @param {Object} trade Derivative trade
     * @alias module:TradeValidator
     */
    tradeHasAllNecessaryProperties: function (trade) {
        let missingAttribute = [];
        this.tradeAttributes.forEach(property => {
            if (!trade.hasOwnProperty(property))
                missingAttribute.push(property);
        });
        if (missingAttribute.length > 0) {
            let errorMessage = "Trade has missing attributes: ";
            missingAttribute.forEach(property => {
                errorMessage += property + ", ";
            });
            throw new Error(errorMessage);
        }
        return true;
    },

    /**
     * Returns true if all the attributes of the input object are defined
     *  i.e no attributes have the value `undefined`.
     * Throws an exception listing undefined attributes otherwise.
     * Note: Will return true for the empty object {}.
     * @param {Object} trade Derivative trade
     * @alias module:TradeValidator
     */
    tradeHasNoUndefinedProperties: function (trade) {
        let unidentifiedAttributes = [];
        for (const attribute in trade) {
            if (trade[attribute] === undefined)
                unidentifiedAttributes.push(attribute);
        }
        if (unidentifiedAttributes.length > 0) {
            let errorMessage = "Trade has undefined properties: ";
            unidentifiedAttributes.forEach(property => {
                errorMessage += property + ", ";
            });
            throw new Error(errorMessage);
        }
        return true;
    },

    /**
     * Returns true if the object has all the necessary trade attributes.
     * Similar to `tradeHasAllNecessaryProperties`, except returns false
     * if an attribute is not found instead of throwing an exception.
     * @param {Object} trade derivative trade
     * @alias module:TradeValidator
     */
    checkTradeHasAllProperties: function (trade) {
        for (const property in this.tradeAttributes) {
            if (!trade.hasOwnProperty(property)) {
                return false;
            }
        }
        return true;
    },

    /**
     * Returns true of all the attributes of the input object are defined 
     * i.e none of the attributes of the object have the value `undefined`
     * or the object is empty ({}).
     * Returns false otherwise.
     * @param {Object} trade Derivative trade
     * @alias module:TradeValidator
     */
    checkTradeFullyDefined: function (trade) {
        for (let attribute in trade) {
            if (trade[attribute] === undefined)
                return false;
        }
        return true;
    },

    /**
     * Returns true if the trade ID matches a set of capital letters
     * [A-Z] followed by a set of digits [0-9].
     * Does not check if the trade ID exists in the database
     * @param {number} tradeID Trade ID number
     * @alias module:TradeValidator
     */
    tradeIDisValid: function (tradeID) {
        const regex = /^[A-Z]+[0-9]+$/;
        return regex.test(tradeID);
    },

    /**
     * Returns true if the input string can successfully be parsed into a date.
     * False otherwise.
     * @param {string} date Date string representation
     * @alias module:TradeValidator
     */
    dateAndTimeOfTradeIsValid: function (date) {
        if(typeof date === 'string') {
            let dateSubstring = date.split(' ')[0]
            let timeSubstring = date.split(' ')[1]
            let dateCorrect = TradeValidator.dateSubstringCorrect(dateSubstring);
            let timeCorrect = TradeValidator.timeSubstringCorrect(timeSubstring);
            return dateCorrect && timeCorrect;
        }
        return false
    },

    maturityDateIsValid: function (date) {
        return !! Date.parse(date) && TradeValidator.dateSubstringCorrect(date);
    },

    dateSubstringCorrect: function (date) {
        // Matches YYYY-MM-DD
        const regex = /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/;
        return regex.test(date);
    },    

    timeSubstringCorrect: function (time) {
        // Matches HH:MM
        const regex = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
        return regex.test(time);
    },    
    
    /**
     * Returns true if the quantity value can be parsed into an integer
     * and is non-zero.
     * @param {number} quantity 
     * @alias module:TradeValidator
     */
    productQuantityIsValid: function (quantity) {
        let parsedQuantity = parseFloat(quantity, 10);
        return !Number.isNaN(parsedQuantity) && Number.isInteger(parsedQuantity) && parsedQuantity > 0;
    },

    /**
     * Returns true if the price value can be parsed into a float and is non-zero.
     * @param {number} price 
     * @alias module:TradeValidator
     */
    productPriceIsValid: function (price) {
        let parsedPrice = parseFloat(price);
        return !Number.isNaN(parsedPrice) && parsedPrice > 0;
    },

    /**
     * Returns true if the string value is defined, non-empty 
     * and at most 200 chars in length.
     * @param {string} stringField 
     * @alias module:TradeValidator
     */
    stringLengthIsValid: function (stringField) {
        return stringField && stringField.length > 0 && stringField.length <= 200;
    },

    /**
     * Returns true if the input code is included in the set of currencies 
     * provided by the test data.
     * @param {string} code 3 Letter ISO currency code
     * @alias module:TradeValidator
     */
    currencyCodeIsValid: function (code) {
        return currencyCodes.includes(code);
    },

    throwError: function (message) {
        throw new Error(message);
    }
}

export const checkerFunctions = {
    date_of_trade: TradeValidator.dateAndTimeOfTradeIsValid,
    trade_id: TradeValidator.tradeIDisValid,
    product: TradeValidator.stringLengthIsValid,
    buying_party: TradeValidator.stringLengthIsValid,
    selling_party: TradeValidator.stringLengthIsValid,
    notional_amount: TradeValidator.productPriceIsValid,
    quantity: TradeValidator.productQuantityIsValid,
    notional_currency: TradeValidator.currencyCodeIsValid,
    maturity_date: TradeValidator.maturityDateIsValid,
    underlying_price: TradeValidator.productPriceIsValid,
    underlying_currency: TradeValidator.currencyCodeIsValid,
    strike_price: TradeValidator.productPriceIsValid
}