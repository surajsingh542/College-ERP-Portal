import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Forms/Login";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Profile from "./components/Profile/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
