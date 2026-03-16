import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashbroad from '../pages/Dashbroad'

const Allroutes = () => {
  return (
    <>
      <Routes>
        < Route path='/' element={ <Login /> } /> 
        < Route path='/register' element={ <Register /> } />
        < Route path='/login' element={ <Login /> } />  
        <Route path='/dashbroad' element={ <Dashbroad /> } />
      </Routes>
    </>
  )
}

export default Allroutes