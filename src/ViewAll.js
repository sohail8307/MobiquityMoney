import React, { Component } from 'react'
import axios from 'axios'
import User from './User'
import Loader from 'react-loader-spinner'
import './User.css'

class ViewAll extends Component {
  state = {
    users: [],
    success: false,
    err: false,
    errMsg: '',
    loading: false
  }
  componentDidMount() {
    this.setState({loading: true});
    axios.get('http://192.168.105.162:8080/viewall')
      .then(res => {
        if(res.data) {
          console.log(res.data)
          this.setState({
            success: true,
            users: res.data,
            err: false,
            errMsg: '',
            loading: false
          });
        } else {
          this.setState({
            err: true,
            users: [],
            errMsg: 'No data available',
            success: false,
            loading: false
          });
        }
      })
      .catch(err => {
        this.setState({
          err: true,
          users: [],
          errMsg: 'Connection failure',
          success: false,
          loading: false
        });
      })
  }

  render() {
    return (
      <div>
        <Loader
          visible={this.state.loading}
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          style={{position: 'fixed', bottom: '50%', right: '50%'}}
        />
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
              <tfoot style={{textAlign: 'center'}}>
                <tr>
                  <td colSpan={6}>
                  {
                    `${this.state.users.length} results fetched.`
                  }
                  </td>
                </tr>
              </tfoot>
            </table>
          )
        }
      </div>
    )
  }
}

export default ViewAll