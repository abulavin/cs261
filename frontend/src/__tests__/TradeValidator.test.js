import {TradeValidator} from '../TradeValidator';
import {currencyCodes, companyCodes} from '../currencyCodes';

const exampleTrade = {
    date_of_trade: "2020-02-02 12:30",
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

const completeButWrongTrade = {
    date_of_trade: "123-02-02 69:420",
    trade_id: "ye",
    product: "",
    buying_party: "1",
    selling_party: "1",
    notional_amount: -1.0,
    quantity: 1.0,
    notional_currency: "ABC",
    maturity_date: "2020-02-20",
    underlying_price: 1.0,
    underlying_currency: "USD",
    strike_price: NaN
}
const noAttributesFilledIn = {
    date_of_trade: "",
    trade_id: "",
    product: "",
    buying_party: "",
    selling_party: "",
    notional_amount: 0,
    quantity: 0,
    notional_currency: "",
    maturity_date: "",
    underlying_price: 0,
    underlying_currency: "",
    strike_price: 0
}

const badTrades = [
    {},
    {
        date_of_trade: "2020-02-02",
        trade_id: "1",
        product: "1",
        quantity: undefined
    },
    wrongTrade,
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
    expect(() => {
        TradeValidator.validateTrade(wrongTrade);
    }).toThrow("Trade has missing attributes: strike_price, ");

    const errorString =  `Trade has invalid attributes.
Invalid value for attribute date_of_trade: 123-02-02 69:420
Invalid value for attribute trade_id: ye
Invalid value for attribute product: 
Invalid value for attribute notional_amount: -1
Invalid value for attribute notional_currency: ABC
Invalid value for attribute strike_price: NaN
`
    expect(() => {
        TradeValidator.validateTrade(completeButWrongTrade);
    }).toThrow(new Error(errorString));
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

test('TradeValidator identifies a valid maturity date', () => {
    expect(TradeValidator.maturityDateIsValid('2012-02-02')).toBeTruthy();
    expect(TradeValidator.maturityDateIsValid('28th July 2000')).toBeFalsy();
    expect(TradeValidator.maturityDateIsValid(298572985)).toBeFalsy();
    expect(TradeValidator.maturityDateIsValid('298572985')).toBeFalsy();
    expect(TradeValidator.maturityDateIsValid('')).toBeFalsy();
    expect(TradeValidator.maturityDateIsValid(undefined)).toBeFalsy();
});

test('TradeValidator identifies a valid date-time', () => {
    expect(TradeValidator.dateAndTimeOfTradeIsValid('2012-02-02 12:30')).toBeTruthy();
    expect(TradeValidator.dateAndTimeOfTradeIsValid('2012-02-02')).toBeFalsy();
    expect(TradeValidator.dateAndTimeOfTradeIsValid('28th July 2000')).toBeFalsy();
    expect(TradeValidator.dateAndTimeOfTradeIsValid(298572985)).toBeFalsy();
    expect(TradeValidator.dateAndTimeOfTradeIsValid('298572985')).toBeFalsy();
    expect(TradeValidator.dateAndTimeOfTradeIsValid('')).toBeFalsy();
    expect(TradeValidator.dateAndTimeOfTradeIsValid("123-02-02 12:30")).toBeFalsy();
    expect(TradeValidator.dateAndTimeOfTradeIsValid('2012-02-02 69:30')).toBeFalsy();
    expect(TradeValidator.dateAndTimeOfTradeIsValid(undefined)).toBeFalsy();
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
    for (let code of currencyCodes) {
        expect(TradeValidator.currencyCodeIsValid(code)).toBeTruthy();
    }
    expect(TradeValidator.currencyCodeIsValid("djhfjdhg")).toBeFalsy();
});

test('TradeValidator aggregates erroneous fields into a list', () => {
    expect(TradeValidator.getListOfErrors(wrongTrade)).toEqual(
        [
            ["Date Of Trade", "Enter a value"],
            ["Time Of Trade", "Enter a value"],
            ["Trade Id", "1"],
            ["Notional Currency", "1"],
            ["Maturity Date", "Enter a value"],
            ["Underlying Currency", "1"]
        ]
    )
    expect(TradeValidator.getListOfErrors(completeButWrongTrade)).toEqual(
        [
            ["Date Of Trade", "123-02-02"],
            ["Time Of Trade", "69:420"],
            ["Trade Id", "ye"],
            ["Product", "Enter a value"],
            ["Notional Amount", -1.0],
            ["Notional Currency", "ABC"],
            ["Strike Price", "Enter a value"],
        ]
    )
    expect(TradeValidator.getListOfErrors(noAttributesFilledIn)).toEqual(
        [
            ["Date Of Trade", "Enter a value"],
            ["Time Of Trade", "Enter a value"],
            ["Trade Id", "Enter a value"],
            ["Product", "Enter a value"],
            ["Buying Party", "Enter a value"],
            ["Selling Party", "Enter a value"],
            ["Notional Amount", "Enter a value"],
            ["Quantity", "Enter a value"],
            ["Notional Currency", "Enter a value"],
            ["Maturity Date", "Enter a value"],
            ["Underlying Price", "Enter a value"],
            ["Underlying Currency", "Enter a value"],
            ["Strike Price", "Enter a value"]
        ]
    )
    expect(TradeValidator.getListOfErrors(exampleTrade)).toStrictEqual([])
})

test('TradeValidator correctly filters erroneous fields', () => {
    expect(TradeValidator.filterErroneousAttributes(wrongTrade)).toStrictEqual(
        {
            date_of_trade: undefined,
            trade_id: "1",
            notional_currency: "1",
            maturity_date: undefined,
            underlying_currency: "1"
        }
    )
    expect(TradeValidator.filterErroneousAttributes(completeButWrongTrade)).toStrictEqual(
        {
            date_of_trade: "123-02-02 69:420",
            trade_id: "ye",
            product: "",
            notional_amount: -1.0,
            notional_currency: "ABC",
            strike_price: NaN
        }
    )
    expect(TradeValidator.filterErroneousAttributes(exampleTrade)).toStrictEqual({})
})

test('Can Detect valid times', () => {
    expect(TradeValidator.timeSubstringCorrect('12:30')).toBeTruthy()
    expect(TradeValidator.timeSubstringCorrect('')).toBeFalsy()
    expect(TradeValidator.timeSubstringCorrect('wiehkdjhgn')).toBeFalsy()
    expect(TradeValidator.timeSubstringCorrect('56:89')).toBeFalsy()
});