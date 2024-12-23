import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/userContext";

import { useNavigate } from "react-router-dom";

function Profile() {
  const { setIsLoggedIn } = useContext(UserContext);
  const { isLoggedIn } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");

    console.log("you logged out");
  };

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-gray-100 text-gray-800"
          : "bg-gray-800 text-gray-100"
      } w-full mx-auto p-8 rounded-lg shadow-lg transition-all`}
    >
      <div className="flex items-center justify-between  mb-8">
        <div className="flex items-center">
          <img
            src="Profile.png"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mr-4"
          />
          <h2 className="text-2xl font-semibold">
            {`Username: ${isLoggedIn ? user.username : "guest"}`}
          </h2>
        </div>
        <button
          onClick={logout}
          className=" p-2 text-white bg-red-500 font-bold rounded-md hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </div>
      <div className="mt-6 flex gap-3">
        <div className="flex justify-between items-center py-2 cursor-pointer hover:text-blue-500 transition-colors">
          <span>Mode</span>
          <span className="text-xl cursor-pointer" onClick={toggleTheme}>
            {theme === "light" ? "🌞" : "🌙"}
          </span>
        </div>
        <div
          onClick={() => navigate("/myblogs")}
          className="py-2 cursor-pointer hover:text-blue-500 transition-colors"
        >
          My Blogs
        </div>
      </div>
    </div>
  );
}

export default Profile;
