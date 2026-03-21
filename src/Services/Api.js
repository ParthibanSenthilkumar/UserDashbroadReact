import { errorToast } from "../Components/Toaster";

const BASEURL = "https://usermangement-19026-default-rtdb.firebaseio.com/";

// post Request

export const getPost = async (data, url) => {
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

// get Request
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
