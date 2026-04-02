import { errorToast } from "../Components/Toaster";
import axios from 'axios'

const BASEURL = "https://usermangement-19026-default-rtdb.firebaseio.com/";

// Register page post Request

export const getPost = async (data) => {
  try {
     await fetch(`${BASEURL}useregister.json`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data, "api page");
  } catch (error) {
    errorToast(error.message);
    throw error
  }
};
// Login page post Request

export const getLogPost = async (logData) => {
    try {
    await fetch(`${BASEURL}UserLogin.json`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(logData),
    });
  } catch (error) {
    errorToast(error.message);
    throw error;
  }
};

// Dashboard page get Request

export const getData = async () => {
  try {
    let res = await fetch(`${BASEURL}useregister.json`);
    let resData = await res.json();
    let resarry = [];
    for (let key in resData) {
      resarry.push({
        id: key,
        ...resData[key],
      });
    }
    return resarry;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Edit page Patch Request

export let getPatch = async (editData, id) => {
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
    throw error
  }
};

// Delete Request 

export const delRequest= async (id) =>{
  try {
    let res = await axios.delete(`${BASEURL}useregister/${id}.json` )
    return res.data
  }
  catch(error){
    errorToast(error.message)
    throw error
  }
}

// profile Request
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
// attendance Post Request 
export const createAttendance = async (data) => {
  try {
    const res = await axios.post(`${BASEURL}attendance.json`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    errorToast(error.message);
    throw error;
  }
}




// export let fetchData = async (url) => {
//   try {
//     setloading(true);

//     setdata(resarry);
//   } catch (error) {
//     seterror(error.message);
//   } finally {
//     setloading(false);
//   }
// };
// fetchData();
