/*** DONE ***/
// Returns array of days that indicate (true/ false) if a student has done the work for each day of the month
export function getStudentsCompletedHomework(student, month, year) {
    let soln = [];
    let date = year + "-" + month;
    let pointsArr = objectToArray(student.points[date]); // TODO: Need to attach this method
    let keys = Object.keys(student.points[date]);

    for (let i = 0, j = 0; i < 31 && j < keys.length; i++, j++) {
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

/*** DONE ***/
// Returns array of all students with array of homework done for each month
export function getAllStudentsCompletedHomework(students, month, year) {
    let soln = [];
    let date = year + "-" + month;

    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        soln.push(this.getStudentsCompletedHomework(student, month, year));
    }

    return soln;
}

/*** DONE ***/
// Returns array of all students' total points for the passed in month/ year; Sorted by totalPoints
export function getAllStudentsLeaderboard(students, month, year) {
    if (students.length < 0) return;

    let soln = [];
    let date = year + "-" + month;

    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        soln.push(singleton.getStudentLeaderboardData(student, month, year));
    }

    soln.sort(function (a, b) { // TODO: Check if value is string or int
        return a.totalPoints - b.totalPoints;
    });

    return soln;
}

/*** DONE ***/
export function getStudentLeaderboardData(student, month, year) {
    if (student == null) return;

    let date = year + "-" + month;
    return {
        name: student.first + " " + student.last,
        level: student.level,
        totalPoints: student.points[date].totalPoints
    };
}

/*** DONE ***/
// Returns array of all students with completed homework each month
export function getAllStudentsHomeworkPerMonth(students, year) {
    let soln = [];

    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        soln.push(singleton.getStudentHomeworkPerMonth(student, year));
    }

    return soln;
}

/*** DONE ***/
// Return number of completed homework each month for a student
export function getStudentHomeworkPerMonth(student, year) {
    if (student == null || student.points == null) return;

    let soln = [];
    student.points = this.objectToArray(student.points);

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

/*** DONE ***/
export function validateLoginAll(students, username, password) {
    for (let i = 0; i < students.length; i++) {
        if (this.validateLogin(students[i], username, password)) {
            return true;
        }
    }

    return false;
}

/*** DONE ***/
export function validateLogin(student, username, password) {
    return student != null && student.username == username && student.password == password;
}

/*** DONE ***/
function objectToArray(object) {
    if (object == null) return;

    let keys = Object.keys(object);
    let soln = [];

    for (let i = 0; i < keys.length; i++) {
        soln.push({
            key : keys[i],
            value : object[keys[i]]
        });
    }
    return soln;
}

//FirebaseGetUtils
/*
 ===========================


 /** NEED TO DO USERNAME + PASSWORD **/ /*

 - return array of users that contains
 => first, last
 => array of size 0 = current day that has true/false whether or not the student has done work for each day of the month

 return array of users that contains:
 => first+last
 => level
 => totalpoints (sorted by totalPoints?)

 return array of users that contains:
 => first + last
 => array of completed homework for the user for each month [December : 1, January : 2, March : 3]

 return array of users that contains:
 => first + last
 => number of homework completed per month [December : 2, January 5, March : 4]
 */


// FirebasePostUtils
/*
 post to /{username}/{points}/{YY-M}/{D}
 => V : points
 => HW : points
 ================== get /completedHomework/{YY-MM} and update by 1



 */


/**
 - Seems like firebase sends data one at a time; might not need "grab all" unless we're using "once"
 - Need to convert objects into array



 **/