import PageContainer from "../containers/PageContainer";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signup } from '../store/authSlice';

import { FaUser, FaLock } from "react-icons/fa";
import classes from "../css/LoginForm.module.css";

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showWarning, setShowWarning] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isRegistrationSuccessful, setRegistrationSuccessful] = useState(false);
    const dispatch = useDispatch();

    // Function to validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const submitRegistration = (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setEmailError("Please enter a valid email format.");
            return; // Prevent form submission
        } else {
            setEmailError(""); // Clear error if email is valid
        }

        dispatch(signup({ username, password, email }))
            .then((res) => {
                setUsername('');
                setPassword('');
                setEmail('');
                setRegistrationSuccessful(true);
            });
    };

    // Required field validation
    const needInput = () => {
        if (!username) {
            console.log('Whoa, no username!');
            setShowWarning(true);
        } else {
            console.log('Username has been defined');
            setShowWarning(false);
        }
    };

    // Redirect the new user to the profile page after successful registration
    if (isRegistrationSuccessful) {
        navigate("/profile");
    }

    return (
        <PageContainer>
            <section className={classes.formContainer}>
                <div className={classes.loginContainer} id={classes.registerContainer}>
                    <form
                        noValidate
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
                            <FaUser className={classes.icon} />
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
                            <FaLock className={classes.icon} />
                        </div>

                        <div className={classes.inputBox}>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                autoComplete="false"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                            <FaLock className={classes.icon} />
                        </div>

                        {/* Display Email Error Message */}
                        {emailError && <div className={classes.errorMessage}>{emailError}</div>}

                        <button
                            onClick={needInput}
                            disabled={!(username && password && email)}
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

export default Register;
