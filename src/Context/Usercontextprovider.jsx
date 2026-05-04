import React, { Children, useState } from "react";
import { Usercontext } from "./Usercreatecontext";

const Usercontextprovider = ({ children }) => {
  const [userdetails, setuserdetails] = useState([]);
  return (
    <>
      <Usercontext.Provider value={{ userdetails, setuserdetails }}>
        {children}
      </Usercontext.Provider>
    </>
  );
};

export default Usercontextprovider;
