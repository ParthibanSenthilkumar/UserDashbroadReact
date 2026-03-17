import React, { useState } from "react";
import { auth } from "../Firebase";
import { data, Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { errorToast, successToast } from "../Components/Toaster";

const Register = () => {
  let [useremail, setemail] = useState("");
  let [loading, setloading] = useState(false);
  let [userpass, setpass] = useState("");
  let [user, setuser] = useState("");
  let [userAge, setAge] = useState("");
  let [userText, setText] = useState("");
  let [region, setregion] = useState("");
  let [useradio, setradio] = useState("");
  let [imgUrl, setimgurl] = useState("");
  let [skils, setskils] = useState([]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
        useremail(""),
        userpass(""),
        user(""),
        successToast("Register Successfull"),
      );
    } catch (error) {
      errorToast(error.message);
    } finally {
      setloading(false);
    }
  };
  let handlecheck = (e) => {
    const checked  = e.target.value;
    // console.log(e.target.value, "data");
    skils.filter((item) => item !== e.target.value);
    console.log('',
      skils);
  };
  console.log(
    useremail,
    userpass,
    userAge,
    userText,
    region,
    useradio,
    skils,
    imgUrl,
  );
  return (
    <>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center vh-100 vw-100">
          <Loader />
        </div>
      ) : (
        <div className="form-group">
          <form onSubmit={handleSubmit}>
            <div className="form-item">
              <label>Name </label>
              <input
                type="text"
                value={user}
                placeholder="enter the username"
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
            <div className="form-item">
              <label>Age </label>
              <input
                type="number"
                value={userAge}
                placeholder="enter the Age"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="form-item">
              <label>Adreess </label>
              <textarea
                value={userText}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>

            <div className="form-item">
              <label>region </label>
              <select
                value={region}
                onChange={(e) => setregion(e.target.value)}
              >
                <option>select Region</option>
                <option> india </option>
                <option>Others</option>
              </select>
            </div>
            <div className="form-item">
              <label>Skill </label>
              <input
                type="checkbox"
                value="html"
                checked={true}
                onChange={handlecheck}
              />
              html
              <input type="checkbox" value="css" onChange={handlecheck} />
              css
            </div>
            <div className="form-item">
              <label>gender </label>
              <input
                type="radio"
                value="male"
                onChange={(e) => setradio(e.target.value)}
              />
              Male
              <input
                type="radio"
                value="useradio"
                checked={true}
                onChange={(e) => setradio(e.target.value)}
              />
              FeMale
            </div>
            <div className="form-item">
              <label>image </label>
              <input
                type="file"
                value={imgUrl}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if(file){
                   const imgUrl= URL.createObjectURL(file)
                   setimgurl(imgUrl)
                  }
                }
                  
                }
              />
            </div>

            <button className="btn-gradient">Register</button>
            <h5 className="footer_text">
              You have an account? <Link to="/login">Login</Link>
            </h5>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
