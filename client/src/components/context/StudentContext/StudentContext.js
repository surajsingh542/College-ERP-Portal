import { createContext, React, useContext, useReducer } from "react";
import { authContext } from "../AuthContext/AuthContext";
import axios from "axios";
import { API_URL_STUDENT } from "../../../utils/apiURL";
import { FETCH_MARKS_FAIL, FETCH_MARKS_SUCCESS } from "./studentActionTypes";

export const StudentContext = createContext();

// INITIAL_STATE
const INITIAL_STATE = {
  marks: [],
  error: null,
};

// Faculty Reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_MARKS_SUCCESS:
      return {
        ...state,
        marks: payload,
        error: null,
      };
    case FETCH_MARKS_FAIL:
      return {
        ...state,
        marks: [],
        error: payload,
      };

    default:
      return state;
  }
};

export const StudentContextProvider = ({ children }) => {
  const { userAuth } = useContext(authContext);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Get Marks
  const fetchMarksAction = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const res = await axios.get(`${API_URL_STUDENT}/marks`, config);
      console.log("Response recieved", res);
      if (res?.data?.status === "success") {
        dispatch({
          type: FETCH_MARKS_SUCCESS,
          payload: res?.data?.data?.marks,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_MARKS_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  return (
    <StudentContext.Provider
      value={{
        fetchMarksAction,
        marks: state?.marks,
        error: state?.error,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
