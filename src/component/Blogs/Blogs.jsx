import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [userActive, setUserActive] = useState(false);
  useEffect(() => {
    const active = async () => {
      try {
        const token = localStorage.getItem("token"); // Assume token is stored in localStorage after login
        console.log("Token before sending:", token);

        if (!token) {
          console.log("No token found. Please log in.");
          return;
        }
        const response = await fetch("http://localhost:8000/myblogs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
          },
        });
        if (response.ok) {
          setUserActive(true);
        }
      } catch {}
    };
    active();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/blogs");

        if (!response.ok) {
          console.error("Failed to fetch blogs");
          return;
        }

        const data = await response.json(); // Parse the JSON data
        setBlogs(data); // Set the blogs into the state
        console.log(data[0]);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs(); // Call the function
  }, []);

  return (
    <div>
      <div className="flex p-3 pt-10 justify-between sticky top-14 shadow z-10 bg-gray-50">
        <button className="bg-red-400 rounded-lg">
          <NavLink
            to={userActive ? "/createBlogs" : "/login"}
            className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${
                isActive ? "text-orange-700" : "text-gray-700"
              } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }
          >
            Create New
          </NavLink>
        </button>
        <div className="flex item-center">
          <input
            type="search"
            placeholder="Search Blogs"
            className="h-10 rounded-xl text-black border p-3 border-black"
          />

          <div className="flex justify-start p-1 gap-11 pl-5">
            <div className=" flex items-center justify-end">
              <div className="font-semibold">Sort By</div>
              {/* <select
              className="h-10 rounded-xl text-black border p-3 pb-0 pt-0 border-black"
              value={sort}
              onChange={(e) => setSort(e.target.value)} // Updating sort as a string
            >
              {sorting.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select> */}
            </div>

            <div className=" flex items-center justify-end ">
              <div className="font-semibold">Select Language</div>
              {/* <select
              className="h-10 rounded-xl text-black border p-3 pb-0 pt-0 border-black"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select> */}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex justify-evenly flex-wrap bgPage">
        {blogs.map((blog, index) => (
          <div key={index} className="m-3  p-1 w-5/12 bg-gray-400 blogCard ">
            <div className="flex  mb-1">
              <div className="imgDiv h-32">
                <img
                  className="w-full h-full"
                  src={
                    blog.coverImage
                      ? `http://localhost:8000${blog.coverImage}`
                      : "coverImg.jpeg"
                  }
                  alt={blog.title}
                />
              </div>
              <div className="w-4/6 text-start p-2">
                <div className="text-xl font-semibold">{blog.title}</div>
                <div className="text-sm text-gray-600">
                  Category: {blog.category}
                </div>
                <div>Author:{blog.author}</div>
              </div>
            </div>
            <hr />
            <div className="flex flex-col">
              <div className=" flex justify-start">
                <div className="text-start p-1">
                  {(() => {
                    const words = blog.content.split(" ");
                    return words.length > 25
                      ? words.slice(0, 25).join(" ") + "..."
                      : blog.content;
                  })()}
                </div>
              </div>
              <diV className="flex justify-end">
                <button className="rounded-lg bg-gray-300 flex justify-end w-fit p-1  items-end content-end">
                  <Link to={`/blogs/${blog._id}`} state={{ blog }}>
                    View All
                  </Link>
                </button>
              </diV>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Blogs };
