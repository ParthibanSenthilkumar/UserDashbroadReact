import React, { useEffect, useState } from "react";
import { errorToast } from "../Components/Toaster";

const useFecth = (apiFunc) => {
  // when pass paramter in apifunc() to receive  useFecthhook
  const [userdata, setuserdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  useEffect(() => {
    fetchdata();
   let fetchdata = async () =>{
    try{
      setloading(true)
      let res = await apiFunc();
      setuserdata(res)
    }
    catch(error){
      errorToast(error.message)
    }
    finally{
      setloading(false)
    }
   }
  return { userdata, loading, error }; //  return the state using other page
});
}

export default useFecth;
