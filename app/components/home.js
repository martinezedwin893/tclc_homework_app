import React, { Component } from 'react';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory, browserHistory } from 'react-router';

class Home extends Component {

  mixins: [ReactFireMixin];

  constructor (props, context) {
    super(props);
    this.context = context;

    this.state = {
      user: [],
      activeUser: {"first": "Welcome", "last":"Back!"}
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

  clickRow (index) {
    console.log(index);
    let currentUsers = this.state.user;
    let activeUser = currentUsers[index];
    this.setState({
      activeUser: activeUser
    });
    console.log(activeUser);

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
          <div onClick={this.clickRow.bind(this,index)} className="chart-table-row isGray" key={currentUser.first}>
            <div className="chart-table-row-name">{currentUser.first} {currentUser.last}</div>
            {homeworkCompleted}
          </div>);
        } else{
        return(
          <div onClick={this.clickRow.bind(this,index)} className="chart-table-row" key={currentUser.first}>
            <div className="chart-table-row-name">{currentUser.first} {currentUser.last}</div>
            {homeworkCompleted}
          </div>);
        }
      },this
    );

    return(
      <div className="chart-table">{usersArray}</div>
    );
  }

  render () {

    let selected = this.state.activeUser;

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
        <div className="right-panel">
          <h1>{selected.first}</h1>
          <h1>{selected.last}</h1>
          <div className="points">
            <h4>Add Points</h4>
            <div className="points-buttons">
              <div className="points-buttons-button">-</div>
              <input className="points-buttons-input" placeholder="0"></input>
              <div className="points-buttons-button">+</div>
            </div>
            <h4>Reason</h4>
            <div className="add-button">Add</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
