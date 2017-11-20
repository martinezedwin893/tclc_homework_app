import React, { Component } from 'react';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory, browserHistory } from 'react-router';

const Login = () => (
  <div className="login">
    <div className="login-box">
      <div className="user-login"><h1>User Login</h1></div>
      <input placeholder="Username" className="input"></input>
      <input placeholder="Password" className="input"></input>
      <Link to="/" className="login-button">Login</Link>
    </div>
  </div>
)

export default Login
