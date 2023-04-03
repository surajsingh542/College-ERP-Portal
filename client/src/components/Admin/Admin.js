import React from "react";
import Login from "../Forms/Login";
const Admin = () => {
  return (
    <section className="flex justify-center items-center h-screen ">
      <div className="my-auto mx-auto bg-white border rounded-lg border-coolGray-200 shadow-md p-5  w-11/12  md:w-7/12 lg:w-4/12">
        <Login title="Admin" />
      </div>
    </section>
  );
};

export default Admin;
