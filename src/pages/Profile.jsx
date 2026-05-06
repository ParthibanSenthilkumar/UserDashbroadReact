import { useContext, useEffect, useState } from "react";
import { loginDataFetch } from "../Services/Api";
import { errorToast } from "../Components/Toaster";
import Card from 'react-bootstrap/Card';
import Loader from '../Components/Loader'
import { Usercontext } from "../Context/Usercreatecontext";

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
<div className="profile-page d-flex justify-content-center align-items-center">
  {userData ? (
    <div className="profile-wrapper">

      {/* 🔹 BOX 1 - Profile Header */}
      <div className="profile-box text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile"
          className="profile-img"
        />
        <h3>{userdetails?.user}</h3>
        <p className="text-muted">{userdetails?.useremail}</p>
      </div>

      {/* 🔹 BOX 2 - Details */}
      <div className="details-box">
        <p><strong>Region:</strong> {userdetails?.region}</p>
        <p><strong>Phone:</strong> {userdetails?.phoneNo}</p>
        <p><strong>Gender:</strong> {userdetails?.useradio}</p>
        <p><strong>Age:</strong> {userdetails?.userAge}</p>

        <div className="skills-section">
          <h5>Skills</h5>
          <div className="skills-list">
            {userdetails?.skils?.map((skill, index) => (
              <span key={index} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
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