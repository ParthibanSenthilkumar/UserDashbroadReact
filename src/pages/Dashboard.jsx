import React, { useState } from "react";
import useFecth from "../Hooks/useFecth";
import Loader from "../Components/Loader";
import { errorToast } from "../Components/Toaster";
import { Link } from "react-router-dom";
import UserModal from "../Components/UserModal";

const Dashboard = () => {
     let [selectedRow,setSelectedRow]=useState( null )
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = ( userData) =>{
      setSelectedRow(userData)
      setShow(true);
    }
        
  
  const {data,loading,error} = useFecth(
    "https://usermangement-19026-default-rtdb.firebaseio.com/useregister.json"
  )

 console.log(data);
  if(loading){
    return(
      <div className="d-flex align-items-center justify-content-center w-100 h-100">
          <Loader />
      </div>
    )
    
  }
  if (error){
    return errorToast(error.message)
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

        <div className="user-table position-relative">
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
              data.map((userData)=>(
              <tr key={userData.id} as={Link}  onClick={()=>handleShow(userData)}>
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
                ))
              }
             
            </tbody>
            </table>
        </div>
           <UserModal show={show} handleClose={handleClose} userinfo={selectedRow} /> 
      </>
  );
};

export default Dashboard;