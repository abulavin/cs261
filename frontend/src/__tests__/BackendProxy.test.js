import { CreateTradeProxy, DeleteTradeProxy, GetTradeProxy } from '../BackendProxy';

const testCreateTradeProxy = new CreateTradeProxy();
const testDeleteTradeProxy = new DeleteTradeProxy();
const testGetTradeProxy = new GetTradeProxy();

test('Creation proxy has the correct URL', () => {
    expect(testCreateTradeProxy.url).toBe(window.location.origin + '/trades/');
});

test('DeleteTradeProxy throws exception on an invalid ID', () => {
    const testStrings = ["forty two", ""];
    testStrings.forEach(string => {
        expect(() => {
            testDeleteTradeProxy.deleteTrade(testStrings);
        }).toThrow('Invalid trade ID; got: ' + string);

    })
});

test('GetTradeProxy throws exception on an invalid ID', () => {
    const testStrings = ["forty two", ""];
    testStrings.forEach(string => {
        expect(() => {
            testGetTradeProxy.getTradeByID(testStrings);
        }).toThrow('Invalid trade ID; got: ' + string);

    })
});
