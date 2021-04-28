var express = require("express");
var bodyParser = require("body-parser");
var timeLogRouter = express.Router();

const mongoose = require("mongoose");
const Account = require("../models/account");
const course = require("../models/course");
const lesson = require("../models/lesson");
const timeLog = require("../models/timeLog");
const { populate } = require("../models/account");
const verify = require("./verify");
const passport = require("passport");

timeLogRouter
  .route("/")
  // Find all users
  .get((req, res, next) => {
    Account.find({}, (err, users) => {
      if (err) throw err;
      res.json(users);
    });
  })
  // Create a new user
  .post(async (req, res, next) => {
    Account.register(
      new Account({
        username: req.body.username,
        password: req.body.password,
        userType: req.body.userType,
      }),
      req.body.password,
      (err, user) => {
        if (err) return res.status(500).json({ err: err });
        passport.authenticate("local")(req, res, () => {
          var token = verify.getToken(user);
          return res
            .status(200)
            .header("x-access-token", token)
            .header("access-control-expose-headers", "x-access-token")
            .json({ status: "Registration Successful" });
        });
      }
    );
  });

timeLogRouter.route("/login").post((req, res, next) => {
  //req.body will have username and password
  passport.authenticate("local", (err, user, info) => {
    console.log(user);
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      console.log("no user");
      return res.status(401).json({ err: info });
    }
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ err: "Could not log in user" });

      console.log("User in users: ", user);

      var token = verify.getToken(user);

      res.status(200);
      res.send({ token: token, userType: user.userType, id: user.id });
    });
  })(req, res, next);
});

timeLogRouter.route("/logout").get((req, res) => {
  req.logout();
  res.status(200).json({
    status: "Bye!",
  });
});

timeLogRouter.route("/:userid").get((req, res, next) => {
  //Find a user by id
  Account.findById(req.params.userid, (err, user) => {
    if (err) throw err;
    res.json(user);
  });
});

timeLogRouter
  .route("/courses")
  //Get all courses
  .get((req, res, next) => {
    console.log(req.body);
    course.findById(req.body.id, (err, courses) => {
      if (err) throw err;
      res.json(courses);
    });
  })
  .post((req, res, next) => {
    course.crçeate(req.body, (err, course) => {
      res.json(course);
    });
  });

timeLogRouter
  .route("/:userid/courses")
  //Get all courses for a user
  .get((req, res, next) => {
    Account.findById(req.params.userid, (err, user) => {
      if (err) throw err;
      return user;
    })
      .populate("courses")
      .exec((err, user) => {
        if (err) throw err;
        res.send(user.courses);
      });
  })
  //Add a new course for a user
  .post((req, res, next) => {
    Account.findById(req.params.userid, (err, user) => {
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
  .post((req, res, next) => {
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
  .get((req, res, next) => {
    Account.findById(req.params.userid, (err, user) => {
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
  .post((req, res, next) => {
    Account.findById(req.params.userid, (err, user) => {
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
  .put((req, res, next) => {
    Account.findById(req.params.userid, (err, user) => {
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
  .get((req, res, next) => {
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

module.exports = timeLogRouter;
