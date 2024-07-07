import React from 'react';
import './header.css'
import Logout from './logout';

function Header(props) {
  const userGoogleId = props.variable;

    return (
    <div className="header">
      <h2> Migra </h2>
      <nav>
        <div className="topnav">
            <a className="active" href={`http://localhost:5173/home/${userGoogleId}`}>Home</a>
            <a href={`http://localhost:5173/userprofile/${userGoogleId}`}>User Profile</a>
            <a href={`http://localhost:5173/emergencycontact/${userGoogleId}`}>Emergency Contact</a>
            <a href={`http://localhost:5173/faq/${userGoogleId}`}>FAQ</a>
            <Logout/>
        </div>
      </nav>
</div>
    );
}
export default Header