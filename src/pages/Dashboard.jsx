import React, { useState, useEffect } from "react";
import useFecth from "../Hooks/useFecth";
import Loader from "../Components/Loader";
import { errorToast } from "../Components/Toaster";
import Modaluser from "../Components/Modaluser";
import { getData } from "../Services/Api";

const Dashboard = () => {
  //usefetch call and destructuring 
  let {userdata,loading,error}=useFecth(getData) // call get request in service{api.js}
  
  const [show, setShow] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const handleClose = () => setShow(false);
  //data send to props type to pass with useModal.jsx
  const handleShow = (userData) => {
    setCurrentRow(userData);
    setShow(true);
  }
  // console.log(data,'user data');
  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 vw-100">
        <Loader />
      </div>
    );
  }
  if (error) {
    return errorToast(error.message);
  }
  return (
    <>
      <div className="cart-group">
        <div className="dash-cart">
          <h3>Total Users</h3>
          <span>100</span>
        </div>

        <div className="dash-cart">
          <h3>Total Users</h3>
          <span>100</span>
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
        <table className="table table-bordered table-responsive text-center">
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
    </>
  );
};

export default Dashboard;
