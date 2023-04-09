import React from "react";
import Login from "../Forms/Login";
const Home = () => {
  return (
    <section
      className="m-0 p-0 w-full bg-no-repeat bg-cover h-full"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlbiUyMGFuZCUyMHBhcGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80')",
      }}
    >
      <h1 className="text-center text-xl pt-2 font-bold">Student ERP Portal</h1>
      <div className="flex flex-col items-end mt-5 my-auto">
        <div className="w-11/12 mx-auto md:mr-5 mb-5 md:w-6/12 lg:w-4/12 bg-white p-4 rounded-lg border border-coolGray-200 shadow-md">
          <Login title="Faculty" />
        </div>
        <div className="w-11/12 mx-auto md:mr-5 mb-5 md:w-6/12 lg:w-4/12 bg-white p-4 rounded-lg border border-coolGray-200 shadow-md">
          <Login title="Student" />
        </div>
      </div>
    </section>
  );
};

export default Home;
