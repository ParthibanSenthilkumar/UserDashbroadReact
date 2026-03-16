import React, { useState } from 'react'
import { auth } from '../Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {

    let [useLog,setlog] =useState('')
    let [ userpass,setpass ]=useState('')
 
    let handleSubmit =async (e)=>{
        e.preventDefault()
        let LoginFunc = await signInWithEmailAndPassword(
            auth,
            useLog,
            userpass
        )
        console.log("authen Data",LoginFunc);
        
        
            await fetch ('https://usermangement-19026-default-rtdb.firebaseio.com/UserLogin.json',{
                method:"post",
                headers:{
                 'content-type':'application/json'
                },
                body:JSON.stringify({
                    useLog:useLog,
                    userpass:userpass
                })

            })
        
    }
  
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <div className="form-item">
                <label>Email </label>
                <input type="text" value={useLog} placeholder='enter the Email' onChange={ (e)=>setlog(e.target.value) }  />
            </div>
            <div className="form-item">
                <label>Email </label>
                <input type="password" value={userpass} placeholder='enter the password' onChange={ (e)=>setpass(e.target.value) } />
            </div>
        </div>
        <button>Login</button>
    </form>
    </>
  )
}

export default Login