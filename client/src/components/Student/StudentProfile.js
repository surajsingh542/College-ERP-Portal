import React, { useEffect } from "react";
import { useContext } from "react";
import { authContext } from "../context/AuthContext/AuthContext";
import ProfileDetails from "../Profile/ProfileDetails";

const StudentProfile = () => {
  const { fetchStudentProfileAction } = useContext(authContext);
  // dispatch Action
  useEffect(() => {
    fetchStudentProfileAction();
  }, []);

  return <ProfileDetails />;
};

export default StudentProfile;
