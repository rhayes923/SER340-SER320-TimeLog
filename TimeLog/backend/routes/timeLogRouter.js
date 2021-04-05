var express = require("express");
var bodyParser = require("body-parser");
var timeLogRouter = express.Router();

const mongoose = require("mongoose");
const account = require("../models/account");
const course = require("../models/course");
const lesson = require("../models/lesson");
const timeLog = require("../models/timeLog");
const { populate } = require("../models/account");

timeLogRouter
  .route("/")
  // Find all users
  .get((req, res, next) => {
    account.find({}, (err, users) => {
      if (err) throw err;
      res.json(users);
    });
  })
  // Add a new user
  .post((req, res, next) => {
    account.create(req.body, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  });

timeLogRouter.route("/:userid").get((req, res, next) => {
  //Find a user by id
  account.findById(req.params.userid, (err, user) => {
    if (err) throw err;
    res.json(user);
  });
});

timeLogRouter
  .route("/:userid/courses")
  //Get all courses for a user
  .get((req, res, next) => {
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
  .post((req, res, next) => {
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
  .route("/:userid/courses/:courseid/lessons")
  //Get all lessons for a course
  .get((req, res, next) => {
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
            res.json(course.lessons);
          });
      });
  })
  //Create a new lesson for a course
  .post((req, res, next) => {
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
  });

timeLogRouter
  .route("/:userid/courses/:courseid/lessons/:lessonid/timelog")
  //Find all timelogs for a lesson
  .get((req, res, next) => {
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
                res.json(lesson.timeLogs);
              });
          });
      });
  })
  //Create a new timelog for a lesson
  .post((req, res, next) => {
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
  .route("/:userid/courses/:courseid/lessons/:lessonid/timelog/:timelogid")
  //Update an existing timelog
  .put((req, res, next) => {
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

module.exports = timeLogRouter;
