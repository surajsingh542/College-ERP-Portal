import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Forms/Login";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Profile from "./components/Profile/Profile";
import AddFaculty from "./components/Admin/AddFaculty";
import AddStudent from "./components/Admin/AddStudent";
import AddSubject from "./components/Admin/AddSubject";
import AddAdmin from "./components/Admin/AddAdmin";
import FetchFaculties from "./components/Admin/FetchFaculties";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-profile" element={<Profile />} />
        <Route path="/add-faculty" element={<AddFaculty />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-subject" element={<AddSubject />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/get-faculties" element={<FetchFaculties />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
