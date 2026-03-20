import React, { useState } from "react";
import useFecth from "../Hooks/useFecth";
import Loader from "../Components/Loader";
import { errorToast } from "../Components/Toaster";
import UserModal from "../Components/UserModal";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [currentRow,setCurrentRow]=useState(null)
  const handleClose = () => setShow(false);
  const handleShow = ( userData) =>{
    setCurrentRow(userData)
    setShow(true);
  }

  const {data,loading,error} = useFecth(
    "https://usermangement-19026-default-rtdb.firebaseio.com/useregister.json"
  )
  // console.log(data,'user data');
  if(loading){
    return(
      <div className="d-flex align-items-center justify-content-center h-100 w-100">
        <Loader />
      </div>
    )
  }
  if(error){
    return(
      errorToast(error.message)
    )
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
              {
              data.length>0?(              
                data.map((userData)=>(
              <tr key={userData.id} onClick={()=>handleShow(userData)}>
              <td>
                {userData.user || "---" } 
              </td>
              <td>
                {userData.useremail || "--" }
              </td>
              <td>
                {userData.userAge || "--" }
              </td>
              <td>
                {userData.phoneNo || "--" }
              </td>
              <td>
                {userData.region || "--" }
              </td>
              </tr>
                ))):(
                  <tr>
                    <td> <p>User Not found</p> </td>
                  </tr>
                )
              }
              
              <UserModal show={show} handleClose={handleClose}   userinfo={currentRow} />
            </tbody>
            </table>
        </div>

      </>
       
  );
};

export default Dashboard;
