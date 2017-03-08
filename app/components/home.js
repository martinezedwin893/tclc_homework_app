import React, { Component } from 'react';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory, browserHistory } from 'react-router';

// import {function name} from './utils.jx';

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
        /*
         let users = [];
         this.firebaseRef = firebase.database().ref("users");
         this.firebaseRef.on("child_added", function(dataSnapshot) {
         users.push(dataSnapshot.val());
         this.setState({
         user: users
         });
         }.bind(this));
         */
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
            state: 'user',
            asArray: true
        });
        //this.bindAsArray(new Firebase("https://homework-app-81383.firebaseio.com/users"), "users");
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
        console.log(date);
        let yearMonth = date[0] + "-" + date[1];
        let value = document.getElementById("input-add").value;
        value = parseInt(value);
        let currentUsers = this.state.user;
        let activeUser = this.state.activeUser;
        let index = this.state.index;

        if(currentUsers[index].points[yearMonth] == undefined){
            currentUsers[index].points[yearMonth] = {};
        }

        if(currentUsers[index].points[yearMonth][date[2]] == undefined){
            currentUsers[index].points[yearMonth][date[2]] = {"HW":0,"V":0};
        }

        if(value > 0){
            currentUsers[index].points[yearMonth][date[2]]["HW"] = value;
        }

        /*
         console.log(firebaseRef.users);
         this.firebaseRef.users[index].scores.push({
         date: value
         }
         );*/

        this.setState({
            user: currentUsers
        });
    }

    decrement(){

    }

    increment(){

    }

    /*Renders table with names*/
    renderTable(){
        let length = this.state.user.length;
        let currentUsers = this.state.user;
        let date = this.getDate();
        let yearMonth = date[0] + "-" + date[1];
        let usersArray = [];

        console.log(currentUsers);
        if(Array.isArray(currentUsers)){
            usersArray = currentUsers.map( function(currentUser, index){

                    let homeworkCompleted;
                    if("points" in currentUser && yearMonth in currentUser.points && date[2] in currentUser.points[yearMonth]){
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
        }

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
                            <div onClick={this.decrement.bind(this)} className="points-buttons-button">-</div>
                            <input id="input-add" className="points-buttons-input" type="number" placeholder="0"></input>
                            <div onClick={this.increment.bind(this)} className="points-buttons-button">+</div>
                        </div>
                        <h4>Reason</h4>
                        <div onClick={this.addValue.bind(this)} className="add-button">Add</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home