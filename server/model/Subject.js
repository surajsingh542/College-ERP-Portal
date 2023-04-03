const mongoose = require("mongoose");

// Subject Schema
const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
    },
    subjectCode: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    lectureGivenOn: [Date],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// model
const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
