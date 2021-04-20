var express = require("express");
var bodyParser = require("body-parser");
var timeLogRouter = express.Router();

const mongoose = require("mongoose");
const account = require("../models/account");
const course = require("../models/course");
const lesson = require("../models/lesson");
const timeLog = require("../models/timeLog");
const { populate } = require("../models/account");
const verify = require("./verify");

timeLogRouter
  .route("/")
  // Find all users
  .get(verify.verifyStudent, verify.verifyFaculty, (req, res, next) => {
    account.find({}, (err, users) => {
      if (err) throw err;
      res.json(users);
    });
  })
  // Add a new user
  .post(verify.verifyStudent, verify.verifyFaculty, (req, res, next) => {
    account.create(req.body, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  });

timeLogRouter
  .route("/:userid")
  .get(verify.verifyStudent, verify.verifyFaculty, (req, res, next) => {
    //Find a user by id
    account.findById(req.params.userid, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  });

timeLogRouter
  .route("/:userid/courses")
  //Get all courses for a user
  .get(verify.verifyStudent, (req, res, next) => {
    account
      .findById(req.params.userid, (err, user) => {
        if (err) throw err;
        return user;
      })
      .populate("courses")
      .exec((err, user) => {
        if (err) throw err;
        res.json(user.courses);
      });
  })
  //Add a new course for a user
  .post(verify.verifyStudent, verify.verifyFaculty, (req, res, next) => {
    account
      .findById(req.params.userid, (err, user) => {
        if (err) throw err;
        return user;
      })
      .populate("courses")
      .exec((err, user) => {
        if (err) throw err;
        //Check if course already exists globally in the system
        course.findOne(
          { courseCode: req.body.courseCode },
          (err, existingCourse) => {
            if (err) throw err;
            //Course exists, add to the user
            if (existingCourse != undefined) {
              user.courses.push(existingCourse);
              user.save((err, user) => {
                if (err) throw err;
                res.json(existingCourse);
              });
              //Course does not exist, create a new course and then add to the user
            } else {
              course.create(req.body, (err, course) => {
                if (err) throw err;
                user.courses.push(course);
                user.save((err, user) => {
                  if (err) throw err;
                  res.json(course);
                });
              });
            }
          }
        );
      });
  });

timeLogRouter
  .route("/courses/:courseid/lessons")
  //Create a new lesson for a course
  .post(verify.verifyFaculty, (req, res, next) => {
    course
      .findById(req.params.courseid, (err, course) => {
        if (err) throw err;
        return course;
      })
      .populate("lessons")
      .exec((err, course) => {
        if (err) throw err;
        lesson.create(req.body, (err, lesson) => {
          if (err) throw err;
          course.lessons.push(lesson);
          course.save((err, course) => {
            if (err) throw err;
            res.json(lesson);
          });
        });
      });
  });

timeLogRouter
  //Get all timelogs for a specific user in a specific course
  //For students only

  .route("/:userid/courses/:courseid/lessonsTimelogs")
  .get(verify.verifyStudent, (req, res, next) => {
    account
      .findById(req.params.userid, (err, user) => {
        if (err) throw err;
        return user;
      })
      .populate("courses")
      .exec((err, user) => {
        if (err) throw err;
        course
          .findById(req.params.courseid, (err, course) => {
            if (err) throw err;
            return course;
          })
          .populate({ path: "lessons", populate: { path: "timeLogs" } })
          .exec((err, course) => {
            if (err) throw err;
            res.json(course.lessons);
          });
      });
  });

timeLogRouter
  .route("/:userid/courses/:courseid/lessons/:lessonid/lessonsTimelogs")
  //Create a new timelog for a lesson
  //For students only
  .post(verify.verifyStudent, (req, res, next) => {
    account
      .findById(req.params.userid, (err, user) => {
        if (err) throw err;
        return user;
      })
      .populate("courses")
      .exec((err, user) => {
        if (err) throw err;
        course
          .findById(req.params.courseid, (err, course) => {
            if (err) throw err;
            return course;
          })
          .populate("lessons")
          .exec((err, course) => {
            if (err) throw err;
            lesson
              .findById(req.params.lessonid, (err, lesson) => {
                if (err) throw err;
                return lesson;
              })
              .populate("timeLogs")
              .exec((err, lesson) => {
                if (err) throw err;
                timeLog.create(req.body, (err, timeLog) => {
                  if (err) throw err;
                  lesson.timeLogs.push(timeLog);
                  lesson.save((err, lesson) => {
                    if (err) throw err;
                    res.json(timeLog);
                  });
                });
              });
          });
      });
  });

timeLogRouter
  .route("/:userid/courses/:courseid/lessonsTimelogs/:timelogid")
  //Update an existing timelog
  //For students only
  .put(verify.verifyStudent, (req, res, next) => {
    account
      .findById(req.params.userid, (err, user) => {
        if (err) throw err;
        return user;
      })
      .populate("courses")
      .exec((err, user) => {
        if (err) throw err;
        course
          .findById(req.params.courseid, (err, course) => {
            if (err) throw err;
            return course;
          })
          .populate("lessons")
          .exec((err, course) => {
            if (err) throw err;
            lesson
              .find({}, (err, lessons) => {
                if (err) throw err;
                return lessons;
              })
              .populate("timeLogs")
              .exec((err, lesson) => {
                if (err) throw err;
                timeLog.findByIdAndUpdate(
                  req.params.timelogid,
                  { $set: req.body },
                  { new: true },
                  (err, timeLog) => {
                    if (err) throw err;
                    res.json(timeLog);
                  }
                );
              });
          });
      });
  });

timeLogRouter
  .route("/courses/:courseid/lessonsTimelogs")
  //Get all timelogs for a course
  //For faculty only
  .get(verify.verifyFaculty, (req, res, next) => {
    course
      .findById(req.params.courseid, (err, course) => {
        if (err) throw err;
        return course;
      })
      .populate({ path: "lessons", populate: { path: "timeLogs" } })
      .exec((err, course) => {
        if (err) throw err;
        res.json(course.lessons);
      });
  });

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({
    status: "Bye!",
  });
});

module.exports = timeLogRouter;
