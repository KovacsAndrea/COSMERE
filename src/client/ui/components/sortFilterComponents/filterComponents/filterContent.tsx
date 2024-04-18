import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";
import { CheckboxButton } from "../commonComponents/checkboxButton.tsx";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const FilterContent: React.FC<{
    selectedPlanets: any, setSelectedPlanets: any,
    selectedSystems: any, setSelectedSystems: any,
    selectedShards: any, setSelectedShards: any,
    selectedDates: any, setSelectedDates: any
}> 
= ({}) => {
    const planets ="planets"
    const systems = "systems"
    const shards = "shards"
    const startDate = "dates"

    const [planetData, setPlanetData] = useState([])
    const [systemData, setSystemData] = useState([])
    const [shardData, setShardData] = useState([])
    const [dateData, setDateData] = useState([])
    
    const [backendPlanetData, setBackendPlanetData] = useState([])
    const [backendSystemData, setBackendSystemData] = useState([]);
    const [backendShardData, setBackendShardData] = useState([]);
    const [backendDateData, setBackendDateData] = useState([]);

    useEffect (() => {
        async function fetchData() {
           
            await axios.get("http://localhost:4000/filter/planets").then( response =>
                setPlanetData(response.data.filterData)
            ).catch(error => {
                console.error("Failed getting filter data for planets", error)
            })

            axios.get("http://localhost:4000/filter/systems").then( response =>
                {setSystemData(response.data.filterData);
                console.log("SYSTEM DATA" + response.data.filterData);}
            ).catch(error => {
                console.error("Failed getting filter data for systems", error)
            })

            axios.get("http://localhost:4000/filter/shards").then( response =>
                {setShardData(response.data.filterData);}
            ).catch(error => {
                console.error("Failed getting filter data for shards", error)
            })

            axios.get("http://localhost:4000/filter/dates").then( response =>
                {setDateData(response.data.filterData);}
            ).catch(error => {
                console.error("Failed getting filter data for dates", error)
            })

            axios.get("http://localhost:4000/filter/current/planets").then( response =>
                setBackendPlanetData(response.data.filterData)
            ).catch(error => {
                console.error("Failed getting filter data for current planets", error)
            })

            // Fetching backend system data
            axios.get("http://localhost:4000/filter/current/systems")
                .then(response => {
                    setBackendSystemData(response.data.filterData);
                })
                .catch(error => {
                    console.error("Failed getting backend system data", error);
                });

            // Fetching backend shard data
            axios.get("http://localhost:4000/filter/current/shards")
                .then(response => {
                    setBackendShardData(response.data.filterData);
                })
                .catch(error => {
                    console.error("Failed getting backend shard data", error);
                });

            // Fetching backend date data
            axios.get("http://localhost:4000/filter/current/dates")
                .then(response => {
                    setBackendDateData(response.data.filterData);
                })
                .catch(error => {
                    console.error("Failed getting backend date data", error);
                });
    }
    fetchData();
    }, [])

    const fetchPlanets = () => {
        axios.get("http://localhost:4000/filter/current/planets").then( response =>
                setBackendPlanetData(response.data.filterData)
            ).catch(error => {
                console.error("Failed getting filter data for current planets", error)
            })
    }
    

    const handleCheckAllPlanets = () => {
        console.log("FACEM UPDATE la toate planetele")
        axios.patch("http://localhost:4000/filter/planets" , {data: planetData});
        fetchPlanets()
    } 
    const handleUnheckAllPlanets = () => {
        console.log("FACEM uncheck la toate planetele")
        axios.patch("http://localhost:4000/filter/planets" , {data: []}); 
        fetchPlanets()
    }

    const handleCheckAllSystems = () => { axios.patch("http://localhost:4000/filter/systems" , {data: systemData}) };
    const handleUncheckAllSystems = () => { axios.patch("http://localhost:4000/filter/systems" , {data: []}) };

    const handleCheckAllShards = () => { axios.patch("http://localhost:4000/filter/shards" , {data: shardData})};
    const handleUncheckAllShards = () => { axios.patch("http://localhost:4000/filter/shards" , {data: []}) };

    const handleCheckAllDates = () => { axios.patch("http://localhost:4000/filter/dates" , {data: dateData})};
    const handleUncheckAllDates = () => { axios.patch("http://localhost:4000/filter/dates" , {data: []}) };


    return (
        <>
        <div className="filter-grid">
            <div key= {planets} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {planets} </label>
                    <FaCheckSquare className="cool-check-uncheck-icons" 
                    onClick={() => handleCheckAllPlanets()}
                    />
                    <FaRegCheckSquare className="cool-check-uncheck-icons" 
                    onClick={() => handleUnheckAllPlanets()}
                    />
                </div>
                <div className="design-for-option-column">
                {planetData.map( planet => <CheckboxButton
                name = {planet} category = {planets} key = {planet + "PLANET"} selectedStuff = {backendPlanetData} setSelectedStuff = {setBackendPlanetData}/>)}
                </div>
            </div>
            <div key = {systems} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {systems} </label>
                    <FaCheckSquare className="cool-check-uncheck-icons" 
                    onClick={() => handleCheckAllSystems()}
                    />
                    <FaRegCheckSquare className="cool-check-uncheck-icons" 
                    onClick = {() => handleUncheckAllSystems()}
                    />
                </div>
                <div className="design-for-option-column">
                {systemData.map( system => <CheckboxButton 
                name = {system } category = {systems} key = {system + "SYSTEM"} selectedStuff={backendSystemData} setSelectedStuff={setBackendSystemData} />)}
                </div>
            </div>
            <div key = {shards} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {shards} </label>
                    <FaCheckSquare className="cool-check-uncheck-icons" 
                    onClick={() => handleCheckAllShards()}
                    />
                    <FaRegCheckSquare className="cool-check-uncheck-icons" 
                    onClick={() => handleUncheckAllShards()}
                        />
                </div>
                <div className="design-for-option-column">
                {shardData.map( shard => <CheckboxButton
                name = {shard } category = {shards} key = {shard + "SHARD"} selectedStuff={backendShardData} setSelectedStuff={setBackendShardData} />)}
                </div>
            </div>
            <div key = {startDate} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {startDate} </label>
                    <FaCheckSquare className="cool-check-uncheck-icons" 
                    onClick = {() => handleCheckAllDates()}
                    />
                    <FaRegCheckSquare className="cool-check-uncheck-icons" 
                    onClick = {() => handleUncheckAllDates()}
                    />
                </div>
                <div className="design-for-option-column">
                {dateData.map( date => <CheckboxButton
                name = {date } category = {startDate} key = {date + "DATE"} selectedStuff={backendDateData} setSelectedStuff={setBackendDateData} />)}
                </div>
            </div>
        </div>
        </>
    );
}