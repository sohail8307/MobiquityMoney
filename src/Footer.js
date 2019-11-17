import React from 'react';
import './Util.css';

/**
 * @component Static component for footer
 * @description Stateless functional component to display copyright information. 
 */
function Footer() {
    return (
     <div>
         <footer >
             <div className="foot"><span id="text">&copy; copyrights reserved 2019</span></div>
        </footer>
     </div>  
    );
  }
  
  export default Footer;