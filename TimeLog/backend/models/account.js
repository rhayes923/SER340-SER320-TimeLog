const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = import("./course");
const Course = mongoose.model("Course", courseSchema);

const accountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["STUDENT", "FACULTY"],
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

module.exports = accountSchema;
