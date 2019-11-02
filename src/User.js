import React, {Component} from 'react'
import './User.css'

class User extends Component {
  render() {
    return (
      <div>
        <table className='user-details table-bordered table-dark'>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
          {
            Object.keys(this.props.details).map((keys, index) => (
              <tr key={index}>
                <td>{keys}:</td>
                <td>{this.props.details[keys]}</td> 
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
    )
  }
}

export default User