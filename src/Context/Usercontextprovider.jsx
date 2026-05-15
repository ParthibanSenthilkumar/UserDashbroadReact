import React, { Children, useState } from "react";
import { Usercontext } from "./Usercreatecontext";

const Usercontextprovider = ({ children }) => {
const [userdetails, setuserdetails] = useState(() => {
  const storedUser = localStorage.getItem("userdetails");

  return storedUser ? JSON.parse(storedUser) : {};
});
  return (
    <>
      <Usercontext.Provider value={{ userdetails, setuserdetails }}>
        {children}
      </Usercontext.Provider>
    </>
  );
};

export default Usercontextprovider;
