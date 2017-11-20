import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router'
require('./css/globals.css')
require('../node_modules/sweetalert2/dist/sweetalert2.css')
require('../node_modules/sweetalert2/dist/sweetalert2.min.css')

import Nav from './components/nav.js'
import Home from './components/home.js'
import Login from './components/login.js'
import Leaderboard from './components/leaderboard.js'
import ClassRoom from './components/classroom.js'
import Settings from './components/settings.js'

class App extends Component {

render () {

    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRoute component={Home} />
          <Route path='login' component={Login} />
          <Route path='leaderboard' component={Leaderboard} />
          <Route path='classroom' component={ClassRoom} />
          <Route path='settings' component={Settings} />
        </Route>
      </Router>
    )
  }
}

const Instagram = () => <h3>Instagram Feed</h3>
const TwitterFeed = () => <h3>Twitter Feed</h3>

const Address = (props) => <div>
  <br />
  <Link to='/address'>Twitter Feed</Link>&nbsp;
  <Link to='/address/instagram'>Instagram Feed</Link>
  <h1>We are located at 555 Jackson St.</h1>
  {props.children}
</div>

const Container = (props) => <div>
  <Nav />
  {props.children}
</div>

export default App
