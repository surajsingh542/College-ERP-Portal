const bcrypt = require("bcryptjs");
const Faculty = require("../../model/Faculty");
const Student = require("../../model/Student");
const AppErr = require("../../utils/AppErr");
const generateToken = require("../../utils/generateToken");
const Mark = require("../../model/Marks");
const Subject = require("../../model/Subject");
const { cloudinary } = require("../../config/cloudinary");
const Attendance = require("../../model/Attendance");

// Faculty Login
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
      loginType: facultyFound.loginType,
      fullname: facultyFound.fullname,
      id: facultyFound._id,
      token: generateToken(facultyFound._id),
    });
  } catch (error) {
    res.json(error);
  }
};

// faculty profile
const getFacultyProfile = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.user);
    if (!faculty) {
      return next(new AppErr("Invalid User Login", 403));
    }
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

// faculty assigned subjects
const getFacultySubjects = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.user);
    if (!faculty) {
      return next(new AppErr("Invalid User Login", 403));
    }
    const subjects = await Subject.find({ assignedTo: req.user });
    res.json({
      status: "success",
      data: subjects,
    });
  } catch (error) {
    res.json(error);
  }
};

// mark attendance
const markAttendanceCtrl = async (req, res) => {
  try {
    // console.log(req.body);

    const { presentStudents, department, semester, subjectCode } = req.body;
    const subjectFound = await Subject.findOne({ subjectCode });
    const facultyFound = await Faculty.findById(req.user);
    // subject not found error

    // mark faculty attendance
    const facultyAttendance = await Attendance.findOne({
      userID: req.user,
      subject: subjectFound._id,
    });
    console.log("Attendace", facultyAttendance);
    const lectureDate = new Date();
    if (facultyAttendance) {
      const updatedAttendace = await Attendance.findByIdAndUpdate(
        facultyAttendance._id,
        { $push: { attendedOn: lectureDate } },
        { new: true }
      );
      console.log("Updated Attendance", updatedAttendace);
    } else {
      const attendanceCreated = await Attendance.create({
        subject: subjectFound._id,
        userID: req.user,
        attendedOn: lectureDate,
      });
      console.log(attendanceCreated);
      facultyFound.attendance.push(attendanceCreated);
      await facultyFound.save();
      console.log(facultyFound);
    }

    // mark student attendance
    presentStudents
      .filter((registrationNumber) => {
        return registrationNumber !== false;
      })
      .forEach(async (regNumber) => {
        const studentFound = await Student.findOne({
          registrationNumber: regNumber,
        });
        console.log("Student", studentFound);
        // student not found error

        const studentAttendance = await Attendance.findOne({
          userID: studentFound._id,
          subject: subjectFound._id,
        });
        console.log("Attendace", studentAttendance);
        if (studentAttendance) {
          const updatedStudentAttendance = await Attendance.findByIdAndUpdate(
            studentAttendance._id,
            { $push: { attendedOn: lectureDate } },
            { new: true }
          );
          console.log("Updated Attendance", updatedStudentAttendance);
        } else {
          const studentAttendanceCreated = await Attendance.create({
            subject: subjectFound._id,
            userID: studentFound._id,
            attendedOn: lectureDate,
          });
          console.log(studentAttendanceCreated);
          studentFound.attendance.push(studentAttendanceCreated);
          await studentFound.save();
        }
      });

    res.json({
      status: "success",
      data: req.body,
    });
  } catch (error) {
    res.json(error);
  }
};

// upload marks
const uploadMarksCtrl = async (req, res, next) => {
  try {
    const {
      department,
      semester,
      subjectCode,
      exam,
      totalMarks,
      registrationNumber,
      marksObtained,
    } = req.body;
    const facultyFound = await Faculty.findById(req.user);
    if (!facultyFound) {
      return next(new AppErr("Faculty not found", 404));
    }

    for (let i = 0; i < registrationNumber.length; i++) {
      console.log("i ", i);
      console.log("reg ", registrationNumber[i]);
      const studentFound = await Student.findOne({
        registrationNumber: registrationNumber[i],
      });
      if (!studentFound) {
        return next(new AppErr("Student not found", 404));
      }

      const subjectFound = await Subject.findOne({ subjectCode });
      if (!subjectFound) {
        return next(new AppErr("Subject not found", 400));
      }

      let marks = 0;
      if (marksObtained[i] === false || registrationNumber[i] === false) {
        console.log("Absent");
        marks = 0;
      } else {
        console.log("Present");
        marks = marksObtained[i];
      }

      const score = await Mark.create({
        student: studentFound._id,
        subject: subjectFound._id,
        exam,
        marksObtained: marks,
        totalMarks,
        department,
        semester,
        uploadedBy: req.user,
      });

      studentFound.marks.push(score._id);
      await studentFound.save();
    }

    res.json({
      status: "success",
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

// get students
const getStudentsCtrl = async (req, res) => {
  try {
    const students = await Student.find().sort({ fullname: "asc" });
    res.json({
      status: "success",
      data: students,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  facultyLoginCtrl,
  getFacultyProfile,
  getFacultySubjects,
  getStudentsCtrl,
  updateProfileCtrl,
  uploadProfilePhotoCtrl,
  markAttendanceCtrl,
  uploadMarksCtrl,
  updatePasswordCtrl,
};
