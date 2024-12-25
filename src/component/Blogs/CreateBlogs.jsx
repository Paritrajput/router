import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const CreateBlogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState("");

  const categories = [
    "General",
    "Technology",
    "Health",
    "Business",
    "Lifestyle",
    "Entertainment",
    "Science",
    "Sports",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Create a FormData object to handle image upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    } else {
      formData.append("coverImage", "coverImg.jpeg");
    }

    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("No token found. Please log in.");
        return;
      }

      // Send data to the server with the Authorization header
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
        body: formData,
      });

      console.log(response); // Log response for debugging

      if (response.status === 401) {
        console.log("Unauthorized. Please log in again.");
        setMessage("Unauthorized. Please log in again.");
        return;
      }

      if (response.status === 403) {
        console.log("Forbidden. You do not have permission.");
        setMessage("Forbidden. You do not have permission.");
        return;
      }

      if (!response.ok) throw new Error("Failed to submit blog");

      setMessage("Blog submitted successfully!");
      // Reset form
      setTitle("");
      setContent("");
      setCategory("");
      setCoverImage(null);
    } catch (error) {
      setMessage("Error: " + error.message);
      console.error("Error submitting blog:", error); // Add console error log
    }
  };

  return (
    <div>
      <div className="flex justify-between p-1 bg-black text-white ">
        <h1 className="text-xl font-bold ">Write a Blog</h1>
        <div className="bg-red-900 rounded-md text-white max-sm:p-1 p-2  ">
          <NavLink to="/blogs" className="bg-gray h-3 w-11 ">
            Go To Blogs
          </NavLink>
        </div>
      </div>
      <div className=" mx-auto p-4 ">
        {message && <div className="green">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between max-sm:flex-col max-sm:gap-2 mb-2">
            <div className=" flex w-1/2 max-sm:w-full  items-center">
              <label className="w-20">Blog Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-10/12"
                required
              />
            </div>
            <div className=" flex items-center">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 w-full"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-2 flex flex-col">
            <label className="flex ">Blog Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 w-full min-h-40"
              required
            />
          </div>

          <div className="flex items-center justify-between max-sm:flex-col gap-3">
            <div className=" items-center flex ">
              <label className="bg-gray">Cover Image</label>
              <input
                type="file"
                onChange={(e) => setCoverImage(e.target.files[0])}
                className="border p-2 max-sm:w-2/3 "
              />
            </div>
            <button
              type="submit"
              className="bg-red-900 rounded-md text-white max-sm:p-1 p-2  w-fit"
            >
              Submit Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CreateBlogs };
