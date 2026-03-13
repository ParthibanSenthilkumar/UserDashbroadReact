import React, { useState } from 'react'
import {auth} from 'firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

const Register = () => {
        let [useremail,setemail] =useState('')
        let [ userpass,setpass ]=useState('')
        let [user,setuser]=useState('')

          let handleSubmit =(e)=>{
              e.prventDefault()
              let registerFunc = signInWithEmailAndPassword({
                  auth,
                  useremail,
                  userpass
              })
              let DataPost = async () =>{
                  await fetch ('https://usermangement-19026-default-rtdb.firebaseio.com/Userregister.json',{
                      method:"post",
                      headers:{
                       'content-type':'application/json'
                      },
                      body:JSON.stringify({
                          ...registerFunc,
                          user
                      })
      
                  })
              }
              DataPost()
          }  
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <div className="form-item">
                <label>Name </label>
                <input type="text" value="useLog" placeholder='enter the Email' onChange={ (e)=>setuser(e.target.value) }  />
            </div>
            <div className="form-item">
                <label>Email </label>
                <input type="email" value="useLog" placeholder='enter the Email' onChange={ (e)=>setemail(e.target.value) }  />
            </div>
            <div className="form-item">
                <label>Password </label>
                <input type="password" value="" placeholder='enter the password' onChange={ (e)=>setpass(e.target.value) } />
            </div>
        </div>
        <button>Register</button>
    </form>
    </>
  )
}

export default Register