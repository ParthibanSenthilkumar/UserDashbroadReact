import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Sidebar from '../Components/Sidebar'
import userModal from '../Components/userModal'

const Allroutes = () => {
  return (
    <>
      <Routes>
        < Route path='/' element={ <Login /> } /> 
        < Route path='/register' element={ <Register /> } />
        < Route path='/login' element={ <Login /> } />  
       <Route path="/dashboard" element={<Sidebar />}>
        <Route index element={<Dashboard />} />
          <Route path="admin" element={<h2>Admin Page</h2>} />
          <Route path="user" element={<h2>User Page</h2>} />
          <Route path="logout" element={<h2>Logout Page</h2>} />
      </Route>
      <Route path='/usermodal/:id' element={ <userModal /> } />
      </Routes>
    </>
  )
}

export default Allroutes