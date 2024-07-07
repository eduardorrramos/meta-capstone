import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import LogIn from './pages/LogIn'
import NoPage from './pages/NoPage'
import EmergencyContact from './pages/EmergencyContact'
import FAQ from './pages/FAQ'
import UserProfile from './pages/UserProfile'
import BorderPage from './pages/BorderPage'
function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Routes> 
        <Route index element={<LogIn/>}/>
        <Route path ='/home/:otherid' element={<Home/>}/>
        <Route path ='/userprofile/:thirdid' element={<UserProfile/>}/>
        <Route path ='/emergencycontact/:fourthid' element={<EmergencyContact/>}/>
        <Route path ='/borderpage/:id' element={<BorderPage/>}/>
        <Route path ='/faq/:fifthid' element={<FAQ/>}/>
        <Route path ='*' element={<NoPage/>}/>
      </Routes>

      </BrowserRouter>      
      
    </div>
  )
}

export default App
