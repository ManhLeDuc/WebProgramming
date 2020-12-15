import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import "./App.css";
import HomePage from "./layouts/HomePage";
import LoginPage from "./layouts/LoginPage";
import SignUpPage from "./layouts/SignUpPage";
import Main from "./layouts/Main";
import LearningPage from "./layouts/LearningPage";

export default class App extends Component {
  render() {
    return (
      <div class="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/flashcard" component={Main} />
            <Route exact path="/learning" component={LearningPage} />
            <Redirect exact from="/" to="/homepage" />
            <Route exact path="/homepage" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
