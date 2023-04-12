const mongoose = require("mongoose");

// Student Schema
const studentSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: Object,
    },
    dob: {
      type: Date,
    },
    registrationNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    marks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mark",
      },
    ],
    attendance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
      },
    ],
    fatherName: {
      type: String,
    },
    aadharCard: {
      type: Number,
    },
    batch: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// model
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
