import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import Main from './components/Main';
export default class App extends Component {
  render() {
    return (
      <div>
        {/* <HeaderWeb />
        <SearchBar /> */}
        <BrowserRouter>
          <Switch>
            <Route path='/' component={HomeScreen} exact={true} />
            <Route path='/login' component={LoginScreen}  />
            <Route path='/signup' component={SignUpScreen}  />
            <Route path='/flashcard' component={Main}  />

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}