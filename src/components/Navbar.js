import React, { useState, useEffect, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from './Button';
import LogoutButton from './LogoutButton.js';
import Favorites from "./Favorites.js";
import './Navbar.css';
import { useGlobalState } from './GlobalState.js';


function Navbar(props) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [navbar, setNavbar] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(true);
    const [loggedInUser, setLoggedInUser] = useGlobalState('loggedInUser');

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    function loginButton() {
        return <Button link='/login' buttonStyle={'btn--primary'} >Login / Register</Button>;
    }

    //Changes button display to either login or logout 
    //depending if user is logged in or not
    function loginDisplay(loggedIn) {
        if (!loggedIn) {
            return loginButton();
        } else {
            return <LogoutButton />;
        }
    }

    function favDisplay() {
        if (loggedInUser.length > 0) {
            return <Link
                to='/favorites'
                className='nav-links'
                onClick={closeMobileMenu} >
                {loggedInUser}'s Profile
                </Link>;
        }
        else {
            return null;
        }
    }

    return (
        <React.Fragment>
            <nav className={'navbar active'}>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        Calisthenics Trainer
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    </ul>
                    <u1 className = "nav-display">
                        {favDisplay()}
                    </u1>
                    <u1 id="para">
                        {loginDisplay()}
                    </u1>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default Navbar;