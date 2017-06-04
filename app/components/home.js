import React, {Component} from 'react';
import {Router, Route, Link, IndexLink, IndexRoute, hashHistory, browserHistory} from 'react-router';

import swal from 'sweetalert2'
import {getDate} from './firebase.js';



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

      let currentUsers = this.state.user;
      let date = getDate();
      let yearMonth = date[0] + "-" + date[1];

      for (let index in currentUsers) {

        //If points don't exist, push an empty object.
        if(!("points" in currentUsers[index])){
          currentUsers[index].points = {};
        }

        //If current month doesn't exist, push one.
        if (!(yearMonth in currentUsers[index].points)) {
            currentUsers[index].points[yearMonth] = {
                "completedHomework": 0,
                "month": "June",
                "totalPoints": 0,
                "year": 2017
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

    addValue(isHomework) {
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




        if (value < 0) {
          window.alert("Please enter a positive number.");
        }

        if (value > 0) {

          if (currentUsers[index].points[yearMonth][date[2]] == undefined) {
              currentUsers[index].points[yearMonth][date[2]] = {"HW": 0, "V": 0};
          }

            if(isHomework){
              currentUsers[index].points[yearMonth][date[2]]["HW"] += value;
              currentUsers[index].points[yearMonth].completedHomework += value;
              currentUsers[index].completedHomework += value;
            }
            else {
              currentUsers[index].points[yearMonth][date[2]]["V"] += value;
              currentUsers[index].points[yearMonth].completedVolunteering += value;
            }

            currentUsers[index].totalPoints += value;
            currentUsers[index].points[yearMonth].totalPoints += value;
            currentUsers[index].jumps += value;

            swal({
              title: 'Are you sure?',
              text: 'Confirm addition of ' + value +
              ' points to ' +currentUsers[index].first+'?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, add points!'
            }).then(function () {
              swal(
                'Successfully Added!',
                value + ' points added to '+ currentUsers[index].first+'!',
                'success'
              )
            })
        }

        // reset points for student
        else if (this.state.reset == 1) {




          swal({
            title: 'Are you sure?',
            text: 'Confirm point reset for ' + currentUsers[index].first+'?',
            type: 'warning',
            showCancelButton:true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reset points!'
          }).then(function () {
            swal(
              'Successfully Reset!',
              'Points reset for '+ currentUsers[index].first+'!',
              'success'
            )
          })

        /*  swal(
            'Successfully Reset!',
            'Points reset for ' + currentUsers[index].first+'!',
            'success'
          )
          */
          this.state.reset = 0;
          currentUsers[index].points[yearMonth][date[2]]["HW"] = 0;
          currentUsers[index].points[yearMonth].completedHomework =0;

          currentUsers[index].points[yearMonth][date[2]]["V"] =0;

          //currentUsers[index].points[yearMonth][date[2]] = undefined;
          currentUsers[index].points[yearMonth].totalPoints =0;
          currentUsers[index].totalPoints =0;
          currentUsers[index].jumps =0;

        }
        this.setState({
            user: currentUsers
        });


        //set box value back to 0
        document.getElementById("input-add").value = 0;


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

    addNewStudentName() {
        var firstName = this.state.newStudentName.split(" ")[0];
        var lastName = this.state.newStudentName.split(" ")[1];

        //alert ("First Name = " + firstName + ", Last Name = " + lastName);
        if(this.state.newStudentName.split(" ").length != 2){
            alert("PLease enter in the full student's name, separated by a space.");
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
                          <input type="radio" name="gender" value="male" defaultChecked onClick={()=>{isHomework = true;}}/>  Homework
                          <br/>
                          <input type="radio" name="gender" value="female" onClick={()=>{isHomework = false;}} />  Volunteering
                        </form>
                        <button type="button" onClick={this.addValue.bind(this,isHomework)} className="add-button">Add</button>
                        <center><button type="button" onClick={this.isReset(), this.addValue.bind(this,isHomework)} className="reset-button">Reset Points</button></center>


                    </div>
                </div>
            </div>
        )
    }
}


export default Home
