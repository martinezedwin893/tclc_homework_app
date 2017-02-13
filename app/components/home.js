import React, { Component } from 'react';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory, browserHistory } from 'react-router';

class Home extends Component {

  renderTable() {
    return(
      <div >
        <div className="row-title">
          <div className="name">Name</div>
          <div className="completed"></div>
        </div>
        <div className="row">
          <div className="name"></div>
          <div className="completed"></div>
        </div>
      </div>
    );
  }

  render () {
    return(
      <div className="home">
        <div className="left-panel">
          <div className="date">Monday, February 13, 2017</div>
          <div className="chart"></div>
          <div className="row-title">
            <div className="name">Name</div>
            <div className="completed"></div>
          </div>
          <div className="row">
            <div className="name"></div>
            <div className="completed"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
