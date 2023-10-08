import classes from "./Form.module.css";
import { useRef, useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Auth from "../utils/auth";
// import axios from 'axios';

const REGISTER_URL = 'http://localhost:3001/api/users';
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    // email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
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
      // event.stopPropagation();
    }

    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userFormData)
      });

      if (response.ok) {
        const data = await response.json();
        // Auth.login(data.response.token);
        console.log('User registered successfully');
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.log('Error registering user: ', error);
    }

    setUserFormData({
      username: "",
      // email: "",
      password: "",
    });
  };

    return (
        <>
            <h1>Sign Up</h1>
      {/* This is needed for the validation functionality above */}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
        className={classes.formHolder}
      >
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
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
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={
            !(
              userFormData.username &&
              // userFormData.email &&
              userFormData.password
            )
          }
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


export default Register