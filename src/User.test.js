import React from 'react';
import User from './User';
import {shallow} from 'enzyme'


describe("Smoke test User component", () => {
  it('renders without crashing', () => {
    shallow(<User />);
  });
})