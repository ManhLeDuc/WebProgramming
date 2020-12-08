import React, { Component } from 'react'
import './LoginScreen.css';
class SignUpScreen extends Component {

    render() {

        return (
            <div className="login-dark">
                <form method="post">
                    <h2 className="sr-only">Sign Up Form</h2>
                    <div className="illustration">
                        {/* <i className="icon ion-ios-locked-outline" ></i> */}
                        <span>Sign</span>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="name" placeholder="Name" /></div>
                    <div className="form-group">
                        <input className="form-control" type="email" name="email" placeholder="Email" /></div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" placeholder="Password" /></div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="confirmpassword" placeholder="Confirm Password" /></div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" type="submit">Sign up</button></div>
                    {/* <a href="#" className="forgot">Forgot your email or password?</a> */}
                </form>
            </div >
        )
    }
}

export default SignUpScreen;