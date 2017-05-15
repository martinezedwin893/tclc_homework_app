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



class Settings extends Component {
	//added new 
	constructor(props, context) {
		super(props);
		this.context = context;

		//code from classroom
		this.state = {
          user: {},
          activeUser: {
            "first": "Welcome",
            "last": "Back!"
          },
          index: 0,
          test: 0
      };

      //code for add student

		 this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
	 

	//Set up the Firebase to add student
	componentWillMount() {
      let Rebase = require('re-base');
      let base = Rebase.createClass(
      {
          apiKey: "AIzaSyD_l86M8ZSZilyYVx2nzIsK4s-UT8Hw66s",
          authDomain: "homework-app-81383.firebaseapp.com",
          databaseURL: "https://homework-app-81383.firebaseio.com",
          storageBucket: "homework-app-81383.appspot.com",
          messagingSenderId: "79481264901"
      }, 'base');

      base.syncState('users', {
          context: this,
          state: 'user' //or 'students'
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
   * Renders table with names
   */
  renderTable() {
      let currentUsers = this.state.user;
      let date = getDate();
      let yearMonth = date[0] + "-" + date[1];
      let usersArray = [];
      let count = Object.keys(currentUsers).length;

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


  //just to see that the changes are showing
 

  //old code
    render() {
    return (
    	<div>Settings
    	<center><h1>Add Students</h1></center>
    	<center> <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form></center>
    	</div>
        );

  } 
}

export default Settings