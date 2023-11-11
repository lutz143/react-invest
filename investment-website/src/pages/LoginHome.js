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
            <Button className={classes.cardButton}>
              <Nav.Link as={Link} to={`/register`}>Sign Up</Nav.Link>
            </Button>
            <Button variant="success" className={classes.cardButton}>
              <Nav.Link as={Link} to={`/login`}>Login</Nav.Link>
            </Button>          
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default LandingPage;