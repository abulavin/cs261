import { CreateTradeProxy, DeleteTradeProxy, GetTradeProxy, Settings } from '../BackendProxy';

const testCreateTradeProxy = new CreateTradeProxy();
const testDeleteTradeProxy = new DeleteTradeProxy();
const testGetTradeProxy = new GetTradeProxy();

window.settings = {
    check: true,
    tParam: 0.7
}

test('Creation proxy has the correct URL', () => {
    expect(testCreateTradeProxy.url).toBe(window.location.origin + '/trades/');
});

test('Creation proxy gets right settings', () => {
    expect(testCreateTradeProxy.getSettings()).toBe('?&t=0.7');
    expect(testCreateTradeProxy.getSettings(Settings.OVERRIDE)).toBe('?no_check=true&t=0.7');
    window.settings.check = false
    expect(testCreateTradeProxy.getSettings()).toBe('?no_check=true&t=0.7');
    expect(testCreateTradeProxy.getSettings(Settings.OVERRIDE)).toBe('?no_check=true&t=0.7');
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
