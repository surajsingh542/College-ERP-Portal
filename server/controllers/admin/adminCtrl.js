const Admin = require("../../model/Admin");
const bcrypt = require("bcryptjs");
const AppErr = require("../../utils/AppErr");
const generateToken = require("../../utils/generateToken");
const Faculty = require("../../model/Faculty");
const Subject = require("../../model/Subject");
const Student = require("../../model/Student");
// Add admin
const addAdminCtrl = async (req, res, next) => {
  try {
    const {
      fullname,
      email,
      contactNumber,
      password,
      gender,
      registrationNumber,
      profileImage,
      dob,
    } = req.body;
    // check if email already exist
    const adminFound = await Admin.findOne({ email });
    if (adminFound) {
      return next(new AppErr("Admin already exist.", 400));
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create Admin
    const admin = await Admin.create({
      fullname,
      email,
      contactNumber,
      password: hashedPassword,
      gender,
      registrationNumber,
      profileImage,
      dob,
    });

    res.json({
      status: "success",
      fullname: admin.fullname,
      email: admin.email,
      id: admin._id,
    });
  } catch (error) {
    return next(new AppErr(error, 500));
  }
};

// login
const adminLoginCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppErr("All fields are compulsory.", 400));
    }
    // check if email exit
    const adminFound = await Admin.findOne({ email });
    if (!adminFound) {
      return next(new AppErr("Invalid Login Credentials", 400));
    }

    // check for password validity
    const isPasswordMatch = await bcrypt.compare(password, adminFound.password);
    if (!isPasswordMatch) {
      return next(new AppErr("Invalid Login Credentials", 400));
    }

    res.json({
      status: "success",
      fullname: adminFound.fullname,
      id: adminFound._id,
      token: generateToken(adminFound._id),
    });
  } catch (error) {
    return next(new AppErr(error, 500));
  }
};

// add faculty
const addFacultyCtrl = async (req, res, next) => {
  try {
    const {
      fullname,
      email,
      contactNumber,
      password,
      subjectsAssigned,
      dob,
      registrationNumber,
      gender,
      designation,
      department,
    } = req.body;

    if (
      fullname == "" ||
      email == "" ||
      contactNumber == "" ||
      password == "" ||
      subjectsAssigned == "" ||
      dob == "" ||
      registrationNumber == "" ||
      gender == "" ||
      designation == "" ||
      department == ""
    ) {
      return next(new AppErr("All fields are compulsory", 400));
    }

    // check if faculty already exist
    const facultyFound = await Faculty.findOne({ email });
    if (facultyFound) {
      return next(new AppErr("Faculty already exist.", 400));
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create Faculty
    const faculty = await Faculty.create({
      fullname,
      email,
      contactNumber,
      password: hashedPassword,
      subjectsAssigned,
      dob,
      registrationNumber,
      gender,
      designation,
      department,
    });

    res.json({
      status: "success",
      fullname: faculty.fullname,
      email: faculty.email,
      id: faculty._id,
    });
  } catch (error) {
    return next(new AppErr(error, 500));
  }
};

// add student
const addStudentCtrl = async (req, res, next) => {
  try {
    const {
      fullname,
      email,
      contactNumber,
      password,
      profileImage,
      dob,
      registrationNumber,
      gender,
      year,
      department,
      fatherName,
      aadharCard,
      batch,
    } = req.body;
    // check if student already exist
    const studentFound = await Student.findOne({ registrationNumber });
    if (studentFound) {
      return next(new AppErr("Student already exist.", 400));
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create Student
    const student = await Student.create({
      fullname,
      email,
      contactNumber,
      password: hashedPassword,
      profileImage,
      dob,
      registrationNumber,
      gender,
      year,
      department,
      fatherName,
      aadharCard,
      batch,
    });

    res.json({
      status: "success",
      fullname: student.fullname,
      email: student.email,
      id: student._id,
    });
  } catch (error) {
    return next(new AppErr(error, 500));
  }
};

// add subject
const addSubjectCtrl = async (req, res, next) => {
  try {
    // check if subject already exists
    const { subjectCode } = req.body;
    const subFound = await Subject.findOne({ subjectCode });

    if (subFound) {
      return next(new AppErr("Subject already exists", 500));
    }
    const subject = await Subject.create(req.body);
    res.status(200).json({
      status: "success",
      name: subject.subjectName,
      id: subject._id,
    });
  } catch (error) {
    res.json(error);
  }
};

// profile
const adminProfileCtrl = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user);
    res.json({
      status: "success",
      data: admin,
    });
  } catch (error) {
    res.json(error);
  }
};

// update profile
const updateProfileCtrl = async (req, res, next) => {
  try {
    const { email } = req.body;
    // check if email already exists
    const adminFound = await Admin.findOne({ email });
    if (adminFound) {
      return next(new AppErr("Email is already taken.", 500));
    }

    const admin = await Admin.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      status: "success",
      data: admin,
    });
  } catch (error) {
    res.json(error);
  }
};

// update Password
const updatePasswordCtrl = async (req, res) => {
  try {
    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.findByIdAndUpdate(
      req.user,
      { password: hashedPassword },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      data: admin,
    });
  } catch (error) {
    res.json(error);
  }
};

// get faculty
const getFacultiesCtrl = async (req, res) => {
  try {
    const { department } = req.body;
    const faculties = await Faculty.find({ department });
    res.json({
      status: "success",
      data: faculties,
    });
  } catch (error) {
    res.json(error);
  }
};

// get students
const getStudentsCtrl = async (req, res) => {
  try {
    const { department, year } = req.body;
    const students = await Student.find({ department, year });
    res.json({
      status: "success",
      data: students,
    });
  } catch (error) {
    res.json(error);
  }
};

// get subjects
const getSubjectsCtrl = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json({
      status: "success",
      data: subjects,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
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
};
