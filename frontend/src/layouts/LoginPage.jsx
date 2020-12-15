import React, { Component } from "react";
import "./../css/LoginScreen.css";

class LoginPage extends Component {
  render() {
    return (
      <div className="login-dark">
        <form method="post">
          <h2 className="sr-only">Login Form</h2>
          <div className="illustration">
            {/* <i className="icon ion-ios-locked-outline" ></i> */}
            <span>Login</span>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Log In
            </button>
          </div>
          <a href="#" className="forgot">
            Forgot your email or password?
          </a>
          <a href="#" className="forgot">
            If you don't have an account, please sign up.
          </a>
        </form>
      </div>
    );
  }
}

export default LoginPage;
