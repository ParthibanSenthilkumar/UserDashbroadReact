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

  console.log(attendance, "AttandanceData");

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

      {/* USER TABLE */}
      <div className="user-table">
        {/* SEARCH */}
        <div className="search_part">
          <h3 className="title"><i className="fa-regular fa-user"></i> All User</h3>
          <div className="search_box mb-2 form-item ">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search by Name..."
              value={userSearch}
              onChange={(e) => setuserSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="table_gr">
        <table className="table table-borderless text-center">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Region</th>
              <th>Action</th>
            </tr>
          </thead>
              <tbody>
                {filterUser.length > 0 ? (
                  filterUser.map((userData) => {
                    let profile = userData?.user?.slice(0, 2)?.toUpperCase() || "--";

                    return (
                      <tr key={userData.id} onClick={() => handleShow(userData)}>
                        <td> <span className="user_profile">{profile}</span> </td>
                        <td>{userData.user || "---"}</td>
                        <td>{userData.useremail || "--"}</td>
                        <td><span>{userData.role || "--"}</span></td>
                        <td>{userData.userAge || "--"}</td>
                        <td>{userData.phoneNo || "--"}</td>
                        <td><span className="badge">{userData.region || "--"}</span></td>
                        <td><i className="fa-solid fa-pen-to-square" onClick={() => handleShow(userData)}></i></td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5}>User Not found</td>
                  </tr>
                )}
              </tbody>
        </table>
        </div>
      </div>

      <Modaluser
        show={show}
        handleClose={handleClose}
        currentRow={currentRow}
      />

      
      {/* ATTENDANCE TABLE */}

      <div className="user-table mt-5">
        <div className="search_part">
          <h3 className="title"><i className="fa-regular fa-user"></i>  Login Activity </h3>
          {/* FILTER SECTION */}
          <div className="d-flex gap-2 mb-2">
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
        </div>
        <div className="table_gr">
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
                          alt="user"
                          className="user_img"
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

                    <td> <span className="badge">{attendanceData.workingHours || "--"}</span></td>

                    <td style={{ cursor: "pointer" }}>
                     <span  className="Location" onClick={() =>
                        handleOpenmap(
                          attendanceData.latitude,
                          attendanceData.longitude,
                        )
                      }> <i className="fa-solid fa-map-pin"></i>View </span>   
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
      </div>
      
    </>
  );
};

export default Dashboard;
