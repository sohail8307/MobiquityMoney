import React from 'react';
import './App.css'
import Header from './Header'
import Footer from './Footer'


import {Route, BrowserRouter} from 'react-router-dom'
import Dashboard from './Dashboard'
import SignIn from './SignIn'


/**
 * @component Wrapper component of the entire SPA
 * @description Stateless functional component. Uses 'react-router-dom' to route to various paths
 */
function App() {
  return (
  <div className="App">
    <Header />
    <div className='main'>
      <BrowserRouter>
        <Route exact path='/' component={SignIn} />
        <Route path='/Dashboard' component={Dashboard} />
        <Route path='/SignIn' component={SignIn} />
      </BrowserRouter>
    </div>
    <Footer />
  </div>
  );
}

export default App;
