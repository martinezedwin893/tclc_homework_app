import React, {Component} from 'react';
import {Router, Route, Link, IndexLink, IndexRoute, hashHistory, browserHistory} from 'react-router';

import swal from 'sweetalert2'
import {getDate} from './firebase.js';



class Settings extends Component {


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
                "month": "April",
                "totalPoints": 0,
                "year": 2017
            };
        }

      }

      this.setState({
          user: currentUsers
      });
    }

    // modified version of clickRow()
    deleteUser(index) {
        console.log(index);
        let currentUsers = this.state.user;
        let activeUser = currentUsers[index];
        let firstName = activeUser.first;
        let lastName = activeUser.last;
        var base = this.state.base;
        //document.getElementById(index).classList.add("selected");
        //console.log(document.getElementById(index).classList);

        /*
        this.setState({
            activeUser: activeUser,
            index: index
        });
        */

        // show dialog to confirm deletion
        swal({
            title: 'Are you sure?',
            text: 'Confirm deletion of student ' + firstName + ' ' + lastName + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(function () {
            base.remove('users/' + index).then(() => {
                swal(
                    "Successfully Deleted!",
                    "The student " + firstName + " " + lastName + " has been removed.",
                    "success"
                );
            }).catch(error => {
                swal(
                    "An error has occurred.",
                    error,
                    "error"
                );
            });
        });

        //console.log(activeUser);
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


        if (currentUsers[index].points[yearMonth][date[2]] == undefined) {
            currentUsers[index].points[yearMonth][date[2]] = {"HW": 0, "V": 0};
        }

        if (value < 0) {
          window.alert("Please enter a positive number.");
        }

        if (value > 0) {

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

    /*Renders table with names*/
    renderTable() {
        let currentUsers = this.state.user;
        let date = getDate();
        let yearMonth = date[0] + "-" + date[1];
        let usersArray = [];
        let count = Object.keys(currentUsers).length;

        for (let index in currentUsers) {

            let currentUser = currentUsers[index];


            usersArray.push(
                <div className={(count % 2 == 1) ? "chart-table-row isGray" : "chart-table-row"}
                    key={index}
                    id={index}>
                    <div className="chart-table-row-name">{currentUser.first} {currentUser.last}</div>
                    <button className="chart-table-row-notcompleted" onClick={this.deleteUser.bind(this, index)}>Delete</button>
                </div>
            );

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

        return (
            <div className="home">
                  <div className="left-panel">
                    <div className="chart">
                        <div className="chart-header">
                            <div className="chart-header-names">Name</div>
                        </div>
                        {this.renderTable()}
                    </div>
                </div>
                
            </div>
        );
    }
}


export default Settings
