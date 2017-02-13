import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router'
require('./css/globals.css')

import Nav from './components/nav.js'
import Home from './components/home.js'

class App extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRoute component={Home} />
          <Route path='*' component={NotFound} />
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

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

const Container = (props) => <div>
  <Nav />
  {props.children}
</div>

export default App
