import React, { useState } from "react";
import { auth } from "../Firebase";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { errorToast, successToast } from "../Components/Toaster";

const Register = () => {
  let [useremail, setemail] = useState("");
  let [loading, setloading] = useState(false);
  let [userpass, setpass] = useState("");
  let [user, setuser] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try{
        setloading(true);
    let registerFunc = await createUserWithEmailAndPassword(
        auth,
        useremail,
        userpass,
        );
        console.log("authen Data", registerFunc);

        await fetch(
        "https://usermangement-19026-default-rtdb.firebaseio.com/useregister.json",
        {
            method: "post",
            headers: {
            "content-type": "application/json",
            },
            body: JSON.stringify({
            user: user,
            userpass: userpass,
            useremail: useremail,
            createdAt: new Date().toISOString(),
            }),
        },
        useremail(''),
        userpass(''),
        user(''),
        successToast("Register Successfull")
        );
    }
    catch(error){
        errorToast(error.message)
    }
    finally{
        setloading(false);
    }
  };
  return (
    <>
    {loading ? ( <div className="d-flex align-items-center justify-content-center vh-100 vw-100"><Loader /></div>) :(
    <div className="form-group">
      <form onSubmit={handleSubmit}>
          <div className="form-item">
            <label>Name </label>
            <input
              type="text"
              value={user}
              placeholder="enter the Email"
              onChange={(e) => setuser(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label>Email </label>
            <input
              type="email"
              value={useremail}
              placeholder="enter the Email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label>Password </label>
            <input
              type="password"
              value={userpass}
              placeholder="enter the password"
              onChange={(e) => setpass(e.target.value)}
            />
          </div>
        <button className="btn-gradient">Register</button>
        <h5 className="footer_text">You have an account? <Link to="/login">Login</Link></h5>
      </form>
       </div>
    )}
    </>
  );
};

export default Register;
