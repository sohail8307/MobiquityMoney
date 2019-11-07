import React, {Component} from 'react'
import Axios from 'axios'
import './ViewByPhoneNumber.css'
import User from './User'
import './Form.css'
import './User.css'

class SearchUser extends Component {
  state = {
    user: null,
    err: false
  }

  handleSumbit = event => {
    event.preventDefault();
    let number = event.target.phone.value;
    if(!(number >= 1000000000 && number <= 9999999999)) {
      alert("Invalid Number");
      return false;
    }
    Axios.get(`http://192.168.105.162:8080/view/${number}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(res.data) {
          this.setState({user: res.data})
          this.setState({err: false})
        }
        else {
          this.setState({err: true})
          this.setState({user: null})
        }
      })
      .catch(err => {
        this.setState({err: true})
        this.setState({user: null})
      })
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSumbit}>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>Ph</span>
              </div>
              <input type='search' className='form-control' placeholder='Enter Phone Number' name='phone' required autoFocus />
              <button type='submit' className='btn btn-primary' >Go</button>
            </div>
          </form>
        </div>
        <div>
          {
            (this.state.user && !this.state.err) && (
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
                  <User details={this.state.user} />
                </tbody>
              </table>
            ) 
          }
          {
            this.state.err && (
              <div className='alert alert-danger'>
                No Data found
              </div>
            )
          }
        </div>
      </div>
      
    )
  }
}

export default SearchUser