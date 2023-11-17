import PageContainer from "../containers/PageContainer";
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Nav, Button } from "react-bootstrap";

import classes from "./Form.module.css";

function LandingPage() {
  const user = useSelector((state) => state.auth.user)
  const error = useSelector((state) => state.auth.error) 

  return (
    <PageContainer>
      {error ? <p>{error}</p>: null}
      {user ? <Navigate to='/profile' replace={true} /> : null}
      <div className={classes.loginBody}>
        <div className={classes.loginHome}>
          <h1>Welcome to My Website</h1>
          <div className={classes.options}>
            <Nav.Link as={Link} to={`/register`} className={classes.cardButton}>
              <Button className={classes.cardButton}>
                Sign Up
              </Button>
            </Nav.Link>
            <Nav.Link as={Link} to={`/login`} className={classes.cardButton}>
              <Button variant="success" className={classes.cardButton}>
                Login
              </Button>
            </Nav.Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default LandingPage;