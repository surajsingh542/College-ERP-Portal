import React, { useContext, useState } from "react";
import { authContext } from "../context/AuthContext/AuthContext";

const Login = (props) => {
  const { loginUserAction, userAuth, error } = useContext(authContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    loginUserAction(formData, props.title, e);
    if (userAuth?.error) {
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="text-center ">
        <h1 className=" font-medium text-xl">{props.title}</h1>
        <p className="login-error hidden">
          {error && <span className="text-red-500 ">{error}</span>}
        </p>
      </div>

      <form onSubmit={submitHandler}>
        <label for="email" className="block mb-2 text-coolGray-800 font-medium">
          Email
        </label>
        <input
          className="appearance-none block w-full p-3 my-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          type="text"
          name="email"
          onChange={onChangeHandler}
          value={formData.email}
          required
        />
        <label
          for="password"
          className="block mb-2 text-coolGray-800 font-medium"
        >
          Password
        </label>
        <input
          type="password"
          className="appearance-none block w-full p-3 my-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onChange={onChangeHandler}
          name="password"
          value={formData.password}
          required
        />
        <button
          className="inline-block py-3 my-3 px-7 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
