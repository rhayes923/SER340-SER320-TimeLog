const mongoose = require("mongoose");
var config = require("./config");

const Course = require('./models/course')
const TimeLog = require('./models/timeLog')
const Account = require('./models/account')
const Lesson = require('./models/lesson')

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
// Connection URL
var uri = `mongodb+srv://${config.database.username}:${config.database.password}@${config.database.host}`;
console.log(uri);

// Connect using mongoose
mongoose
  .connect(uri, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
//open a connection and get a db handler
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

let tLog =[];
let lessons = [];
let courses = [];

let new_log = new TimeLog({
  minutes: 7
});
// new_log.save(function (err) {
//   if (err) return handleError(err);
// });
tLog.push(new_log._id)
new_log = new TimeLog({
  minutes: 14
});
// new_log.save(function (err) {
//   if (err) console.error(err);
//   // saved!
// });
tLog.push(new_log._id)
console.log('Time Logs Created')

let lesson = new Lesson({
        lessonNumber: 7,
        category: "Lecture",
        date: Date.now(),
        timeLogs: tLog
      });
// lesson.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });
console.log('Lesson Created')

lessons.push(lesson._id)
console.log(lessons)

let course = new Course({
  name: "English",
  courseCode: "76780",
  lessons: lessons
});
// course.save(function (err) {
// if (err) console.error(err);
// // saved!
// });
console.log('Course Created')

courses.push(course._id)


let account = new Account({
  email: "email@gmail.com",
  password: "pass",
  userType: "STUDENT",
  courses: [courses]
});
// account.save(function (err) {
// if (err) console.error(err);
// // saved!
// });
console.log('Account Created')


  TimeLog.find({}, (err, logs)=>{  
    if (err) throw err;
    if(logs) {
         console.log("Logs" + logs); 
        } else {
            console.error(err)
        }
  });


  Course.find({}, (err, courses)=>{  
    if (err) throw err;
    if(courses) {
         console.log("Courses" + courses); 
        } else {
            console.error(err)
        }
  });


  Account.find({}, (err, accounts)=>{  
    if (err) throw err;
    if(accounts) {
         console.log("Accounts" + accounts); 
        } else {
            console.error(err)
        }
  });


  Lesson.find({}, (err, lessons)=>{  
    if (err) throw err;
    if(lessons) {
         console.log("Lessons" + lessons); 
        } else {
            console.error(err)
        }
  });





