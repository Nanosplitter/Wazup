import React, { Component } from "react";

export default class Login extends Component {
    render() {
        return (
            <form id="loginform">

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    Don't have <a href="/sign-up">an account yet?</a>
                </p>
            </form>
        );
    }
}