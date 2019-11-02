import React, {Component} from 'react'
import Axios from 'axios'
import './ViewByPhoneNumber.css'
import User from './User'
import './Form.css'

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
    Axios.get(`http://172.19.5.213:8080/view/${number}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(res.data)
          this.setState({user: res.data})
        else
          this.setState({err: true})
      })
      .catch(err => {
        this.setState({err: true})
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
              <User details={this.state.user} />
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