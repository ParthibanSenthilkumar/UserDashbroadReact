import React, { useState } from "react";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../Components/Toaster";
import Loader from "../Components/Loader";
import { Container,Col,Row } from "react-bootstrap";
import { getLogPost } from "../Services/Api";

const Login = () => {
  let [useLog, setlog] = useState("");
  let [loading, setloading] = useState(false);
  let [userpass, setpass] = useState("");

let navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    let formdata={
      useLog,
      userpass,
    }
    try {
        setloading(true);
        let LoginFunc = await signInWithEmailAndPassword(auth, useLog, userpass);
        console.log("authen Data", LoginFunc);  
        await getLogPost(formdata)
        setlog('')
        setpass('')
        successToast("Login Successfull"),
        navigate("/dashboard")
      }
    catch (error) {
    errorToast(error.message)
    // console.log(error.message);
    }
    finally{
    setloading(false);
    }
    }


  return (
    <>
      <Container>
        <Row>
    {loading ? ( <div className="d-flex align-items-center justify-content-center vh-100 vw-100"><Loader /></div> ) :(
      <>
      <Col lg={6}  className="d-flex justify-content-center align-items-center">
        <div  className="left-side">
        <img src={'https://img.freepik.com/free-vector/businessman-businesswoman-looking-computer-monitor_1262-21450.jpg'} alt="login image  " />
        </div>
      </Col>
      <Col lg={6} className="right-side">
    <div className="from-group">
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

        <h5 className="footer_text">Don't have an account? <Link to="/register">Register</Link></h5>
      </form>
    </div>
      </Col>
      </>
    )}
      </Row>
      </Container>
    </>
  );
};

export default Login;
