import React, { useState } from "react";
 import { auth } from "../Firebase";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
 import { createUserWithEmailAndPassword } from "firebase/auth";
import { errorToast, successToast } from "../Components/Toaster";
import { Container, Row, Col } from "react-bootstrap";

const Register = () => {
  const [useremail, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const [userpass, setpass] = useState("");
  const [user, setuser] = useState("");
  const [userAge, setAge] = useState("");
  const [userText, setText] = useState("");
  const [region, setregion] = useState("");
  const [useradio, setradio] = useState("");
  const [imgUrl, setimgurl] = useState("");
  const [skils, setskils] = useState([]);
  const [phoneNo, setPhoneNo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgpath = `http://localhost:5173/images/${imgUrl}`;
    try {
      setloading(true);

      await createUserWithEmailAndPassword(auth, useremail, userpass);

      await fetch(
        "https://usermangement-19026-default-rtdb.firebaseio.com/useregister.json",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            user,
            useremail,
            userpass,
            userAge,
            userText,
            region,
            useradio,
            skils,
            imgUrl: imgpath,
            phoneNo,
            createdAt: new Date().toISOString(),
          }),
        },
      );
      setemail("");
      setpass("");
      setuser("");
      setAge("");
      setText("");
      setregion("");
      setradio("");
      setimgurl("");
      setPhoneNo("");
      setskils([]);
      successToast("Register Successful");
    } catch (error) {
      errorToast(error.message);
    } finally {
      setloading(false);
    }
  };

  const handlecheck = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setskils([...skils, value]);
    } else {
      setskils(skils.filter((item) => item !== value));
    }
    console.log(
      user,
      useremail,
      userpass,
      userAge,
      userText,
      region,
      useradio,
      skils,
      phoneNo,
      imgpath,
    );
  };

  return (
    <Container>
      <Row>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Loader />
          </div>
        ) : (
          <>
            {/* Left Side */}
            <Col
              lg={5}
              className="d-flex justify-content-center align-items-center "
            >
              <div className="left-side">
                <img
                  src={
                    "https://img.freepik.com/free-vector/businessman-businesswoman-looking-computer-monitor_1262-21450.jpg"
                  }
                  style={{ maxWidth: "469px" }}
                  alt="preview"
                />
              </div>
            </Col>

            {/* Right Side */}
            <Col lg={7}>
              <div className="right-side form-group1 w-100">
                <form onSubmit={handleSubmit}>
                  <h2 className="title"> Register</h2>

                  <Row>
                    <Col lg={6}>
                      <div className="form-item">
                        <input
                          type="text"
                          placeholder="Name"
                          value={user}
                          onChange={(e) => setuser(e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-item">
                        <input
                          type="email"
                          placeholder="Email"
                          value={useremail}
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-item">
                        <input
                          type="password"
                          placeholder="Password"
                          value={userpass}
                          onChange={(e) => setpass(e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-item">
                        <input
                          type="number"
                          placeholder="Age"
                          value={userAge}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-item">
                        <input
                          type="number"
                          placeholder="Phone Number"
                          value={phoneNo}
                          onChange={(e) => setPhoneNo(e.target.value)}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-item">
                        <select
                          value={region}
                          onChange={(e) => setregion(e.target.value)}
                        >
                          <option value="">Select Region</option>
                          <option value="india">India</option>
                          <option value="others">Others</option>
                        </select>
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-item">
                        <label>Skills:</label>
                        <span>
                          <input
                            type="checkbox"
                            value="html"
                            checked={skils.includes("html")}
                            onChange={handlecheck}
                          />
                          HTML
                        </span>
                        <span>
                          <input
                            type="checkbox"
                            value="css"
                            checked={skils.includes("css")}
                            onChange={handlecheck}
                          />
                          CSS
                        </span>
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-item">
                        <label>Gender:</label>
                        <span>
                          <input
                            type="radio"
                            value="male"
                            checked={useradio === "male"}
                            onChange={(e) => setradio(e.target.value)}
                          />
                          Male
                        </span>
                        <span>
                          <input
                            type="radio"
                            value="female"
                            checked={useradio === "female"}
                            onChange={(e) => setradio(e.target.value)}
                          />
                          Female
                        </span>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-item">
                        <textarea
                          placeholder="Address"
                          value={userText}
                          onChange={(e) => setText(e.target.value)}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-item">
                        <input
                          type="file"
                          onChange={(e) => {
                            setimgurl(e.target.files[0]?.name);
                           
                          }}
                        />
                      </div>
                    </Col>

                    <button type="submit" className="btn-gradient">
                      Register
                    </button>
                  </Row>
                </form>

                <h5 className="footer_text">
                  Already have account? <Link to="/login">Login</Link>
                </h5>
              </div>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Register;
