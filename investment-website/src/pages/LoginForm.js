import PageContainer from "../containers/PageContainer";
import React from 'react'
import { useState } from "react";
import { Link, Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";

import { FaUser, FaLock  } from "react-icons/fa";
import classes from "./LoginForm.module.css";


export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [portfolioIds, setPortfolioIds] = useState('')

  const user = useSelector((state) => state.auth.user)
  const error = useSelector((state) => state.auth.error)
  const dispatch = useDispatch()

    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    // const [showAlert, setShowAlert] = useState(false);
  
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
      <section className={classes.formContainer}>
        <div className={classes.loginContainer}>
          <form 
            noValidate 
            validated={validated} 
            onSubmit={submitHandler}
          >
            <h1>Login</h1>
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

            {/* <div className={classes.rememberForgot}>
              <label><input type='checkbox'></input>Remember Me</label>
              <a href="#">Forgot Password</a>
            </div> */}

            <button 
              disabled={!(username && password)}
              type="submit"
              variant="success"
              className={classes.formSubmit}
            >
              Login
            </button>

            <div className={classes.registerLink}>
              <p>Don't have an account? <Link to='/register' replace={true}>Register</Link></p>
            </div>

            {error ? <p className={classes.errorMessage}>{error}</p>: null}
            {user ? <Navigate to='/profile' replace={true} /> : null}
          </form>
        </div>
      </section>
    </PageContainer>
  )
}

export default LoginForm;