import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import LogIn from './pages/LogIn'
import NoPage from './pages/NoPage'

function App() {
  

  return (
    <div>
      <BrowserRouter>
      <Routes> 
        <Route index element={<LogIn/>}/>
        <Route path ='/home' element={<Home/>}/>
        
        <Route path ='*' element={<NoPage/>}/>
      </Routes>

      </BrowserRouter>      
      
    </div>
  )
}

export default App
