import "./navbar.css"
import React from 'react';
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Inno booking</span>
        <div className="navItems">
        <Link to="/signup"><button className="navButton">Register</button></Link>
        <Link to="/signin"><button className="navButton">Login</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;