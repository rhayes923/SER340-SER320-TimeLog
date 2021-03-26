const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
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

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
