import {CreateTradeProxy } from '../BackendProxy';

const testProxy = new CreateTradeProxy();

test('Proxy has the correct URL', () => {
    expect(testProxy.url).toBe(window.location.host + '/trades');
});