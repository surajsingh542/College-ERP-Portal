import React, { useContext, useEffect, useState } from "react";
import { FacultyContext } from "../context/FacultyContext/FacultyContext";

const Attendance = () => {
  const {
    fetchStudentAction,
    students,
    assignedSubjects,
    assignedSubjectsAction,
    markAttendanceAction,
    error,
  } = useContext(FacultyContext);

  useEffect(() => {
    setFormData({
      ...formData,
      presentStudents: new Array(students.length).fill(false),
    });
  }, [students]);

  const [formData, setFormData] = useState({
    department: "",
    semester: "",
    subjectCode: "",
    presentStudents: new Array(students.length).fill(false),
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitFetchHandler = (e) => {
    e.preventDefault();
    fetchStudentAction(formData);
    assignedSubjectsAction(formData.department);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    markAttendanceAction(formData);
  };

  const onClickHandler = (e, position) => {
    if (e.target.checked === true) {
      formData.presentStudents[position] = e.target.value;
    } else {
      formData.presentStudents[position] = false;
    }
  };

  return (
    <section className="w-12/12  flex mt-12 flex-col md:flex-row md:justify-around">
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
          {/* Department Selection */}
          <div className="h-fit mx-auto md:m-0 mb-7 md:ml-7 w-10/12 md:w-4/12 md:min-w-fit md:max-w-xl ">
            <form
              action=""
              onSubmit={submitFetchHandler}
              className=" max-w-md   mx-auto   md:max-w-5xl "
            >
              <div className="grid gap-4  grid-cols-1   ">
                <div>
                  <label htmlFor="department">Department</label>
                  <select
                    required={true}
                    name="department"
                    id="department"
                    onChange={onChangeHandler}
                    value={formData.department}
                    className="block w-full lg:w-10/12 p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
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
                  <label htmlFor="semester">Semester</label>
                  <input
                    required={true}
                    type="number"
                    min={1}
                    max={10}
                    name="semester"
                    id="semester"
                    onChange={onChangeHandler}
                    value={formData.semester}
                    className="block w-full lg:w-10/12 p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  />
                </div>

                <button
                  className="inline-block py-3 my-3 px-7 w-9/12  lg:w-6/12 text-base text-green-50 font-medium text-center leading-6 bg-cyan-500 hover:bg-cyan-600 focus:ring-2  rounded-md shadow-sm"
                  type="submit"
                >
                  Fetch Students
                </button>
              </div>
            </form>
          </div>

          {/* Student Details */}
          <div className="mx-auto md:m-0 mb-7 w-full min-w-fit md:w-6/12 md:max-w-xl md:ml-0 ">
            <div className="msg__status hidden mt-12 mx-auto max-w-fit bg-green-100 text-center border border-green-400 text-green-700 px-7 py-2 rounded-md"></div>

            <div className="overflow-hidden studentData p-2 hidden sub_code  sm:rounded-lg font-semibold   ">
              {/* form */}
              <form
                action=""
                onSubmit={submitHandler}
                className=" max-w-md   mx-auto   md:max-w-5xl "
              >
                <div>
                  <label htmlFor="subject">Subject</label>
                  <select
                    required={true}
                    name="subjectCode"
                    id="subject"
                    onChange={onChangeHandler}
                    value={formData.subjectCode}
                    className="block w-full lg:w-10/12 p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    <option value="" selected disabled hidden>
                      Select your Subject
                    </option>
                    {/* loop */}
                    {assignedSubjects.map((subject) => {
                      return (
                        <option value={subject.subjectCode}>
                          {subject.subjectName}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <table className="block w-full lg:w-10/12 text-coolGray-900 border border-collapse border-coolGray-200 rounded-md">
                  <tr className="flex w-full">
                    <th className="border border-coolGray-200 w-4/12">Mark</th>
                    <th className="border border-coolGray-200 w-4/12">Name</th>
                    <th className="border border-coolGray-200 w-4/12">
                      Reg. Number
                    </th>
                  </tr>

                  {students.map((student, index) => {
                    return (
                      <tr
                        key={index}
                        className="flex w-full border border-coolGray-200"
                      >
                        <td className="text-center border border-coolGray-200 w-4/12">
                          <input
                            type="checkbox"
                            name="presentStudents"
                            value={student?.registrationNumber}
                            onChange={(e) => onClickHandler(e, index)}
                          />
                        </td>
                        <td className="px-3 border border-coolGray-200 w-4/12">
                          {student?.fullname}
                        </td>
                        <td className="px-3 border border-coolGray-200 w-4/12">
                          {student?.registrationNumber}
                        </td>
                      </tr>
                    );
                    // return (
                    //   <div
                    //     key={student?.registrationNumber}
                    //     className="flex flex-col  border border-coolGray-200  hover:border-green-400 sm:hover:rounded-lg hover:border-2 hover:bg-green-100"
                    //   >
                    //     <div
                    //       onClick={onClickHandler}
                    //       className=" cursor-pointer flex  px-4 py-2 w-full flex-row justify-between"
                    //     >
                    //       {student?.fullname}
                    //       <svg
                    //         xmlns="http://www.w3.org/2000/svg"
                    //         data-name="Layer 1"
                    //         viewBox="0 0 24 24"
                    //         id="arrow-down"
                    //         className="w-7"
                    //       >
                    //         <path
                    //           fill="#000000"
                    //           d="M17.71,11.29a1,1,0,0,0-1.42,0L13,14.59V7a1,1,0,0,0-2,0v7.59l-3.29-3.3a1,1,0,0,0-1.42,1.42l5,5a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l5-5A1,1,0,0,0,17.71,11.29Z"
                    //         ></path>
                    //       </svg>
                    //     </div>

                    //     <div className=" hidden">
                    //       <dl>
                    //         <div class="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                    //           <dd class="mt-1 capitalize text-sm text-gray-900  sm:mt-0">
                    //             {student.registrationNumber}
                    //           </dd>
                    //         </div>

                    //         <div class="bg-white px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                    //           <dd class="mt-1 lowercase text-sm text-gray-900  sm:mt-0">
                    //             {student?.email}
                    //           </dd>
                    //         </div>
                    //         <div class="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                    //           <dd class="mt-1 text-sm text-gray-900  sm:mt-0">
                    //             {student?.contactNumber}
                    //           </dd>
                    //         </div>
                    //         <div class="bg-white px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                    //           <dd class="mt-1 text-sm text-gray-900  sm:mt-0">
                    //             {student?.gender}
                    //           </dd>
                    //         </div>
                    //       </dl>
                    //     </div>
                    //   </div>
                    // );
                  })}
                </table>

                <button
                  className="inline-block py-3 my-3 px-7 w-9/12  lg:w-6/12 text-base text-green-50 font-medium text-center leading-6 bg-cyan-500 hover:bg-cyan-600 focus:ring-2  rounded-md shadow-sm"
                  type="submit"
                >
                  Mark Attendance
                </button>
              </form>
              {/* loop */}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Attendance;
