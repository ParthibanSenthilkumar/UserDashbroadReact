import React from 'react'

const Welcome = () => {
const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;
   const userName = userEmail.split("@")[0] || "user";
  return (
    <>
    <section className='welcomePage'>
        <div className="profile-container">
          <h2>Welcome  Our Dashboard !</h2>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
              className="profile-img"
            />
            <h3>{userName}</h3>
            <span>{userEmail}</span>
        </div>
    </section>
    </>
  )
}

export default Welcome