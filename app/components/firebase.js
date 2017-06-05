/*
 * Returns array of all students
 */
export function getStudentList(students) {
  let studentList = objectToArray(students);
  return studentList;
}


/*
 * Returns the index of the month from a previous number of months back
 * Calculates it by using the mod formula -- mod = ((n % m) + m) % m
 */
export function getPrevMonthIndex( previous ) {
  return (((getMonth() - previous) % 12) + 12) % 12;
}


/*
 * Returns array of all students with array of homework done over all months
 */
export function getAllStudentsCompletedHomework(students) {
    let soln = [];
    let studentList = getStudentList(students);
    for (let i = 0; i < studentList.length; i++) {
        let student = studentList[i].value;
        soln.push( getIndivStudentCompletedHomework(student) );
    }

    return soln;
}


/*
 * Returns student object with array of days that indicate (true / false)
 * if a student has done the work for each day of the month
 */
export function getIndivStudentCompletedHomework(student) {
    let soln = [];

    let date = getYear() + "-" + getMonth();

    let pointsArr = objectToArray(student.points[date]);
    let keys = Object.keys(student.points[date]);
    let max = 31;

    // set max day
    if (month == "2") {
        max = 28;
    } else if (month == "4" || month == "6" || month == "9" || month == "11") {
        max = 30;
    }

    for (let i = 0, j = 0; i < max && j < keys.length; i++, j++) {
        let entry = pointsArr[j];
        let num = entry.key;
        if (!isNaN(num)) {
            if (num == (i + 1)) {
                soln.push(true);
            } else {
                while ((i + 1) < num) {
                    soln.push(false);
                    i++;
                }

                soln.push(true);
            }
        }
    }
    return {
        name: student.first + " " + student.last,
        completedHW: soln
    };
}


/*
 * Returns an array over the span of 6 months containing the total homework
 * and volunteering points of all students per month
 */
export function getAllStudentsPointsPerMonth( students ) {
    let totalPoints = [];
    let studentList = getStudentList(students);
    let totalMonths = 6;
    let totalMonthPoints = 0;

    // get month from 6 months back (0-indexed) and year
    let month = getPrevMonthIndex(totalMonths);
    let year = getYear();

    // iterate through previous 6 months
    for (let currIndex = 0; currIndex < totalMonths; currIndex++) {
      totalMonthPoints = 0;  // reset point count for month

      // determine year
      if ( ((month + 1) >= 12) && (getMonth() - totalMonths < 0) ) {
        year = getYear() - 1;
      } else {
        year = getYear();
      }

      // get date as string
      let date = year + "-" + (month + 1);

      // iterate through list of students
      for (let i = 0; i < studentList.length; i++) {
        let student = studentList[i].value;  // grab student from list

        // check if student has point values for that month or not
        if ( student.points[date] != null ) {

          // get homework points
          if (student.points[date].completedHomework != null) {
            totalMonthPoints += student.points[date].completedHomework;
          }

          // get volunteering points
          if (student.points[date].completedVolunteering != null) {
            totalMonthPoints += student.points[date].completedVolunteering;
          }
        }
      }

      totalPoints.push(totalMonthPoints);

      // determine next month
      month = (month + 1) % 12;
    }

    return totalPoints;
}


/*
 * Similar algorithm for getAllStudentsPointsPerMonth, except for an
 * individual student
 */
export function getIndivPoints( student ) {
  let totalPoints = [];

  let totalMonths = 6;
  let totalMonthPoints = 0;

  // get month from 6 months back (0-indexed) and year
  let month = getPrevMonthIndex(totalMonths);
  let year = getYear();

  // iterate through previous 6 months
  for (let currIndex = 0; currIndex < totalMonths; currIndex++) {
    totalMonthPoints = 0;  // reset point count for month

    // determine year
    if ( ((month + 1) >= 12) && (getMonth() - totalMonths < 0) ) {
      year = getYear() - 1;
    } else {
      year = getYear();
    }

    // get date as string
    let date = year + "-" + (month + 1);

    // check if student has point values for that month or not
    if ( student.points[date] != null ) {

      // get homework points
      if (student.points[date].completedHomework != null) {
        totalMonthPoints += student.points[date].completedHomework;
      }

      // get volunteering points
      if (student.points[date].completedVolunteering != null) {
        totalMonthPoints += student.points[date].completedVolunteering;
      }
    }

    totalPoints.push(totalMonthPoints);

    // determine next month
    month = (month + 1) % 12;
  }

  return totalPoints;
}

















/*
 * Return number of points for completed homework each month for a student
 */
export function getIndivStudentHomeworkPerMonth( student ) {
    if (student == null || student.points == null) return;

    let year = getFourDigitYear();
    let soln = [];
    student.points = objectToArray(student.points);

    for (let i = 0; i < student.points.length; i++) {
        let entry = student.points[i].value;
        if (entry.year == year) {
            let monthHw = {
                month: entry.month,
                completedHomework: entry.completedHomework
            };
            soln.push(monthHw);
        }
    }

    return soln;
}


/*
 * Returns array of all students' total points for the passed in month / year
 * Sorted by descending totalPoints
 */
export function getAllStudentsLeaderboard( students ) {
    let soln = [];
    let studentList = objectToArray(students);
    for (let i = 0; i < studentList.length; i++) {
        let student = studentList[i].value;
        soln.push( getStudentLeaderboardData(student) );
    }

    soln.sort(function (a, b) {
        return b.totalPoints - a.totalPoints;
    });

    return soln;
}

/*
 * Returns student object with name, level, and totalPoints for the month/year
 */
export function getStudentLeaderboardData( student ) {
    if (student == null) return;
    let date = getYear() + "-" + getMonth();

    return {
        name: student.first + " " + student.last,
        volunteering: student.totalVolunteering,
        homework: student.totalHomework,
        totalPoints: student.totalPoints
    };
}


/*
 * Returns boolean if the username and password combination exists
 */
export function validateLoginAll(students, username, password) {
    let temp = objectToArray(students);
    for (let i = 0; i < temp.length; i++) {
        if (validateLogin(temp[i].value, username, password)) {
            return true;
        }
    }

    return false;
}


export function validateLogin(student, username, password) {
    return student != null && student.username == username && student.password == password;
}

/*
 * Returns the year, month, and date in an array in that order
 */
export function getDate() {
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    year = year % 2000;
    return [year, month, date];
}

/*
 * Returns an array of Firebase objects
 */
function objectToArray(object) {
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

/*
 * Returns the year as last two digits (e.g. 17)
 */
export function getYear() {
    return getDate()[0];
}

/*
 * Returns the year as four digits (e.g. 2017)
 */
export function getFourDigitYear() {
    return getYear() + 2000;
}

/*
 * Returns the month number (e.g. March = 3)
 * Returned value will be based on a 1-12 index
 */
export function getMonth() {
    return getDate()[1];
}

/*
 * Array of full month names, indexed from 0 to 11
 */
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

/*
 * Returns the current month name (e.g. March)
 */
export function getCurrentMonthName() {
    return monthNames[getMonth() - 1];
}

/*
 * Returns the month name based on index (indexed from 1-12)
 * The function will subtract by 1 to get the correct offset
 */
export function getMonthName(monthIndex) {
  return monthNames[monthIndex];
}



// FirebasePostUtils
/*
 post to /{username}/{points}/{YY-M}/{D}
 => V : points
 => HW : points
 ================== get /completedHomework/{YY-MM} and update by 1

 */
