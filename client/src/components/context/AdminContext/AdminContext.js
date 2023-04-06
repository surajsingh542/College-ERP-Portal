import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { authContext } from "../AuthContext/AuthContext";
import { API_URL_ADMIN } from "../../../utils/apiURL";
import {
  ADD_FACULTY_FAIL,
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

  //   get subjects
  const fetchSubjectAction = async () => {
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
        dispatch({
          type: FETCH_SUBJECT_SUCCESS,
          payload: res?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_SUBJECT_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  return (
    <adminContext.Provider
      value={{
        addFacultyAction,
        fetchSubjectAction,
        subjects: state?.subjects,
        error: state?.error,
      }}
    >
      {children}
    </adminContext.Provider>
  );
};
