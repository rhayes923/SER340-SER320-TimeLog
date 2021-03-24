const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const lessonSchema = import('./lesson');
const Lesson = mongoose.model("Lesson", courseSchema);


const courseSchema = new Schema({
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




  module.exports = courseSchema;