import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Forms/Login";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import AdminProfile from "./components/Admin/AdminProfile";
import AddFaculty from "./components/Admin/AddFaculty";
import AddStudent from "./components/Admin/AddStudent";
import AddSubject from "./components/Admin/AddSubject";
import AddAdmin from "./components/Admin/AddAdmin";
import FetchFaculties from "./components/Admin/FetchFaculties";
import FetchStudents from "./components/Admin/FetchStudents";
import FetchSubjects from "./components/Admin/FetchSubjects";
import FacultyProfile from "./components/Faculty/FacultyProfile";
import Attendance from "./components/Faculty/Attendance";
import Marks from "./components/Faculty/Marks";
import ViewAttendance from "./components/Faculty/getAttendance";
import StudentProfile from "./components/Student/StudentProfile";
import FetchMarks from "./components/Student/FetchMarks";
import NotFound from "./components/NotFound";

if (window.localStorage.userAuth) {
  const auth = JSON.parse(localStorage.userAuth);
  console.log(auth);
  const decoded = jwt_decode(auth.token);
  console.log("Not Removed", decoded);

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.log("Removed", decoded);
    window.localStorage.removeItem("userAuth");
    window.location.href = "/";
  }
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        {/* Admin Routes */}
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/add-faculty" element={<AddFaculty />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-subject" element={<AddSubject />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/get-faculties" element={<FetchFaculties />} />
        <Route path="/get-students" element={<FetchStudents />} />
        <Route path="/get-subjects" element={<FetchSubjects />} />
        {/* Faculty Routes */}
        <Route path="/faculty-profile" element={<FacultyProfile />} />
        <Route path="/mark-attendance" element={<Attendance />} />
        <Route path="/add-marks" element={<Marks />} />
        <Route path="/view-attendance" element={<ViewAttendance />} />
        {/* Student Routes */}
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/get-marks" element={<FetchMarks />} />
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
