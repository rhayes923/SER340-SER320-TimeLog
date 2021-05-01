const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeLogSchema = new Schema(
  {
    minutes: {
      type: String,
      required: true,
    },
    course: {
      type: String,
    },
  },
  { timestamps: true }
);

const TimeLog = mongoose.model("TimeLog", timeLogSchema);

module.exports = TimeLog;
