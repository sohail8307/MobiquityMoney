import React from 'react';
import ViewAll from './ViewAll';
import {shallow} from 'enzyme'
import axios from 'axios'

jest.mock('axios')
describe("Smoke test ViewAll component", () => {
  it('renders without crashing', () => {
    axios.get.mockImplementation((url, data, header) => Promise.resolve({ data: true }));
    shallow(<ViewAll />);
  });

  it('API successful call', async() => {
    axios.get.mockImplementation((url, data, header) => Promise.resolve({ data: true }));
    const view = await shallow(<ViewAll />);
    expect(view.state('success')).toBe(true);
  })

  it('API failed call', async() => {
    axios.get.mockImplementation((url, data, header) => Promise.resolve({ data: false }));
    const view = await shallow(<ViewAll />);
    expect(view.state('err')).toBe(true);
  })
});

