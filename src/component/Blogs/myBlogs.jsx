import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { UserContext } from "../../Context/userContext";

const UserBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const token = localStorage.getItem("token"); // Assume token is stored in localStorage after login
        console.log("Token before sending:", token);

        if (!token) {
          setError("No token found. Please log in.");
          setIsLoggedIn(false);
          navigate("/login");
          return;
        }
        const response = await fetch("http://localhost:8000/myblogs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
          },
        });

        if (response.status === 401) {
          setError("Unauthorized. Please log in again.");
          setIsLoggedIn(false);
          navigate("/login");
          return;
        }

        const data = await response.json();

        if (response.ok) {
          setBlogs(data);
          setIsLoggedIn(true);
        } else {
          setError(data.message || "Error fetching blogs.");
        }
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      } finally {
        setLoading(false); // Loading is complete
      }
    };

    fetchUserBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between p-3 stickey top-11">
        <h1>My Blogs</h1>
        <button className="bg-red-400 rounded-lg">
          <Link
            to="/createBlogs"
            className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${
                isActive ? "text-orange-700" : "text-gray-700"
              } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }
          >
            Create New
          </Link>
        </button>
      </div>

      {/* Show message and button when no blogs are available */}
      {blogs.length === 0 ? (
        <div className="text-center">
          <p>No blogs found. Start writing your first blog!</p>
          <Link to="/createBlogs">
            <button className="rounded-lg bg-gray-300 p-2">
              Write New Blog
            </button>
          </Link>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export { UserBlogsPage };
