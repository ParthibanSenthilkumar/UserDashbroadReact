import React from "react";


const Dashboard = () => {
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
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Phone No</th>
                <th>Region</th>
              </tr>
            </thead>
            </table>
        </div>

      </>
       
  );
};

export default Dashboard;