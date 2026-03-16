import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashbroad from '../pages/Dashboard'

const Allroutes = () => {
  return (
    <>
      <Routes>
        < Route path='/' element={ <Login /> } /> 
        < Route path='/register' element={ <Register /> } />
        < Route path='/login' element={ <Login /> } />  
        <Route path='/Dashboard' element={ <Dashboard /> } />
      </Routes>
    </>
  )
}

export default Allroutes