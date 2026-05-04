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
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;