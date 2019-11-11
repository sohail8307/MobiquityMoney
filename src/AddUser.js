import React, {Component} from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Loader from 'react-loader-spinner'
import axios from 'axios'

class AddUser extends Component {
  state = {
    loading: false,
    errFirstName: false,
    errLastName: false,
    errAge: false,
    errPh: false,
    errEmail: false,
    errPin: false,
    errorAdd: false,
    errMsg: '',
    successAdd: false,
    firstname: '',
    lastname: '',
    age: null,
    phoneNo: null,
    email: '',
    gender: '',
    houseNo: '',
    street: '',
    city: '',
    pincode: '',
    country: '', 
    region: '',
  }

  mySubmitHandler = event => {       
    event.preventDefault();
    event.persist();
    this.setState({loading: true});
    //console.log(data)
    //data.append("customerID", event.target.phoneNo.value)
    let body = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      age: this.state.age,
      phoneNo: this.state.phoneNo,
      email: this.state.email,
      gender: this.state.gender,
      houseNo: this.state.houseNo,
      street: this.state.street,
      country: this.state.country,
      state: this.state.region,
      city: this.state.city,
      pincode: this.state.pincode
    }
    //console.log(body)
    //for(const [key, value] of data.entries())
      //body[key] = value
    console.log(body)
    axios.post('http://192.168.105.162:8080/add', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        //console.log(res)
        if(res.data) {
          this.setState({
            successAdd: true,
            errorAdd: false,
            errMsg: '',
            loading: false
          });
          event.target.reset();
        }
        else
          this.setState({
            errorAdd: true,
            errMsg: 'Failed to add user',
            successAdd: false,
            loading: false
          });
      })
      .catch(err => {
        this.setState({
          errorAdd: true,
          errMsg: 'Connection failure, try again',
          successAdd: false,
          loading: false
        });
      });
  }
  

  changeHandler = async(name, value) => {
    await this.setState({[name]: value});
  }
  

  nameHandler = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.changeHandler(name, value);

    var namepatt = /^[a-zA-Z]{3,20}$/;
    if(name === 'firstname') {
      if(value === '' || !namepatt.test(value))
        this.setState({errFirstName: true});
      else
        this.setState({errFirstName: false});
    } else {
      if(value === '' || !namepatt.test(value))
        this.setState({errLastName: true});
      else
        this.setState({errLastName: false});
    }
    
  }

  ageHandler = event => {
    let name = event.target.name;
    let value = Number(event.target.value).toString();
    this.changeHandler(name, value);
    
    if(value === '' || value <= 17 || !Number(value))
      this.setState({errAge: true});
    else  
      this.setState({errAge: false});   
  }

  
  phoneHandler = event => {
    let name = event.target.name;
    let value = Number(event.target.value).toString();
    this.changeHandler(name, value);
    if(value === '' || value < 1000000000 || value > 9999999999 || !Number(value))
      this.setState({errPh: true});
    else
      this.setState({errPh: false});
  }

  emailHandler = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.changeHandler(name, value);

    var emailpatt = /^[a-zA-Z0-9]+[@][a-z]+[.][a-z]/;
    if(value === '' || !emailpatt.test(value)) 
      this.setState({errEmail: true});
    else
      this.setState({errEmail: false});
  }

  selectCountry = value => {
    this.changeHandler('country', value);
  }

  selectRegion = value => {
    this.changeHandler('region', value);
  }
  
  

  pincodeHandler = event => {
    let name = event.target.name;
    let value = Number(event.target.value).toString();
    this.changeHandler(name, value);
    
    if (value === '' || value < 100000 || value > 999999 || !Number(value)) 
      this.setState({errPin: true});
    else
      this.setState({errPin: false});
  }

  render() { 
    const { country, region } = this.state;
    return (
      <div className='bg-box'>
        {
          this.state.errorAdd && (
            <div className='alert alert-danger alert-dismissible display-card'>
              <button type="button" className="close" data-dismiss="alert">&times;</button>
              {this.state.errMsg}
            </div>
          )
        }
        {
          this.state.successAdd && (
            <div className='alert alert-success alert-dismissible display-card'>
              <button type="button" className="close" data-dismiss="alert">&times;</button>
              Added User Successfully.
            </div>
          )
        }
        <h2 className='form-heading'>New User SignUp</h2>
        <form onSubmit={this.mySubmitHandler}  className="needs-validation">

          <div className="form-group sign-up-form">
            <label htmlFor='firstname'>
              Enter your first name:
            </label>    
            <input
              placeholder="Type your first name"
              type='text'
              name='firstname'
              id='firstname'
              required
              className="form-control"
              onChange={this.nameHandler}
              minLength='3'
              maxLength='20'
            />
            {
              this.state.errFirstName && (
                <strong>First Name must have 3-20 alphabets</strong>
              )
            }
            <br/>
            
            <label htmlFor='lastname'>
              Enter your last name: 
            </label> 
            <input
              placeholder="Type your last name"
              type='text'
              name='lastname'
              id='lastname'
              required
              className="form-control"
              onChange={this.nameHandler}
              minLength='3'
              maxLength='20'
            />
            {
              this.state.errLastName && (
                <strong>Last Name must have 3-20 alphabets</strong>
              )
            }
            <br/>

            <label htmlFor='age'>
              Enter your age:
            </label>  
            <input
              placeholder="Type your age"
              type='number'
              name='age'
              id='age'
              required
              className="form-control"
              onChange={this.ageHandler}
              min='18'
            />
            {
              this.state.errAge && (
                <strong>Invalid, age must be atleast 18</strong>
              )
             }
            <hr/>
     
            <label htmlFor='ph'>
              Enter phone number:&nbsp;  
            </label> 
            <input
              placeholder="your 10 digit phone number"
              type='number'
              name='phoneNo'
              id='ph'
              required
              className="form-control"
              onChange={this.phoneHandler}
              min='1000000000'
              max='9999999999'
            />
            {
              this.state.errPh && (
                <strong>Number must have 10 digits</strong>
              )
            }
            <br/>

            <label htmlFor='email'>
              Enter your Email:&nbsp;  
            </label> 
            <input
              placeholder="Enter Email ID"
              type='email'
              name='email'
              id='email'
              required
              className="form-control"
              onChange={this.emailHandler}
              maxLength='40'
            />
            {
              this.state.errEmail && (
                <strong>Invalid Format</strong>
              )
            }
            <br/>

            <label htmlFor= 'dropdown'>
              Gender:
            </label> 
            <select 
              id="dropdown" 
              onChange={e => this.changeHandler(e.target.name, e.target.value)}  
              required
              className="form-control"
              name='gender'
              
            >
              <option value=''>Select Gender</option>
              <option value="Do not want to disclose">Do not want to disclose</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <br/>
     
            <label htmlFor= 'Addrhouseno'>
              House number: 
            </label>  
            <input
              placeholder="House number"
              type='text'
              name='houseNo'
              id='Addrhouseno'
              className="form-control"
              maxLength='10'
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
              />
            <br/>

            <label htmlFor= 'Addrhousestreet'>
              Street and Locality: 
            </label>  
            <input
              placeholder="Street Name"
              type='text'
              name='street'
              id='Addrhousestreet'
              required
              className="form-control"
              maxLength='50'
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
            <br/>

            <label htmlFor= 'Addrhousecountry'>
              Country
            </label>    
            <CountryDropdown
              id='Addrhousecountry'
              value={country}
              required
              className="form-control"
              onChange={(val) => this.selectCountry(val)} 
              name='country'
            />
            <br/>

            <label htmlFor= 'Addrhousestate'>
              State:
            </label>    
            <RegionDropdown
              id='Addrhousestate'
              country={country}
              value={region}
              required
              className="form-control"
              onChange={(val) => this.selectRegion(val)} 
              name='state'
            />
            <br/>
        
            <label htmlFor='city'>
              City:
            </label> 
            <input
              placeholder="City"
              id='city'
              type='text'
              name='city'
              required
              className="form-control"
              maxLength='20'
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
            <br/>

            <label htmlFor='pin'>
              Address pincode:&nbsp; 
            </label>
            <input
              placeholder="pincode"
              id='pin'
              type='number'
              name='pincode'
              required
              className="form-control"
              onChange={this.pincodeHandler}
            />
            {
              this.state.errPin && (
                <strong>Pincode must have 6 digits</strong>
              )
            }
            <br/>

            <button type="submit" className="btn btn-primary">Submit</button>     
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
    )
  };
}

export default AddUser