import React from 'react';
import logo from './logo.jpg';
import './Util.css'
import {NavLink} from 'react-router-dom'

function Header() {
  return (
   <div>
    <header className= "header container-fluid">
      <div className="row">
        <div className="col"><img src={logo} alt="Logo" /></div>
        <div className="col font-weight-bolder"><h2>mobiquityMoney</h2></div>
      </div>
    </header>     
    </div>  
  );
}
  
  export default Header;