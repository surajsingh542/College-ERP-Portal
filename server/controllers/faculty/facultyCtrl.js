const bcrypt = require("bcryptjs");
const Faculty = require("../../model/Faculty");
const Student = require("../../model/Student");
const AppErr = require("../../utils/AppErr");
const generateToken = require("../../utils/generateToken");
const Mark = require("../../model/Marks");
const Subject = require("../../model/Subject");
const { cloudinary } = require("../../config/cloudinary");

// Fcaulty Login
const facultyLoginCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppErr("All fields are compulsory.", 400));
    }

    const facultyFound = await Faculty.findOne({ email });
    if (!facultyFound) {
      return next(new AppErr("Invalid Login Credentials.", 400));
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      facultyFound.password
    );
    if (!isPasswordMatch) {
      return next(new AppErr("Invalid Login Credentials.", 400));
    }

    res.json({
      status: "success",
      fullname: facultyFound.fullname,
      id: facultyFound._id,
      token: generateToken(facultyFound._id),
    });
  } catch (error) {
    res.json(error);
  }
};

// faculty profile
const getFacultyProfile = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user);
    res.json({
      status: "success",
      data: faculty,
    });
  } catch (error) {
    res.json(error);
  }
};

// update profile
const updateProfileCtrl = async (req, res, next) => {
  try {
    const { email } = req.body;
    const facultyFound = await Faculty.findOne({ email });
    if (facultyFound) {
      return next(new AppErr("Email is already taken.", 400));
    }

    const faculty = await Faculty.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      status: "success",
      data: faculty,
    });
  } catch (error) {
    res.json(error);
  }
};

// upload profile photo
const uploadProfilePhotoCtrl = async (req, res, next) => {
  try {
    // check if file exists
    if (!req.file) {
      return next(new AppErr("Please upload Image", 403));
    }
    // 1. find the faculty to be updated
    const facultyFound = await Faculty.findById(req.user);
    // 2. check if faculty is found
    if (!facultyFound) {
      return next(new AppErr("Faculty not found", 403));
    }

    // 3. check if profile image exists
    if (facultyFound.profileImage) {
      await cloudinary.uploader.destroy(
        facultyFound.profileImage.cloudinary_id
      );
    }

    // 4. Update profile photo
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.user,
      {
        profileImage: {
          profile_img: req.file.path,
          cloudinary_id: req.file.filename,
        },
      },
      {
        new: true,
      }
    );

    res.json({
      status: "success",
      url: updatedFaculty.profileImage.profile_img,
      cloudinary_id: updatedFaculty.profileImage.cloudinary_id,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// mark attendance
const markAttendanceCtrl = async (req, res) => {
  try {
    const { subject, department } = req.body;
    const students = await Student.find({ department });
    res.json({
      status: "success",
      data: students,
    });
  } catch (error) {
    res.json(error);
  }
};

// upload marks
const uploadMarksCtrl = async (req, res, next) => {
  try {
    const {
      student,
      subject,
      exam,
      marksObtained,
      totalMarks,
      department,
      year,
    } = req.body;
    const facultyFound = await Faculty.findById(req.user);
    if (!facultyFound) {
      return next(new AppErr("Faculty not found", 404));
    }

    const studentFound = await Student.findOne({ student });
    if (!studentFound) {
      return next(new AppErr("Student not found", 404));
    }

    const subjectFound = await Subject.findOne({ subject });
    if (!subjectFound) {
      return next(new AppErr("Subject not found", 400));
    }

    const marks = await Mark.create({
      subject: subjectFound._id,
      exam,
      marksObtained,
      totalMarks,
      department,
      year,
      uploadedBy: req.user,
    });

    studentFound.marks.push(marks._id);
    await studentFound.save();

    res.json({
      status: "success",
      data: marks,
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
    const facultyFound = await Faculty.findByIdAndUpdate(
      req.user,
      { password: hashedPassword },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({
      status: "success",
      data: facultyFound,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  facultyLoginCtrl,
  getFacultyProfile,
  updateProfileCtrl,
  uploadProfilePhotoCtrl,
  markAttendanceCtrl,
  uploadMarksCtrl,
  updatePasswordCtrl,
};
