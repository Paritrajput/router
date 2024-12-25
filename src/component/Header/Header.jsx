import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

export default function Header() {
  const navigate = useNavigate();
  const [userActive, setUserActive] = useState(null);
  const { isLoggedIn } = useContext(UserContext);
  const { setIsLoggedIn } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);

  console.log("user Active :", isLoggedIn);
  const { theme } = useContext(UserContext);

  useEffect(() => {
    const active = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found. Please log in.");
          setIsLoggedIn(false);
          return;
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setIsLoggedIn(true);
        } else {
          console.log("Token is invalid or expired");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("Error while validating token:", error);
        setIsLoggedIn(false);
      }
    };
    active();
  }, [setIsLoggedIn]);

  return (
    <header className="shadow sticky z-50 top-0">
      <nav
        className={`${
          theme === "light" ? "bg-white text-black" : "bg-black text-white"
        } border-gray-200 sm:px-1 h-24 md:h-auto pt-1.5 pb-2 sm:py-2.5`}
      >
        <div className="md:flex h-full justify-between  items-center mx-auto max-w-screen-2xl">
          <div className="absolute pt-1 md:pt-0 md:relative top-2 md:top-1 left-2">
            <img
              src="/logo_newBase.png"
              className="mr-3 h-8 sm:h-10 md:h-12"
              alt="Logo"
            />
          </div>

          <div
            className="flex w-full md:w-auto md:justify-between items-end h-full md:items-center  "
            id="mobile-menu-2"
          >
            <ul className="flex justify-evenly mt-4 w-full items-end md:items-center font-medium gap-2 md:max-ml:gap-1 lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block p-0 md:py-2 md:pr-4 md:pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/news"
                  className={({ isActive }) =>
                    `block p-0 md:py-2 md:pr-4 md:pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  News
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    `block p-0 md:py-2 md:pr-4 md:pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Blogs
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="myblogs"
                  className={({ isActive }) =>
                    `block p-0 md:py-2 md:pr-4 md:pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  My Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block p-0 md:py-2 md:pr-4 md:pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          <div
            className={` ${
              isLoggedIn ? "opacity-100 contents" : "hidden opacity-100"
            } h-3/4 flex absolute  md:relative top-2 right-2 justify-end`}
          >
            <div className="rounded-2xl absolute  md:relative top-2 right-2 bg gray-400">
              <Link to="profile">
                <img src="/Profile.png" className="w-8 sm:w-10" />
              </Link>
            </div>
          </div>

          <div
            className={`${
              isLoggedIn ? "hidden opacity-0" : "opacity-100 flex"
            } items-center lg:order-2 absolute  md:relative top-2 right-2`}
          >
            <Link
              to="login"
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg py-2 px-1 text-sm sm:px-4 lg:px-5 sm:py-2 lg:py-2.5 mr-1 sm:mr-2 focus:outline-none"
            >
              Log in
            </Link>
            <Link
              to="signup"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm sm:px-4 lg:px-5 sm:py-2 lg:py-2.5 px-2 py-1 mr-2 focus:outline-none"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
