/*
 * Returns array of all students with array of homework done for each month
 */
export function getAllStudentsCompletedHomework(students) {
    let soln = [];
    let temp = objectToArray(students);
    for (let i = 0; i < temp.length; i++) {
        let student = temp[i].value;
        soln.push(getStudentsCompletedHomework(student));
    }

    return soln;
}

/*
 * Returns student object with array of days that indicate (true/ false)
 * if a student has done the work for each day of the month
 */
export function getStudentsCompletedHomework(student) {
    let soln = [];
    let month = getMonth();
    let date = getYear() + "-" + getMonth();
    let pointsArr = objectToArray(student.points[date]);
    let keys = Object.keys(student.points[date]);
    let max = 31;

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
 * Returns array of all students' total points for the passed in month/ year;
 * Sorted by descending totalPoints
 */
export function getAllStudentsLeaderboard(students) {
    let soln = [];
    let temp = objectToArray(students);
    for (let i = 0; i < temp.length; i++) {
        let student = temp[i].value;
        soln.push(getStudentLeaderboardData(student));
    }

    soln.sort(function (a, b) {
        return b.totalPoints - a.totalPoints;
    });

    return soln;
}

/*
 * Returns student object with name, level, and totalPoints for the month/year
 */
export function getStudentLeaderboardData(student) {
    if (student == null) return;
    let date = getYear() + "-" + getMonth();

    return {
        name: student.first + " " + student.last,
        volunteering: student.completedVolunteering,
        homework: student.points[date].completedHomework,
        totalPoints: student.totalPoints
    };
}

/*
 * Returns array of all students with completed homework each month
 */
export function getAllStudentsHomeworkPerMonth(students) {
    let soln = [];
    let temp = objectToArray(students);
    for (let i = 0; i < temp.length; i++) {
        let student = temp[i].value;
        soln.push(getStudentHomeworkPerMonth(student));
    }

    return soln;
}

/*
 * Return number of completed homework each month for a student
 */
export function getStudentHomeworkPerMonth(student) {
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
 * Returns the year as last two (e.g. 17)
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
 * Returns the month name (e.g. March)
 */
export function getCurrentMonthName() {
    return monthNames[getMonth() - 1];
}

/*
 * Returns the month name based on index
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
