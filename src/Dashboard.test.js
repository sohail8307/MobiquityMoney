import React from 'react';
import {shallow} from 'enzyme'
import Dashboard from './Dashboard'

jest.mock('react-cookie')

describe("Smoke test Dashboard component", () => {
  it('renders without crashing', () => {
    shallow(<Dashboard />);
  });
})

describe("Simulate Dashboard", () => {
  it('Signout handler', async() => {
    const dash = shallow(<Dashboard />);
    await dash.find('button.sign-out-button').simulate('click')
    expect(dash.state('redirect')).toBe(true)
  });

})

