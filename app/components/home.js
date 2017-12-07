import React, {Component} from 'react';
import {Router, Route, Link, IndexLink, IndexRoute, hashHistory, browserHistory} from 'react-router';

import swal from 'sweetalert2'
import {getDate, getCurrentMonthName} from './firebase.js';



class Home extends Component {


    mixins: [ReactFireMixin];

    constructor(props, context) {
        super(props);
        this.context = context;

        this.state = {
            user: {},
            activeUser: {"first": "Welcome", "last": "Back!"},
            index: 0,
            test: 0,
            reset: 0,
            isHomework: true,
            show: false,
            base: null,
            newStudentName: ""
        };

        this.updateNewStudentName = this.updateNewStudentName.bind(this);
        this.addNewStudentName = this.addNewStudentName.bind(this);
    }


    componentWillMount() {
        let Rebase = require('re-base');
        this.state.base = Rebase.createClass({
            apiKey: "AIzaSyD_l86M8ZSZilyYVx2nzIsK4s-UT8Hw66s",
            authDomain: "homework-app-81383.firebaseapp.com",
            databaseURL: "https://homework-app-81383.firebaseio.com",
            storageBucket: "homework-app-81383.appspot.com",
            messagingSenderId: "79481264901"
        }, 'base');

        this.state.base.syncState('users', {
            context: this,
            state: 'user'
        });
    }


    componentDidMount(){
      console.log("inside component did mount");
      let currentUsers = this.state.user;
      let date = getDate();
      let yearMonth = date[0] + "-" + date[1];

      for (let index in currentUsers) {
        console.log("inside the for loop");
        //If points don't exist, push an empty object.
        if(!("points" in currentUsers[index])){
          currentUsers[index].points = {};
          console.log("created points for " + currentUsers[index].first);
        }

        //If current month doesn't exist, push one.
        if (!(yearMonth in currentUsers[index].points)) {
            console.log("pushed a current month for " + currentUsers[index].first);
            currentUsers[index].points[yearMonth] = {
                "completedHomework": 0,
                "completedVolunteering": 0,
                "month": getCurrentMonthName(),
                "totalPoints": 0,
                "year": 2000 + date[0]
            };
        }

      }

      this.setState({
          user: currentUsers
      });
    }

    clickRow(index) {
        console.log(index);
        let currentUsers = this.state.user;
        let activeUser = currentUsers[index];
        //document.getElementById(index).classList.add("selected");
        console.log(document.getElementById(index).classList);

        this.setState({
            activeUser: activeUser,
            index: index
        });

        console.log(activeUser);
    }

    isReset() {
      this.state.reset = 1;
    }

