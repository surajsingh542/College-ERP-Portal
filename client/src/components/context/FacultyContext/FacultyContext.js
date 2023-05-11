import { createContext, React, useContext, useReducer } from "react";
import { authContext } from "../AuthContext/AuthContext";
import axios from "axios";
import { API_URL_FACULTY } from "../../../utils/apiURL";
// import { API_URL_ADMIN } from "../../../utils/apiURL";
import {
  FETCH_ASSIGNED_SUBJECTS_FAIL,
  FETCH_ASSIGNED_SUBJECTS_SUCCESS,
  FETCH_STUDENT_SUCCESS,
  FETCH_STUDENT_FAIL,
  MARK_ATTENDANCE_FAIL,
  FETCH_ATTENDANCE_FAIL,
  FETCH_ATTENDANCE_SUCCESS,
  UPLOAD_MARKS_FAIL,
} from "./facultyActionTypes";

export const FacultyContext = createContext();

// INITIAL_STATE
const INITIAL_STATE = {
  assignedSubjects: [],
  presentDays: [],
  students: [],
  error: null,
};

// Faculty Reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ASSIGNED_SUBJECTS_SUCCESS:
      return {
        ...state,
        assignedSubjects: payload,
        error: null,
      };
    case FETCH_ASSIGNED_SUBJECTS_FAIL:
      return {
        ...state,
        assignedSubjects: [],
        error: payload,
      };
    case FETCH_STUDENT_SUCCESS:
      return {
        ...state,
        students: payload,
        error: null,
      };
    case FETCH_ATTENDANCE_SUCCESS:
      console.log("ATTENDANCE PAYLOAD", payload);
      return {
        ...state,
        presentDays: payload,
        error: null,
      };
    case FETCH_ATTENDANCE_FAIL:
      return {
        ...state,
        presentDays: [],
        error: payload,
      };
    case FETCH_STUDENT_FAIL:
      return {
        ...state,
        students: [],
        error: payload,
      };
    case UPLOAD_MARKS_FAIL:
      return {
        ...state,
        students: [],
        assignedSubjects: [],
        error: payload,
      };
    default:
      return state;
  }
};

export const FacultyContextProvider = ({ children }) => {
  const { userAuth } = useContext(authContext);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // get students
  const fetchStudentAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const res = await axios.get(`${API_URL_FACULTY}/students`, config);
      console.log("Response", res);
      console.log(config.headers.Authorization);
      if (res?.data?.status === "success") {
        const filteredStudents = res?.data?.data.filter((student) => {
          return (
            student?.department === formData?.department &&
            student?.semester.toString() === formData.semester.toString()
          );
        });
        dispatch({
          type: FETCH_STUDENT_SUCCESS,
          payload: filteredStudents,
        });

        const msgStatus = document.querySelector(".msg__status");
        // const subjectSelector = document.querySelector(".sub_code");
        const studentData = document.querySelector(".studentData");
        if (filteredStudents.length <= 0) {
          msgStatus.innerHTML =
            "No Student Found for this Department in the current semester.";
          msgStatus.style.display = "block";
          // subjectSelector.style.display = "none";
          studentData.style.display = "none";
        } else {
          msgStatus.style.display = "none";
          // subjectSelector.style.display = "block";
          studentData.style.display = "block";
        }
      }
    } catch (error) {
      dispatch({
        type: FETCH_STUDENT_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //   get subjects
  const assignedSubjectsAction = async (dept) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const res = await axios.get(
        `${API_URL_FACULTY}/assigned-subjects`,
        config
      );
      console.log(res);
      if (res?.data?.status === "success") {
        const filteredSubjects = res.data.data.filter((subject) => {
          return subject.department === dept;
        });
        dispatch({
          type: FETCH_ASSIGNED_SUBJECTS_SUCCESS,
          payload: filteredSubjects,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_ASSIGNED_SUBJECTS_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  // Mark Attendance
  const markAttendanceAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      console.log(formData);
      const res = await axios.post(
        `${API_URL_FACULTY}/attendance`,
        formData,
        config
      );
      if (res?.data?.status === "success") {
        console.log(res.data);
      }
      console.log("Response", res);
      console.log(config.headers.Authorization);

      // if (res?.data?.status === "success") {
      //   const filteredStudents = res?.data?.data.filter((student) => {
      //     return (
      //       student?.department === formData?.department &&
      //       student?.semester.toString() === formData.semester.toString()
      //     );
      //   });
      //   dispatch({
      //     type: FETCH_STUDENT_SUCCESS,
      //     payload: filteredStudents,
      //   });

      //   const msgStatus = document.querySelector(".msg__status");
      //   const subjectSelector = document.querySelector(".sub_code");
      //   const studentData = document.querySelector(".studentData");
      //   if (filteredStudents.length <= 0) {
      //     msgStatus.innerHTML =
      //       "No Student Found for this Department in the current semester.";
      //     msgStatus.style.display = "block";
      //     subjectSelector.style.display = "none";
      //     studentData.style.display = "none";
      //   } else {
      //     msgStatus.style.display = "none";
      //     subjectSelector.style.display = "block";
      //     studentData.style.display = "block";
      //   }
      // }
    } catch (error) {
      dispatch({
        type: MARK_ATTENDANCE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  // Add Marks
  const addMarksAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      console.log(formData);
      const res = await axios.post(
        `${API_URL_FACULTY}/marks`,
        formData,
        config
      );
      if (res?.data?.status === "success") {
        const msgStatus = document.querySelector(".marks_msg__status");
        msgStatus.innerHTML = "Marks added successfully.";
        msgStatus.style.display = "block";
        // setTimeout(() => {}, 5000);
      }
    } catch (error) {
      dispatch({
        type: UPLOAD_MARKS_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  // Get Attendance
  const getAttendanceAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      console.log("Get Attendance Form Data", formData);
      const res = await axios.post(
        `${API_URL_FACULTY}/fetch-attendance`,
        formData,
        config
      );
      if (res?.data?.status === "success") {
        dispatch({
          type: FETCH_ATTENDANCE_SUCCESS,
          payload: res.data.data.attendedOn,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_ATTENDANCE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  return (
    <FacultyContext.Provider
      value={{
        assignedSubjects: state?.assignedSubjects,
        students: state?.students,
        markAttendanceAction,
        addMarksAction,
        getAttendanceAction,
        attendedOn: state?.presentDays,
        assignedSubjectsAction,
        fetchStudentAction,
      }}
    >
      {children}
    </FacultyContext.Provider>
  );
};
