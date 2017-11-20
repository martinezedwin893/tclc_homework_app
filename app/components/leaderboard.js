import React, {Component} from 'react';

import {getAllStudentsLeaderboard} from './firebase.js';

class Leaderboard extends Component {
  mixins: [ReactFireMixin];

  constructor(props, context) {
    super(props);
    this.context = context;

    this.state = {
      students: {}
    };
  }

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
      state: 'students'
    });
  }

  /* Renders table with ordered leaderboard */
  renderTable() {
    let leaderboardData = getAllStudentsLeaderboard(this.state.students);
    let leaderboardHtmlContent = [];
    let leaderboardHtmlTopFive = [];
    let leaderboardHtml;

    // Separates top 5 students
    for (let i = 0; i < leaderboardData.length; i++) {
      let student = leaderboardData[i];
      if (i < 5) {
        while (i < 5 && leaderboardData[i]) {
          leaderboardHtml = (
            this.renderChartRow(student, i)
          );
          leaderboardHtmlTopFive.push(leaderboardHtml);

          i++;
          student = leaderboardData[i];
        }

        // Necessary to get the 6th element
        i--;

        leaderboardHtml = (
          <div className="topFive" id="topFive" key="topFive">{leaderboardHtmlTopFive}</div>
        );

      } else {
        leaderboardHtml = this.renderChartRow(student, i);
      }

      leaderboardHtmlContent.push(leaderboardHtml);
    }

    return (
      <div className="chart-table">{leaderboardHtmlContent}</div>
    );
  }

  renderChartRow(student, index) {

    // Odd columns (grey)
    if (index % 2 == 0) {
      return (
        <div className="chart-table-row isGray" key={index} id={index}>
        <div className="chart-table-row-rank">{index + 1}</div>
        <div className="chart-table-row-name">{student.name}</div>
        <div className="chart-table-row-hw">{student.homework}</div>
        <div className="chart-table-row-volunteering">{student.volunteering}</div>
        <div className="chart-table-row-total">{student.totalPoints}</div>
        </div>
      );

    // Even columns (white)
    } else {
      return (
        <div className="chart-table-row" key={index} id={index}>
        <div className="chart-table-row-rank">{index + 1}</div>
        <div className="chart-table-row-name">{student.name}</div>
        <div className="chart-table-row-hw">{student.homework}</div>
        <div className="chart-table-row-volunteering">{student.volunteering}</div>
        <div className="chart-table-row-total">{student.totalPoints}</div>
        </div>
      );
    }
  }

  render() {
    // Header for the table
    return (
      <div className="leaderboard">
      <div className="chart">
      <h2 className="date">Leaderboard</h2>

      <div className="chart-header">
      <div className="chart-header-rank"><b>Rank</b></div>
      <div className="chart-header-name"><b>Name</b></div>
      <div className="chart-header-homework"><b>Homework</b></div>
      <div className="chart-header-volunteering"><b>Volunteering</b></div>
      <div className="chart-header-total"><b>Total Points</b></div>
      </div>
      {this.renderTable()}
      </div>
      </div>
    )
  }
}

export default Leaderboard
