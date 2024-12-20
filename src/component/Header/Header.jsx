import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

export default function Header() {
  const navigate = useNavigate();
  const [userActive, setUserActive] = useState(null);
  const { isLoggedIn } = useContext(UserContext);
  console.log(isLoggedIn);
  const { theme } = useContext(UserContext);

  useEffect(() => {
    const active = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found. Please log in.");
          setUserActive(false);
          return;
        }
        const response = await fetch("http://localhost:8000/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setUserActive(true);
        } else {
          console.log("Token is invalid or expired");
          setUserActive(false);
        }
      } catch (error) {
        console.log("Error while validating token:", error);
        setUserActive(false);
      }
    };
    active();
  }, [isLoggedIn]);

  return (
    <header className="shadow sticky z-50 top-0">
      <nav
        className={`${
          theme === "light" ? "bg-white text-black" : "bg-black text-white"
        } border-gray-200 px-4  py-2.5`}
      >
        <div className="flex  justify-between items-center mx-auto max-w-screen-2xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>

          <div
            className="flex justify-between items-center lg:flex lg:w-auto "
            id="mobile-menu-2"
          >
            <ul className="flex  mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
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
                    `block py-2 pr-4 pl-3 duration-200 ${
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
                  // onClick={async () => {
                  //   try {
                  //     const token = localStorage.getItem("token");

                  //     if (!token) {
                  //       console.log("No token found. Please log in.");
                  //       setUserActive(false);
                  //       return;
                  //     }
                  //     const response = await fetch(
                  //       "http://localhost:8000/myblogs",
                  //       {
                  //         method: "GET",
                  //         headers: {
                  //           Authorization: `Bearer ${token}`,
                  //         },
                  //       }
                  //     );
                  //     if (response.ok) {
                  //       setUserActive(true);
                  //     } else {
                  //       console.log("Token is invalid or expired");
                  //       setUserActive(false);
                  //     }
                  //   } catch (error) {
                  //     console.log("Error while validating token:", error);
                  //     setUserActive(false);
                  //   }

                  //   if (userActive) {
                  //     navigate("/myblogs");
                  //   } else {
                  //     navigate("/login");
                  //   }
                  // }}
                  // to={isLoggedIn ? "/myblogs" : "/login"}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  My Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/github"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Github
                </NavLink>
              </li>
            </ul>
          </div>
          {userActive ? (
            <div className="  h-3/4 flex  justify-end">
              <div className="rounded-2xl bg gray-400">
                <Link to="profile">
                  <img src="Profile.png" className="w-10" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center lg:order-2">
              <Link
                to="login"
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log in
              </Link>
              <Link
                to="signup"
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
