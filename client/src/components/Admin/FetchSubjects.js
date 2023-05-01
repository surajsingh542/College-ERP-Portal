import React, { useContext, useState } from "react";
import { adminContext } from "../context/AdminContext/AdminContext";

const FetchSubjects = () => {
  const { fetchSubjectAction, subjects, error } = useContext(adminContext);

  const [formData, setFormData] = useState({
    department: "",
    semester: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetchSubjectAction(formData);
  };

  const onClickHandler = (e) => {
    if (e.currentTarget.nextElementSibling.classList.contains("hidden")) {
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
              onSubmit={submitHandler}
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
                  Fetch Subjects
                </button>
              </div>
            </form>
          </div>

          {/* Subject Details */}

          <div className="mx-auto md:m-0 mb-7 w-10/12 min-w-fit md:w-4/12 md:max-w-xl md:ml-0 ">
            <div className="sub_msg__status hidden mt-12 mx-auto max-w-fit bg-green-100 text-center border border-green-400 text-green-700 px-7 py-2 rounded-md"></div>

            <div className="overflow-hidden subjectData shadow sm:rounded-lg font-semibold   ">
              {subjects.map((subject) => {
                return (
                  <div
                    key={subject?.subjectCode}
                    className="flex flex-col  border border-coolGray-200  hover:border-green-400 sm:hover:rounded-lg hover:border-2 hover:bg-green-100"
                  >
                    <div
                      onClick={onClickHandler}
                      className=" cursor-pointer flex  px-4 py-2 w-full flex-row justify-between"
                    >
                      {subject?.subjectName}
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

                    <div className=" hidden">
                      <dl>
                        <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                          <dd className="mt-1 capitalize text-sm text-gray-900  sm:mt-0">
                            {subject.subjectCode}
                          </dd>
                        </div>
                      </dl>
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

export default FetchSubjects;
