import React from 'react';
import NewTrade from '../NewTrade.js';
import { render } from 'react-testing-library'
import App from '../App';
import {EditModal} from '../Components/EditModal.js'

describe('Modal', () => {
  it('renders nothing when closed', () => {
    expect(shallow(
      <EditModal onClose={jest.fn()}/>
    )).toMatchSnapshot();
  });
});


