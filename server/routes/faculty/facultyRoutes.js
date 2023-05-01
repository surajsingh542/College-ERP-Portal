const express = require("express");
const multer = require("multer");
const { storage } = require("../../config/cloudinary");
const {
  facultyLoginCtrl,
  getFacultyProfile,
  updateProfileCtrl,
  uploadProfilePhotoCtrl,
  getFacultySubjects,
  markAttendanceCtrl,
  uploadMarksCtrl,
  updatePasswordCtrl,
  getStudentsCtrl,
} = require("../../controllers/faculty/facultyCtrl");
const isLogin = require("../../middlewares/isLogin");
const facultyRoutes = express.Router();

// instance of multer
const upload = multer({ storage });

// ====================== API

// POST/api/v1/faculty/login
facultyRoutes.post("/login", facultyLoginCtrl);

// GET/api/v1/faculty/profile
facultyRoutes.get("/profile", isLogin, getFacultyProfile);

// GET/api/v1/faculty/assigned-subjects
facultyRoutes.get("/assigned-subjects", isLogin, getFacultySubjects);

// GET/api/v1/faculty/students
facultyRoutes.get("/students", isLogin, getStudentsCtrl);

// PUT/api/v1/faculty/profile
facultyRoutes.put("/profile", isLogin, updateProfileCtrl);

// PUT /api/v1/faculty/profile-photo-upload
facultyRoutes.put(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile_img"),
  uploadProfilePhotoCtrl
);

// POST/api/v1/faculty/attendance
facultyRoutes.post("/attendance", isLogin, markAttendanceCtrl);

// POST/api/v1/faculty/marks
facultyRoutes.post("/marks", isLogin, uploadMarksCtrl);

// PUT/api/v1/faculty/password
facultyRoutes.put("/password", isLogin, updatePasswordCtrl);

module.exports = facultyRoutes;
