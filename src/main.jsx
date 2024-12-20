import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./component/Home/Home.jsx";
import About from "./component/About/About.jsx";
import Contact from "./component/Contact/Contact.jsx";
import User from "./component/User/User.jsx";
import Github from "./component/Github/Github.jsx";
import { Blogs } from "./component/Blogs/Blogs.jsx";
import Signup from "./signup.jsx";
import Login from "./login.jsx";
import { CreateBlogs } from "./component/Blogs/CreateBlogs.jsx";
import NewsDetail from "./component/Contact/NewsDetail.jsx";
import BlogDetail from "./component/Blogs/BlogDetail.jsx";
import { UserBlogsPage } from "./component/Blogs/myBlogs.jsx";
import { UserProvider } from "./Context/userContext.jsx";
import Profile from "./component/MyProfile/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="user/:id" element={<User />} />
      <Route path="github" element={<Github />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="blogs/:blogId" element={<BlogDetail />} />
      <Route path="news/:newsId" element={<NewsDetail />} />
      <Route path="createBlogs" element={<CreateBlogs />} />
      <Route path="myblogs" element={<UserBlogsPage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
