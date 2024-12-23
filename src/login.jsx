import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Context/userContext.jsx";
import { useContext } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Backend response:", data);
      if (response.ok) {
        // Store the JWT token in localStorage
        localStorage.setItem("token", data.accessToken);
        console.log(data);
        console.log(data.username);

        setSuccess("Login successful!");
        setEmail("");
        setPassword("");
        setUser(data.username);
        setIsLoggedIn(true);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        console.error(data.message || "Login failed");
      }
      // Clear inputs after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded py-2 px-3"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
        <span className="mt-4">
          {" "}
          Don't have account?
          <a href="/signup" className="text-red-700">
            Sign Up
          </a>
        </span>
      </div>
    </div>
  );
};

export default Login;
