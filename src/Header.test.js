import React from 'react';
import Header from './Header';
import {shallow} from 'enzyme';

describe("Smoke test Main App", () => {
  it('renders without crashing', () => {
    shallow(<Header />);
  });
})