    addValue() {
        let date = getDate();
        let yearMonth = date[0] + "-" + date[1];
        let value = document.getElementById("input-add").value;

        value = parseInt(value);


        let currentUsers = this.state.user;
        let activeUser = this.state.activeUser;
        let index = this.state.index;

      
        if (activeUser.first == "Welcome") {
          return;
        }

        if (this.state.isHomework == true) {
            swal({
              title: 'Adding homework points for ' + currentUsers[index].first + ' ' + currentUsers[index].last,
              //text: 'Confirm addition of ' + value +
              //' points to ' +currentUsers[index].first+'?',
              type: 'warning',
              //showCancelButton: true,
              confirmButtonColor: '#3085d6',
              //cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, add points!',
            }).then (function () {
                //console.log("result.value is " + result.value);
                //console.log("result is" + result);
                swal(
                'Successfully Added!',
                value + ' homework points added to '+ currentUsers[index].first+'!',
                'success'
                )
                  
            })//.catch(swal.noop)

        }
        else {
            swal({
                  title: 'Adding volunteering points for ' + currentUsers[index].first + ' ' + currentUsers[index].last,
                  //text: 'Confirm addition of ' + value +
                  //' points to ' +currentUsers[index].first+'?',
                  type: 'warning',
                  //showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  //cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, add points!',
                }).then (function () {
                    //console.log("result.value is " + result.value);
                    //console.log("result is" + result);
                    swal(
                    'Successfully Added!',
                    value + ' volunteering points added to '+ currentUsers[index].first+'!',
                    'success'
                    )     
                })
        }

        // tried to add line of code to initalize fucking points jesus christ
        if (currentUsers[index].points == undefined){
          console.log("inside this fucking if statement");
          currentUsers[index].points = {};
          console.log("created points for " + currentUsers[index].first);
          this.setState({
            user: currentUsers
          });
        }

        if (currentUsers[index].points[yearMonth][date[2]] == undefined) {
          console.log("inside second if statement thing");
          currentUsers[index].points[yearMonth][date[2]] = {"HW": 0, "V": 0};
        }
        console.log("isHomework is " + this.state.isHomework);
   
        if (this.state.isHomework == true) {
          currentUsers[index].points[yearMonth][date[2]]["HW"] += value;
          currentUsers[index].points[yearMonth].completedHomework += value;
          currentUsers[index].totalHomework += value;

          if (currentUsers[index].points[yearMonth][date[2]]["HW"] < 0)
              currentUsers[index].points[yearMonth][date[2]]["HW"] = 0;

          if (currentUsers[index].points[yearMonth].completedHomework < 0)
              currentUsers[index].points[yearMonth].completedHomework = 0;

          if (currentUsers[index].totalHomework < 0)
              currentUsers[index].totalHomework = 0;
        }
        else {
          currentUsers[index].points[yearMonth][date[2]]["V"] += value;
          currentUsers[index].points[yearMonth].completedVolunteering += value;
          currentUsers[index].totalVolunteering += value;

          if (currentUsers[index].points[yearMonth][date[2]]["V"] < 0)
              currentUsers[index].points[yearMonth][date[2]]["V"] = 0;

          if (currentUsers[index].points[yearMonth].completedVolunteering < 0)
              currentUsers[index].points[yearMonth].completedVolunteering = 0;

          if (currentUsers[index].totalVolunteering < 0)
              currentUsers[index].totalVolunteering = 0;

        }
      
        currentUsers[index].totalPoints += value;
        currentUsers[index].points[yearMonth].totalPoints += value;
        currentUsers[index].jumps += value; 

        if (currentUsers[index].totalPoints < 0)
          currentUsers[index].totalPoints = 0;

        if (currentUsers[index].points[yearMonth].totalPoints < 0)
          currentUsers[index].points[yearMonth].totalPoints = 0;

        if (currentUsers[index].jumps  < 0)
          currentUsers[index].jumps = 0;
        

        this.setState({
            user: currentUsers
        });

        /*
        //set box value back to 0*/
        document.getElementById("input-add").value = 0;


    }

    resetValue() {
        let date = getDate();
        let yearMonth = date[0] + "-" + date[1];

        let currentUsers = this.state.user;
        let activeUser = this.state.activeUser;
        let index = this.state.index;

        if (activeUser.first == "Welcome") {
            return;
        }

        if (this.state.reset == 1) {
            swal({
              title: 'Resetting today\'s points for ' + currentUsers[index].first + ' ' + currentUsers[index].last,
              //text: 'Confirm point reset for ' + currentUsers[index].first+'?',
              type: 'warning',
              //showCancelButton: true,
              confirmButtonColor: '#3085d6',
              //cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, reset points!'
            }).then(function() {
                swal(
                  'Successfully Reset!',
                  'Points reset for '+ currentUsers[index].first+'!',
                  'success'
                )
            }).catch(swal.noop)

            this.state.reset = 0;
            currentUsers[index].points[yearMonth].completedHomework -= currentUsers[index].points[yearMonth][date[2]]["HW"];
            currentUsers[index].points[yearMonth].completedVolunteering -= currentUsers[index].points[yearMonth][date[2]]["V"];

            currentUsers[index].totalVolunteering -= currentUsers[index].points[yearMonth][date[2]]["V"];
            currentUsers[index].totalHomework -= currentUsers[index].points[yearMonth][date[2]]["HW"];

            currentUsers[index].points[yearMonth].totalPoints -= currentUsers[index].points[yearMonth][date[2]]["HW"] + currentUsers[index].points[yearMonth][date[2]]["V"];
            currentUsers[index].totalPoints -= currentUsers[index].points[yearMonth][date[2]]["HW"] + currentUsers[index].points[yearMonth][date[2]]["V"];

            currentUsers[index].points[yearMonth][date[2]]["HW"] = 0;
            currentUsers[index].points[yearMonth][date[2]]["V"] =0;

            //currentUsers[index].points[yearMonth][date[2]] = undefined;
            // what is this lol 
            currentUsers[index].jumps =0;

        }
        
        this.setState({
            user: currentUsers
        });
        

    }

