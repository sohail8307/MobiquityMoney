import React, {Component} from 'react'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Axios from 'axios'

class AddUser extends Component {
  state = {
    errorAdd: false,
    successAdd: false,
    username: '',
    lastname: '',
    age: null,
    Ph: 0,
    errormessage: '',
    errormessageage:'',
    errormessageph:'',
    err1: 0,
    err2: 0,
    err3: 0,
    err4: 0,
    err5: 0,
    err6: 0,
    email: '',
    errfn:'',
    gender: '',
    Houseno: '',
    Street: '',
    City: '',
    pincode: '',
    country: '', 
    region: '',
    selectValue: '',
    
  }
  mySubmitHandler = event => {       
    event.preventDefault();
    event.persist();
    const data = new FormData(event.target)
    //data.append("customerID", event.target.phoneNo.value)
    let body = {}
    for(const [key, value] of data.entries())
      body[key] = value
    Axios.post('http://172.19.5.213:8080/add', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res)
        if(res.data) {
          this.setState({successAdd: true});
          event.target.reset();
        }
        else
          this.setState({errorAdd: true})
      })
      .catch(err => {
        this.setState({errorAdd: true})
      })
  }
  

  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  

  myChangefirstnameHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    let errfn = '';
    this.setState({err1: 0})
    var namepatt = /^[a-zA-Z]{3,20}$/;
    if (val !=="" && !namepatt.test(val)) {
      errfn = <strong>Your first name must be atleast 3 alphabets and not be a number</strong>;
      this.setState({err1: 1})
    }
      
    this.setState({errormessagefname: errfn});
    this.setState({[nam]: val});
  }

  myChangelastnameHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    let errln = '';
    this.setState({err2: 0})
    var namepatt = /^[a-zA-Z]{1,20}$/;
    if (val !=="" && !namepatt.test(val)) {
        errln = <strong>Your lastname must not be a number</strong>;
        this.setState({err2: 1})
    }
      
    this.setState({errormessagelname: errln});
    this.setState({[nam]: val});
  }
  
  myChangeageHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    this.setState({err3: 0})
    if (nam === "age") {
      if (val !=="" && !Number(val)) {
        err = <strong>Your age must be a number</strong>;
        this.setState({err3: 1})
      }
      if (val !=="" && val<=17) {
        err = <strong>Your age must be a above 18 years</strong>;
        this.setState({err3: 1})
      }
    }
    this.setState({errormessageage: err});
    this.setState({[nam]: val});
   
  }

  
  myPhoneHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    let errp = '';
    this.setState({err4: 0})
        if (!(val<=9999999999 && val>=1000000000)) {
          errp = <strong>Your Phone number must be 10 digit</strong>;
          this.setState({err4: 1})
        }
    this.setState({errormessageph: errp});
    this.setState({[nam]: val});
  }

  myEmailHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    let errmail = '';
    this.setState({err5: 0})
    var namepatt = /^[a-zA-Z0-9]+[@][a-z]+[.][a-z]/;
      if (val !=="" && !namepatt.test(val)) {
        errmail = <strong>Email must be of the type a@a.com</strong>;
        this.setState({err5: 1})
      }
      
    this.setState({errormessageemail: errmail});
    this.setState({[nam]: val});
  
    }
  

  myChangepincodeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    let errpin = '';
    this.setState({err6: 0})
   
      if (val !== "" && (val <= 100000 || val >= 999999)) {
        errpin = <strong>pin code must be 6 digit number</strong>;
        this.setState({err6: 1})
      }
      
    this.setState({errormessagepincode: errpin});
    this.setState({[nam]: val});
  }

  selectCountry = val => {
    this.setState({ country: val });
  }

  selectRegion = val => {
    this.setState({ region: val });
  }

  checkError = () => {
    if(this.state.err1 === 1 
      || this.state.err2 === 1 
      || this.state.err3 ===1 
      || this.state.err4 === 1
      || this.state.err5 === 1 
      || this.state.err6 === 1 
    )
      return 1;
    return 0;
  }

  handleDropdownChange = (e) => {
    this.setState({ gender: e.target.value });
  }
  render() { 
    const { country, region } = this.state;
    return (
      <div className='bg-box'>
        {
          this.state.errorAdd && (
            <div className='alert alert-danger alert-dismissible display-card'>
              <button type="button" className="close" data-dismiss="alert">&times;</button>
              Couldnot add user.
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
            <label htmlFor = 'firstname'>
              Enter your first name:&nbsp; 
            </label>    
            <input
              placeholder="Type your first name"
              type='text'
              name='firstname'
              id='firstname'
              required
              className="form-control"
              onBlur={this.myChangefirstnameHandler}
              onSubmit={this.myChangeHandler}
            />
            {this.state.errormessagefname }
            <br/>
            
            <label htmlFor = 'lastname'>
              Enter your last name:&nbsp; 
            </label> 
            <input
              placeholder="Type your last name"
              type='text'
              name='lastname'
              id='lastname'
              required
              className="form-control"
              onBlur={this.myChangelastnameHandler}
              onSubmit={this.myChangeHandler}
            />
            {this.state.errormessagelname }
            <br/>

            <label htmlFor= 'age'>
              Enter your age:&nbsp; 
            </label>  
            <input
              placeholder="Type your age"
              type='text'
              name='age'
              id='age'
              required
              className="form-control"
              onBlur={this.myChangeageHandler}
              onSubmit={this.myChangeageHandler}
            />
            {this.state.errormessageage }
            <br/>
     
            <label htmlFor= 'ph'>
              Enter phone number:&nbsp;  
            </label> 
            <input
              placeholder="your 10 digit phone number"
              type='number'
              name='phoneNo'
              id='ph'
              required
              className="form-control"
              onBlur={this.myPhoneHandler}
              onSubmit={this.myChangeHandler}
            />
            {this.state.errormessageph}
            <br/>

            <label htmlFor= 'email'>
              Enter your Email:&nbsp;  
            </label> 
            <input
              placeholder="Enter Email ID"
              type='email'
              name='email'
              id='email'
              required
              className="form-control"
              onBlur={this.myEmailHandler}
            />
            {this.state.errormessageemail}
            <br/>

            <label htmlFor= 'dropdown'>
              Gender:&nbsp; 
            </label> 
            <select 
              id="dropdown" 
              onChange={this.handleDropdownChange}  
              required
              className="form-control"
              name='gender'
            >
              <option value="Do not want to disclose">Do not want to disclose</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <br/>
     
            <label htmlFor= 'Addrhouseno'>
              Address House number:&nbsp; 
            </label>  
            <input
              placeholder="House number"
              type='text'
              name='houseNo'
              id='Addrhouseno'
              className="form-control"
              onBlur={this.myChangeHandler}
              onSubmit={this.myChangeHandler}
              />
            <br/>

            <label htmlFor= 'Addrhousestreet'>
              Address Street:&nbsp; 
            </label>  
            <input
              placeholder="Street Name"
              type='text'
              name='street'
              id='Addrhousestreet'
              required
              className="form-control"
              onBlur={this.myChangeHandler}
              onSubmit={this.myChangeHandler}
            />
            <br/>

            <label htmlFor= 'Addrhousecountry'>
              Address Country:&nbsp; 
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
              Address State:&nbsp; 
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
        
            <label>
              Address City:&nbsp; 
            </label> 
            <input
              placeholder="City"
              type='text'
              name='city'
              required
              className="form-control"
              onBlur={this.myChangeHandler}
              onSubmit={this.myChangeHandler}
            />
            <br/>

            <label>
              Address pincode:&nbsp; 
            </label>
            <input
              placeholder="pincode"
              type='text'
              name='pincode'
              required
              className="form-control"
              onBlur={this.myChangepincodeHandler}
              onSubmit={this.myChangeHandler}
            />
            {this.state.errormessagepincode}
            <br/>

            <button type="submit" className="btn btn-primary" disabled={this.checkError()}>Submit</button>     
          </div>
        </form>
      </div>
    )
  };
}

export default AddUser