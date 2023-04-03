const express = require("express");
const {
  addAdminCtrl,
  adminLoginCtrl,
  addFacultyCtrl,
  addStudentCtrl,
  addSubjectCtrl,
  adminProfileCtrl,
  updateProfileCtrl,
  updatePasswordCtrl,
  getFacultiesCtrl,
  getStudentsCtrl,
  getSubjectsCtrl,
} = require("../../controllers/admin/adminCtrl");
const isLogin = require("../../middlewares/isLogin");
const adminRoutes = express.Router();

// POST/api/v1/admin/login
adminRoutes.post("/login", adminLoginCtrl);

// POST/api/v1/admin
adminRoutes.post("/", isLogin, addAdminCtrl);

// POST/api/v1/admin/faculty
adminRoutes.post("/faculty", isLogin, addFacultyCtrl);

// POST/api/v1/admin/student
adminRoutes.post("/student", isLogin, addStudentCtrl);

// POST/api/v1/admin/subject
adminRoutes.post("/subject", isLogin, addSubjectCtrl);

// GET/api/v1/admin/profile
adminRoutes.get("/profile", isLogin, adminProfileCtrl);

// UPDATE/api/v1/admin/profile
adminRoutes.put("/profile", isLogin, updateProfileCtrl);

// UPDATE/api/v1/admin/password
adminRoutes.put("/password", isLogin, updatePasswordCtrl);

// GET/api/v1/admin/faculties
adminRoutes.get("/faculties", isLogin, getFacultiesCtrl);

// GET/api/v1/admin/students
adminRoutes.get("/students", isLogin, getStudentsCtrl);

// GET/api/v1/admin/subject
adminRoutes.get("/subjects", isLogin, getSubjectsCtrl);

module.exports = adminRoutes;
