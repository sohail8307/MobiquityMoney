import React, { Component } from 'react'
import {Redirect, Route, BrowserRouter, Switch, NavLink} from 'react-router-dom'
import SignIn from './SignIn'
import {useCookies, Cookies, CookiesProvider} from 'react-cookie'
import AddUser from './AddUser'
import ViewUser from './ViewByPhoneNumber'
import ViewAll from './ViewAll'
import Side from './Side'
import './Dashboard.css'


class Dashboard extends Component {
  state = {
    redirect: true,
    cookie: null,
  }

  /*componentWillMount() {
    let ck1 = new Cookies()
    if(ck1.get('user')) 
      this.setState({redirect: false})
  }*/
  signOutHandler = event => {
    let ck2 = new Cookies()
    alert(ck2.get('user').username)
    ck2.remove('user', {path: '/'})
    
    this.setState({redirect: true})
  }
  render() {
    const ck = new Cookies()
    return (
      <div >       
        {
          (this.state.redirect && !ck.get('user')) && (<Redirect to='/SignIn' />)
        }
        <div className='user-nav'>
          {
            ck.get('user') && (
              <span>
                Welcome&nbsp;
                <span className='badge badge-dark'>
                {
                  ck.get('user').username
                }
                </span>
              </span>
            )
          }
          <div>
            <NavLink 
              to='/Dashboard/AddUser' 
              activeClassName='is-active'
            >
              Add&nbsp;&nbsp;
            </NavLink>
          </div>
          <div>
            <NavLink 
            to='/Dashboard/ViewUser' 
            activeClassName='is-active'
            >
              View
            </NavLink>
          </div>
          <div>
            <NavLink 
              to='/Dashboard/ViewAll' 
              activeClassName='is-active'
            >
              ViewAll&nbsp;&nbsp;
            </NavLink>
          </div>
          <div>
            <button
              onClick = {this.signOutHandler}
              className='btn btn-secondary sign-out-button'
            >
              Sign Out
            </button>
          </div>
        </div>
        <Switch>
          <Route path='/Dashboard/AddUser' component={AddUser} />
          <Route path='/Dashboard/ViewUser' component={ViewUser} />
          <Route path='/Dashboard/ViewAll' component={ViewAll} />
        </Switch>
      </div>
    )
  }
}

export default Dashboard