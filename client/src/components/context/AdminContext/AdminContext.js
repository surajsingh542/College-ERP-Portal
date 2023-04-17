import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { authContext } from "../AuthContext/AuthContext";
import { API_URL_ADMIN } from "../../../utils/apiURL";
import {
  ADD_ADMIN_FAIL,
  ADD_FACULTY_FAIL,
  ADD_STUDENT_FAIL,
  ADD_SUBJECT_FAIL,
  FETCH_FACULTY_FAIL,
  FETCH_FACULTY_SUCCESS,
  FETCH_STUDENT_FAIL,
  FETCH_STUDENT_SUCCESS,
  FETCH_SUBJECT_FAIL,
  FETCH_SUBJECT_SUCCESS,
} from "./adminActionTypes";

export const adminContext = createContext();

const INITIAL_STATE = {
  faculties: [],
  students: [],
  subjects: [],
  error: null,
};

// Admin reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_FACULTY_FAIL:
      return {
        ...state,
        error: payload,
        faculties: [],
        students: [],
        subjects: [],
      };
    case ADD_ADMIN_FAIL:
      return {
        ...state,
        error: payload,
        faculties: [],
        students: [],
        subjects: [],
      };
    case ADD_STUDENT_FAIL:
      return {
        ...state,
        error: payload,
        faculties: [],
        students: [],
        subjects: [],
      };
    case ADD_SUBJECT_FAIL:
      return {
        ...state,
        error: payload,
        faculties: [],
        students: [],
        subjects: [],
      };
    case FETCH_SUBJECT_FAIL:
      return {
        ...state,
        error: payload,
        faculties: [],
        students: [],
        subjects: [],
      };
    case FETCH_SUBJECT_SUCCESS:
      return {
        ...state,
        error: null,
        faculties: [],
        students: [],
        subjects: payload,
      };
    case FETCH_FACULTY_SUCCESS:
      return {
        ...state,
        error: null,
        faculties: payload,
        students: [],
        subjects: [],
      };
    case FETCH_FACULTY_FAIL:
      return {
        ...state,
        error: payload,
        faculties: [],
        students: [],
        subjects: [],
      };

    case FETCH_STUDENT_SUCCESS:
      console.log("Payload", payload);
      return {
        ...state,
        error: null,
        faculties: [],
        students: payload,
        subjects: [],
      };
    case FETCH_STUDENT_FAIL:
      return {
        ...state,
        error: payload,
        faculties: [],
        students: [],
        subjects: [],
      };

    default:
      return state;
  }
};

export const AdminContextProvider = ({ children }) => {
  const { userAuth } = useContext(authContext);

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  //   addFaculty
  const addFacultyAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.post(
        `${API_URL_ADMIN}/faculty`,
        formData,
        config
      );
      console.log(res);

      if (res?.data?.status === "success") {
        const msgStatus = document.querySelector(".msg__status");
        msgStatus.innerHTML = "Faculty has been added successfully.";
        msgStatus.style.display = "block";
        setTimeout(() => {
          msgStatus.style.display = "none";
        }, 10000);
      }
    } catch (error) {
      dispatch({
        type: ADD_FACULTY_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //   addAdmin
  const addAdminAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.post(`${API_URL_ADMIN}`, formData, config);
      console.log(res);

      if (res?.data?.status === "success") {
        const msgStatus = document.querySelector(".msg__status");
        msgStatus.innerHTML = "Faculty has been added successfully.";
        msgStatus.style.display = "block";
        setTimeout(() => {
          msgStatus.style.display = "none";
        }, 10000);
      }
    } catch (error) {
      dispatch({
        type: ADD_ADMIN_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //   addStudent
  const addStudentAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.post(
        `${API_URL_ADMIN}/student`,
        formData,
        config
      );
      console.log(res);

      if (res?.data?.status === "success") {
        const msgStatus = document.querySelector(".msg__status");
        msgStatus.innerHTML = "Student has been added successfully.";
        msgStatus.style.display = "block";
        setTimeout(() => {
          msgStatus.style.display = "none";
        }, 10000);
      }
    } catch (error) {
      dispatch({
        type: ADD_STUDENT_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //   addSubject
  const addSubjectAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.post(
        `${API_URL_ADMIN}/subject`,
        formData,
        config
      );
      console.log(res);

      if (res?.data?.status === "success") {
        const msgStatus = document.querySelector(".msg__status");
        msgStatus.innerHTML = "Subject has been added successfully.";
        msgStatus.style.display = "block";
        setTimeout(() => {
          msgStatus.style.display = "none";
        }, 10000);
      }
    } catch (error) {
      dispatch({
        type: ADD_SUBJECT_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //   get subjects
  const fetchSubjectAction = async (dept) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.get(`${API_URL_ADMIN}/subjects`, config);
      console.log(res);
      console.log(config.headers.Authorization);
      if (res?.data?.status === "success") {
        const filteredSubjects = res?.data?.data.filter((subject) => {
          return subject?.department === dept;
        });

        dispatch({
          type: FETCH_SUBJECT_SUCCESS,
          payload: filteredSubjects,
        });

        const msgStatus = document.querySelector(".sub_msg__status");
        const subjectData = document.querySelector(".subjectData");
        if (filteredSubjects.length <= 0) {
          msgStatus.innerHTML =
            "No Subject Found for this Department in the current semester.";
          msgStatus.style.display = "block";
          subjectData.style.display = "none";
        } else {
          msgStatus.style.display = "none";
          subjectData.style.display = "block";
        }
      }
    } catch (error) {
      dispatch({
        type: FETCH_SUBJECT_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //   get faculties
  const fetchFacultiesAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.get(`${API_URL_ADMIN}/faculties`, config);
      console.log("Response", res);
      console.log(config.headers.Authorization);
      if (res?.data?.status === "success") {
        const deptFaculties = res?.data?.data.filter((faculty) => {
          return faculty?.department === formData?.department;
        });
        dispatch({
          type: FETCH_FACULTY_SUCCESS,
          payload: deptFaculties,
        });

        const msgStatus = document.querySelector(".msg__status");
        const facultyData = document.querySelector(".facultyData");
        if (deptFaculties.length <= 0) {
          msgStatus.innerHTML = "No Faculty Found for this Department";
          msgStatus.style.display = "block";
          facultyData.style.display = "none";
        } else {
          msgStatus.style.display = "none";
          facultyData.style.display = "block";
        }
      }
    } catch (error) {
      dispatch({
        type: FETCH_FACULTY_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //   get students
  const fetchStudentsAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.get(`${API_URL_ADMIN}/students`, config);
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
        const studentData = document.querySelector(".studentData");
        if (filteredStudents.length <= 0) {
          msgStatus.innerHTML =
            "No Student Found for this Department in the current semester.";
          msgStatus.style.display = "block";
          studentData.style.display = "none";
        } else {
          msgStatus.style.display = "none";
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

  return (
    <adminContext.Provider
      value={{
        addFacultyAction,
        addStudentAction,
        addSubjectAction,
        addAdminAction,
        fetchSubjectAction,
        fetchFacultiesAction,
        fetchStudentsAction,
        subjects: state?.subjects,
        error: state?.error,
        faculties: state?.faculties,
        students: state?.students,
      }}
    >
      {children}
    </adminContext.Provider>
  );
};
