import React, { useContext, useEffect, useState } from "react";
import { FacultyContext } from "../context/FacultyContext/FacultyContext";

const Marks = () => {
  const {
    fetchStudentAction,
    students,
    assignedSubjects,
    assignedSubjectsAction,
    addMarksAction,
    error,
  } = useContext(FacultyContext);

  const [formData, setFormData] = useState({
    department: "",
    semester: "",
    exam: "",
    subjectCode: "",
    totalMarks: "",
    // marksObtained: new Array(students.length).fill(false),
  });

  useEffect(() => {
    assignedSubjectsAction(formData.department);
    if (formData.semester && formData.department) {
      fetchStudentAction(formData);
    }
  }, [formData.department, formData.semester]);

  useEffect(() => {
    let registrationNumber = [];
    for (let j = 0; j < students.length; j++) {
      registrationNumber.push(students[j].registrationNumber);
    }
    setFormData({
      ...formData,
      marksObtained: new Array(students.length).fill(false),
      registrationNumber: registrationNumber,
    });
  }, [students]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form Data", formData);
    addMarksAction(formData);
  };

  const onInputHandler = (e, position) => {
    if (e.target.value) {
      formData.marksObtained[position] = e.target.value;
    } else {
      formData.marksObtained[position] = false;
    }
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
          <div className="marks_msg__status hidden mt-12 mx-auto max-w-fit bg-green-100 text-center border-green-400 text-green-700 px-7 py-2 rounded-md"></div>
          <form action="" onSubmit={submitHandler}>
            <div className="grid gap-4 max-w-md mt-8 px-8 mx-auto grid-cols-1  md:max-w-xl ">
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
                <label for="semester">Semester</label>
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
                <label htmlFor="subject">Subject</label>
                <select
                  required={true}
                  name="subjectCode"
                  id="subject"
                  onChange={onChangeHandler}
                  value={formData.subjectCode}
                  className="block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
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
                <label for="exam">Exam</label>
                <input
                  required={true}
                  type="text"
                  name="exam"
                  onChange={onChangeHandler}
                  value={formData.exam}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label for="totalMarks">Total Marks</label>
                <input
                  required={true}
                  type="number"
                  name="totalMarks"
                  id="totalMarks"
                  onChange={onChangeHandler}
                  value={formData.totalMarks}
                  className="appearance-none block w-full p-2 my-3 leading-3 text-coolGray-900 border border-coolGray-200 rounded-md  placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                />
              </div>

              {/* Student Details */}
              {/* <div className="mx-auto md:m-0 mb-7 w-full min-w-fit md:w-6/12 md:max-w-xl md:ml-0 "> */}
              <div className="msg__status hidden mt-12 mx-auto max-w-fit bg-green-100 text-center border border-green-400 text-green-700 px-7 py-2 rounded-md"></div>

              <div className="overflow-hidden studentData  hidden sub_code  sm:rounded-lg font-semibold   ">
                <table className="appearance-none block w-full  leading-7 text-coolGray-900 border border-coolGray-200 rounded-md">
                  <tr className="flex w-full">
                    <th className="border border-coolGray-200 w-4/12">
                      Reg. Number
                    </th>
                    <th className="border border-coolGray-200 w-4/12">Name</th>
                    <th className="border border-coolGray-200 w-4/12">
                      Marks Obtained
                    </th>
                  </tr>

                  {students.map((student, index) => {
                    return (
                      <tr
                        key={index}
                        className="flex w-full border border-coolGray-200"
                      >
                        <td className="px-3 border border-coolGray-200 w-4/12">
                          {student?.registrationNumber}
                        </td>
                        <td className="px-3 border border-coolGray-200 w-4/12">
                          {student?.fullname}
                        </td>
                        <td className="text-center border border-coolGray-200 w-4/12">
                          <input
                            type="text"
                            name="marksObtained"
                            className="w-full outline-none text-center"
                            onChange={(e) => onInputHandler(e, index)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </table>

                {/* loop */}
              </div>
              {/* </div> */}

              <button
                className="inline-block py-3 my-3 px-7 w-7/12 text-base text-green-50 font-medium text-center leading-6 bg-cyan-500 hover:bg-cyan-600 focus:ring-2  rounded-md shadow-sm"
                type="submit"
              >
                Add Marks
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Marks;
