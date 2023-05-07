import React, { useContext, useEffect } from "react";
import { StudentContext } from "../context/StudentContext/StudentContext";

const FetchMarks = () => {
  const { fetchMarksAction, marks, error } = useContext(StudentContext);

  useEffect(() => {
    fetchMarksAction();
  }, []);

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
          {/* Student Marks Details */}

          <div className="mx-auto md:m-0 mb-7 w-10/12 min-w-fit md:w-4/12 md:max-w-xl md:ml-0 ">
            <div className="msg__status hidden mt-12 mx-auto max-w-fit bg-green-100 text-center border border-green-400 text-green-700 px-7 py-2 rounded-md"></div>

            <div className="overflow-hidden studentData  shadow sm:rounded-lg font-semibold   ">
              {/* loop */}

              {marks.map((score) => {
                return (
                  <div
                    key={score?._id}
                    className="flex flex-col  border border-coolGray-200  hover:border-green-400 sm:hover:rounded-lg hover:border-2 hover:bg-green-100"
                  >
                    <div
                      onClick={onClickHandler}
                      className=" cursor-pointer flex  px-4 py-2 w-full flex-row justify-between"
                    >
                      {score?.subject?.subjectName}
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
                        <div class="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                          <dd class="mt-1 capitalize text-sm text-gray-900  sm:mt-0">
                            {score?.exam}
                          </dd>
                        </div>

                        <div class="bg-white px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                          <dd class="mt-1 lowercase text-sm text-gray-900  sm:mt-0">
                            {score?.totalMarks}
                          </dd>
                        </div>
                        <div class="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                          <dd class="mt-1 text-sm text-gray-900  sm:mt-0">
                            {score?.marksObtained}
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

export default FetchMarks;
