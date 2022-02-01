import React, { useState, useEffect } from 'react';
import axios from "axios";
import DisplayRow from "./DisplayRow.js";
import "./Calisthenics.css";
import { useGlobalState } from './GlobalState.js';

function Calisthenic() {
    const [input, setInput] = useState('');
    const [data, setData] = useState([]);
    const [dataDisplay, setDataDisplay] = useState([])
    const [searched, setSearched] = useState(['']);
    const [searchFlag, setSearchFlag] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [sortOption, setSortOption] = useState('');
    const [clicked, setClicked] = useState(false);

    const [loggedInUser, setLoggedInUser] = useGlobalState('loggedInUser');

    console.log("login status", loggedInUser);

    //Load table data from backend on page load
    useEffect(() => {
        fetch("http://localhost:3001")
            .then((res) => res.json())
            .then((json) => {
                setData(json);
            });
    }, []);


    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/search', { exer_search: input })
            .then((json) => {
                setSearched(json.data);
                setSearchFlag(true);
                //console.log("Input: ", input);
                //console.log("json", json.data[0]);
                console.log("searched state", searched);
            })
            .catch((err) => {
                setSearchFlag(false);
                console.log("error");
        });
    }


    function getSearchedData() {
        if (searched == null) {
            //console.log("null data")
            return 0;
        }

        else {
            var row = [];
            setData([]);
            for (let i = 0; i < searched.length; i++) {
                row.push(searched[i])
                console.log("data row", searched[i]);
                //console.log("data", data[i]);
                //console.log("key", Object.keys(data[i])[0]);
            }
            setData(row);
            //console.log("data row", data);
            //return <div> row </div>;
        }
    }


    //Sorts table displays on table header click
    function tableSort() {
        setClicked(!clicked);
        console.log('sort option', sortOption);
        const sortedData = [].concat(data);

        if (input.length > 0) {
            axios.post('http://localhost:3001/sortsearch', {
                exer_sort: sortOption,
                exer_search: searched.exer_name
            })
                .then((json) => {
                    console.log("sorted json", json.data);
                    setData(json.data);
                })
                .catch((err) => {
                    console.log("error");
                });
        }

        else {
            axios.post('http://localhost:3001/sort', {
                exer_sort: sortOption,
                exer_search: searched.exer_name
            })
                .then((json) => {
                    console.log("sorted json", json.data);
                    setData(json.data);
                })
                .catch((err) => {
                    console.log("error");
                });
        }
    }

    function getData() {
        if (data == null) {
            return 0;
        }

        else {
            //console.log("getData()", data);
            var row = [];
            for (let i = 0; i < data.length; i++) {
                row.push(
                    <DisplayRow pre_exer={data[i].pre_exer}
                        exer_name={data[i].exer_name}
                        post_exer={data[i].post_exer}
                        muscle={data[i].muscle}
                        difficulty={data[i].difficulty}>
                    </DisplayRow>);
                //console.log("key", Object.keys(data[i])[0]);
            }
            return row;
        }
    }

    function getUsername() {
        if (loggedInUser.length > 0) {
            return <div className = "greeting"> Hello {loggedInUser}! </div>;
        }
        else {
            return null;
        }
    }

    useEffect(() => {
        getData();
    }, [data]);


    useEffect(() => {
        console.log("searched data use");
        getSearchedData();
    }, [searched]);

        return (
            <div>
                <form className="search" onSubmit={handleSubmit}>
                    <div> <br/> </div>
                    <input type="text" 
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value)
                        }}
                        name="Search" placeholder="Search here" />
                    <button type="submit" className="formbtn">
                        Search
                    </button>
                </form>
                <tbody className="cali-table">
                    <div className="container">
                        <div className="titledesign"> </div>
                        <table className="table">
                            <thead>
                                <tr className="chartdesign">
                                    <th className="chartheader" onClick={() => { tableSort(); setSortOption('pre_exer'); }}> Prereq Exercise </th>
                                    <th className="chartheader" onClick={() => { tableSort(); setSortOption('exer_name'); }}> Exercise </th>
                                    <th className="chartheader" onClick={() => { tableSort(); setSortOption('post_exer'); }}> Postreq Exercise </th>
                                    <th className="chartheader" onClick={() => { tableSort(); setSortOption('muscle'); }}> Muscle </th>
                                    <th className="chartheader" onClick={() => { tableSort(); setSortOption('difficulty'); }}> Difficulty </th>
                                </tr>
                            </thead>
                            <tbody className="tabledesign">
                                {getData()}
                            </tbody>
                        </table>
                    </div>
                </tbody>
            </div>
        )
}

export default Calisthenic;
