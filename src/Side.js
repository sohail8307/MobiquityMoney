import React from "react";
import Sidebar from "react-sidebar";
import {Redirect, Route, BrowserRouter, Switch, Link, NavLink} from 'react-router-dom'
//npm install react-sidebar
import './Side.css'


class Side extends React.Component {
  state = {
    sidebarOpen: false
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <Sidebar
        sidebar={
          <div className='sidebar-elements'>
            <button
              onClick = {this.props.triggerSignOut}
              className='btn btn-secondary'
            >
              Sign Out
            </button>
            <br/>
            <NavLink to='/Dashboard/AddUser' onClick={() => this.onSetSidebarOpen(false)} activeClassName='is-active'>Add</NavLink><br></br>
            <NavLink to='/Dashboard/ViewUser' onClick={() => this.onSetSidebarOpen(false)} activeClassName='is-active'>View</NavLink>
          </div>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        align="left"
        styles={{ sidebar: { backgroundColor: "#e56" }}}
      >
        <div align="left">
          <br/><br/><button onClick={() => this.onSetSidebarOpen(true)} className="btn btn-primary">=</button>
        </div>
      </Sidebar>
    );
  }
}

export default Side;