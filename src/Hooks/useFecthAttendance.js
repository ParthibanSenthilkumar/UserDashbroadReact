import React, { useEffect, useState } from "react";
import { errorToast } from "../Components/Toaster";

const useFecthAttendance = (apiFunc) => {
  // when pass paramter in apifunc() to receive  useFecthhook
  const [attendance, setattendance] = useState([]);
  const [attendanceloading, setattendanceloading] = useState(false);
  const [attendancerror, setattendancerror] = useState(null);

  useEffect(() => {
    fetchdata();
  }, []);
   let fetchdata = async () =>{
    try{
      setattendanceloading(true)
      let res = await apiFunc();
      setattendance(res)
    }
    catch(error){
      errorToast(error.message)
    }
    finally{
      setattendanceloading(false)
    }
   }
  return { attendance, attendanceloading, attendancerror }; //  return the state using other page
};

export default useFecthAttendance;
