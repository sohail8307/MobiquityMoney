import React, { Component } from 'react'
import {useCookies, Cookies, CookiesProvider} from 'react-cookie'
import {Redirect} from 'react-router-dom'
import Dashboard from './Dashboard'
import axios from 'axios'
import './Form.css'

class SignIn extends Component {
  state = {
    redirect: false,
    err: false,
    username: '',
    password: ''
  }

  signInHandler = event => {
    event.preventDefault()
    let username = this.state.username;
    let password = this.state.password;
    axios.post('http://192.168.105.162:8080/adminlogin', {
      username: username,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(res.data) {
          //console.log(res)
          let ck = new Cookies();
          let date = new Date();
          date.setTime(date.getTime() + (60 * 60 * 1000));
          ck.set('user', {
            username: this.state.username,
            token: 'xxx1234'
          }, {expires: date, path: '/'});
          this.setState({redirect: true});
          //console.log(this.state.redirect)
        } else {
          this.setState({err: true})
        }
      })
      .catch(err => {
          this.setState({err: true})
      })
      /*let ck = new Cookies();
      let date = new Date();
      date.setTime(date.getTime() + (60 * 60 * 1000));
      ck.set('user', {
        username: 'dummy',
        token: 'xxxx1234'
      }, {expires: date, path: '/'});
      this.setState({redirect: true});*/
  }

  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  render() {
    return (
      <div className='bg-box'>
        {
          this.state.redirect && (
          <Redirect to={{
            pathname: '/Dashboard',
            state: {
              username: this.state.username
            }
          }}/>
          )
        }
        <h2 className='form-heading'>Sign In</h2>
        <form onSubmit={this.signInHandler}>
            
          <div className='form-group sign-in-form'>
            <label htmlFor = 'username'>
              Username:&nbsp; 
            </label>    
            <input
              placeholder="Type user name here"
              type='text'
              name='username'
              id='username'
              required
              className="form-control"
              onChange={this.myChangeHandler}
            />

            <br/>

            <label htmlFor = 'password'>
              Password:&nbsp; 
            </label>    
            <input
              placeholder="Type password here"
              type='password'
              name='password'
              id='password'
              required
              className="form-control"
              onChange={this.myChangeHandler}
            />

            <br/>

            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
        {
          this.state.err && (
            <div className='alert alert-warning'>
              Invalid Login
            </div>
          )
        }
      </div>
    )
  }
}

export default SignIn