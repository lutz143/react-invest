import PageContainer from "../containers/PageContainer";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signup } from '../store/authSlice';

import { FaUser, FaLock  } from "react-icons/fa";
import classes from "./LoginForm.module.css";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState('');
  const [isRegistrationSuccessful, setRegistrationSuccessful] = useState(false);
  const dispatch = useDispatch();

  // set state for form validation
  const [validated] = useState(false);

  const submitRegistration = e => {
    e.preventDefault()
    dispatch(signup({ username, password }))
    .then((res) => {
      setUsername('')
      setPassword('')
      setRegistrationSuccessful(true)
    })
  }

  const needInput = () => {
    if (!username) {
      console.log('Whoa, no username');
      setShowWarning(true);
    }
    else {
      console.log('username has been defined');
      setShowWarning(false);
    }
  }

  // redirect the new user to the home page after successful registration
  if (isRegistrationSuccessful) {
    navigate("/profile")
  }


  return (
    <PageContainer>
      <section className={classes.formContainer}>
        <div className={classes.loginContainer} id={classes.registerContainer}>
          <form 
            noValidate 
            validated={validated} 
            onSubmit={submitRegistration}
          >
            <h1>Sign Up</h1>
            <div className={classes.inputBox}>
              <input 
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
              <FaUser className={classes.icon}/>
            </div>

            <div className={classes.inputBox}>
              <input 
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="false"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <FaLock className={classes.icon}/>
            </div>

            <button 
              onClick={needInput}
              disabled={!(username && password)}
              type="submit"
              variant="success"
              className={classes.formSubmit}
            >
              Register
            </button>

            {showWarning && <div className={classes.errorMessage}>Please enter both username and password.</div>}

          </form>
        </div>
      </section>
  </PageContainer>
);
}

export default Register
