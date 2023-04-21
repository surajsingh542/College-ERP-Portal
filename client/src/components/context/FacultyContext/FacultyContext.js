import { createContext, React, useContext, useReducer } from "react";
import { authContext } from "../AuthContext/AuthContext";
import axios from "axios";
import { API_URL_FACULTY } from "../../../utils/apiURL";

export const FacultyContext = createContext();

// INITIAL_STATE
const INITIAL_STATE = {
  students: [],
  subjectsAssigned: [],
  error: null,
};

// Faculty Reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export const FacultyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const markAttendance = async (formData) => {};

  const fetchStudents = async (dept, semester) => {};
  

  return (
    <FacultyContext.Provider value={""}>{children}</FacultyContext.Provider>
  );
};
