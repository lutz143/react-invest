import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

import "./Header.css";


function Header() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <nav id="nav-container">
      <div className="navbar">
        <NavLink to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </NavLink>
        
        <NavLink to="/" className="nav-title">nomin<span style={{fontSize: "3.5rem"}}>al</span>.com</NavLink>
        
      </div>
      <div className={sidebar ? "mobile active" : "navbar"}>
        <ul className="navbar" onClick={showSidebar}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/index.html">Stocks</NavLink>
          </li>
          <li>
            <NavLink to="/index.html">Search</NavLink>
          </li>
          <li>
            <NavLink to="/login">Profile</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
