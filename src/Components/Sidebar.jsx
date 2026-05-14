import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../Services/firebase";
import { Usercontext } from "../Context/Usercreatecontext";

const formatTime = (date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

const handleTime = () => {
  return formatTime(new Date());
};

const Sidebar = () => {
  const [Time, setTime] = useState(handleTime());
  const [showSidebar,setShowSidebar]=useState(false)
   
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(handleTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
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
let {userdetails} =useContext(Usercontext)
const user = JSON.parse(localStorage.getItem("user"));
const userEmail = user?.email?.toLowerCase();
// const adminEmails = ["jack@gmail.com"];
// const isAdmin = adminEmails.includes(userEmail);
const isAdmin = userdetails?.role;
const userName = userEmail?.split("@")[0] || "user";
  return (
    <div className="wrapper d-flex align-items-stretch">
      <div className={`sidebar ${showSidebar ? "active":""}`}>
        <h2 className="h6 text-center pt-2">User Dashbroad</h2>
        <div className="side_user_details">
          <h2>{userName}</h2>
          <p>Welcome to our dashboard</p>
        </div>
        <ul>
          {isAdmin && (
          <li className="nav-links">
            <Nav.Link as={Link} to="admin">
              Admin
            </Nav.Link>
          </li>
          )}

          

          <li className="nav-links">
            <Nav.Link as={Link} to="profile">
              Profile
            </Nav.Link>
          </li>

          <li className="nav-links">
            <Nav.Link as={Link} to="attenance">
              Attenance
            </Nav.Link>
          </li>

          <li className="nav-links">
            <button
              className="nav-link"
              style={{ width: "176px", textAlign: "start" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="top_content">
            <div className="left">
              <h2>Dashboard</h2>
            </div>
            <div className=" d-flex align-items-center gap-3">
              <span className="live_clock">
                <i className="fa-regular fa-clock"></i>
                {Time}
              </span>
              <button className="menu-toggle"onClick={()=>setShowSidebar(!showSidebar) } >
                <i className="fa-solid fa-bars"></i>
              </button>
            </div> 
          </div>  
        </div>
        <div className="main-content">
          <Outlet />
          {/* child components rendering like eg: user.jsx,admin.jsx */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
