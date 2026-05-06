import { useContext, useEffect, useState } from "react";
import { loginDataFetch } from "../Services/Api";
import { errorToast } from "../Components/Toaster";
import Card from 'react-bootstrap/Card';
import Loader from '../Components/Loader'
import { Usercontext } from "../Context/Usercreatecontext";
import { Link } from "react-router-dom";

const Profile = () => {

  const [userData, setUserData] = useState(null);
  const { userdetails,setuserdetails}=useContext(Usercontext)

  console.log(userdetails,"userdetails");
  

  useEffect(() => {
    let loginFetch = JSON.parse(localStorage.getItem('user'));
    const uid = loginFetch.uid;

    const fetchuser = async () => {
      try {
        let response = await loginDataFetch(uid);
        console.log("API Response:", response);
        setUserData(  response );
        setuserdetails(response); 
      } catch (error) {
        errorToast(error.message);
        console.log(error.message);
      }
    };
    fetchuser()
  }, []);

  return (
<div className="profile-page">
  {userData ? (
    <div className="profile-wrapper">
      <div className="row">
        <div className="col-lg-6">
          <div className="profile-box text-center">
            <h3>{userdetails?.user}</h3>
            <p className="text-muted">{userdetails?.useremail}</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
              className="profile-img"
            />
            <div className="info_details d-flex align-items-center justify-content-evenly mt-5">
              <Link to="/attendance" className="btn-gradient" ><i className="fa-solid fa-arrow-right-to-bracket"></i> Attendance</Link>
              <Link to='#' className="btn-gradient"> <i className="fa-solid fa-share"></i> Share Now</Link>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
            {/*  BOX 2 - Details */}
            <div className="details-box">
              <h3>Personal Details</h3>
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div className="details_item">
                <p><strong>Region:</strong> <span>{userdetails?.region}</span> </p>
                <p><strong>Phone:</strong> <span>{userdetails?.phoneNo}</span> </p>
              </div>
              <div className="details_item">
                <p><strong>Gender:</strong> <span>{userdetails?.useradio}</span> </p>
                <p><strong>Age:</strong> <span>{userdetails?.userAge}</span> </p>
              </div>
            </div>
            </div>
            <div className="details-box mt-3  ">
              <h3>Skills</h3>
              {userdetails?.skils?.map((skills)=>
              <span className="skills_badge" >{skills || "No Skills Added" }</span>
              )}
            </div>

        </div>
      </div>
      <div className="details-box social_icons">
        <h3>Follow Us</h3>
        <div className="d-flex align-items-center gap-3 mt-2">
          <span><i className="fa-brands fa-linkedin-in"></i></span> 
          <span><i className="fa-solid fa-paper-plane"></i></span> 
          <span><i className="fa-brands fa-facebook-f"></i></span>
        </div>
      </div>
    </div>
  ) : (
    <div className="d-flex align-items-center justify-content-center vh-100 vw-100">
      <Loader />
    </div>
  )}
</div>
);
}
export default Profile;

          //  <Card className="Profile_card">
          //   <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
          //   <Card.Body>
          //     <Card.Title className="text-center">{userData.user}</Card.Title>
          //     <Card.Title className="text-center">{userData.useremail}</Card.Title>
          //      <Card.Text>Age: <span >{userData.userAge}</span></Card.Text>
          //       <Card.Text>Country: <span >{userData.region}</span></Card.Text>
          //      <Button variant="primary">Go somewhere</Button> 
          //    </Card.Body>
          // </Card> 