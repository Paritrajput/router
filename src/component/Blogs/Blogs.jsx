import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Blogs.css";
import { UserContext } from "../../Context/userContext";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const { isLoggedIn } = useContext(UserContext);

  // useEffect(() => {
  //   const active = async () => {
  //     try {
  //       const token = localStorage.getItem("token"); // Assume token is stored in localStorage after login

  //       if (!token) {
  //         console.log("No token found. Please log in.");
  //         return;
  //       }
  //       const response = await fetch("import.meta.env.VITE_API_URL/myblogs", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
  //         },
  //       });
  //       if (response.ok) {
  //         setUserActive(true);
  //       }
  //     } catch {}
  //   };
  //   active();
  // }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`);

        if (!response.ok) {
          console.error("Failed to fetch blogs");
          return;
        }

        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter blogs based on query
    const filtered = blogs.filter((blog) => {
      return (
        (blog.title?.toLowerCase() || "").includes(query) ||
        (blog.content?.toLowerCase() || "").includes(query) ||
        (blog.author?.toLowerCase() || "").includes(query) ||
        (blog.category?.toLowerCase() || "").includes(query)
      );
    });

    setFilteredBlogs(filtered);
  };
  if (loading) {
    return (
      <div className="flex w-full mt-5 items-center justify-center">
        <span>Loading...</span>
        <img src="loading.gif"></img>
      </div>
    );
  }

  return (
    <div>
      <div className="flex p-1 sm:p-3 pt-3 justify-between flex-col sm:flex-row  sticky top-20 md:top-16 md:pt-5 lg:top-16 sm:top-24 shadow z-10 bg-black text-white">
        <div className="font-bold text-2xl mr-2 mb-2 sm:text-3xl md:text-4xl ">
          Blogs
        </div>

        <div className="flex gap-3 justify-between  item-center">
          <input
            type="search"
            placeholder="Search Blogs"
            value={searchQuery}
            onChange={handleSearch}
            className="h-10 rounded-xl w-36 sm:w-auto text-black border p-3 border-black"
          />
          <button className="bg-red-900 text-white p-1  rounded-lg">
            <NavLink
              to={isLoggedIn ? "/createBlogs" : "/login"}
              className={({ isActive }) =>
                `block p-1 duration-200 ${
                  isActive ? "text-white" : "text-white"
                } border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              Create New
            </NavLink>
          </button>
        </div>
      </div>
      <hr />
      <div className="flex p-2 sl:p-0 justify-evenly flex-col sl:flex-row sl:flex-wrap bgPage">
        {filteredBlogs.map((blog, index) => (
          <div
            key={index}
            className="sl:m-3 m-1 p-1 w-full sl:w-5/12 bg-gray-400  blogCard "
          >
            <div className="flex  mb-1">
              <div
                className="imgDiv sl:h-32 h-20
              "
              >
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
              <div className="w-4/6 text-start p-2 text-wrap text-ellipsis text-balance blog-title">
                <div className="sl:text-xl text-md font-semibold">
                  {blog.title}
                </div>
                <div className="text-sm text-gray-600">
                  Category: {blog.category}
                </div>
                <div>Author:{blog.author}</div>
              </div>
            </div>
            <hr />
            <div className="flex flex-col">
              <div className=" flex justify-start">
                <div className=" text-start p-1">
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
