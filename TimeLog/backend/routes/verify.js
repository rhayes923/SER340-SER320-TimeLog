const jwt = require("jsonwebtoken");
const config = require("../config");

exports.getToken = (user) => {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 1800, //30 minutes
  });
};

exports.verifyStudent = (req, res, next) => {
  var token =
    req.body.taken || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        var err = new Error("User not authenticated");
        err.status = 401;
        return next(err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    var err = new Error("No token found");
    err.status = 403;
    return next(err);
  }
  console.log("User verified");
};

exports.verifyFaculty = () => {
  console.log(req.decoded);
  if (req.decoded._doc.type == "FACULTY") {
    console.log("Faculty Verified");
    next();
  } else {
    var err = new Error("You are not authorized");
    err.status = 403;
    return next(err);
  }
};
