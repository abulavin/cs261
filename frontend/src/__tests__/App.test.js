import React from 'react';
import NewTrade from '../NewTrade.js';
import { render } from 'react-testing-library'
import App from '../App';

describe('New Trade', () => {
  
it('renders the component', () => {
    const container = shallow(<NewTrade />)
    expect(container.exists()).toBe(true);
  })
});
