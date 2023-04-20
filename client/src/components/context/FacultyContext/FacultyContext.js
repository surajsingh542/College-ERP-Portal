import { createContext, React, useContext, useReducer } from "react";

export const FacultyContext = createContext();

// INITIAL_STATE
const INITIAL_STATE = {
  students: [],
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
  return (
    <FacultyContext.Provider value={""}>{children}</FacultyContext.Provider>
  );
};
