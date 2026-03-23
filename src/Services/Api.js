import { errorToast } from "../Components/Toaster";

const BASEURL = "https://usermangement-19026-default-rtdb.firebaseio.com/";

// Register page post Request

export const getPost = async (data) => {
  try {
    const resData = await fetch(`${BASEURL}/useregister.json`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data, "api page");
  } catch (error) {
    errorToast(error.message);
  }
};
// Login page post Request

export const getLogPost = async (logData) => {
  try {
    let res = await fetch(`${BASEURL}/UserLogin.json`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(logData),
    });
    return res.json();
  } catch (error) {
    errorToast(error.message);
  }
};

// Dashboard page get Request

export const getData = async () => {
  try {
    let res = await fetch(`${BASEURL}/useregister.json`);
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
    let res = await fetch(`${BASEURL}/useregister/${id}.json`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editData),
    });
    return res.json();
  } catch (error) {
    errorToast(error.message);
  }
};

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
