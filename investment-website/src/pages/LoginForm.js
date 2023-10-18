import classes from "./Form.module.css";
import React, { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Auth from "../utils/auth";
import AuthContext from "../context/AuthProvider";

const LOGIN_URL = 'http://localhost:3001/api/users/login';


const LoginForm = () => {
  const { setAuth } = useContext(AuthContext) //when success auth at login, set new auth state in global context
  const [userFormData, setUserFormData] = useState({ username: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredential: true,
        body: JSON.stringify(userFormData)
      });

      if (response.ok) {
        const data = await response.json();
        Auth.login(data.token);
        document.location.replace('/profile');
        console.log('User logged in successfully');
      } else {
        console.log('Login failed');
        setShowAlert(true);
      }
    } catch (error) {
      console.log('Error logging in user: ', error);
    }

    setUserFormData({
      username: "",
      password: "",
    });
  };


  return (
    <>
      <h1>Login</h1>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
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
            onChange={handleInputChange}
            value={userFormData.username}
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
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.password)}
          type="submit"
          variant="success"
          className={classes.formSubmit}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
