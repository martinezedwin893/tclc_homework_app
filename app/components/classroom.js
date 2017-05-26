import React, { Component } from 'react';
import {
  Router,
  Route,
  Link,
  IndexLink,
  IndexRoute,
  hashHistory,
  browserHistory
} from 'react-router';
import {
  getDate,
  getYear,
  getMonth,
  getMonthName,
  getCurrentMonthName,
  getAllStudentsLeaderboard
} from './firebase.js';


class ClassRoom extends Component {

  /*
   * set up classroom
   */
  constructor(props, context) {
      super(props);
      this.context = context;

      this.state = {
          user: {},
          activeUser: {
            "first": "Welcome",
            "last": "Back!"
          },
          index: 0,
          test: 0
      };
  }

  /*
   * set up Firebase
   */
  componentWillMount() {
      let Rebase = require('re-base');
      let base = Rebase.createClass({
          apiKey: "AIzaSyD_l86M8ZSZilyYVx2nzIsK4s-UT8Hw66s",
          authDomain: "homework-app-81383.firebaseapp.com",
          databaseURL: "https://homework-app-81383.firebaseio.com",
          storageBucket: "homework-app-81383.appspot.com",
          messagingSenderId: "79481264901"
      }, 'base');

      base.syncState('users', {
          context: this,
          state: 'user'
      });
  }

  /*
   * actions that occur when user clicks on a row
   */
  clickRow(index) {
      console.log(index);
      let currentUsers = this.state.user;
      let activeUser = currentUsers[index];
      // document.getElementById(index).classList.add("selected");
      console.log(document.getElementById(index).classList);

      this.setState({
          activeUser: activeUser,
          index: index
      });

      console.log(activeUser);
  }

  /*
   * Renders x-axis
   */
  renderXAxis() {
    let totalMonths = 6;
    let monthsArray = [];

    // mod = ((n % m) + m) % m
    let currentMonth = (((getMonth() - totalMonths) % 12) + 12) % 12;

    // print the current and previous 5 months
    for (var index = 0; index < totalMonths; index++) {
      monthsArray.push(
        <div className = "month">
          <h4>{getMonthName(currentMonth)}</h4>
        </div>
      );

      currentMonth = (currentMonth + 1) % 12;
    }

    return(
      <div className = "x-axis">
        {monthsArray}
      </div>
    );
  }

  /*
   * Renders table with names
   */
  renderTable() {
      let currentUsers = this.state.user;
      let date = getDate();
      let yearMonth = date[0] + "-" + date[1];
      let usersArray = [];
      let count = Object.keys(currentUsers).length;

      // iterate through list of students
      for (let index in currentUsers) {

          let currentUser = currentUsers[index];

          // If condition to switch colors
          if (count % 2 == 1) {
              usersArray.push(
                  <div
                    onClick = {this.clickRow.bind(this, index)}
                    className = "chart-table-row isGray"
                    key = {index}
                    id = {index}>
                      <div className = "chart-table-row-name">
                        {currentUser.first} {currentUser.last}
                      </div>
                  </div>);

          } else {
              usersArray.push(
                  <div
                    onClick = {this.clickRow.bind(this, index)}
                    className = "chart-table-row"
                    key = {index}
                    id = {index}>
                      <div className = "chart-table-row-name">
                        {currentUser.first} {currentUser.last}
                      </div>
                  </div>);
          }

          count++;
      }

      return (
          <div className = "chart-table">
            {usersArray}
          </div>
      );
  }

  renderBars() {
    return (
    <div
        className = "graph-bar"
        style = {{
          height: numPoints
        }}>
        <h4>{numPoints}</h4>
      </div>
    );
  }







  /*
   * gets total points of all students
   */
  getAllPoints() {
    let pArray = getAllStudentsLeaderboard(this.state.user);
    let points = 0;

    for (var key in pArray) {
      points += pArray[key].totalPoints;
    }

    return points;
  }

  /*
   * gets points of an individual student
   */
  getPoints(){
    let currentUsers = this.state.user;
    let activeUser = this.state.activeUser;
    let index = this.state.index;
    let date = getYear() + "-" + getMonth();
    console.log(currentUsers[index].points[date].totalPoints);
    return currentUsers[index].points[date].totalPoints;
  }

  /*
   * render the Classroom page
   */
  render() {
    let barHeightHomework = 0;
    let barHeightVolunteer = 0;
    let increment = 0;

    if(this.getAllPoints()){
      increment = 400/(this.getAllPoints()*3);
      barHeightHomework = increment * this.getAllPoints();
    }

    let selected = this.state.activeUser;
    let top = "";
    let bottom = "";
    let numPoints = 0;

    if(selected.first == "Welcome"){
      top = "Average # of Points Earned"
      bottom = ""
      numPoints = this.getAllPoints();

    } else{
      top = selected.first;
      bottom = selected.last;
      numPoints = this.getPoints();
      increment = 400/(this.getPoints()*7);
      barHeightHomework = increment * this.getPoints();
      console.log(barHeightHomework);
    }

    return (
      <div className = "classroom">
        <div className = "left-panel">

          <h1>Homework Completed for Each Month</h1>
          <h2>{top} {bottom}</h2>

          <div className = "label">
            <img src = {'../images/Points_Label.png'} />
          </div>

          <div className = "graph">
            <div className = "graph-data">

              <div className = "graph-num">
              </div>

              {this.renderBars()}

            </div>
          </div>

          {this.renderXAxis()}

        </div>

        <div className = "right-panel">
          <div className = "chart-header-names">Name</div>
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

export default ClassRoom
