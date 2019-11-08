import React from 'react';
import {shallow, mount} from 'enzyme'
import {BrowserRouter} from 'react-router-dom'
import Dashboard from './Dashboard'
import {useCookies, Cookies, CookiesProvider} from 'react-cookie'

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

