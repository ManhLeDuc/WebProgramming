import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import "./App.css";
import DicPage from "./layouts/DicPage";
import LoginPage from "./layouts/LoginPage";
import SignUpPage from "./layouts/SignUpPage";
import LearningPage from "./layouts/LearningPage";
import WordGroupPage from "./layouts/WordGroupPage";
import LearnGroup from "./layouts/LearnGroup";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/dictionarypage" />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />

            <Route exact path="/learning" component={LearningPage} />
            <Route exact path="/dictionarypage" component={DicPage} />
            <Route
              exact
              path="/wordGroups/:wordGroupId"
              component={WordGroupPage}
            />
            <Route
              exact
              path="/learnGroup/:wordGroupId"
              component={LearnGroup}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
