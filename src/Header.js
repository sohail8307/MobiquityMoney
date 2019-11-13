import React from 'react';
import logo from './logo.jpg';
import './Util.css'


/**
 * @component Static component for Header
 * @requires REACT_APP_WEBSITE_NAME , the app environment variable for webapp name
 * @description Stateless functional component to display logo and app name.
 */
function Header() {
  return (
   <div>
    <header className= "header container-fluid">
      <div className="row">
        <div className="col"><img src={logo} alt="Logo" /></div>
        <div className="col font-weight-bolder"><h2>{process.env.REACT_APP_WEBSITE_NAME}</h2></div>
      </div>
    </header>     
    </div>  
  );
}
  
  export default Header;