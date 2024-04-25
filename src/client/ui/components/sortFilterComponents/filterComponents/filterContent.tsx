import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";
import { CheckboxButton } from "../commonComponents/checkboxButton.tsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalState } from "../../../../../globalVariables.tsx";
import ErrorComponent from "../../../../errorComponent.tsx";

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

    const {usingLocal} = useGlobalState();
    
    useEffect (() => {
        async function useLocalData() {
                
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
    
                axios.get("http://localhost:4000/filter/current/systems")
                    .then(response => {
                        setBackendSystemData(response.data.filterData);
                    }).catch(error => {
                        console.error("Failed getting backend system data", error);
                    });
    
                axios.get("http://localhost:4000/filter/current/shards")
                    .then(response => {
                        setBackendShardData(response.data.filterData);
                    }).catch(error => {
                        console.error("Failed getting backend shard data", error);
                    });
    
                axios.get("http://localhost:4000/filter/current/dates")
                    .then(response => {
                        setBackendDateData(response.data.filterData);
                    }).catch(error => {
                        console.error("Failed getting backend date data", error);
                    });
        }

        fetchData();
        }
        async function useCloudData() {
            console.log(" -----------USING CLOUD DATA -----------")
        }
       if(usingLocal){useLocalData()} else {useCloudData()}

        
    }, [])

    return (
        <>
        <div className="filter-grid">
            <div key= {planets} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {planets} </label>
                    <FaCheckSquare className="cool-check-uncheck-icons" />
                    <FaRegCheckSquare className="cool-check-uncheck-icons" /> 
                </div>
                <div className="design-for-option-column">
                    {planetData.length != 0 ? 
                    <>{planetData.map( planet => <CheckboxButton
                            name = {planet} 
                            category = {planets} 
                            key = {planet + "PLANET"} 
                            selectedStuff = {backendPlanetData} 
                            setSelectedStuff = {setBackendPlanetData}/>)}</> :
                    <>
                    <ErrorComponent message= {"Couldn't get hold of the planet data!"} size={'40px'}/>
                    </>}
                
                </div>
            </div>
            <div key = {systems} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {systems} </label>
                    <FaCheckSquare className="cool-check-uncheck-icons" />
                    <FaRegCheckSquare className="cool-check-uncheck-icons" /> 
                </div>
                    <div className="design-for-option-column">
                    {systemData.length != 0 ?
                    <>{systemData.map( system => <CheckboxButton 
                        name = {system } 
                        category = {systems} 
                        key = {system + "SYSTEM"} 
                        selectedStuff={backendSystemData} 
                        setSelectedStuff={setBackendSystemData} />)}</> : 
                    <><ErrorComponent message= {"Couldn't get hold of the system data!"} size={'40px'}/></>
                    }
                </div>
            </div>
            <div key = {shards} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {shards} </label>
                    <FaCheckSquare className="cool-check-uncheck-icons" />
                    <FaRegCheckSquare className="cool-check-uncheck-icons" /> 
                </div>
                <div className="design-for-option-column">
                    {shardData.length != 0 ? 
                    <>{shardData.map( shard => <CheckboxButton
                        name = {shard } 
                        category = {shards} 
                        key = {shard + "SHARD"} 
                        selectedStuff={backendShardData} 
                        setSelectedStuff={setBackendShardData} />)}</> : 
                    <><ErrorComponent message= {"Couldn't get hold of the Shard data!"} size={'40px'}/></>}
                
                </div>
            </div>
            <div key = {startDate} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {startDate} </label>
                    <FaCheckSquare className="cool-check-uncheck-icons" />
                    <FaRegCheckSquare className="cool-check-uncheck-icons" /> 
                </div>
                <div className="design-for-option-column">
                    {dateData.length != 0 ? 
                    <> {dateData.map( date => <CheckboxButton
                        name = {date } 
                        category = {startDate} 
                        key = {date + "DATE"} 
                        selectedStuff={backendDateData} 
                        setSelectedStuff={setBackendDateData} />)}</> : 
                    <><ErrorComponent message= {"Couldn't get hold of the Date data!"} size={'40px'}/></>}
               </div>
            </div>
        </div>
        </>
    );
}


