import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayRow.css';
import { useGlobalState } from './GlobalState.js';

function FavoriteRow(props) {
    const [displayData, setDisplayData] = useState(null);
    const [loggedInUser, setLoggedInUser] = useGlobalState('loggedInUser');
    const [favDeleted, setFavDeleted] = useGlobalState('favDeleted');

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
            const message = window.confirm("Remove " + props.exer_name + " from favorites?");
            if (message) {
                axios.post('http://localhost:3001/deletefavorite', {
                    user: loggedInUser,
                    fav_exer: props.exer_name,
                })
                    .then(() => {
                        setFavDeleted(!favDeleted);
                        console.log("favorite delete in row", favDeleted);
                        alert("Removed " + props.exer_name + " from favorites");

                    })
                    .catch((err) => {
                        console.log("Error deleting exercise");
                    });
            }
        }
    }

    return (
        <tr className="table">
            <td className="data" onClick={() => { handleClick() }} > {props.exer_name} </td>
            <td className="data" onClick={() => { handleClick() }} > {props.muscle} </td>
            <td className="data" onClick={() => { handleClick() }}> {props.difficulty} </td>
        </tr>

    )
}

export default FavoriteRow;