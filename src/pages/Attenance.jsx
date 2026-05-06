import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Webcam from "react-webcam";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { createAttendance, updateAttendance } from "../Services/Api";

// Fix Leaflet icon
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// Time function
  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const handleTime = () => {
    return formatTime(new Date());
  };

const Attenance = () => {
  const [position, setPosition] = useState(null);
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [workingHours, setWorkingHours] = useState("");

  const [time, setTime] = useState(handleTime());

  const handleClose = () => setShow(false);

  const handleShow = () => {
    getLocation();
    setShow(true);
  };


  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(handleTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  localStorage.getItem("loginId");
}, []);

  useEffect(() => {
    const storedLogin = localStorage.getItem("currentLoginTime");
    const storedLogout = localStorage.getItem("logoutTime");
    const storedWork = localStorage.getItem("workingHours");

    if (storedLogin) setLoginTime(new Date(storedLogin));
    if (storedLogout) setLogoutTime(new Date(storedLogout));
    if (storedWork) setWorkingHours(storedWork);
  }, []);

  // Location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
  };

  // // Capture image
  const handleCapture = () => {
    const capImage = webcamRef.current.getScreenshot();
    setImage(capImage);
  };

  // LOGIN BUTTON CLICK
  const handleLoginClick = () => {
    handleShow();
  };

  // SAVE (after capture)
 let storedUser = localStorage.getItem("user"); 
let userObj = JSON.parse(storedUser);          
let userId = userObj?.uid; 

const handleSave = async () => {
  try {
    if (localStorage.getItem("currentAttendanceId")) {
      alert("Already logged in!");
      return;
    }

    const currentTime = new Date();

    const attendanceData = {
      userId: userId,
      latitude: position?.[0],
      longitude: position?.[1],
      loginTime: currentTime.toISOString(),
      logoutTime: null,
      workingHours: "",
      image: image,
      status: status,
    };

    const recordId = await createAttendance(attendanceData);

    //store only CURRENT session
    localStorage.setItem("currentAttendanceId", recordId);
    localStorage.setItem("currentLoginTime", currentTime.toISOString());
    

    setLoginTime(currentTime);
    setLogoutTime(null);
    setWorkingHours("");

    handleClose();
  } catch (err) {
    console.error(err);
  }
};

  // LOGOUT
const handleLogout = async () => {
  try {
    const attendanceId = localStorage.getItem("currentAttendanceId");

    if (!attendanceId) {
      alert("No active session!");
      return;
    }

    const currentTime = new Date();
    const loginTime = new Date(localStorage.getItem("currentLoginTime"));

    const diff = currentTime - loginTime;

    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff / (1000 * 60)) % 60);

    const workString = `${hrs}h ${mins}m`;

    const updateData = {
      logoutTime: currentTime.toISOString(),
      workingHours: workString,
    };

    await updateAttendance(updateData, attendanceId);

    setLogoutTime(currentTime);
    setWorkingHours(workString);
    localStorage.setItem("logoutTime", currentTime.toISOString());
    localStorage.setItem("workingHours", workString);
    // clear ONLY current session
  localStorage.removeItem("currentAttendanceId");


  } catch (err) {
    console.error(err);
  }
};

  return (
    <>
      <div className="login-card">
        <h1>Check-In Dashboard</h1>
        <h3 className="time_counter">{time}</h3>
        <div className="form-item">
          <label className="text-start mt-3">WORK MODE</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Select Your Work Mode">Select Your Work Mode</option>
          <option value="Work From Home">Work From Home</option>
          <option value="Office">Office</option>
          <option value="Remote">Remote</option>
        </select>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="status_box">
            <label >Login</label>
            <span className="login-time">{loginTime ? loginTime.toLocaleTimeString(): "--"}</span>
            <span className="login-date">{loginTime ? loginTime.toLocaleDateString() : "Not Login"}</span>
          </div>
          <div className="status_box">
            <label >Logout</label>
            <span className="login-time">{logoutTime ? logoutTime.toLocaleTimeString(): "--"}</span>
            <span  className="login-date">{logoutTime ? logoutTime.toLocaleDateString() : "Not Logout"}</span>
          </div>
        </div>
        <div className="status_box my-4 "style={{maxWidth:"100%"}} >
          <label>Working Hours</label> 
          <span  className="login-time">{workingHours || "--"}</span>
        </div>
        <Button className="btn-gradient w-100"
          onClick={loginTime && !logoutTime ? handleLogout : handleLoginClick}
          >
          {loginTime && !logoutTime ? "Logout" : "Login"}
        </Button>
        
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />

        <Modal.Body>
         <Webcam ref={webcamRef} screenshotFormat="image/jpeg" width="100%" />
          {image && (
            <div className="capture-preview">
              <img src={image} alt="captured" width="100%" />
              <div
                style={{
                  padding: "12px",
                  textAlign: "center",
                  background: "#f0f4ff",
                  color: "#667eea",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Photo captured successfully
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleCapture}>Capture</Button>
          <Button onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Attenance;
