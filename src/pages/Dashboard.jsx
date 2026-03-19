import React from "react";
import useFecth from "../Hooks/useFecth";
import { useState } from "react";
import Loader from "../Components/Loader";
import errorToast from "../Components/Toaster";
import UserModal from "../Components/userModal";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [currentRow, setcurrentRow] = useState(null);
  const handleShow = (userData) => {
    setcurrentRow(userData);
    setShow(true);
  };

  const { data, loading, error } = useFecth(
    "https://usermangement-19026-default-rtdb.firebaseio.com/useregister.json",
  );
  if (loading) {
    return (
      <div className="d-flex align-items-center h-100 w-100">
        <Loader />
      </div>
    );
  }
  if (error) {
    return errorToast(error.message);
  }
  //   let navigate = useNavigate();
  // let modalHandler = () => {
  //   navigate(`/usermodal/${userData.id}`);
  //   handleShow(userData);
  // };

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((userData) => (
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
                <td>
                  <p>user Not found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <UserModal
        show={show}
        handleClose={handleClose}
        currentRow={currentRow}
      />
    </>
  );
};

export default Dashboard;
