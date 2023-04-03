const mongoose = require("mongoose");

// Faculty Schema
const facultySchema = new mongoose.Schema(
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
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    subjectsAssigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// model
const Faculty = mongoose.model("Faculty", facultySchema);
module.exports = Faculty;
