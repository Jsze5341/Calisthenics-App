import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayRow.css';
import { useGlobalState } from './GlobalState.js';

function DisplayRow(props) {
    const [displayData, setDisplayData] = useState(null);
    const [loggedInUser, setLoggedInUser] = useGlobalState('loggedInUser');

    //Load table data from backend on page load
    useEffect(() => {
        fetch("http://localhost:3001")
            .then((res) => res.json())
            .then((json) => {
                setDisplayData(json.data);
            });

    }, []);

    function handleClick() {
        if (loggedInUser.length > 0) {
            const message = window.confirm("Would you like to favorite " + props.exer_name + "?");

            if (message) {
                axios.post('http://localhost:3001/favorite', {
                    user: loggedInUser,
                    fav_exer: props.exer_name
                })
                    .then(() => {
                        alert("Favorited " + props.exer_name);
                    })
                    .catch((err) => {
                        console.log("error favoriting exercise");
                    });
            }
        }
    }

    function handleClickPre() {
        if (loggedInUser.length > 0) {
            const message = window.confirm("Would you like to favorite " + props.pre_exer + "?");

            if (message) {
                axios.post('http://localhost:3001/favorite', {
                    user: loggedInUser,
                    fav_exer: props.pre_exer
                })
                    .then(() => {
                        alert("Favorited " + props.pre_exer);
                    })
                    .catch((err) => {
                        console.log("error favoriting exercise");
                    });
            }
        }
    }

    function handleClickPost() {
        if (loggedInUser.length > 0) {
            const message = window.confirm("Would you like to favorite " + props.post_exer + "?");

            if (message) {
                axios.post('http://localhost:3001/favorite', {
                    user: loggedInUser,
                    fav_exer: props.post_exer
                })
                    .then(() => {
                        alert("Favorited " + props.post_exer);
                    })
                    .catch((err) => {
                        console.log("error favoriting exercise");
                    });
            }
        }
    }

    return (
        <tr className="table">
            <td className="data" onClick={() => { handleClickPre() }} > {props.pre_exer}</td>
            <td className="data" onClick={() => { handleClick() }} > {props.exer_name} </td>
            <td className="data" onClick={() => { handleClickPost() }} > {props.post_exer} </td>
            <td className="data" onClick={() => { handleClick() }} > {props.muscle} </td>
            <td className="data" onClick={() => { handleClick() }}> {props.difficulty} </td>
        </tr>
        
    )
}

export default DisplayRow;