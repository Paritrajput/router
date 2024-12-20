// NewsDetail.jsx
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
      <button
        onClick={() => navigate(-1)}
        className="back-button p-1 bg-red-700 flex justify-start m-1 rounded absolute z-10"
      >
        Go Back
      </button>
      <div className="news-content flex flex-col">
        <div className="w-full h-72 relative">
          <img
            src={
              blog.coverImage
                ? `http://localhost:8000${blog.coverImage}`
                : "/coverImg.jpeg"
            }
            alt={blog.title}
            className="max-h-72 w-full absolute"
          />

          <div className="w-full  h-16  absolute z-10 backdrop-blur bottom-0 blur-sm"></div>
          <div className="flex text-white absolute justify-center text-center w-full font-bold pb-3 mt-3 bottom-0 z-20 ">
            <h1 className="text-2xl text-white  text-center font-bold  ">
              {blog.title}
            </h1>
          </div>
        </div>
        <div className="p-3">
          <div>
            <p className="text-xl text-start ">
              {blog.content || "No content available"}
            </p>
          </div>
          <p className="mb-0 text-start">
            <strong>Author:</strong> {"Unknown"}
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
