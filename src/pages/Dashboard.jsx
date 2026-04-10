import React, { useState, useEffect } from "react";
import useFecth from "../Hooks/useFecth";
import Loader from "../Components/Loader";
import { errorToast } from "../Components/Toaster";
import Modaluser from "../Components/Modaluser";
import {getData,AttandanceData } from "../Services/Api";
import useFecthAttendance from "../Hooks/useFecthAttendance";

const Dashboard = () => {
  //usefetch call and destructuring 
  let {userdata,loading,error}=useFecth(getData) // call get request in service{api.js}
  //user attendance
  let { attendance, attendanceloading, attendancerror}=useFecthAttendance(AttandanceData)
  const [show, setShow] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const handleClose = () => setShow(false);
  //data send to props type to pass with useModal.jsx
  const handleShow = (userData) => {
    setCurrentRow(userData);
    setShow(true);
  }
  // console.log(data,'user data');
  console.log(attendance,"attendance");

  const handleOpenmap=(lat,lng)=>{
    window.open(`https://www.google.com/maps?q=${lat},${lng}`);
  }
  
  if (loading || attendanceloading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 vw-100">
        <Loader />
      </div>
    );
  }
  if (error||attendancerror ) {
    return errorToast(error.message);
  }
  return (
    <>
      <div className="cart-group">
        <div className="dash-cart">
          <h3>Total Users</h3>
          <span>{userdata.length}</span>
        </div>

        <div className="dash-cart">
          <h3>Total Login</h3>
          <span>{attendance.length}</span>
        </div>

        <div className="dash-cart">
          <h3>Total Users</h3>
          <span>100</span>
        </div>
        <div className="dash-cart">
          <h3>Total Users</h3>
          <span>100</span>
        </div>
      </div>

      <div className="form-item">
        <input type="text" placeholder="Search" />
      </div>

      <div className="user-table">
        <table className="table table-borderless   table-responsive text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Phone No</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {userdata.length > 0 ? (
              userdata.map((userData) => (
                <tr key={userData.id} onClick={() => handleShow(userData)}>
                  <td>{userData.user || "---"}</td>
                  <td>{userData.useremail || "--"}</td>
                  <td>{userData.userAge || "--"}</td>
                  <td>{userData.phoneNo || "--"}</td>
                  <td>{userData.region || "--"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center pt-3">
                  
                  <p>User Not found</p>
                </td>
              </tr>
            )}
            {/* data to pass with modal probs type */}
            <Modaluser
              show={show}
              handleClose={handleClose}
              currentRow={currentRow}
            />
          </tbody>
        </table>
      </div>



        <div className="user-table">
        <table className="table table-borderless table-responsive text-center">
          <thead>
            <tr>
              <th>Image</th>
              <th>Login Time</th>
              <th>Logout Time</th>
              <th>Working Hours</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length > 0 ? (
              attendance.map((attendanceData) => (
                <tr key={attendanceData.id}>
                  <td>
                    {attendanceData.image ? (
                      <img src={attendanceData.image} width="50" height="50" />
                    ) : "---"}
                  </td>
                  <td>{new Date(attendanceData.loginTime).toLocaleString()|| ""}</td>
                  <td>{new Date(attendanceData.logoutTime).toLocaleString() || "--"}</td>
                   <td>{attendanceData.workingHours || "--"}</td>
                  {/* <td style={{ cursor:"pointer" }} onClick={()=>handleOpenmap(attendanceData.latitude,attendanceData.longitude )  }>View Location </td> */}
                  <td></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center pt-3">
                  
                  <p>User Not found</p>
                </td>
              </tr>
            )}
            {/* data to pass with modal probs type */}
            <Modaluser
              show={show}
              handleClose={handleClose}
              currentRow={currentRow}
            />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
