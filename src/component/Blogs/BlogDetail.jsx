import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

const BlogDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useContext(UserContext);
  const blog = location.state?.blog;

  if (!blog) {
    return <div>No blog found</div>;
  }

  return (
    <div
      className={`${
        theme === "light" ? "bg-white" : "bg-gray-700 text-white"
      } pb-3`}
    >
      <img
        className="absolute h-7 z-10 "
        src="/icons-back.png"
        onClick={() => navigate(-1)}
      />
      {/* <button
        onClick={() =>
          window.history.state ? navigate(-1) : navigate("/blogs")
        }
        className="back-button p-1 bg-red-900 flex justify-start m-1 rounded absolute z-10"
      >
        Go Back
      </button> */}
      <div className="news-content flex flex-col">
        <div className="w-full h-56 sm:h-72 bg-black   relative">
          <div className="bg-black opacity-20 z-50">
            <img
              src={
                blog.coverImage
                  ? `${import.meta.env.VITE_API_URL}${blog.coverImage}`
                  : "/coverImg.jpeg"
              }
              alt={blog.title}
              className="sm:max-h-72 w-full absolute max-sm:h-full"
            />
          </div>

          <div className="w-full  h-20  absolute z-10 bottom-0 h-full ">
            <div className="flex text-white absolute justify-center items-center text-center w-full h-full font-bold pb-3 mt-3 bottom-0 z-20 ">
              <h1 className="sm:text-4xl text-2xl text-white z-40 font-bold  ">
                {blog.title}
              </h1>
            </div>
          </div>
        </div>
        <div className="p-3">
          <div>
            <p className="text-md sm:text-xl text-start ">
              {blog.content || "No content available"}
            </p>
          </div>
          <p className="mb-0 text-start">
            <strong>Author:</strong>
            {blog.author ? `${blog.author}` : "Unknown"}
          </p>
        </div>
        {/* <p>
          <strong>Source:</strong> {news.source.name || "Unknown"}
        </p> */}
        {/* <p>
          <strong>Published At:</strong>{" "}
          {new Date(blog.publishedAt).toLocaleDateString()}
        </p> */}

        {/* <a href={news.url} target="_blank" rel="noopener noreferrer">
          Read the full article
        </a> */}
      </div>
    </div>
  );
};

export default BlogDetail;
