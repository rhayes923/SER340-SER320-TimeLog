const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeLogSchema = new Schema(
    {
      minutes: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  );

  module.exports = timeLogSchema;
