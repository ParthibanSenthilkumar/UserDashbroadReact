import React from 'react'
import {  Link, Outlet } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const Sidebar = () => {
  return (
    <>
    <div className="wrapper d-flex align-items-stretch">
    <div className="sidebar">
        <ul>
            <li>
              <div className="user-logo">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="logo"
                />
              </div>
            </li>
            <li className="nav-links">
              <Nav.Link as={Link} to='admin'>
                <i className="fa-solid fa-user-gear"></i> Admin
              </Nav.Link>
            </li>
            <li className="nav-links">
              <Nav.Link as={Link} to="profile">
                <i className="fa-solid fa-user-gear"></i> Profile
              </Nav.Link>
            </li>
            <li className="nav-links">
              <Nav.Link as={Link} to="attenance">
                <i className="fa-solid fa-user-gear"></i> Attenance
              </Nav.Link>
            </li>
            <li className="nav-links">
              <Nav.Link as={Link} to="logout">
                <i className="fa-solid fa-user-gear"></i> Logout
              </Nav.Link>
            </li>
        </ul>
    </div>
        <div className="main">
          <div className="topbar">
            <h2>Dashboard</h2>
          </div>
          <div className="main-content">
            <Outlet />
            {/* child components rendering like eg: user.jsx,admin.jsx */}
          </div>
        </div>
      </div>
    </>
  )
}  

export default Sidebar;