import { CreateTradeProxy, DeleteTradeProxy, GetTradeProxy, T } from '../BackendProxy';

const testCreateTradeProxy = new CreateTradeProxy();
const testDeleteTradeProxy = new DeleteTradeProxy();
const testGetTradeProxy = new GetTradeProxy();

test('Creation proxy has the correct URL', () => {
    expect(testCreateTradeProxy.url).toBe(window.location.host + '/trades/');
});

test('DeleteTradeProxy throws exception on an invalid ID', () => {
    const testStrings = ["forty two", ""];
    testStrings.forEach(string => {
        expect(() => {
            testDeleteTradeProxy.deleteTrade(testStrings);
        }).toThrow('Expected tradeID to be a number, got:' + string);

    })
});

test('can get a list of trades', () => {
    let trades = testGetTradeProxy.getListOfTrades();
    console.log(trades);
    expect(trades).toBe(expect.anything());
});