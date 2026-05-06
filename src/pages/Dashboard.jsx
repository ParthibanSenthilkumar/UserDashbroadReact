import React, { useContext, useState } from "react";
import useFecth from "../Hooks/useFecth";
import Loader from "../Components/Loader";
import { errorToast } from "../Components/Toaster";
import Modaluser from "../Components/Modaluser";
import { getData, AttandanceData } from "../Services/Api";
import useFecthAttendance from "../Hooks/useFecthAttendance";

const Dashboard = () => {
  // fetch data
  let { userdata, loading, error } = useFecth(getData);
  let { attendance, attendanceloading, attendancerror } =
    useFecthAttendance(AttandanceData);

    console.log(attendance,"AttandanceData");
    
  //context

  // states
  const [attendanceSearch, setattendanceSearch] = useState("");
  const [userSearch, setuserSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA"),
  );
  const [filterType, setFilterType] = useState("all");

  const [show, setShow] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (userData) => {
    setCurrentRow(userData);
    setShow(true);
  };

  const handleOpenmap = (lat, lng) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`);
  };

  const filterUser = userdata.filter((item) => {
    let name = item?.user.toLowerCase() || "";
    return name.includes(userSearch.toLowerCase());
  });

  // loading
  if (loading || attendanceloading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 vw-100">
        <Loader />
      </div>
    );
  }

  if (error || attendancerror) {
    return errorToast(error.message);
  }

const getUserDetails = (userId) => {
  return userdata.find((u) => u.uid === userId);
};


  //  filter
  const filterattendance = (attendance || []).filter((item) => {
    if (!item.loginTime) return false;

    const itemDate = new Date(item.loginTime).toLocaleDateString("en-CA");
    const today = new Date().toLocaleDateString("en-CA");

    // search
    const userName = item.user?.toLowerCase() || "";
    const isSearchMatch = userName.includes(attendanceSearch.toLowerCase());

    switch (filterType) {
      case "all":
        return isSearchMatch;
      case "today":
        return itemDate === today && isSearchMatch;
      case "date":
        return itemDate === selectedDate && isSearchMatch;
      default:
        return true;
    }
  });

  return (
    <>
      {/* DASHBOARD CARDS */}
      <div className="cart-group">
        <div className="dash-cart">
          <h3>Total Users</h3>
          <span>{userdata.length}</span>
        </div>

        <div className="dash-cart">
          <h3>Total Login</h3>
          <span>{attendance.length || 0}</span>
        </div>
        <div className="dash-cart">
          <h3>Total Login</h3>
          <span>{attendance.length || 0}</span>
        </div>
        <div className="dash-cart">
          <h3>Today Login</h3>
          <span>5</span>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-2 form-item">
        <input
          type="text"
          placeholder="Search by Name..."
          value={userSearch}
          onChange={(e) => setuserSearch(e.target.value)}
        />
      </div>

      {/* USER TABLE */}
      <div className="user-table">
        <table className="table table-borderless text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {filterUser.length > 0 ? (
              filterUser.map((userData) => (
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
                <td colSpan={5}>User Not found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modaluser
        show={show}
        handleClose={handleClose}
        currentRow={currentRow}
      />

      {/* FILTER SECTION */}
      <div className="d-flex gap-2 mb-2 mt-5">
        <button onClick={() => setFilterType("all")} className="btn btn-filter">
          All
        </button>
        <button
          onClick={() => {
            setFilterType("today");
            setSelectedDate(new Date().toLocaleDateString("en-CA"));
          }}
          className="btn btn-filter"
        >
          Today
        </button>

        <button
          onClick={() => setFilterType("date")}
          className="btn btn-filter"
        >
          Date Wise
        </button>
      </div>

      {/* DATE PICKER */}
      {filterType === "date" && (
        <div className="form-item mb-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: "27%", margin: "10px" }}
          />
        </div>
      )}
      {/* ATTENDANCE TABLE */}
      <div className="user-table">
        <table className="table table-borderless text-center">
          <thead>
            <tr>
              <th>Image</th>
              <th>Username</th>
              <th>Email</th>
              <th>Login Time</th>
              <th>Logout Time</th>
              <th>Working Hours</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(filterattendance) && filterattendance.length > 0 ? (
    filterattendance.map((attendanceData) => {
      const userDetails = getUserDetails(attendanceData.userId);

      return (
        <tr key={attendanceData.id}>

          <td>
            {attendanceData.image ? (
              <img
                src={attendanceData.image}
                width="50"
                height="50"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="user"
              />
            ) : (
              "---"
            )}
          </td>
         <td>{userDetails?.user || "--"}</td>
          <td>{userDetails?.useremail || "--"}</td>
          <td>
            {attendanceData.loginTime
              ? new Date(attendanceData.loginTime).toLocaleString()
              : "--"}
          </td>

          <td>
            {attendanceData.logoutTime
              ? new Date(attendanceData.logoutTime).toLocaleString()
              : "--"}
          </td>

          <td>{attendanceData.workingHours || "--"}</td>

          <td
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleOpenmap(
                attendanceData.latitude,
                attendanceData.longitude
              )
            }
          >
            View Location
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan={7} style={{ textAlign: "center" }}>
        No Attendance Found
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
