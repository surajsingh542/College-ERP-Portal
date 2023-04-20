import React, { useEffect } from "react";
import { useContext } from "react";
import { authContext } from "../context/AuthContext/AuthContext";
import ProfileDetails from "../Profile/ProfileDetails";

const AdminProfile = () => {
  const { fetchAdminProfileAction } = useContext(authContext);
  // dispatch Action
  useEffect(() => {
    fetchAdminProfileAction();
  }, []);

  return <ProfileDetails />;
};

export default AdminProfile;
