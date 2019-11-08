import React from 'react';
import SignIn from './SignIn';
import {shallow} from 'enzyme'
import axios from 'axios'



jest.mock('axios')
/*it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});*/
describe("Smoke test SignIn component", () => {
  it('renders without crashing', () => {
    shallow(<SignIn />);
  });
})

describe("Sign In simulate", () => {
  let signIn;
  beforeEach(() => {
    signIn = shallow(<SignIn />);
  })
  it("User name entry changes state", ()=> {
    //const signIn = shallow(<SignIn />)
    signIn.find('input[type="text"]').simulate('change', {
      target: {
        name: 'username',
        value: 'username'
      }
    })
    expect(signIn.state('username')).toEqual('username')
  })

  it("Password entry changes state", ()=> {
    //const signIn = shallow(<SignIn />)
    signIn.find('input[type="password"]').simulate('change', {
      target: {
        name: 'password',
        value: 'password'
      }
    })
    expect(signIn.state('password')).toEqual('password')
  })

  it("Sign In success", async () => {
    //const signIn = shallow(<SignIn />)
    axios.post.mockImplementation((url, data, header) => Promise.resolve({ data: true }));
    signIn.find('input[type="text"]').simulate('change', {
      target: {
        name: 'username',
        value: 'username'
      }
    })

    signIn.find('input[type="password"]').simulate('change', {
      target: {
        name: 'password',
        value: 'password'
      }
    })

    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'user=username',
    });
    
    const event = Object.assign(jest.fn(), {preventDefault: () => {}})
    await signIn.find('form').simulate('submit', event)
    
    expect(signIn.state('redirect')).toBe(true)
  })

  it("Sign In failure", async () => {
    //const signIn = shallow(<SignIn />)
    axios.post.mockImplementation((url, data, header) => Promise.resolve({ data: false }));
    signIn.find('input[type="text"]').simulate('change', {
      target: {
        name: 'username',
        value: 'username'
      }
    })

    signIn.find('input[type="password"]').simulate('change', {
      target: {
        name: 'password',
        value: 'password'
      }
    })

    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'user=username',
    });
    
    const event = Object.assign(jest.fn(), {preventDefault: () => {}})
    await signIn.find('form').simulate('submit', event)
    
    expect(signIn.state('err')).toBe(true)
  })
})