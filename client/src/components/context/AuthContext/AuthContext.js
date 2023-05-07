import { createContext, useReducer } from "react";
import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  LOGOUT,
} from "./authActionTypes";
import {
  API_URL_ADMIN,
  API_URL_BASE,
  API_URL_FACULTY,
  API_URL_STUDENT,
} from "../../../utils/apiURL";
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
      // remove from storage
      localStorage.removeItem("userAuth");
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
    // logout
    case LOGOUT:
      // remove from storage
      localStorage.removeItem("userAuth");
      return {
        ...state,
        userAuth: payload,
        error: null,
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
  const loginUserAction = async (formData, title, event) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // Hide the error message
      const loginErr = document.querySelectorAll(".login-error");
      loginErr.forEach((err) => {
        if (!err.classList.contains("hidden")) {
          err.classList.add("hidden");
        }
      });

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
        // redirect
        if (res?.data?.loginType === "admin") {
          window.location.href = "/admin-profile";
        } else if (res?.data?.loginType === "faculty") {
          window.location.href = "/faculty-profile";
        } else {
          window.location.href = "/student-profile";
        }
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error?.response?.data?.message,
      });
      console.log(event.target.parentNode.firstElementChild.lastElementChild);
      event.target.parentNode.firstElementChild.lastElementChild.classList.remove(
        "hidden"
      );
    }
  };

  // Logout Action
  const logoutUserAction = () => {
    const redirect = state?.userAuth?.loginType;
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    // Redirect
    // redirect
    if (redirect === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/";
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

  // Faculty Profile Action
  const fetchFacultyProfileAction = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.get(`${API_URL_FACULTY}/profile`, config);
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
  // Student Profile Action
  const fetchStudentProfileAction = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.get(`${API_URL_STUDENT}/profile`, config);
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
        userAuth: state?.userAuth,
        logoutUserAction,
        fetchAdminProfileAction,
        fetchFacultyProfileAction,
        fetchStudentProfileAction,
        profile: state?.profile,
        error: state?.error,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
