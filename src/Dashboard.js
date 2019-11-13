import React, { Component } from 'react'
import {Redirect, Route, Switch, NavLink} from 'react-router-dom'
import {Cookies} from 'react-cookie'
import AddUser from './AddUser'
import ViewUser from './ViewByPhoneNumber'
import ViewAll from './ViewAll'
import './Dashboard.css'

/**
 * @component Admin Dashboard 
 * @requires Cookie('user') to be set to access the component, else redirects to SIgin In page.
 * @description Component to render admin's view of dashboard. Has links to various admin privilages. Uses 'react-cookie' to check whether admin is logged in.
 */
class Dashboard extends Component {
  state = {
    redirect: true,
  }

  signOutHandler = event => {
    let ck2 = new Cookies()
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