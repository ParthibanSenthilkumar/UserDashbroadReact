import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../Services/firebase";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper d-flex align-items-stretch">
      <div className="sidebar">
        <ul>
          <li className="nav-links">
            <Nav.Link as={Link} to="admin">Admin</Nav.Link>
          </li>

          <li className="nav-links">
            <Nav.Link as={Link} to="profile">Profile</Nav.Link>
          </li>

          <li className="nav-links">
            <Nav.Link as={Link} to="attenance">Attenance</Nav.Link>
          </li>

          <li className="nav-links">
            <button className="nav-link" style={{ width:"176px", textAlign:"start"}} onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

        <div className="main">
          <div className="topbar">
            <h2>Dashboard</h2>
          </div>
          <div className="main-content">
            <Outlet />{" "}
            {/* child components rendering like eg: user.jsx,admin.jsx */}
          </div>
        </div>
    </div>
  );
};

export default Sidebar;