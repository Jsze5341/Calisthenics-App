import React, { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import FavoriteRow from "./FavoriteRow.js";
import DisplayRow from "./DisplayRow.js";
import "./Favorites.css";
import axios from "axios";
import { useGlobalState } from './GlobalState.js';

function Favorites() {
    const [favs, setFavs] = useState([]);
    const [recommended, setRecommended] = useState([]);
    //const [fullRow, setFullRow] = useState([]);
    const [loggedInUser, setLoggedInUser] = useGlobalState('loggedInUser');
    const [sortOption, setSortOption] = useState('');
    const [clicked, setClicked] = useState(false);
    const [favDeleted, setFavDeleted]= useGlobalState('favDeleted')

    //Gets user's favorite exercises
    function getFavorites() {
        if (loggedInUser.length > 0) {
            axios.post('http://localhost:3001/getfavorite', {
                user: loggedInUser,
            })
                .then((json) => {
                    //console.log("json", json.data);
                    setFavs(json.data);
                    setFavDeleted(!favDeleted);
                });
        }
    }

    function displayFavs() {
        if (favs.length > 0) {
            const row = [];

            for (var i = 0; i < favs.length; i++) {
                row.push(<FavoriteRow 
                    exer_name={favs[i].exer_name}
                    muscle={favs[i].muscle}
                    difficulty={favs[i].difficulty}>
                </FavoriteRow>);
            }

            return row;
        }
    }

    //username, exer_name, muscle, difficulty

    //Sorts favorite table display on table header click
    function favTableSort() {
        setClicked(!clicked);
        //console.log('sort option', sortOption);

        axios.post('http://localhost:3001/sortfavorite', {
            exer_sort: sortOption,
            user: loggedInUser
        })
            .then((json) => {
                //console.log("sorted json", json.data);
                setFavs(json.data);
            })
            .catch((err) => {
                console.log("error");
            });
    }


    //Get recommended exercises
    function getRecommended() {
        if (loggedInUser.length > 0) {
            axios.post('http://localhost:3001/recommended', {
                user: loggedInUser,
            })
                .then((json) => {
                    //console.log("json", json.data);
                    setRecommended(json.data);
                    setFavDeleted(!favDeleted);
                });
        }
    }

    //Display recommended exercises
    function displayRecommended() {
        if (recommended.length > 0) {
            const row = [];

            for (var i = 0; i < recommended.length; i++) {
                row.push(
                    <DisplayRow pre_exer={recommended[i].pre_exer}
                        exer_name={recommended[i].exer_name}
                        post_exer={recommended[i].post_exer}
                        muscle={recommended[i].muscle}
                        difficulty={recommended[i].difficulty}>
                    </DisplayRow>);
            }
            return row;
        }
    }

    //Sorts recommended table display on table header click
    function recTableSort() {
        setClicked(!clicked);
        console.log('sort option', sortOption);

        axios.post('http://localhost:3001/sortrecommended', {
            exer_sort: sortOption,
            user: loggedInUser
        })
            .then((json) => {
                //console.log("sorted json", json.data);
                setRecommended(json.data);
            })
            .catch((err) => {
                console.log("error");
            });
    }

    //cheese method do ,[getFavorites]
    useEffect(() => {
        getRecommended();
        getFavorites();
    }, [favDeleted]);



    return (
        <tbody className="cali-table">
            <div className="header"> Favorites </div>
            <div className="container">
                <div className="titledesign"> </div>
                <table className="table">
                    <thead>
                        <tr className="chartdesign">
                            <th className="chartheader" onClick={() => { favTableSort(); setSortOption('exer_name'); }}> Exercise </th>
                            <th className="chartheader" onClick={() => { favTableSort(); setSortOption('muscle'); }}> Muscle </th>
                            <th className="chartheader" onClick={() => { favTableSort(); setSortOption('difficulty'); }}> Difficulty </th>
                        </tr>
                    </thead>
                    <tbody className="tabledesign">
                        {displayFavs()}
                    </tbody>
                </table>
            </div>
            <div> <br/> </div>
            <div className="rec-header"> Your Recommended Exercises </div>
            <div className="container">
                <div className="titledesign"> </div>
                <table className="table">
                    <thead>
                        <tr className="chartdesign">
                            <th className="chartheader" onClick={() => { recTableSort(); setSortOption('pre_exer'); }}> Prereq Exercise </th>
                            <th className="chartheader" onClick={() => { recTableSort(); setSortOption('exer_name'); }}> Exercise </th>
                            <th className="chartheader" onClick={() => { recTableSort(); setSortOption('post_exer'); }}> Postreq Exercise </th>
                            <th className="chartheader" onClick={() => { recTableSort(); setSortOption('muscle'); }}> Muscle </th>
                            <th className="chartheader" onClick={() => { recTableSort(); setSortOption('difficulty'); }}> Difficulty </th>
                        </tr>
                    </thead>
                    <tbody className="tabledesign">
                        {displayRecommended()}
                    </tbody>
                </table>
            </div>
        </tbody>
    );
}

export default Favorites;

//Next Step:
//Fetch Data in this file to get full data row
//
//Currently it only gets data from favorite table (username, cali_exer)
//but needs full exercise data for table display
//Needs to fetch from calisthenics table (pre_exer, exer_name, post_exer, muscle, difficulty)

//OR
//On click of favorited exercise,
//passes it as a prop to search bar in calisthenics.js / main page