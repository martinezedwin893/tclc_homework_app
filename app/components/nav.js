import React, { Component } from 'react';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory, browserHistory } from 'react-router';

const Nav = () => (
  <div className="navigation">
    <div className="logo">TCLC</div>
    <div className="nav-buttons">
      <IndexLink activeClassName='page-active' className="nav-link" to='/'>
        Home
      </IndexLink>
      <IndexLink activeClassName='page-active' className="nav-link" to='/Classroom'>
        Classroom
      </IndexLink>
      <IndexLink activeClassName='page-active' className="nav-link" to='/Leaderboard'>
        Leaderboard
      </IndexLink>
      <IndexLink activeClassName='page-active' className="nav-link" to='/Settings'>
        Settings
      </IndexLink>
    </div>
  </div>
)

export default Nav
