import React, { useState } from 'react'
import { auth } from '../Firebase';

import { createUserWithEmailAndPassword } from "firebase/auth";

const Register =  () => {
        let [useremail,setemail] =useState('')
        let [ userpass,setpass ]=useState('')
        let [user,setuser]=useState('')

          let handleSubmit = async (e)=>{
              e.preventDefault()
              let registerFunc =await createUserWithEmailAndPassword(
                  auth,
                  useremail,
                  userpass
              )
              console.log("authen Data",registerFunc);
              
              
                  await fetch ('https://usermangement-19026-default-rtdb.firebaseio.com/Userregister.json',{
                      method:"post",
                      headers:{
                       'content-type':'application/json'
                      },
                      body:JSON.stringify({
                          user:user,
                          userpass:userpass,
                          useremail:useremail
                      })
      
                  })
          }  
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <div className="form-item">
                <label>Name </label>
                <input type="text" value={user} placeholder='enter the Email' onChange={ (e)=>setuser(e.target.value) }  />
            </div>
            <div className="form-item">
                <label>Email </label>
                <input type="email" value={useremail} placeholder='enter the Email' onChange={ (e)=>setemail(e.target.value) }  />
            </div>
            <div className="form-item">
                <label>Password </label>
                <input type="password" value={userpass} placeholder='enter the password' onChange={ (e)=>setpass(e.target.value) } />
            </div>
        </div>
        <button>Register</button>
    </form>
    </>
  )
}

export default Register