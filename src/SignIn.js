import React, { Component } from 'react'
import {Cookies} from 'react-cookie'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import './Form.css'

class SignIn extends Component {
  state = {
    redirect: false,
    err: false,
    errMsg: '',
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
          this.setState({
            redirect: true,
            err: false,
            errMsg: ''
          });
        } else {
          this.setState({
            err: true,
            errMsg: 'Invalid Login'
          });
        }
      })
      .catch(error => {
        this.setState({
          err: true,
          errMsg: 'Connection failure'
        });
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
              {this.state.errMsg}
            </div>
          )
        }
      </div>
    )
  }
}

export default SignIn