import React, { useContext, useState } from "react";
import { adminContext } from "../context/AdminContext/AdminContext";

const AddStudent = () => {
  const { addStudentAction, error } = useContext(adminContext);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contactNumber: "",
    password: "",
    dob: "",
    registrationNumber: "",
    gender: "",
    semester: "",
    department: "",
    fatherName: "",
    aadharCard: "",
    batch: "",
  });

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addStudentAction(formData);

    setFormData({
      fullname: "",
      email: "",
      contactNumber: "",
      password: "",
      dob: "",
      registrationNumber: "",
      gender: "",
      semester: "",
      department: "",
      fatherName: "",
      aadharCard: "",
      batch: "",
    });
  };

  return (
    <>
      {error ? (
        <>
          <div
            className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>{" "}
            <span className="block sm:inline ">{error}</span>
          </div>
        </>
      ) : (
        <>
          <div class="msg__status hidden mt-12 mx-auto max-w-fit bg-green-100 text-center border-green-400 text-green-700 px-7 py-2 rounded-md"></div>
          <form action="" onSubmit={submitHandler}>
            <div className="grid gap-4 max-w-md mt-8 px-8 mx-auto grid-cols-1 md:grid-cols-2 md:max-w-5xl ">
              <div>
                <label for="fullname">Student Name</label>
                <input
                  required={true}
                  type="text"
                  name="fullname"
                  onChange={onChangeHandler}
                  value={formData.fullname}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label for="email">Email</label>
                <input
                  required={true}
                  type="email"
                  name="email"
                  onChange={onChangeHandler}
                  value={formData.email}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label for="contactNumber">Contact Number</label>
                <input
                  required={true}
                  type="text"
                  inputMode="numeric"
                  minLength={10}
                  maxLength={10}
                  name="contactNumber"
                  onChange={onChangeHandler}
                  value={formData.contactNumber}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label for="password">Password</label>
                <input
                  required={true}
                  type="password"
                  name="password"
                  onChange={onChangeHandler}
                  value={formData.password}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label for="dob">Date of Birth</label>
                <input
                  required={true}
                  type="date"
                  name="dob"
                  onChange={onChangeHandler}
                  value={formData.dob}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label for="registrationNumber">Registration Number</label>
                <input
                  required={true}
                  type="text"
                  inputMode="numeric"
                  name="registrationNumber"
                  onChange={onChangeHandler}
                  value={formData.registrationNumber}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="gender">Gender</label>
                <select
                  required={true}
                  name="gender"
                  id="gender"
                  onChange={onChangeHandler}
                  value={formData.gender}
                  className="block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  <option value="" selected disabled hidden>
                    Select your Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="semester">Current Academic Semester</label>
                <input
                  required={true}
                  type="number"
                  min={1}
                  max={10}
                  name="semester"
                  id="semester"
                  onChange={onChangeHandler}
                  value={formData.semester}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="department">Department</label>
                <select
                  required={true}
                  name="department"
                  id="department"
                  onChange={onChangeHandler}
                  value={formData.department}
                  className="block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  <option value="" selected disabled hidden>
                    Select your Department
                  </option>
                  <option value="Computer Science & Engineering">
                    Computer Science & Engineering
                  </option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Electronics Engineering">
                    Electronics Engineering
                  </option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                </select>
              </div>

              <div>
                <label for="fatherName">Father Name</label>
                <input
                  required={true}
                  type="text"
                  name="fatherName"
                  onChange={onChangeHandler}
                  value={formData.fatherName}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label for="aadharCard">Aadhar Card Number</label>
                <input
                  required={true}
                  type="text"
                  inputMode="numeric"
                  minLength={16}
                  maxLength={16}
                  name="aadharCard"
                  onChange={onChangeHandler}
                  value={formData.aadharCard}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label for="batch">Batch Year</label>
                <input
                  required={true}
                  type="number"
                  name="batch"
                  min={2017}
                  max={new Date().getFullYear()}
                  onChange={onChangeHandler}
                  value={formData.batch}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <button
                className="inline-block py-3 my-3 px-7 w-9/12 text-base text-green-50 font-medium text-center leading-6 bg-cyan-500 hover:bg-cyan-600 focus:ring-2  rounded-md shadow-sm"
                type="submit"
              >
                Add Student
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default AddStudent;
