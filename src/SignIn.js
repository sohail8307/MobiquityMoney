import React, { Component } from 'react';
import {Cookies} from 'react-cookie';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './Form.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

/**
 * @component Admin sign in
 * @description Component to render sign in form for user. Sets cookies to maintain session in Dashboard.
 */
class SignIn extends Component {
  state = {
    redirect: false,
    err: false,
    errMsg: '',
    username: '',
    password: '',
    loading: false
  }

  /**
   * @param {event} event The event triggered for sign in
   * @description The function which validates sign in and sets cookie if validated.
   */
  signInHandler = event => {
    event.preventDefault();
    this.setState({loading: true});
    let username = this.state.username;
    let password = this.state.password;
    axios.post(`${process.env.REACT_APP_API_URL}/adminlogin`, {
      username: username,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(res.data) {
          let ck = new Cookies();
          let date = new Date();
          date.setTime(date.getTime() + (60 * 60 * 1000));
          ck.set('user', {
            username: this.state.username,
            token: 'xxx1234'
          }, {expires: date, path: '/'});
          this.setState({
            redirect: true,
            err: false,
            errMsg: '',
            loading: false
          });
        } else {
          this.setState({
            err: true,
            errMsg: 'Invalid Login',
            loading: false
          });
        }
      })
      .catch(error => {
        let message = 'Connection failure';
        if(error.response)
          message = error.response.data.message
        this.setState({
          err: true,
          errMsg: message,
          loading: false
        });
      });
  }

  /**
   * @param {event} event The event triggered for change of form element
   * @description The function which sets state for respective form fields on change.
   */
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
        <Loader
          visible={this.state.loading}
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          style={{position: 'fixed', bottom: '50%', right: '50%'}}
        />
        {
          this.state.err && (
            <div className='alert alert-warning'>
              {this.state.errMsg}
            </div>
          )
        }
      </div>
    )
  }
}

export default SignIn;