import React from 'react';
import logo from './logo.jpg';
import './App.css'
import Header from './Header'
import Footer from './Footer'

import {useCookies, Cookies, CookiesProvider} from 'react-cookie'
import {Route, BrowserRouter} from 'react-router-dom'
import Dashboard from './Dashboard'
import SignIn from './SignIn'

function App() {
  const ck = new Cookies();
  //let date = new Date();
  //date.setTime(date.getTime() + (10 * 1000));
  //ck.set('user', 'Hello', {expires: date})
  //ck.remove('user')
  const isLoggedIn = ck.get('user')
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
