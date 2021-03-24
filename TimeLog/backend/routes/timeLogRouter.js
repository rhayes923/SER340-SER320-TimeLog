var express = require("express");
var timeLogRouter = express.Router();

const mongoose = require("mongoose");
const timeLog = require("../models/accounts");

timeLogRouter.route("/").get((req, res, next) => {});

timeLogRouter
  .route("/:userid")
  .get((req, res, next) => {})
  .post((req, res, next) => {});

timeLogRouter
  .route("/:userid/courses")
  .get((req, res, next) => {})
  .post((req, res, next) => {});

timeLogRouter
  .route("/:userid/courses/:courseid/lessons")
  .get((req, res, next) => {})
  .post((req, res, next) => {});

timeLogRouter
  .route("/:userid/courses/:courseid/lessons/:lessonid/timelog")
  .get((req, res, next) => {})
  .post((req, res, next) => {})
  .put((req, res, next) => {});

module.exports = timeLogRouter;
