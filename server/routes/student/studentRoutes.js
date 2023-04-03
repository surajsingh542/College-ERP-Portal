const express = require("express");
const {
  studentLoginCtrl,
  updatePasswordCtrl,
  updateProfileCtrl,
  getStudentProfileCtrl,
  getMarksCtrl,
} = require("../../controllers/student/studentCtrl");
const studentRoutes = express.Router();
const isLogin = require("../../middlewares/isLogin");

// POST/api/v1/student/login
studentRoutes.post("/login", studentLoginCtrl);

// PUT/api/v1/student/password
studentRoutes.put("/password", isLogin, updatePasswordCtrl);

// PUT/api/v1/student/profile
studentRoutes.put("/profile", isLogin, updateProfileCtrl);

// GET/api/v1/student/profile
studentRoutes.get("/profile", isLogin, getStudentProfileCtrl);

// GET/api/v1/student/marks
studentRoutes.get("/marks", isLogin, getMarksCtrl);

module.exports = studentRoutes;
