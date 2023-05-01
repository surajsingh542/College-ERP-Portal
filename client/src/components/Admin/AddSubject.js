import React, { useContext, useEffect, useState } from "react";
import { adminContext } from "../context/AdminContext/AdminContext";

const AddSubject = () => {
  const { addSubjectAction, fetchSubFacultiesAction, faculties, error } =
    useContext(adminContext);

  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    department: "",
    assignedTo: "",
    semester: "",
  });

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchSubFacultiesAction(formData);
  }, [formData?.department]);

  const submitHandler = (e) => {
    e.preventDefault();
    addSubjectAction(formData);

    setFormData({
      assignedTo: "",
      semester: "",
      subjectName: "",
      subjectCode: "",
      department: "",
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
          <div className="sub_msg__status hidden mt-12 mx-auto max-w-fit bg-green-100 text-center border-green-400 text-green-700 px-7 py-2 rounded-md"></div>
          <form action="" onSubmit={submitHandler}>
            <div className="grid gap-4 max-w-md mt-8 px-8 mx-auto grid-cols-1  md:max-w-xl ">
              <div>
                <label for="subjectName">Subject Name</label>
                <input
                  required={true}
                  type="text"
                  name="subjectName"
                  onChange={onChangeHandler}
                  value={formData.subjectName}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label for="subjectCode">Subject Code</label>
                <input
                  required={true}
                  type="text"
                  name="subjectCode"
                  onChange={onChangeHandler}
                  value={formData.subjectCode}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label for="semester">Associated Semester</label>
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
                <label htmlFor="assignedFaculty">Assigned Faculty</label>
                <select
                  required={true}
                  name="assignedTo"
                  id="assignedFaculty"
                  onChange={onChangeHandler}
                  value={formData.assignedTo}
                  className="block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  <option value="" selected disabled hidden>
                    Select assigned Faculty
                  </option>
                  {/* loop */}
                  {faculties.map((faculty) => {
                    console.log("Loop", faculty);
                    return (
                      <option value={faculty._id} key={faculty._id}>
                        {faculty.fullname}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button
                className="inline-block py-3 my-3 px-7 w-7/12 text-base text-green-50 font-medium text-center leading-6 bg-cyan-500 hover:bg-cyan-600 focus:ring-2  rounded-md shadow-sm"
                type="submit"
              >
                Add Subject
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default AddSubject;
