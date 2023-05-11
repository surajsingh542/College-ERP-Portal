import React, { useContext, useEffect, useState } from "react";
import { FacultyContext } from "../context/FacultyContext/FacultyContext";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ViewAttendance = () => {
  const [value, onChange] = useState(new Date());
  // const attendedOn = [
  //   "2023-04-26T09:52:51.059Z",
  //   "2023-04-26T09:53:27.006Z",
  //   "2023-05-05T05:11:20.659Z",
  //   "2023-05-05T05:14:20.649Z",
  //   "2023-05-05T05:14:25.566Z",
  //   "2023-05-05T05:14:49.016Z",
  // ];

  const {
    fetchStudentAction,
    students,
    assignedSubjects,
    assignedSubjectsAction,
    getAttendanceAction,
    attendedOn,
    error,
  } = useContext(FacultyContext);

  const [formData, setFormData] = useState({
    department: "",
    semester: "",
    subjectCode: "",
  });

  useEffect(() => {
    assignedSubjectsAction(formData.department);
  }, [formData.department]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitFetchHandler = (e) => {
    e.preventDefault();
    fetchStudentAction(formData);
  };

  const onClickHandler = (e, registrationNumber, subjectCode) => {
    if (e.currentTarget.nextElementSibling.classList.contains("hidden")) {
      // fetch attendance array
      getAttendanceAction({ registrationNumber, subjectCode });
      console.log("Attended On UI Array", attendedOn);
      e.currentTarget.lastElementChild.classList.add("transform");
      e.currentTarget.lastElementChild.classList.add("rotate-180");
      e.currentTarget.nextElementSibling.classList.remove("hidden");
    } else {
      e.currentTarget.lastElementChild.classList.remove("transform");
      e.currentTarget.lastElementChild.classList.remove("rotate-180");
      e.currentTarget.nextElementSibling.classList.add("hidden");
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

          <div className="mx-auto md:m-0 mb-7 w-10/12 min-w-fit md:w-4/12 md:max-w-xl md:ml-0 ">
            <div className="msg__status hidden mt-12 mx-auto max-w-fit bg-green-100 text-center border border-green-400 text-green-700 px-7 py-2 rounded-md"></div>

            <div className="overflow-hidden studentData  shadow sm:rounded-lg font-semibold   ">
              {/* loop */}

              {students.map((student) => {
                return (
                  <div
                    key={student?.registrationNumber}
                    className="flex flex-col  border border-coolGray-200  hover:border-green-400 sm:hover:rounded-lg hover:border-2 hover:bg-green-100"
                  >
                    <div
                      onClick={(e) =>
                        onClickHandler(
                          e,
                          student.registrationNumber,
                          formData.subjectCode
                        )
                      }
                      className="facDetailsHeader cursor-pointer flex  px-4 py-2 w-full flex-row justify-between"
                    >
                      {student?.fullname}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                        id="arrow-down"
                        className="w-7"
                      >
                        <path
                          fill="#000000"
                          d="M17.71,11.29a1,1,0,0,0-1.42,0L13,14.59V7a1,1,0,0,0-2,0v7.59l-3.29-3.3a1,1,0,0,0-1.42,1.42l5,5a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l5-5A1,1,0,0,0,17.71,11.29Z"
                        ></path>
                      </svg>
                    </div>

                    <div className="facDetails mx-auto mt-2 mb-4 hidden">
                      <Calendar
                        onChange={onChange}
                        value={value}
                        tileClassName={({ date }) => {
                          if (
                            attendedOn.find(
                              (val) =>
                                date.getDay() === new Date(val).getDay() &&
                                date.getMonth() === new Date(val).getMonth() &&
                                date.getDate() === new Date(val).getDate()
                            )
                          ) {
                            return "highlight";
                          }
                        }}
                        tileContent={({ date }) => {
                          if (
                            attendedOn.find(
                              (val) =>
                                date.getDay() === new Date(val).getDay() &&
                                date.getMonth() === new Date(val).getMonth() &&
                                date.getDate() === new Date(val).getDate()
                            )
                          ) {
                            return "*";
                          }
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ViewAttendance;
