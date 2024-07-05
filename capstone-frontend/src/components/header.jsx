import React from 'react';
import './header.css'
function Header() {

    return (
    <header>
      <h2> Migra </h2>
      <nav>
        <div className="topnav">
            <a className="active" href="http://localhost:5173/home">Home</a>
            <a href="http://localhost:5173/userprofile">User Profile</a>
            <a href="http://localhost:5173/emergencycontact">Emergency Contact</a>
            <a href="http://localhost:5173/faq">FAQ</a>
        </div>
      </nav>
</header>
    );
}
export default Header