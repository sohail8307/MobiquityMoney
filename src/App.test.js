import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

describe("Smoke test Main App", () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
})

