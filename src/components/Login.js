import React, { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import "./LoginForm.css";
import axios from "axios";
import { useGlobalState } from './GlobalState.js';

function Login() {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [redirect, setRedirect] = useState(false);
    //const [loggedIn, setloggedIn] = useGlobalState(false);
    const [loggedInUser, setLoggedInUser] = useGlobalState('loggedInUser');

    console.log("login status", loggedInUser);

    //Form Submission
    function handleSubmit(event) {
        event.preventDefault();
        var user_string = String(user);

        //Login operation
        axios.post('http://localhost:3001/login', {
            user: user,
            pass: pass,
        })
            .then((res) => {
                if (res.data.length > 0) {
                    setLoggedInUser(user_string);
                    setRedirect(true);
                    alert("Login success");
                }

                else {
                    alert("Invalid username or password");
                }

            })
            .catch((err) => {
                console.log("error");
            });

        // Clear input fields
        setUser('');
        setPass('');
    }

    //Redirects to home page upon successful form submission
    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div className="form-bg">
            <div className="form-container">
                <div className="form-header"></div>
                <div className="form-content"> Login
                <form className="form" onSubmit={handleSubmit}>
                        <div className="form-inputs">
                            <input type="text" required
                                //Saves username input
                                value={user}
                                onChange={(e) => {
                                    setUser(e.target.value);
                                }}
                                name="Username" placeholder="Username" />
                        </div>
                        <div className="form-inputs">
                            <input type="Password" required
                                //Saves password input
                                value={pass}
                                onChange={(e) => {
                                    setPass(e.target.value);
                                }}
                                name="Password" placeholder="Password" />
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="formbtn">
                                Login
                        </button>
                            <Link to="/register"><button className="formbtn">
                                Sign Up
                        </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login;