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


    /*Renders table with names*/
    renderTable() {
        let currentUsers = this.state.user;
        let usersArray = [];
        let count = Object.keys(currentUsers).length;

        for (let index in currentUsers) {

            let currentUser = currentUsers[index];


            usersArray.push(
                <div className={(count % 2 == 1) ? "chart-table-row isGray" : "chart-table-row"}
                    key={index}
                    id={index}>
                    <div className="chart-table-row-name">{currentUser.first} {currentUser.last}</div>
                    <button className="chart-table-row-deleted" onClick={this.deleteUser.bind(this, index)}>Delete</button>
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
       

        return (
            <div className="settings">
          
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
