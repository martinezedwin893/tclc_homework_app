import React, { Component } from 'react';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory, browserHistory } from 'react-router';

class Home extends Component {

  mixins: [ReactFireMixin];

  constructor (props, context) {
    super(props);
    this.context = context;

    this.state = {
      user: {},
      activeUser: {"first": "Welcome", "last":"Back!"},
      index: 0
    };
  }

  componentWillMount () {

    var Rebase = require('re-base');
    var base = Rebase.createClass({
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

  clickRow (index) {
    console.log(index);
    let currentUsers = this.state.user;
    let activeUser = currentUsers[index];

    this.setState({
      activeUser: activeUser,
      index: index
    });
    console.log(activeUser);
  }

  getDate (){
    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth()+1;
    var year = d.getFullYear();
    year = year % 2000;
    var arrayForm = [year,month,date];

    return arrayForm;
  }

  addValue(){
    let date = this.getDate();
    let yearMonth = date[0] + "-" + date[1];
    let value = document.getElementById("input-add").value;
    value = parseInt(value);
    let currentUsers = this.state.user;
    let activeUser = this.state.activeUser;
    let index = this.state.index;

    if(activeUser.first == "Welcome"){
      return;
    }

    if(!(yearMonth in currentUsers[index].points)){
      currentUsers[index].points[yearMonth] = {
        "completedHomework":0,
        "month": "March",
        "totalPoints": 0,
        "year": 2017
      };
    }

    if(currentUsers[index].points[yearMonth][date[2]] == undefined){
      currentUsers[index].points[yearMonth][date[2]] = {"HW":0,"V":0};
    }

    if(value > 0){
      currentUsers[index].points[yearMonth][date[2]]["HW"] += value;
      currentUsers[index].points[yearMonth].completedHomework += value;
      currentUsers[index].points[yearMonth].totalPoints += value;
    }

    this.setState({
      user: currentUsers
    });
  }

  decrement(){
    document.getElementById("input-add").value--;
  }

  increment(){
    document.getElementById("input-add").value++;
  }

  /*Renders table with names*/
  renderTable(){
    let length = this.state.user.length;
    let currentUsers = this.state.user;
    let date = this.getDate();
    let yearMonth = date[0] + "-" + date[1];
    let usersArray = [];

    for(var index in currentUsers){

        let currentUser = currentUsers[index];

        let homeworkCompleted;
        if("points" in currentUser && yearMonth in currentUser.points && date[2] in currentUser.points[yearMonth]){
          homeworkCompleted = <div className="chart-table-row-completed">Completed</div>;
        } else {
          homeworkCompleted = <div className="chart-table-row-notcompleted">Not Completed</div>;
        }

        //If condition to switch colors
        if(index%2 == 0){
        usersArray.push(
          <div onClick={this.clickRow.bind(this,index)} className="chart-table-row isGray" key={index} id={index}>
            <div className="chart-table-row-name">{currentUser.first} {currentUser.last}</div>
            {homeworkCompleted}
          </div>);
        } else{
        usersArray.push(
          <div onClick={this.clickRow.bind(this,index)} className="chart-table-row" key={index} id={index}>
            <div className="chart-table-row-name">{currentUser.first} {currentUser.last}</div>
            {homeworkCompleted}
          </div>);
        }
    }

    return(
      <div className="chart-table">{usersArray}</div>
    );
  }

  render () {

    let selected = this.state.activeUser;
    var d = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var weekday = days[d.getDay()];
    var day = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();

    return(
      <div className="home">
        <div className="left-panel">
          <div className="date">{weekday}, {month} {day}, {year}</div>
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
              <button type="button" onClick={this.decrement.bind(this)} className="points-buttons-button">-</button>
              <input id="input-add" className="points-buttons-input" type="number" placeholder="0"></input>
              <button onClick={this.increment.bind(this)} className="points-buttons-button">+</button>
            </div>
            <h4>Reason</h4>
            <button type="button" onClick={this.addValue.bind(this)} className="add-button">Add</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
