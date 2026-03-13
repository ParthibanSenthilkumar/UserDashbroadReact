import React, { useState } from 'react'
import { auth } from '../firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'

const Login = () => {

    let [useLog,setlog] =useState('')
    let [ userpass,setpass ]=useState('')
 
    let handleSubmit =(e)=>{
        e.prventDefault()
        let LoginFunc = signInWithEmailAndPassword({
            auth,
            useLog,
            userpass
        })
        let DataPost = async () =>{
            await fetch ('https://usermangement-19026-default-rtdb.firebaseio.com/UserLogin.json',{
                method:"post",
                headers:{
                 'content-type':'application/json'
                },
                body:JSON.stringify({
                    ...LoginFunc,
                    userpass
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
                <label>Email </label>
                <input type="text" value="useLog" placeholder='enter the Email' onChange={ (e)=>setlog(e.target.value) }  />
            </div>
            <div className="form-item">
                <label>Email </label>
                <input type="password" value="" placeholder='enter the password' onChange={ (e)=>setpass(e.target.value) } />
            </div>
        </div>
        <button>Login</button>
    </form>
    </>
  )
}

export default Login