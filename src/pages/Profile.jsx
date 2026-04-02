import { useEffect, useState } from "react";
import { loginDataFetch } from "../Services/Api";
import { errorToast } from "../Components/Toaster";
import Card from 'react-bootstrap/Card';
import Loader from '../Components/Loader'

const Profile = () => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let loginFetch = JSON.parse(localStorage.getItem('user'));
    const uid = loginFetch.uid;

    const fetchuser = async () => {
      try {
        let response = await loginDataFetch(uid);
        console.log("API Response:", response);
        setUserData(  response );

      } catch (error) {
        errorToast(error.message);
        console.log(error.message);
      }
    };
    fetchuser()
  }, []);

  return (
    <div>
      <h2>Profile</h2>

      {userData? (  
        <>
        <div className="card-item d-flex align-items-center justify-content-center mt-5">
          <Card className="Profile_card">
            <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
            <Card.Body>
              <Card.Title className="text-center">{userData.user}</Card.Title>
              <Card.Title className="text-center">{userData.useremail}</Card.Title>
               <Card.Text>Age: <span >{userData.userAge}</span></Card.Text>
                <Card.Text>Country: <span >{userData.region}</span></Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </div>
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center vh-100 vw-100">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Profile;