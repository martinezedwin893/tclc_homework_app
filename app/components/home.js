import React, { Component } from 'react';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory, browserHistory } from 'react-router';

class Home extends Component {

  mixins: [ReactFireMixin];

  constructor (props, context) {
    super(props);
    this.context = context;

    this.state = {
      user: [],
    };
  }

  componentWillMount () {
    let users = [];
    this.firebaseRef = firebase.database().ref("users");
    this.firebaseRef.on("child_added", function(dataSnapshot) {
      users.push(dataSnapshot.val());
      this.setState({
        user: users
      });
    }.bind(this));

  }

  /*Renders table with names*/
  renderTable(){
    let length = this.state.user.length;
    let currentUsers = this.state.user;


    let usersArray = currentUsers.map( function(currentUser, index){
        //TODO: Only checks for 2-12-17
        let homeworkCompleted;
        if("scores" in currentUser && "02-12-17" in currentUser.scores){
          homeworkCompleted = <div className="chart-table-row-completed">Completed</div>;
        } else {
          homeworkCompleted = <div className="chart-table-row-notcompleted">Not Completed</div>;
        }

        //If condition to switch colors
        if(index%2 == 0){
        return(
          <div className="chart-table-row isGray" key={currentUser.first}>
            <div className="chart-table-row-name">{currentUser.first} {currentUser.last}</div>
            {homeworkCompleted}
          </div>);
        } else{
        return(
          <div className="chart-table-row" key={currentUser.first}>
            <div className="chart-table-row-name">{currentUser.first} {currentUser.last}</div>
            {homeworkCompleted}
          </div>);
        }
      }
    )

    return(
      <div className="chart-table">{usersArray}</div>
    );
  }

  render () {

    return(
      <div className="home">
        <div className="left-panel">
          <div className="date">Monday, February 13, 2017</div>
          <div className="chart">
            <div className="chart-header">
              <div className="chart-header-names">Names</div>
              <div className="chart-header-completed"> Homework Completed</div>
            </div>
            {this.renderTable()}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
