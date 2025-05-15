import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import UserPanel from "./pages/UserPanel";
import "./App.css";
import { getProfile } from "./pages/features/authSlice";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import UpdateUser from "./pages/UpdateUser";
import AddPost from "./pages/user/AddPost";
import MyPosts from "./pages/user/MyPosts";
import SinglePost from "./components/SinglePost";
import UpdatePost from "./pages/user/UpdatePost";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/single-post/:id" element={<SinglePost />} />
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<UserPanel />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/postlarim" element={<MyPosts />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminPanel />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
