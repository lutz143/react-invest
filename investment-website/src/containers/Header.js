import { NavLink } from "react-router-dom";
import hamburgerMenu from "../images/hamburgerMenu.png"
import profilePic from "../images/profilePic2.png"

import { Nav, Container, Row, Col } from 'react-bootstrap';

import classes from "./Header.module.css";

// const handleClick = () => {
//   // Code to handle button click
// };


function Header() {
  return (
    <header className={classes.header}>
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <div>
                  <img className={classes.hamburgerMenu} src={hamburgerMenu} alt="Menu"/>
                  <NavLink to="/" className={classes.title}>
                    Home
                  </NavLink>
                </div>
                
              </Col>
            </Row>
          </Col>
          <Col xs={8}>
            <div>
              <input
                type="text"
                name="search"
                placeholder="Search Stocks"
                className={classes.search}
              ></input>
            </div>


          </Col>
        </Row>
      </Container>
    </header>
    
  );
}

export default Header;
