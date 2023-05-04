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
const isAdmin = require("../../middlewares/isAdmin");
const adminRoutes = express.Router();

// POST/api/v1/admin/login
adminRoutes.post("/login", adminLoginCtrl);

// POST/api/v1/admin
adminRoutes.post("/", isLogin, isAdmin, addAdminCtrl);

// POST/api/v1/admin/faculty
adminRoutes.post("/faculty", isLogin, isAdmin, addFacultyCtrl);

// POST/api/v1/admin/student
adminRoutes.post("/student", isLogin, isAdmin, addStudentCtrl);

// POST/api/v1/admin/subject
adminRoutes.post("/subject", isLogin, isAdmin, addSubjectCtrl);

// GET/api/v1/admin/profile
adminRoutes.get("/profile", isLogin, isAdmin, adminProfileCtrl);

// UPDATE/api/v1/admin/profile
adminRoutes.put("/profile", isLogin, isAdmin, updateProfileCtrl);

// UPDATE/api/v1/admin/password
adminRoutes.put("/password", isLogin, isAdmin, updatePasswordCtrl);

// GET/api/v1/admin/faculties
adminRoutes.get("/faculties", isLogin, isAdmin, getFacultiesCtrl);

// GET/api/v1/admin/students
adminRoutes.get("/students", isLogin, isAdmin, getStudentsCtrl);

// GET/api/v1/admin/subject
adminRoutes.get("/subjects", isLogin, isAdmin, getSubjectsCtrl);

module.exports = adminRoutes;
