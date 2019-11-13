import React from 'react';
import Search from './ViewByPhoneNumber';
import {shallow} from 'enzyme'
import axios from 'axios'


jest.mock('axios');

describe("Smoke test Search component", () => {
  it('renders without crashing', () => {
    shallow(<Search />);
  });
});

describe('Search form simulate', () => {
  let search;
  beforeEach(() => {
    search = shallow(<Search />)
  });

  it('Number entry changes state', () => {
    search.find('input[type="search"]').simulate('change', {
      target: {
        name: 'phone',
        value: '123456'
      }
    });
    expect(search.state('number')).toEqual(123456);
  });

  it('View details from number success', async() => {
    axios.get.mockImplementation((url, data, header) => Promise.resolve({ data: {message: true} }));
    search.find('input[type="search"]').simulate('change', {
      target: {
        name: 'phone',
        value: '1234567890'
      }
    });

    const event = Object.assign(jest.fn(), {preventDefault: () => {}})
    await search.find('form').simulate('submit', event)
    
    expect(search.state('user')).toBeTruthy();
  });

  it('View details from number failure', async() => {
    axios.get.mockImplementation((url, data, header) => Promise.resolve({ data: false }));
    search.find('input[type="search"]').simulate('change', {
      target: {
        name: 'phone',
        value: '1234567890'
      }
    });

    const event = Object.assign(jest.fn(), {preventDefault: () => {}})
    await search.find('form').simulate('submit', event)
    
    expect(search.state('err')).toBe(true);
  });

})