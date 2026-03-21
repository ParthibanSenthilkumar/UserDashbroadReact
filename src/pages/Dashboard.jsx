import React, { useState, useEffect } from "react";
import useFecth from "../Hooks/useFecth";
import Loader from "../Components/Loader";
import { errorToast } from "../Components/Toaster";
import UserModal from "../Components/userModal";
import { getData } from "../Services/Api";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (userData) => {
    setCurrentRow(userData);
    setShow(true);
  };

  useEffect(() => {
    getData();
  }, []);
  let fetchData = async () => {
    try {
      setloading(true);
      const data = await getData();
      setdata(data);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  };
  fetchData();

  // console.log(data,'user data');
  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center h-100 w-100">
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
                  {" "}
                  <p>User Not found</p>{" "}
                </td>
              </tr>
            )}

            <UserModal
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
