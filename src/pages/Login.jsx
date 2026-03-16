import React, { useState } from "react";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../Components/Toaster";
import Loader from "../Components/Loader";

const Login = () => {
  let [useLog, setlog] = useState("");
  let [loading, setloading] = useState(false);
  let [userpass, setpass] = useState("");

let navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setloading(true);
        let LoginFunc = await signInWithEmailAndPassword(auth, useLog, userpass);
        console.log("authen Data", LoginFunc);  
        await fetch(
      "https://usermangement-19026-default-rtdb.firebaseio.com/UserLogin.json",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          useLog: useLog,
          userpass: userpass,
          createAt: new Date().toISOString(),
        }),
      },
    );
    setlog('')
    setpass('')
    successToast("Login Successfull"),
    navigate("/dashbroad")
    }
    catch (error) {
       errorToast(error.message)
    }
    finally{
        setloading(false);
    }
    
  };

  return (
    <>
    {loading ? ( <div className="d-flex align-items-center justify-content-center vh-100 vw-100"><Loader /></div> ) :(
    <div className="from-group">
      <form onSubmit={handleSubmit}>

          <div className="form-item">
            <label>Email </label>
            <input
              type="text"
              value={useLog}
              placeholder="enter the Email"
              onChange={(e) => setlog(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label>Email </label>
            <input
              type="password"
              value={userpass}
              placeholder="enter the password"
              onChange={(e) => setpass(e.target.value)}
            />
          </div>
        <button className="btn-gradient">Login</button>

        <h5 className="footer_text">Don't have an account? <Link to="/register">Register</Link></h5>
      </form>
      </div>
    )}
    </>
  );
};

export default Login;
