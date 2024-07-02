import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import Logout from './components/logout'
import { useEffect } from 'react'
const clientId = "1095047001559-uqfv7sj3nbph166el14200q2u6rhm38i.apps.googleusercontent.com"
import {gapi} from 'gapi-script'

function App() {
  
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  return (
    <>
      <div>
      <h1>Migra</h1>
      <Login />
      <Logout/>
      </div>
      
      
    </>
  )
}

export default App
