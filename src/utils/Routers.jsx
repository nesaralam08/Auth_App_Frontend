import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import HomePage from '../home/Home'
import LoginPage from '../auth/Login'
import SignupPage from '../auth/Signup'
import NotFound from '../utils/NotFound'
import UserDashboard from '../users/UserDashboard'
import UserLayout from '../users/UserLayout'
import UserProfile from '../users/UserProfile'

function Routers() {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/signup' element={<SignupPage/>}></Route>
            <Route path='/dashboard' element={<UserLayout/>}>
              <Route index element={<UserDashboard/>}></Route>
              <Route path='profile' element={<UserProfile/>}></Route>
            </Route>
            <Route path='*' element={<NotFound/>}></Route>
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}

export default Routers