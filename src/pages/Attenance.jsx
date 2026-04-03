import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Webcam from "react-webcam";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { createAttendance } from "../Services/Api";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const Attenance = () => {
  const handleTime = () => {
    const time = new Date();
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  };
  let [position, setposition] = useState(null);
  const webcamRef = useRef(null);
  const [image, setimage] = useState();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");
  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [workingHours, setWorkingHours] = useState("");
  const [time, setTime] = useState(() => handleTime());
  const handleClose = () => setShow(false);
  const handleShow = () => {
    location();
    setShow(true);
  };

  useEffect(() => {
    setTime(handleTime());
  }, []);

  const location = async () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const long = pos.coords.longitude;
      setposition([lat, long]);
      console.log(lat, long);
    });
  };

  const handleCapture = () => {
    const capImage = webcamRef.current.getScreenshot();
    setimage(capImage);
  };

  const attendance = () => {
    const now = new Date();
    if (!loginTime) {
      setLoginTime(now);
      alert("Login Time Recorded");
    } else if (!logoutTime) {
      setLogoutTime(now);

      const diffMs = now - loginTime;
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs / (1000 * 60)) % 60);

      setWorkingHours(`${diffHrs}h ${diffMins}m`);
      alert("Logout Time Recorded");
    }
  };
  const handlesave = () => {
    const time = new Date().toISOString();
    let AttendanceData = {
      latitude: position?.[0],
      longitude: position?.[1],
      loginTime: loginTime?.toISOString(),
      logoutTime: logoutTime?.toISOString(),
      workingHours: workingHours,
      image: image,
      status: status,
    };
    createAttendance(AttendanceData);
    console.log(position, "position");
    console.log(AttendanceData);
    handleClose();
  };

  // if (position) {
  //   const time = new Date().toISOString();
  //   let AttendanceData = {
  //     latitude: position[0],
  //     longitude: position[1],
  //     Logintime: time,
  //     image: image,
  //   };
  //   createAttendance(AttendanceData);
  //   console.log(position, "position");
  //   console.log(AttendanceData);
  // }

  return (
    <>
      <div className="login-card">
        <h1 className="title">Welcome</h1>
        <h3>{time}</h3>
        <div className="formgroup">
          <div className="form-item">
            <label htmlFor="Select Work Mode">Select Work Mode</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Work From Home"> Work From Home</option>
              <option value="Remote"> Remote</option>
            </select>
            <h4>
              Login Time: {loginTime ? loginTime.toLocaleTimeString() : "--"}
            </h4>
            <h4>
              Logout Time: {logoutTime ? logoutTime.toLocaleTimeString() : "--"}
            </h4>
            <h4>Working Hours: {workingHours || "--"}</h4>
          </div>
        </div>
        <Button variant="primary" onClick={handleShow}>
          Attendance
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="40%"
            height="60%"
            className="d-block m-auto"
            style={{ borderRadius: "50%" }}
          />

          {image && <img src={image} alt="captured" width="100%" />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCapture}>
            Capture
          </Button>
          <Button variant="primary" onClick={handlesave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Attenance;
