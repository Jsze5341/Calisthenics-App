import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import "./LoginForm.css";
import axios from "axios";

function Register() {

    const [userRegister, setuserRegister] = useState('')
    const [passRegister, setpassRegister] = useState('')
    const [weightRegister, setWeightRegister] = useState(null);
    const [confirmpassRegister, setconfirmpassRegister] = useState('')
    const [redirect, setRedirect] = useState(false);

    //Form Submission
    function handleSubmit(event) {
        event.preventDefault();

        if (passRegister != confirmpassRegister) {
            alert("Passwords do not match");
        }

        else {
            //Register operation
            axios.post('http://localhost:3001/register', {
                user: userRegister,
                pass: passRegister,
                weight: weightRegister
            })
                .then(() => {
                    setRedirect(true)
                    alert("Register success");
                })
                .catch((err) => {
                    console.log("error");
                });
        }
    }
    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="form-bg">
            <div className="form-container">
                <div className="form-header"></div>
                <div className="form-content"> Register
                <form className="form" onSubmit={handleSubmit}>
                        <div className="form-inputs">
                            <input type="text" required
                                //Saves username input to be inputted to backend
                                //upon submission
                                value={userRegister}
                                onChange={(e) => {
                                    setuserRegister(e.target.value);
                                }}
                                name="Username" placeholder="Username" />
                        </div>
                        <div className="form-inputs">
                            <input type="Password" required
                                //Saves password input to be inputted to backend
                                //upon submission
                                value={passRegister}
                                onChange={(e) => {
                                    setpassRegister(e.target.value);
                                }}
                                name="Password" placeholder="Password" />
                        </div>
                        <div className="form-inputs">
                            <input type="Password" required
                                //Saves password input to be inputted to backend
                                //upon submission
                                value={confirmpassRegister}
                                onChange={(e) => {
                                    setconfirmpassRegister(e.target.value);
                                }}
                                name="Password" placeholder="Confirm Password" />
                        </div>
                        <div className="form-inputs">
                            <input type="text" required
                                //Saves password input to be inputted to backend
                                //upon submission
                                value={weightRegister}
                                onChange={(e) => {
                                    setWeightRegister(e.target.value);
                                }}
                                name="Weight" placeholder="Your Weight" />
                        </div>
                        <div className="form-buttons">
                            <button className="formbtn" >
                                Register
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )

}

export default Register;