import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../Components/Sidebar";
import Profile from "../pages/Profile";
import Attenance from "../pages/Attenance";

const Allroutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="admin" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="attenance" element={<Attenance />} />
          <Route path="logout" element={<h2>Logout Page</h2>} />
        </Route>
      </Routes>
    </>
  );
};

export default Allroutes;
