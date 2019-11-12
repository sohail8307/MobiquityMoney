import React, {Component} from 'react'
import axios from 'axios'
import './ViewByPhoneNumber.css'
import User from './User'
import Loader from 'react-loader-spinner'
import './Form.css'
import './User.css'

class SearchUser extends Component {
  state = {
    number: null,
    user: null,
    err: false,
    errMsg: '',
    loading: false
  }

  numChangeHandler = event => {
    this.setState({number: Number(event.target.value)});
  }

  handleSumbit = event => {
    event.preventDefault();
    this.setState({loading: true});
    let number = this.state.number;
    if(!(number >= 1000000000 && number <= 9999999999)) {
      alert("Invalid Number");
      return false;
    }
    axios.get(`${process.env.REACT_APP_API_URL}/view/${number}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(res.data) {
          this.setState({
            user: JSON.parse(res.data.message),
            err: false,
            errMsg: '',
            loading: false
          });
        }
        else {
          this.setState({
            user: null,
            err: true,
            errMsg: 'No data found',
            loading: false
          });
        }
      })
      .catch(err => {
        let message = 'Connection failure';
        if(err.respone)
          message  = err.response.data.message;
        this.setState({
          user: null,
          err: true,
          errMsg: message,
          loading: false
        });
      })
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSumbit} className='view-user-form'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>Ph</span>
              </div>
              <input type='search' className='form-control' placeholder='Enter Phone Number' name='phone' required autoFocus 
              onChange={this.numChangeHandler}
              />
              <button type='submit' className='btn btn-primary' >Go</button>
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
                    <th>KYC ID</th>
                    <th>Address</th>
                    <th>Status</th>
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
              <div className='alert view-alert alert-danger'>
                {this.state.errMsg}
              </div>
            )
          }
        </div>
      </div>
      
    )
  }
}

export default SearchUser