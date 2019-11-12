import React, {Component} from 'react'
import './User.css'

class User extends Component {
  render() {
  return this.props.details ? (
      <tr>
          <td>
          {this.props.details.phoneNo}
          </td>
          <td>
          {
            `${this.props.details.firstname} ${this.props.details.lastname}`
          }
          </td>
          <td>
          {this.props.details.email}
          </td>
          <td>
          {this.props.details.gender}
          </td>
          <td>
          {this.props.details.age}
          </td>
          <td>
            {this.props.details.kycID}
          </td>
          <td>
          {
            `${this.props.details.houseNo} 
            ${this.props.details.street} 
            ${this.props.details.city} 
            ${this.props.details.state} 
            -${this.props.details.pincode}`    
          }
          </td>
          <td>
            {this.props.details.Status}
          </td>
          {/*
        Object.keys(this.props.details).map((keys, index) => (
          <tr key={index}>
          <td>{keys}:</td>
          <td>{this.props.details[keys]}</td> 
          </tr>
        ))
        */}
      </tr>
      
    
  ) : (
    <tr><td>No Data</td></tr>
  )
  }
}

export default User