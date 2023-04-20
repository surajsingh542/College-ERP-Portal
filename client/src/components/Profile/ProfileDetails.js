import React from "react";
import { useContext } from "react";
import defaultProfileImage from "../../Images/profile.png";
import { authContext } from "../context/AuthContext/AuthContext";

const ProfileDetails = () => {
  const { profile, error } = useContext(authContext);

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
          <div className="h-fit border border-coolGray-200 shadow sm:rounded-lg p-4  mx-auto mb-7 md:ml-auto w-10/12 md:w-4/12 md:min-w-fit md:max-w-xs md:mr-7">
            <img
              className="w-20 h-20 mx-auto rounded-full"
              src={
                profile?.profileImage?.profile_img
                  ? profile.profileImage.profile_img
                  : defaultProfileImage
              }
              alt="User Profile Pic"
            />
            <div className="mt-6 mb-2 text-center font-bold">
              {profile?.fullname}
            </div>
            <div className="mb-2 text-center font-bold">
              {profile?.registrationNumber}
            </div>
          </div>

          <div className="overflow-hidden border shadow sm:rounded-lg font-semibold border-coolGray-200 mx-auto mb-7 w-10/12 min-w-fit md:w-4/12 md:max-w-md md:ml-0">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 capitalize text-sm text-gray-900  sm:mt-0">
                  {profile?.fullname}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 lowercase text-sm text-gray-900  sm:mt-0">
                  {profile?.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Registration Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900  sm:mt-0">
                  {profile?.registrationNumber}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Contact Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900  sm:mt-0">
                  {profile?.contactNumber}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 capitalize text-sm text-gray-900  sm:mt-0">
                  {profile?.gender}
                </dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </section>
  );
};

export default ProfileDetails;
