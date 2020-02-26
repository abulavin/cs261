import {TradeValidator} from '../TradeValidator';
import {currencyCodes, companyCodes} from '../currencyCodes';

const exampleTrade = {
    date_of_trade: "2020-02-02",
    trade_id: "DILF10",
    product: "1",
    buying_party: "1",
    selling_party: "1",
    notional_amount: 1.0,
    quantity: 1.0,
    notional_currency: "USD",
    maturity_date: "2020-02-20",
    underlying_price: 1.0,
    underlying_currency: "USD",
    strike_price: 1.0
};
const wrongTrade = {
    date_of_trade: undefined,
    trade_id: "1",
    product: "1",
    buying_party: "1",
    selling_party: "1",
    notional_amount: 1.0,
    quantity: 1.0,
    notional_currency: "1",
    maturity_date: undefined,
    underlying_price: 1.0,
    underlying_currency: "1"
};

const badTrades = [
    {},
    {
        date_of_trade: "2020-02-02",
        trade_id: "1",
        product: "1",
        quantity: undefined
    },
    wrongTrade
]

test('TradeValidator identifies valid IDs', () => {
    for(code in companyCodes) {
        expect(TradeValidator.tradeIDisValid(code)).toBeTruthy();
    }
});

test('TradeValidator identifies invalid IDs', () => {
    expect(TradeValidator.tradeIDisValid("")).toBeFalsy();
    expect(TradeValidator.tradeIDisValid("Forty two")).toBeFalsy();
    expect(TradeValidator.tradeIDisValid(true)).toBeFalsy();
    expect(TradeValidator.tradeIDisValid(3.141)).toBeFalsy();
    expect(TradeValidator.tradeIDisValid(undefined)).toBeFalsy();
});

test('TradeValidator proxy identifies a complete trade object', () => {
    expect(TradeValidator.tradeHasAllNecessaryProperties(exampleTrade)).toBeTruthy();
})

test('TradeValidator identifies an incomplete trade object', () => {
    badTrades.forEach(trade => {
        expect(() => {
            TradeValidator.tradeHasAllNecessaryProperties(trade);
        }).toThrow();
    })
});

test('TradeValidator rejects an invalid trade object', () => {
    badTrades.forEach(trade => {
        expect(() => {
            TradeValidator.validateTrade(trade);
        }).toThrow();
    })
});

test('TradeValidator accepts a trade object', () => {
    expect(TradeValidator.validateTrade(exampleTrade)).toBeTruthy();
})

test('TradeValidator rejects an undefined trade', () => {
    expect(() => {
        TradeValidator.validateTrade(undefined)
    }).toThrow("Input trade is undefined.");
});

test('TradeValidator identifies undefined trade attributes', () => {
    expect(TradeValidator.tradeHasNoUndefinedProperties(exampleTrade)).toBeTruthy();
    expect(() => {
        TradeValidator.tradeHasNoUndefinedProperties(wrongTrade);
    }).toThrow();
});

test('TradeValidator returns false on trade with undefined attributes', () => {
    expect(TradeValidator.checkTradeFullyDefined(wrongTrade)).toBeFalsy();
});

test('TradeValidator returns false on trade with missing attributes', () => {
    expect(TradeValidator.checkTradeHasAllProperties(wrongTrade)).toBeFalsy();
    expect(TradeValidator.checkTradeHasAllProperties({})).toBeFalsy();
});

test('TradeValidator identifies a valid a date', () => {
    expect(TradeValidator.dateOfTradeIsValid('2012-02-02')).toBeTruthy();
    expect(TradeValidator.dateOfTradeIsValid('28th July 2000')).toBeFalsy();
    expect(TradeValidator.dateOfTradeIsValid(298572985)).toBeFalsy();
    expect(TradeValidator.dateOfTradeIsValid('298572985')).toBeFalsy();
    expect(TradeValidator.dateOfTradeIsValid('')).toBeFalsy();
    expect(TradeValidator.dateOfTradeIsValid(undefined)).toBeFalsy();
});

test('TradeValidator correctly identifies valid product prices', () => {
    const maxRange = 20000000;
    for (let i = 0; i < 10000; i++) {
        let randFloat = Math.random() * maxRange;
        let rand = Math.ceil(randFloat);
        expect(TradeValidator.productPriceIsValid(rand)).toBeTruthy();
        expect(TradeValidator.productPriceIsValid(rand + "")).toBeTruthy();
        expect(TradeValidator.productPriceIsValid(randFloat)).toBeTruthy();
        expect(TradeValidator.productPriceIsValid(randFloat + "")).toBeTruthy();
    }
    expect(TradeValidator.productPriceIsValid(0)).toBeFalsy();
    expect(TradeValidator.productPriceIsValid("1")).toBeTruthy();
    expect(TradeValidator.productPriceIsValid("Forty two")).toBeFalsy();
    expect(TradeValidator.productPriceIsValid(undefined)).toBeFalsy();
});

test('TradeValidator correctly identifies valid product quantities', () => {
    const maxRange = 20000000;
    for (let i = 0; i < 10000; i++) {
        let rand = Math.ceil(Math.random() * maxRange);
        expect(TradeValidator.productQuantityIsValid(rand)).toBeTruthy();
        expect(TradeValidator.productQuantityIsValid(rand + "")).toBeTruthy();
    }
    expect(TradeValidator.productQuantityIsValid(0)).toBeFalsy();
    expect(TradeValidator.productQuantityIsValid("Forty two")).toBeFalsy();
    expect(TradeValidator.productQuantityIsValid(undefined)).toBeFalsy();
    expect(TradeValidator.productQuantityIsValid("1")).toBeTruthy();
});

test('TradeValidator identifies invalid party names', () => {
    let longString = "";
    for (let i = 0; i < 200; i++) {
        longString += "a";
    }
    expect(TradeValidator.stringLengthIsValid("")).toBeFalsy();
    expect(TradeValidator.stringLengthIsValid(longString)).toBeTruthy();
    expect(TradeValidator.stringLengthIsValid(longString + "a")).toBeFalsy();
    expect(TradeValidator.stringLengthIsValid(undefined)).toBeFalsy();
    expect(TradeValidator.stringLengthIsValid("My name Jeff")).toBeTruthy();
});

test('TradeValidator recognises valid currency codes', () => {
    for (let code in currencyCodes) {
        expect(TradeValidator.currencyCodeIsValid(code)).toBeTruthy();
    }
    expect(TradeValidator.currencyCodeIsValid("djhfjdhg")).toBeFalsy();
});