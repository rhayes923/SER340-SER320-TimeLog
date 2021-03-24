var express = require("express");
var timeLogRouter = express.Router();

const mongoose = require("mongoose");
const timeLog = require("../models/accounts");

timeLogRouter
  .route("/")
  .all((req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    next();
  })
  .get((req, res, next) => {});

timeLogRouter
  .route("/:account")
  .get((req, res, next) => {})
  .post((req, res, next) => {})
  .put((req, res, next) => {})
  .delete((req, res, next) => {});

timeLogRouter
  .route("/:account/:course")
  .get((req, res, next) => {})
  .post((req, res, next) => {})
  .put((req, res, next) => {})
  .delete((req, res, next) => {});

timeLogRouter
  .route("/:account/:course/:lesson/")
  .get((req, res, next) => {})
  .post((req, res, next) => {})
  .put((req, res, next) => {})
  .delete((req, res, next) => {});

timeLogRouter
  .route("/:account/:course/:lesson/:timelog")
  .get((req, res, next) => {})
  .post((req, res, next) => {})
  .put((req, res, next) => {})
  .delete((req, res, next) => {});

module.exports = timeLogRouter;
