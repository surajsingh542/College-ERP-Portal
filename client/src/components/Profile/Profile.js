import React, { useEffect } from "react";
import { useContext } from "react";
import { authContext } from "../context/AuthContext/AuthContext";
import ProfileDetails from "./ProfileDetails";

const Profile = () => {
  const { fetchAdminProfileAction, profile, error } = useContext(authContext);
  // dispatch Action
  useEffect(() => {
    fetchAdminProfileAction();
  }, []);
  return (
    <section className="w-12/12 mx-auto flex mt-12 flex-col md:flex-row md:justify-center">
      {error ? (
        <>
          <div
            className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong> {""}
            <span className="block sm:inline ">{error}</span>
          </div>
        </>
      ) : (
        <>
          <ProfileDetails profile={profile} />
        </>
      )}
    </section>
  );
};

export default Profile;
