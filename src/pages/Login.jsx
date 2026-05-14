import React, { useContext, useEffect, useState } from "react";
import { auth } from "../Services/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../Components/Toaster";
import Loader from "../Components/Loader";
import { Container, Col, Row } from "react-bootstrap";
import { getLogPost, loginDataFetch } from "../Services/Api";
import { Usercontext } from "../Context/Usercreatecontext";

const Login = () => {
  let [useLog, setlog] = useState("");
  let [loading, setloading] = useState(false);
  let [userpass, setpass] = useState("");

  let navigate = useNavigate();
  const { userdetails, setuserdetails } = useContext(Usercontext);
  
  useEffect(()=>{
    const unsubscribe =onAuthStateChanged(auth,(loguser)=>{
      if(loguser){
      const userEmail = loguser.email?.toLowerCase();
      const isAdmin = userdetails?.role;
      if(isAdmin === "admin"){
        navigate("/dashboard/admin")
      }
      else{
        navigate("/dashboard/welcome")
      }
      }
    })
    return ()=>unsubscribe ()
  },[])

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      // authencation part
      let LoginFunc = await signInWithEmailAndPassword(auth, useLog, userpass);
      console.log("authen Data", LoginFunc);
      let user = LoginFunc.user;
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
        }),
      );
      
      let Alluserdetails = await loginDataFetch(user.uid);
      setuserdetails(Alluserdetails);
      localStorage.setItem("userdetails", JSON.stringify(Alluserdetails));

      let formdata = {
        useLog,
        userpass,
        uid: user.uid,
      };
      console.log(formdata, "login form Data");

      // post request calling in service api page
      await getLogPost(formdata, user.uid);
      // page refresh
      setlog("");
      setpass("");

      successToast("Login Successfull");
    } catch (error) {
      errorToast(error.message);
      // console.log(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <Container>
        <div className="form-main">
          <Row>
            {loading ? (
              <div className="d-flex align-items-center justify-content-center vh-100 vw-100">
                <Loader />
              </div>
            ) : (
              <>
                <Col
                  lg={7}
                  className="d-flex justify-content-center align-items-center"
                  style={{ background: "#fafafa" }}
                >
                  <div className="left-side">
                    <img
                      src={
                        "https://img.freepik.com/free-vector/businessman-businesswoman-looking-computer-monitor_1262-21450.jpg"
                      }
                      alt="login image  "
                    />
                  </div>
                </Col>
                <Col lg={5} className="right-side">
                  <div className="from-group">
                      <div className="head mb-5">
                        <h2 className="title m-0">   Welcome back</h2>
                        <p className="sub_title">Please login to continue accessing your account.</p> 
                      </div>
                    <form onSubmit={handleSubmit}>
                      <div className="form-item">
                        <input
                          type="text"
                          value={useLog}
                          placeholder="enter the Email"
                          onChange={(e) => setlog(e.target.value)}
                        />
                      </div>
                      <div className="form-item">
                        <input
                          type="password"
                          value={userpass}
                          placeholder="enter the password"
                          onChange={(e) => setpass(e.target.value)}
                        />
                      </div>
                      <button className="btn-gradient">Login</button>

                      <h5 className="footer_text">
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                      </h5>
                    </form>
                  </div>
                </Col>
              </>
            )}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Login;
