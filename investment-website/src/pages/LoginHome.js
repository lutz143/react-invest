import PageContainer from "../containers/PageContainer";
import { Link, Navigate } from 'react-router-dom';
import { Nav, Button } from "react-bootstrap";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Form.module.css";

function LandingPage() {
  const user = useSelector((state) => state.auth.user)
  const error = useSelector((state) => state.auth.error)

  

  return (
    <PageContainer>
      {error ? <p>{error}</p>: null}
      {user ? <Navigate to='/profile' replace={true} /> : null}
      <div className="login-home">
        <h1>Welcome to Our Website</h1>
        <div className="options">
          <Button className={classes.cardButton}>
            <Nav.Link as={Link} to={`/register`}>Sign Up</Nav.Link>
          </Button>
          <Button className={classes.cardButton}>
            <Nav.Link as={Link} to={`/login`}>Login</Nav.Link>
          </Button>          
        </div>
      </div>
    </PageContainer>
  );
}

export default LandingPage;