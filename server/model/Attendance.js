const mongoose = require("mongoose");

// Attendance Schema
const attendanceSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    attendedOn: [Date],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// model
const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
