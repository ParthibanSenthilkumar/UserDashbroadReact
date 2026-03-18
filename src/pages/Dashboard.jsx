import React from "react";
import useFecth from "../Hooks/useFecth";

const Dashboard = () => {

  const {data,loading,error} = useFecth(
    "https://usermangement-19026-default-rtdb.firebaseio.com/useregister.json"
  )
  console.log(data,'user data');
  
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
              data.map((userData)=>(
              <tr key={userData.id}>
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

      </>
       
  );
};

export default Dashboard;