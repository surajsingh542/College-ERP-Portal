import { createContext, useReducer } from "react";
import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
} from "./authActionTypes";
import { API_URL_ADMIN, API_URL_BASE } from "../../../utils/apiURL";
// Auth Context
export const authContext = createContext();

// INITIAL STATE
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  profile: null,
  error: null,
  loading: false,
};

// Auth Reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("userAuth", JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        userAuth: payload,
        error: null,
      };
    case LOGIN_FAILED:
      console.log(payload);
      return {
        ...state,
        loading: false,
        userAuth: null,
        error: payload,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        profile: payload,
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    default:
      return state;
  }
};

// Auth Provider
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Login Action
  const loginUserAction = async (formData, title) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${API_URL_BASE}/${title.toLowerCase()}/login`,
        formData,
        config
      );
      if (res?.data?.status === "success") {
        console.log("Inside Success");
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };

  // Admin Profile Action
  const fetchAdminProfileAction = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.get(`${API_URL_ADMIN}/profile`, config);
      console.log(res);
      if (res?.data?.status === "success") {
        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          payload: res.data.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  return (
    <authContext.Provider
      value={{
        loginUserAction,
        userAuth: state,
        fetchAdminProfileAction,
        profile: state?.profile,
        error: state?.error,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
