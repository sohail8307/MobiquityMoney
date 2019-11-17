import React, {Component} from 'react';
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import './Form.css';

/**
 * @component The Adding user form component
 * @description Component to render form for adding a new user. It performs various validations required.
 */
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
    kycID: '',
    email: '',
    gender: '',
    houseNo: '',
    street: '',
    city: '',
    pincode: '',
    country: '', 
    region: '',
    errAlert: false,
    succAlert: false
  }


  /**
   * @returns {boolean} validty - The validity of the form according to rules
   * @description The function checks error states of fields as well as the fields themselves. Returns true if validated else false.
   */
  isFormValid = () => {
    return (!(this.state.errFirstName || this.state.errLastName || this.state.errAge
      || this.state.errPh || this.state.errEmail || this.state.errPin) && (
        this.state.firstname && this.state.lastname && this.state.age && this.state.phoneNo && this.state.gender &&
        this.state.email && this.state.kycID && this.state.houseNo && this.state.street && this.state.city
        && this.state.pincode && this.state.country && this.state.region
      ));
  }

  /**
   * @param {event} event The event triggered when submit button is clicked.
   * @returns {boolean} - False if form not validated.
   * @description This function uses the state of form and sends it as body to AJAX. Also it set states for success/error.
   */
  mySubmitHandler = event => {       
    event.preventDefault();
    event.persist();
    if(!this.isFormValid()) {
      this.setState({errorAdd: true,
        errMsg: 'One or more fields are invalid',
        successAdd: false,
        loading: false,
        errAlert: true
      });
      return false;
    }
    this.setState({loading: true});
    let body = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      age: this.state.age,
      phoneNo: this.state.phoneNo,
      kycID: this.state.kycID,
      email: this.state.email,
      gender: this.state.gender,
      houseNo: this.state.houseNo,
      street: this.state.street,
      country: this.state.country,
      state: this.state.region,
      city: this.state.city,
      pincode: this.state.pincode,
      Status: "Y"
    }

    axios.post(`${process.env.REACT_APP_API_URL}/add`, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(res.data) {
          this.setState({
            successAdd: true,
            errorAdd: false,
            errMsg: '',
            loading: false,
            succAlert: true
          });
          event.target.reset();
        }
        else
          this.setState({
            errorAdd: true,
            errMsg: 'Failed to add user',
            successAdd: false,
            loading: false,
            errAlert: true
          });
      })
      .catch(err => {
        let message = 'Connection failure, try again';
        if(err.response)
          message = err.response.data.message;
        this.setState({
          errorAdd: true,
          errMsg: message,
          successAdd: false,
          loading: false,
          errAlert: true
        });
      });
  }
  

  /**
   * @param {string} name The name of the parameter.
   * @param {string} value The value of the parameter.
   * @description The function to set state for the respective fields.
   */
  changeHandler = async(name, value) => {
    await this.setState({[name]: value});
  }
  

  /**
   * @param {event} event The name change event
   * @description The function to validate the name.
   */
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


  /**
   * @param {event} event The age field change event
   * @description The function to validate age.
   */
  ageHandler = event => {
    let name = event.target.name;
    let value = Number(event.target.value).toString();
    this.changeHandler(name, value);
    
    if(value === '' || value <= 17 || !Number(value))
      this.setState({errAge: true});
    else  
      this.setState({errAge: false});   
  }

  
  /**
   * @param {event} event The phone number field change event
   * @description The function to validate phone number.
   */
  phoneHandler = event => {
    let name = event.target.name;
    let value = Number(event.target.value).toString();
    this.changeHandler(name, value);
    if(value === '' || value < 1000000000 || value > 9999999999 || !Number(value))
      this.setState({errPh: true});
    else
      this.setState({errPh: false});
  }

  /**
   * @param {event} event The email field change event
   * @description The function to validate email.
   */
  emailHandler = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.changeHandler(name, value);

    var emailpatt = /^[^@' ']+[@][a-z]+[.][a-z]/;
    if(value === '' || !emailpatt.test(value)) 
      this.setState({errEmail: true});
    else
      this.setState({errEmail: false});
  }

  /**
   * @param {string} value The country selected
   * @requires The library 'react-country-region-selector'.
   * @description The function to set country.
   */
  selectCountry = value => {
    this.changeHandler('country', value);
  }

  /**
   * @param {string} value The region selected
   * @requires The library 'react-country-region-selector'.
   * @description The function to set region.
   */
  selectRegion = value => {
    this.changeHandler('region', value);
  }
  
  /**
   * @param {event} event The pincode field change event
   * @description The function to validate pincode.
   */
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
          (this.state.errorAdd && this.state.errAlert) && (
            <div className='alert alert-danger add-alert display-card'>
              {this.state.errMsg}
              <span onClick={() => {this.setState({errAlert: false})}}>&nbsp;&times;</span>
            </div>
          )
        }
        {
          (this.state.successAdd && this.state.succAlert) && (
            <div className='alert alert-success add-alert display-card'>
              Added User Successfully.
              <span onClick={() => {this.setState({successAlert: false})}}>&nbsp;&times;</span>
            </div>
          )
        }
        <h2 className='form-heading'>New User SignUp</h2>
        <form onSubmit={this.mySubmitHandler}  className="needs-validation">
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor='firstname'>
                First name
              </label>    
              <input
                placeholder="Enter first name here"
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
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='lastname'>
                Last name
              </label> 
              <input
                placeholder="Enter last name here"
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
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-3'>
              <label htmlFor='age'>
                Age
              </label>  
              <input
                placeholder="Enter age here"
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
            </div>
            <div className='form-group col-md-3'>
              <label htmlFor= 'dropdown'>
                Gender
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
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='email'>
                Email
              </label> 
              <input
                placeholder="Enter email ID here"
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
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-6'> 
              <label htmlFor='ph'>
                Phone number
              </label> 
              <input
                placeholder="Enter 10 digit phone number here"
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
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor= 'kyc'>
                KYC ID
              </label>  
              <input
                placeholder="KYC Document no."
                type='text'
                name='kycID'
                id='kyc'
                className="form-control"
                maxLength='40'
                required
                onChange={e => this.changeHandler(e.target.name, e.target.value)}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor= 'Addrhouseno'>
                Address Line 1
              </label>  
              <input
                placeholder="House/Apt no."
                type='text'
                name='houseNo'
                id='Addrhouseno'
                className="form-control"
                maxLength='40'
                onChange={e => this.changeHandler(e.target.name, e.target.value)}
              />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor= 'Addrhousestreet'>
                Address Line 2
              </label>  
              <input
                placeholder="Street and Locality"
                type='text'
                name='street'
                id='Addrhousestreet'
                required
                className="form-control"
                maxLength='50'
                onChange={e => this.changeHandler(e.target.name, e.target.value)}
              />
            </div>
          </div>
          <div className='form-row'>
              <div className='form-group col-md-6'>
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
              </div>
              <div className='form-group col-md-6'>
                <label htmlFor= 'Addrhousestate'>
                  State
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
              </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor='city'>
                City
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
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='pin'>
                Address pincode
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
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>      
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
  }
}

export default AddUser