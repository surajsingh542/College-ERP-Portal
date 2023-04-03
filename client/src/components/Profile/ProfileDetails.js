import React from "react";
import defaultProfileImage from "../../Images/back.jpg";

const ProfileDetails = ({ profile }) => {
  console.log(profile);

  return (
    <>
      <div className="border border-coolGray-200 p-4  mx-auto mb-7 md:ml-auto w-10/12 md:w-4/12 md:max-w-md md:mr-7">
        <img
          className="w-20 h-20 mx-auto rounded-full"
          src={
            profile?.profileImage?.profile_img
              ? profile.profileImage.profile_img
              : defaultProfileImage
          }
          alt="Profile-Image"
        />
        <div className="mt-6 mb-2 text-center font-bold">
          {profile?.fullname}
        </div>
        <div className="text-center font-bold">
          {profile?.registrationNumber}
        </div>
      </div>
      <div className="border font-semibold border-coolGray-200 mx-auto mb-7 w-10/12 md:w-4/12 md:max-w-md md:ml-0 ">
        <table class="min-w-full">
          <tbody>
            <tr class=" border-b">
              <td class="text-sm capitalize text-gray-900  px-6 py-4 whitespace-nowrap">
                Name
              </td>
              <td class="text-sm capitalize text-gray-900  px-6 py-4 whitespace-nowrap">
                {profile?.fullname}
              </td>
            </tr>
            <tr class=" border-b">
              <td class="text-sm capitalize text-gray-900  px-6 py-4 whitespace-nowrap">
                Email
              </td>
              <td class="text-sm lowercase text-gray-900  px-6 py-4 whitespace-nowrap">
                {profile?.email}
              </td>
            </tr>
            <tr class=" border-b">
              <td class="text-sm capitalize text-gray-900  px-6 py-4 whitespace-nowrap">
                Registration Number
              </td>
              <td class="text-sm text-gray-900  px-6 py-4 whitespace-nowrap">
                {profile?.registrationNumber}
              </td>
            </tr>
            <tr class=" border-b">
              <td class="text-sm capitalize text-gray-900  px-6 py-4 whitespace-nowrap">
                Contact Number
              </td>
              <td class="text-sm text-gray-900  px-6 py-4 whitespace-nowrap">
                {profile?.contactNumber}
              </td>
            </tr>
            <tr class=" border-b">
              <td class="text-sm capitalize text-gray-900  px-6 py-4 whitespace-nowrap">
                Gender
              </td>
              <td class="text-sm capitalize text-gray-900  px-6 py-4 whitespace-nowrap">
                {profile?.gender}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProfileDetails;