    decrement() {
        document.getElementById("input-add").value--;
    }

    increment() {
        document.getElementById("input-add").value++;
    }


    successAlert() {
        window.alert("SUCCESS");
    }

    updateNewStudentName(event) {
        this.setState ({newStudentName: event.target.value});

    }

    // Add new student
    addNewStudentName() {
        var firstName = this.state.newStudentName.split(" ")[0];
        var lastName = this.state.newStudentName.split(" ")[1];

        //alert ("First Name = " + firstName + ", Last Name = " + lastName);
        if(this.state.newStudentName.split(" ").length != 2){
            alert("Please enter in the full student's name, separated by a space.");
        }else{
            this.state.base.push('users', {
                data: {first: firstName, last: lastName, totalHomework: 0, totalVolunteering: 0, totalPoints: 0}
            }).catch(error => {
                  alert("Oh no!\n\n" + error);
              });
        }

    }

    /*Renders table with names*/
    renderTable() {
        let currentUsers = this.state.user;
        let date = getDate();
        let yearMonth = date[0] + "-" + date[1];
        let usersArray = [];
        let count = Object.keys(currentUsers).length;

        for (let index in currentUsers) {

            let currentUser = currentUsers[index];

            let homeworkCompleted;
            if ("points" in currentUser && yearMonth in currentUser.points && currentUser.points[yearMonth][date[2]] && (currentUser.points[yearMonth][date[2]]["HW"] != 0)) {
                homeworkCompleted = <div className="chart-table-row-completed">Completed</div>;
            } else {
                homeworkCompleted = <div className="chart-table-row-notcompleted">Not Completed</div>;
            }

            //If condition to switch colors
            if (count % 2 == 1) {
                usersArray.push(
                    <div onClick={this.clickRow.bind(this, index)} className="chart-table-row isGray" key={index}
                         id={index}>
                        <div className="chart-table-row-name">{currentUser.first} {currentUser.last}</div>
                        {homeworkCompleted}
                    </div>);
            } else {
                usersArray.push(
                    <div onClick={this.clickRow.bind(this, index)} className="chart-table-row" key={index} id={index}>
                        <div className="chart-table-row-name">{currentUser.first} {currentUser.last}</div>
                        {homeworkCompleted}
                    </div>);
            }

            count++;
        }

        return (
            <div className="chart-table">{usersArray}</div>
        );
    }

    render() {

        let selected = this.state.activeUser;
        let d = new Date();
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let weekday = days[d.getDay()];
        let day = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        let isHomework = true;

        return (


            <div className="home">

                <div className="left-panel">
                    <div className="date">{weekday}, {month} {day}, {year}</div>
                    <div className="chart">
                        <div className="chart-header">
                            <div className="chart-header-names">Name</div>
                            <div className="chart-header-completed"> Homework Completed</div>
                        </div>
                        {this.renderTable()}
                        <form>
                        <label>
                        New Student Name:
                         <input type="text" onChange={this.updateNewStudentName} name="name" />
                        </label>
                       <input type="submit" onClick={this.addNewStudentName} className="submit-button" value="Submit" />
                        </form>

                    </div>
                </div>
                <div className="right-panel">
                    <h1>{selected.first} {selected.last}</h1>
                    <div className="points">
                        <h4>Add Points</h4>
                          <div className="points-buttons">
                                <input id="input-add" className="points-buttons-input" type="number" placeholder="0"/>
                                <button onClick={this.increment.bind(this)} className="points-buttons-button">+</button>
                          </div>
                        <h4>Category</h4>
                        <form action="">
                          <input type="radio" name="gender" value="male" defaultChecked onClick={()=>{this.state.isHomework = true;}}/>  Homework
                          <br/>
                          <input type="radio" name="gender" value="female" onClick={()=>{this.state.isHomework = false;}} />  Volunteering
                        </form>
                        <button type="button" onClick={this.addValue.bind(this)} className="add-button">Add</button>
                        <center><button type="button" onClick={this.isReset(), this.resetValue.bind(this)} className="reset-button">Reset Points</button></center>


                    </div>
                </div>
            </div>
        )
    }
}


export default Home
