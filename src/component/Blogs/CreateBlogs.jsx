import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const CreateBlogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState("");

  const categories = [
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
      console.log("Token before sending:", token); // Debugging: Ensure token exists

      if (!token) {
        setMessage("No token found. Please log in.");
        return;
      }

      // Send data to the server with the Authorization header
      const response = await fetch("http://localhost:8000/blog", {
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
      <div className="flex bg-gray-300 justify-between p-1 ">
        <h1 className="text-xl font-bold ">Write a Blog</h1>
        <div className="bg-blue-500 text-white p-2  ">
          <NavLink to="/blogs" className="bg-gray h-3 w-11 ">
            Go To Blogs
          </NavLink>
        </div>
      </div>
      <div className=" mx-auto p-4 ">
        {message && <div className="green">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-2">
            <div className=" flex w-1/2 items-center">
              <label>Blog Title</label>
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
          <div className="mb-2 flex bg-gray-300 flex-col">
            <label className="flex ">Blog Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 w-full min-h-40"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <div className=" items-center flex">
              <label>Cover Image (optional)</label>
              <input
                type="file"
                onChange={(e) => setCoverImage(e.target.files[0])}
                className="border p-2 "
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2  w-fit">
              Submit Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CreateBlogs };
