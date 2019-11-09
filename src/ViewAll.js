import React, { Component } from 'react'
import axios from 'axios'
import User from './User'
import './User.css'

class ViewAll extends Component {
  state = {
    users: [],
    success: false,
    err: false,
    errMsg: ''
  }
  componentDidMount() {
    axios.get('http://192.168.105.162:8080/viewall')
      .then(res => {
        if(res.data) {
          console.log(res.data)
          this.setState({
            success: true,
            users: res.data,
            err: false,
            errMsg: ''
          });
        } else {
          this.setState({
            err: true,
            users: [],
            errMsg: 'No data available',
            success: false
          });
        }
      })
      .catch(err => {
        this.setState({
          err: true,
          users: [],
          errMsg: 'Connection failure',
          success: false
        });
      })
  }

  render() {
    return (
      <div>
        {
          this.state.errMsg && (
            <div className='alert alert-warning'>
              {this.state.errMsg}
            </div>
          )
        }
        {
          (this.state.success && !this.state.errMsg) && (
            <table className='user-details table-bordered'>
              <thead>
                <tr>
                  <th>Phone Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
              { 
                this.state.users.map((user, index) => (
                  <User key={index} details={user} />
                ))
              }
              </tbody>
            </table>
          )
        }
      </div>
    )
  }
}

export default ViewAll