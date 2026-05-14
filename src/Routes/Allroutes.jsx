import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../Components/Sidebar";
import Profile from "../pages/Profile";
import Attenance from "../pages/Attenance";
import { Logout } from "../pages/Logout";
import welcomepage from "../pages/Welcome";
import Welcome from "../pages/Welcome";
import { Usercontext } from "../Context/Usercreatecontext";

const Allroutes = () => {
  let {userdetails} =useContext(Usercontext)
  const user = JSON.parse(localStorage.getItem("user"));
  // const adminEmails = ["jack@gmail.com"];
  const isAdmin = userdetails?.role;
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Sidebar />}>
          
          <Route
            index
            element={isAdmin ? <Navigate to="admin"/> : <Navigate to="welcome" />}
          />
          <Route path="welcome" element={<Welcome />} />
          <Route
            path="admin"
            element={
              isAdmin ? <Dashboard /> : <Navigate to="/dashboard/welcome" />
            }
          />

          <Route path="profile" element={<Profile />} />
          <Route path="attenance" element={<Attenance />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </>
  );
};

export default Allroutes;
