import React, {Component} from 'react';
import {Router, Route, Link, IndexLink, IndexRoute, hashHistory, browserHistory} from 'react-router';

// import {FirebaseGetUtils} from './firebase.js';

class Leaderboard extends Component {
    mixins: [ReactFireMixin];

    constructor(props, context) {
        super(props);
        this.context = context;

        this.state = {
            data: [],
            month: null
        };
    }

    componentWillMount() {

        let datas = [];
        this.firebaseRef = firebase.database().ref("totalScore");
        this.firebaseRef.on("child_added", function (dataSnapshot) {
            datas.push(dataSnapshot.val());
            this.setState({
                data: datas
            });

            this.setState({
                month: datas[0]['month']
            });
        }.bind(this));

        this.firebaseRef = firebase.database().ref("users");
        this.firebaseRef.on("child_added", function (dataSnapshot) {

            console.log(this.validateLogin(dataSnapshot.val(), "username", "password"));

        }.bind(this));
    }

    validateLogin(student, username, password) {
        return student != null && student.username == username && student.password == password;
    }

    objectToArray(object) {
        if (object == null) return;

        let keys = Object.keys(object);
        let soln = [];

        for (let i = 0; i < keys.length; i++) {
            soln.push({
                key: keys[i],
                value: object[keys[i]]
            });
        }

        return soln;
    }

    renderTable() {
        let currData = this.state.data[0];
        // console.log(currData);

        if (currData) {
            let keys = Object.keys(currData);
            console.log(keys);
            let temp = [];

            // This converts the JS Object into an array
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] != "month") temp.push(currData[keys[i]]);
            }

            currData = temp;
        }

        if (currData) {
            let mappedData = currData.map(function (user, index) {
                    // If condition to switch colors
                    if (index % 2 == 0) {
                        return (
                            <div className="chart-table-row isGray" key={user.first}>
                                <div className="chart-table-row-name">{user.first} {user.last}</div>
                                <div className="chart-table-row-completed">{user.score}</div>
                            </div>);
                    } else {
                        return (
                            <div className="chart-table-row" key={user.first}>
                                <div className="chart-table-row-name">{user.first} {user.last}</div>
                                <div className="chart-table-row-completed">{user.score}</div>
                            </div>);
                    }
                }, this
            );

            return (
                <div className="chart-table">{mappedData}</div>
            );
        } else {
            return (
                <div className="chart-table">Error</div>
            );
        }
    }


    render() {
        // Need to download react-datetime to format this easily
        // Might also need to work on pushing to database to determine if new entries need to be made

        return (
            <div className="home">
                <div className="left-panel">
                    <div className="date">{this.state.month}</div>
                    <div className="chart">
                        <div className="chart-header">
                            <div className="chart-header-names">Names</div>
                            <div className="chart-header-completed">Scores</div>
                        </div>
                    </div>
                    {this.renderTable()}
                </div>
            </div>
        );
    }
}

export default Leaderboard