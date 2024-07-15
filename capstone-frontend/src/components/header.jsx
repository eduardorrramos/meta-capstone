import React from 'react';
import './header.css'

function Header(props) {
  const userGoogleId = props.variable;
  
    return (
    <header className="header">
      <div style={{ display: 'inline-block', float: 'left' }}>
      <h2 style={{ display: 'inline-block', marginLeft: '30px' }}> Migra </h2>
      <img src="my-logo.png" alt="My Logo" style={{ display: 'inline-block', marginLeft: '10px' }}/>
      </div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '480px', marginRight: '80px' }}>
        <a href={`http://localhost:5173/home/${userGoogleId}`} style={{ transform: 'translateY(100%)'}}>Home</a>
        <a href={`http://localhost:5173/userprofile/${userGoogleId}`}style={{transform: 'translateY(100%)'}}>User Profile</a>
        <a href={`http://localhost:5173/emergencycontact/${userGoogleId}`}style={{ transform: 'translateY(100%)'}}>Emergency Contact</a>
        <a href={`http://localhost:5173/faq/${userGoogleId}`}style={{ transform: 'translateY(100%)'}}>FAQ</a>
      </nav>
    </header>
    );
}
export default Header