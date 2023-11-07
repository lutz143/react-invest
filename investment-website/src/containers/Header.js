import { NavLink } from "react-router-dom";
import hamburgerMenu from "../images/hamburgerMenu.png"
import profilePic from "../images/profilePic2.png"

import classes from "./Header.module.css";

const handleClick = () => {
  // Code to handle button click
};

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.leftSection}>
        <div className= {classes.headerIcon}>
          <img className={classes.hamburgerMenu} src={hamburgerMenu} alt="Menu"/>
          <NavLink to="/" className={classes.title}>
            Home
          </NavLink>
        </div>
      </div>
      <div className={classes.middleSection}>
        <input
          type="text"
          name="search"
          placeholder="Search Stocks"
          className={classes.search}
        ></input>
      </div>
      <div className={classes.rightSection}>
        <NavLink to="/login-home" className={classes.profile}>
          <img
            src={profilePic}
            alt="User profile"
            className={classes.profileImage}
          />
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
