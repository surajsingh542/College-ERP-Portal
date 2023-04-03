const mongoose = require("mongoose");

// Admin Schema
const adminSchema = new mongoose.Schema(
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
    gender: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: Number,
      unique: true,
      required: true,
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
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
