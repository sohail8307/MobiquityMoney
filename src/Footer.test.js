import React from 'react';
import Footer from './Footer';
import {shallow} from 'enzyme';

describe("Smoke test Main App", () => {
  it('renders without crashing', () => {
    shallow(<Footer />);
  });
})

