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
const handleTime = () => {
  const time = new Date();
  return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
};

const Attenance = () => {
  const [position, setPosition] = useState(null);
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("Work From Home");

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
  const handleSave = async () => {
    try {
      const currentTime = new Date();

      // if (!position || !image) {
      //   alert("Capture image and location required!");
      //   return;
      // }
      console.log("loginId:", localStorage.getItem("loginId"));

      const attendanceData = {
        latitude: position?.[0],
        longitude: position?.[1],
        loginTime: currentTime.toISOString(),
        logoutTime: null,
        workingHours: "",
        image: image,
        status: status,
      };

      const recordId = await createAttendance(attendanceData);
      console.log(recordId,'resposnse id');
      
      // Store for logout
      localStorage.setItem("attendanceId", recordId);
      localStorage.setItem("currentLoginTime", currentTime.toISOString());
      localStorage.setItem("attendanceLoginId", localStorage.getItem("loginId"));

      setLogoutTime(null);
      setWorkingHours("");
      localStorage.removeItem("logoutTime");
      localStorage.removeItem("workingHours");

      setLoginTime(currentTime);
      handleClose();
    } catch (err) {
      console.error("Error saving attendance:", err);
    }
  };

  // LOGOUT
const handleLogout = async () => {
  try {
    const attendanceId = localStorage.getItem("attendanceId");

    if (!attendanceId) {
      alert("Please login first!");
      return;
    }

    const currentTime = new Date();
    const storedLoginTime = localStorage.getItem("currentLoginTime");

    const login = new Date(storedLoginTime);
    const diff = currentTime - login;

    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff / (1000 * 60)) % 60);

    const workString = `${hrs}h ${mins}m`;

    const updateData = {
      logoutTime: currentTime.toISOString(),
      workingHours: workString,
    };

    await updateAttendance(updateData, attendanceId);

    // SAVE for refresh
    localStorage.setItem("logoutTime", currentTime.toISOString());
    localStorage.setItem("workingHours", workString);

    setLogoutTime(currentTime);
    setWorkingHours(workString);

    // clear
    localStorage.removeItem("attendanceId");
    localStorage.removeItem("attendanceLoginId");
  } catch (err) {
    console.error("Error updating attendance:", err);
  }
};

  return (
    <>
      <div className="login-card">
        <h1>Welcome</h1>
        <h3>{time}</h3>
        <div className="form-item">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Work From Home">Work From Home</option>
          <option value="Remote">Remote</option>
        </select>
        </div>
        <div className="d-flex align-items-center justify-content-between">
        <h4>Login: {loginTime ? loginTime.toLocaleString() : "--"}</h4>
        <h4>Logout: {logoutTime ? logoutTime.toLocaleString() : "--"}</h4>
        </div>
        <h4>Working Hours: {workingHours || "--"}</h4>
        <Button
          onClick={loginTime && !logoutTime ? handleLogout : handleLoginClick}
          >
          {loginTime && !logoutTime ? "Logout" : "Login"}
        </Button>
        
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />

        <Modal.Body>
         <Webcam ref={webcamRef} screenshotFormat="image/jpeg" width="100%" />
          {image && <img src={image} alt="captured" width="100%" />}
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
