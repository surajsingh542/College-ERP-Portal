import React, { useEffect } from "react";
import { useContext } from "react";
import { authContext } from "../context/AuthContext/AuthContext";
import ProfileDetails from "../Profile/ProfileDetails";

const FacultyProfile = () => {
  const { fetchFacultyProfileAction } = useContext(authContext);
  // dispatch Action
  useEffect(() => {
    fetchFacultyProfileAction();
  }, []);

  return <ProfileDetails />;
};

export default FacultyProfile;
