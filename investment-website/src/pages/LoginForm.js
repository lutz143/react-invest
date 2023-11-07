import PageContainer from "../containers/PageContainer";
import classes from "./Form.module.css";
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [portfolioIds, setPortfolioIds] = useState('')

  const user = useSelector((state) => state.auth.user)
  const error = useSelector((state) => state.auth.error)
  const dispatch = useDispatch()

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const submitHandler = e => {
    e.preventDefault()
    dispatch(login({ username, password, portfolioIds }))
    .then(() => {
      setUsername('')
      setPassword('')
      setPortfolioIds('')
    })
  }

  return (
    <PageContainer>
      <div>
        <h1>Login</h1>
        <Form
          noValidate
          validated={validated}
          onSubmit={submitHandler}
          className={classes.formHolder}
        >
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            Incorrect username or password
          </Alert>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="username" className={classes.inputLabel}>
              Username
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Your username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <Form.Control.Feedback type="invalid">
              Username is required!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password" className={classes.inputLabel}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              name="password"
              autoComplete="false"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <Form.Control.Feedback type="invalid">
              Password is required!
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={!(username && password)}
            type="submit"
            variant="success"
            className={classes.formSubmit}
          >
            Submit
          </Button>
          {error ? <p>{error}</p>: null}
          {user ? <Navigate to='/profile' replace={true} /> : null}
        </Form>
      </div>
    </PageContainer>
  );
};

export default LoginForm;
