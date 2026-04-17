import React, { useState } from "react";
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

  // states
  const [attendanceSearch, setattendanceSearch] = useState("");
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

  // 🔥 filter logic
  const filterattendance = (attendance || []).filter((item) => {
    if (!item.loginTime) return false;

    const itemDate = new Date(item.loginTime).toLocaleDateString("en-CA");
    const today = new Date().toLocaleDateString("en-CA");

    // search
    const userName = item.user?.toLowerCase() || "";
    const isSearchMatch = userName.includes(attendanceSearch.toLowerCase());

    if (filterType === "all") {
      return isSearchMatch;
    }

    if (filterType === "today") {
      return itemDate === today && isSearchMatch;
    }

    if (filterType === "date") {
      return itemDate === selectedDate && isSearchMatch;
    }

    return true;
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
          <span>{attendance.length}</span>
        </div>
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
      <div className="d-flex gap-2 mb-2">
        <button onClick={() => setFilterType("all")}>All</button>

        <button
          onClick={() => {
            setFilterType("today");
            setSelectedDate(new Date().toLocaleDateString("en-CA"));
          }}
        >
          Today
        </button>

        <button onClick={() => setFilterType("date")}>Date Wise</button>
      </div>

      {/* SEARCH */}
      <div className="mb-2">
        <input
          type="text"
          placeholder="Search by email..."
          value={attendanceSearch}
          onChange={(e) => setattendanceSearch(e.target.value)}
        />
      </div>

      {/* DATE PICKER */}
      {filterType === "date" && (
        <div className="mb-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      )}

      {/* TITLE */}
      <h5>
        {filterType === "all"
          ? "All Attendance"
          : filterType === "today"
            ? "Today Attendance"
            : `Date: ${selectedDate}`}
      </h5>

      {/* ATTENDANCE TABLE */}
      <div className="user-table">
        <table className="table table-borderless text-center">
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
            {filterattendance.length > 0 ? (
              filterattendance.map((attendanceData) => (
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
                        attendanceData.longitude,
                      )
                    }
                  >
                    View Location
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Attendance Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
