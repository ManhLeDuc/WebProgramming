import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import HeaderWeb from './components/HeaderWeb';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import HomeScreen from './components/HomeScreen';


export default class App extends Component {
  render() {
    return (
      <div>
        {/* <HeaderWeb />
        <SearchBar /> */}
        <BrowserRouter>
          <Switch>
            <Route path='/' component={HomeScreen} exact={true} />
            
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}