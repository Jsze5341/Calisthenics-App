import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { Component, useState } from 'react';
import Calisthenic from "./components/Calisthenic.js";
import Login from './components/Login.js';
import Register from './components//Register.js';
import Navbar from './components/Navbar.js';
import Favorites from "./components/Favorites.js";
import './App.css';

function App() {
    return (
        <React.Fragment> 
            <Router>
                <Navbar />
                    <Routes>
                        <Route path='/' element={<Calisthenic />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/favorites' element={<Favorites />} />
                    </Routes>
            </Router>
        </React.Fragment> 
    );
}

export default App;
