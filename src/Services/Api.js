import { errorToast } from "../Components/Toaster";
import axios from "axios";

const BASEURL = "https://usermangement-19026-default-rtdb.firebaseio.com/";

// ✅ REGISTER
export const getPost = async (data) => {
  try {
    await fetch(`${BASEURL}useregister.json`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    errorToast(error.message);
    throw error;
  }
};

// ✅ LOGIN (FIXED: POST + store key)
export const getLogPost = async (logData) => {
  try {
    const res = await fetch(`${BASEURL}UserLogin.json`, {
      method: "POST", // ✅ FIXED
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(logData),
    });

    const data = await res.json();

    // ✅ Store Firebase generated key
    localStorage.setItem("loginId", data.name);

    return data.name;
  } catch (error) {
    errorToast(error.message);
    throw error;
  }
};

// ✅ GET USERS
export const getData = async () => {
  try {
    let res = await fetch(`${BASEURL}useregister.json`);
    let resData = await res.json();

    let arr = [];
    for (let key in resData) {
      arr.push({
        id: key,
        ...resData[key],
      });
    }
    return arr;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// ✅ PATCH USER
export const getPatch = async (editData, id) => {
  try {
    let res = await fetch(`${BASEURL}useregister/${id}.json`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editData),
    });
    return res.json();
  } catch (error) {
    errorToast(error.message);
    throw error;
  }
};

// ✅ DELETE USER
export const delRequest = async (id) => {
  try {
    let res = await axios.delete(`${BASEURL}useregister/${id}.json`);
    return res.data;
  } catch (error) {
    errorToast(error.message);
    throw error;
  }
};

// ✅ GET PROFILE
export const loginDataFetch = async (uid) => {
  let res = await axios.get(`${BASEURL}useregister.json`);
  let data = res.data;

  for (let key in data) {
    if (data[key].uid === uid) {
      return data[key];
    }
  }
  return null;
};

// ✅ CREATE ATTENDANCE
export const createAttendance = async (data) => {
  try {
    const loginId = localStorage.getItem("loginId");

    if (!loginId) throw new Error("Login ID missing");

    const res = await axios.post(
      `${BASEURL}UserLogin/${loginId}/attendance.json`,
      data,
    );

    return res.data.name;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ✅ UPDATE ATTENDANCE
export const updateAttendance = async (data, attendanceId) => {
  try {
    const loginId = localStorage.getItem("loginId");

    if (!loginId) throw new Error("Login ID missing");

    const res = await axios.patch(
      `${BASEURL}UserLogin/${loginId}/attendance/${attendanceId}.json`,
      data,
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
