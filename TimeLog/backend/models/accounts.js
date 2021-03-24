var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var accountSchema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

var courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
});

var lessonSchema = new Schema({
  lessonNumber: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Lecture",
      "Homework",
      "Exam",
      "Design Project",
      "Lesson Preparation",
      "Other",
    ],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeLogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "TimeLog",
    },
  ],
});

var timeLogSchema = new Schema(
  {
    minutes: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

var account = mongoose.model("Account", accountSchema);
var course = mongoose.model("Course", courseSchema);
var lesson = mongoose.model("Lesson", lessonSchema);
var timeLog = mongoose.model("TimeLog", timeLogSchema);

module.exports = {
  account: account,
  course: course,
  lesson: lesson,
  timeLog: timeLog,
};
