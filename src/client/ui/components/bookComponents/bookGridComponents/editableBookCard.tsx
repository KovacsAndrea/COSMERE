import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './editableBookCard.css'
import { StartDateCardComponent } from "../editableBookCardComponents/startDateCardComponent.tsx";
import { ShardCardComponent } from "../editableBookCardComponents/shardCardComponent.tsx";
import { SystemCardComponent } from "../editableBookCardComponents/systemCardComponent.tsx";
import { PlanetCardComponent } from "../editableBookCardComponents/planetCardComponent.tsx";
import { ChaptersCardComponent } from "../editableBookCardComponents/chaptersCardComponent.tsx";
import { DescriptionCardComponent } from "../editableBookCardComponents/descriptionCardComponent.tsx";
import { useNavigate } from 'react-router-dom';
import { NameCardComponent } from "../editableBookCardComponents/nameCardComponent.tsx";
import React from "react";
import axios from "axios";
import { useGlobalState } from "../../../../../globalVariables.tsx";
import ErrorComponent from "../../../../errorComponent.tsx";
import { AccessComponent } from "../../../../accessComponent.tsx";
export const EditableBookCard: React.FC<{}> = ({}) => {
    try {
    const token = sessionStorage.getItem('token');
    if(!token){
        return <AccessComponent />
    }
    const location = useLocation();
    const navigate = useNavigate();

    const bookData = location.state.bookData;
    if(bookData == undefined || bookData._id == undefined) {
        throw new Error("ID or BOOK DATA is not defined in the State!")
    }
    const bookId = location.state.bookData._id;
    console.log("ALOO, am ID" + bookId.toString())
    const { 
        refreshFilterData,
        updateCurrentPage,
        refreshBookList, 
        cosmerePath} = useGlobalState();
    const [name, setName] = useState(location.state.bookData._title);
    const [description, setDescription] = useState(location.state.bookData._description);
    const [chapters, setChapters] = useState(location.state.bookData._chaptersFormat);
    const [planet, setPlanet] = useState(location.state.bookData._planet);
    const [system, setSystem] = useState(location.state.bookData._system);
    const [shard, setShard] = useState(location.state.bookData._shard);
    const [startDate, setStartDate] = useState(location.state.bookData._startDate);

    const [OGname, _setOGName] = useState(location.state.bookData.title);
    const [OGdescription, _setOGDescription] = useState(location.state.bookData.description);
    const [OGplanet, _setOGPlanet] = useState(location.state.bookData.planet);
    const [OGsystem, _setOGSystem] = useState(location.state.bookData.system);
    const [OGshard, _setOGShard] = useState(location.state.bookData.shard);
    const [OGstartDate, _setOGStartDate] = useState(location.state.bookData.date);

    const [canBeDeleted, _setCanBeDeleted] = useState(false);

    const {usingLocal } = useGlobalState();

    const [nameValidator, setNameValidator] = useState(false)
    const [descriptionValidator, setDescriptionValidator] = useState(false)
    const [chaptersValidator, setChaptersValidator] = useState(false)
    const [planetValidator, setPlanetValidator] = useState(false)
    const [systemValidator, setSystemValidator] = useState(false)
    const [shardValidator, setShardValidator] = useState(false)
    const [startDateValidator, setStartDateValidator] = useState(false);

    const titleAreaRef = useRef<HTMLTextAreaElement>(null);
    const descriptionAreaRef =  useRef<HTMLTextAreaElement>(null);
    const chaptersAreaRef = useRef<HTMLTextAreaElement>(null);
    const planetAreaRef = useRef<HTMLTextAreaElement>(null);
    const systemAreaRef = useRef<HTMLTextAreaElement>(null);
    const shardAreaRef = useRef<HTMLTextAreaElement>(null);
    const startDateAreaRef = useRef<HTMLTextAreaElement>(null);

    const [canBeSaved, setCanBeSaved] = useState(false);
    let allFieldsAreValid  = false;
    let anyFieldIsDifferent = false;

    useEffect(() => {
        async function getChapterFormat(){
            const chFormat = await axios.get("http://localhost:4000/mongoChapters/format/" + bookId)
            setChapters(chFormat.data.chapterFormat)
        }
        getChapterFormat();
    }, [])
    
    useEffect(() => {
        allFieldsAreValid = 
        (nameValidator &&
            descriptionValidator &&
            planetValidator &&
            systemValidator &&
            shardValidator && 
            startDateValidator)
        anyFieldIsDifferent = 
        (name !== OGname
            || description !== OGdescription
            || planet !== OGplanet
            || system !== OGsystem
            || shard !== OGshard
            || startDate.toString() !== OGstartDate.toString())

        console.log("Any fields are different valoarea: " + anyFieldIsDifferent)
        console.log("All fields are valid: " + allFieldsAreValid)
        
        
        if(allFieldsAreValid && anyFieldIsDifferent) {

                setCanBeSaved(true);
            } else {
                setCanBeSaved(false);
        }
    }, [name, description, chapters, startDate, planet, system, shard, 
        nameValidator, descriptionValidator, chaptersValidator, startDateValidator, 
        planetValidator, systemValidator, shardValidator]);
    
    const handleDiscard = () => {
        if(anyFieldIsDifferent){
            alert("Discard the changes you've made?")
        }
    }
    const handleDelete = () => {
        async function useLocalData() {
            if(canBeDeleted){
                let confirmation = window.confirm("Sure you want to delete this?");
                if(confirmation){
                    await axios.delete('http://localhost:4000/books/' + bookId)
                    navigate("/main");
                }
            }
        }

        async function useCloudData() {
            if(canBeDeleted){
                let confirmation = window.confirm("Sure you want to delete this?");
                if(confirmation){
                    await axios.delete('http://localhost:4000/mongoBooks/' + bookId)
                    navigate("/main");
                }
            }
            console.log(" -----------USING CLOUD DATA -----------")
        }

       if(usingLocal){useLocalData()} else {useCloudData()}
       
    }

    const handleSave = () => {
        async function useLocalData() {
            if(canBeSaved) {
                // if(rafoServ.containsBook(data) || rafoServ.isValidIdForNewBook(data))
                {
                    await axios.delete('http://localhost:4000/books/' + bookId)
                    await axios.post('http://localhost:4000/books', {
                    id: bookId,
                    title: name,
                    description: description,
                    chaptersFormat: chapters,
                    planet: planet,
                    system: system,
                    shard: shard,
                    date: startDate
                    })
                    updateCurrentPage(1)
                    refreshBookList();
                    refreshFilterData();
                    navigate("/main");
                }
            } 
        }
        async function useCloudData() {
            if(canBeSaved) {
                // if(rafoServ.containsBook(data) || rafoServ.isValidIdForNewBook(data))
                {
                    console.log(token)
                    await axios.delete(cosmerePath + '/mongoBooks/' + bookId, {headers: {Authorization: `${token}`}})
                    await axios.post(cosmerePath + '/mongoBooks', {
                    _id: bookId,
                    _title: name,
                    _description: description,
                    chaptersFormat: chapters,
                    _planet: planet,
                    _system: system,
                    _shard: shard,
                    _startDate: startDate}, {headers: {Authorization: `${token}`}})
                    refreshFilterData();
                    navigate("/main");
                }
            } 
        }
       if(usingLocal){useLocalData()} else {useCloudData()}
    }
        return (
            <div className="bookPageStyle">
                <div className="wrapper" >
                    <NameCardComponent 
                        name = {name}
                        setName={setName}
                        nameValidator={nameValidator}
                        setNameValidator={setNameValidator}
                        nameAreaRef={titleAreaRef}/>
                    <div className = "smallWrapper"> 
                    <DescriptionCardComponent 
                            description={description}
                            setDescription={setDescription}
                            descriptionValidator={descriptionValidator}
                            setDescriptionValidator={setDescriptionValidator}
                            descriptionAreaRef={descriptionAreaRef}/>
    
                        <ChaptersCardComponent 
                            bookData = {bookData}
                            chapters={chapters}
                            setChapters={setChapters}
                            chaptersValidator={chaptersValidator}
                            setChaptersValidator={setChaptersValidator}
                            chaptersAreaRef={chaptersAreaRef}/>
                        
                        <div className="gridBookOneLinesContainer">
                            <PlanetCardComponent 
                                planet = {planet}
                                setPlanet={setPlanet}
                                planetValidator={planetValidator}
                                setPlanetValidator={setPlanetValidator}
                                planetAreaRef={planetAreaRef}
                                systemAreaRef={systemAreaRef}/>
    
                            <SystemCardComponent 
                                system={system}
                                setSystem={setSystem}
                                systemValidator={systemValidator}
                                setSystemValidator={setSystemValidator}
                                systemAreaRef={systemAreaRef}
                                planetAreaRef={planetAreaRef}/>
    
                            <ShardCardComponent 
                                shard = {shard}
                                setShard={setShard}
                                shardValidator={shardValidator}
                                setShardValidator={setShardValidator}
                                shardAreaRef={shardAreaRef}
                                startDateAreaRef={startDateAreaRef}/>
    
                            <StartDateCardComponent 
                                startDate={startDate}
                                setStartDate={setStartDate}
                                startDateValidator={startDateValidator}
                                setStartDateValidator={setStartDateValidator}
                                startDateAreaRef={startDateAreaRef}
                                shardAreaRef={shardAreaRef}/>
                        </div>
                    </div>
                    <div className = "buttonWrapper">
                        <button className = {canBeSaved === false ? "disabledButton" : "saveButton"}
                            onClick={handleSave}>Save</button>
                        <button className = {!canBeDeleted === true ? "disabledButton" : "deleteButton"}
                            onClick = {handleDelete}>Delete</button>
                        <Link to = "/main">
                        <button className="discardButton"
                            onClick = {handleDiscard}>Discard</button></Link>
                    </div>
                    </div>
                </div>
        )
    } catch(error: any) {
        return (
            <>
             
                <div className="bookPageStyle">
                <div className="wrapper" >
                <ErrorComponent message={error.message} />
                <div className = "buttonWrapper">
                    <Link to = "/main">
                        <button className="discardButton">Discard</button></Link>
                </div>
                </div>
                </div>
            </>
           
        )
    }
    
}


