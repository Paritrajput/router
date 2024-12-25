import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { UserContext } from "../../Context/userContext";
import { NavLink } from "react-router-dom";

const UserBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const token = localStorage.getItem("token"); // Assume token is stored in localStorage after login

        if (!token) {
          setError("No token found. Please log in.");
          setIsLoggedIn(false);
          navigate("/login");
          return;
        }
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/myblogs`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
            },
          }
        );

        if (response.status === 401) {
          setError("Unauthorized. Please log in again.");
          setIsLoggedIn(false);
          navigate("/login");
          return;
        }

        const data = await response.json();

        if (response.ok) {
          setBlogs(data);
        } else {
          setError(data.message || "Error fetching blogs.");
        }
      } catch (error) {
        console.error("Error fetching user blogs:", error);
        return (
          <>
            <div className="text-center flex flex-col gap-5 justify-center p-5 m-3">
              <img className="h-44 w-auto m-auto" src="404img.png" />
            </div>
          </>
        );
      } finally {
        setLoading(false); // Loading is complete
      }
    };

    fetchUserBlogs();
  }, []);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  if (loading) {
    return (
      <div className="flex w-fit items-center justify-center">
        <span>Loading...</span>
        <img src="loading.gif"></img>
      </div>
    );
  }

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

  return (
    <div>
      {isLoggedIn ? (
        <>
          <div className="flex p-1 sm:p-3 pt-3 justify-between flex-col sm:flex-row  sticky top-20 md:top-16 md:pt-5 lg:top-16 sm:top-24 shadow z-10 bg-black text-white">
            <div className="font-bold text-2xl mr-2 mb-2 sm:text-3xl md:text-4xl ">
              My Blogs
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

          {filteredBlogs.length === 0 ? (
            <div className=" flex justify-center flex-col text-center p-5 ">
              <img className="h-52 w-52 m-auto" src="/oops_notfound.webp"></img>
              <p className="text-xl mb-3 ">
                No blogs found. Start writing your first blog!
              </p>
              <Link to="/createBlogs">
                <button className="rounded-lg bg-gray-300 p-2">
                  Write New Blog
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex p-2 sl:p-0 justify-evenly flex-col sl:flex-row sl:flex-wrap bgPage">
              {filteredBlogs.map((blog, index) => (
                <div
                  key={index}
                  className="sl:m-3 m-1 p-1 w-full sl:w-5/12 bg-gray-400  blogCard "
                >
                  <Link to={`/blogs/${blog._id}`} state={{ blog }}>
                    <div className="flex  mb-1">
                      <div
                        className="imgDiv sl:h-32 h-20 w-20
              "
                      >
                        <img
                          className="w-full h-full"
                          src={
                            blog.coverImage
                              ? `${import.meta.env.VITE_API_URL}${
                                  blog.coverImage
                                }`
                              : "coverImg.jpeg"
                          }
                          alt={blog.title}
                        />
                      </div>
                      <div className="w-4/6 text-start pl-2 mx-sm:pl-0 text-wrap text-ellipsis text-balance blog-title">
                        <div className="sl:text-xl text-md font-semibold">
                          {blog.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          Category: {blog.category}
                        </div>
                        {blog.author && <div>Author:{blog.author}</div>}
                      </div>
                    </div>
                  </Link>
                  <hr />
                  <div className="flex flex-col  max-sm:hidden">
                    <div className=" flex justify-start">
                      <div className=" text-start p-1 ">
                        {(() => {
                          const words = blog.content.split(" ");
                          return words.length > 25
                            ? words.slice(0, 25).join(" ") + "..."
                            : blog.content;
                        })()}
                      </div>
                    </div>
                    <diV className="flex justify-end">
                      <button className="rounded-lg bg-gray-300 flex justify-end w-fit p-1 max-sm:hidden items-end content-end">
                        <Link to={`/blogs/${blog._id}`} state={{ blog }}>
                          View All
                        </Link>
                      </button>
                    </diV>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center texl-xl sl:text-3xl h-32 font-semibold">
          You are not logged in. Please
          <Link to="../login" className="ml-1 text-red-800 ">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export { UserBlogsPage };
