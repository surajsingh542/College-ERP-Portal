const bcrypt = require("bcryptjs");
const Mark = require("../../model/Marks");
const Student = require("../../model/Student");
const AppErr = require("../../utils/AppErr");
const generateToken = require("../../utils/generateToken");

// Login
const studentLoginCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppErr("All fields are compulsory", 400));
    }

    const studentFound = await Student.findOne({ email });
    if (!studentFound) {
      return next(new AppErr("Invalid Login Credentials.", 400));
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      studentFound.password
    );
    if (!isPasswordMatch) {
      return next(new AppErr("Invalid Login Credentials.", 400));
    }

    res.json({
      status: "success",
      loginType: studentFound.loginType,
      fullname: studentFound.fullname,
      id: studentFound._id,
      token: generateToken(studentFound._id),
    });
  } catch (error) {
    res.json(error);
  }
};

// update password
const updatePasswordCtrl = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const student = await Student.findByIdAndUpdate(
      req.user,
      { password: hashedPassword },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      data: student,
    });
  } catch (error) {
    res.json(error);
  }
};

// update student profile
const updateProfileCtrl = async (req, res, next) => {
  try {
    const { email } = req.body;
    const studentFound = await Student.findOne({ email });
    if (studentFound) {
      return next(new AppErr("Email is already taken.", 400));
    }
    const student = await Student.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "success",
      data: student,
    });
  } catch (error) {
    res.json(error);
  }
};

// get student profile
const getStudentProfileCtrl = async (req, res) => {
  try {
    const studentFound = await Student.findById(req.user);
    res.json({
      status: "success",
      data: studentFound,
    });
  } catch (error) {
    res.json(error);
  }
};

// get marks
const getMarksCtrl = async (req, res) => {
  try {
    const marks = await Student.findById(req.user).populate("marks");
    res.json({
      status: "success",
      data: marks,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  studentLoginCtrl,
  updatePasswordCtrl,
  updateProfileCtrl,
  getStudentProfileCtrl,
  getMarksCtrl,
};
