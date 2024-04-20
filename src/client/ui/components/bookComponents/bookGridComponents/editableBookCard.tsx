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
export const EditableBookCard: React.FC<{}> = ({}) => {
    
    const location = useLocation();
    const navigate = useNavigate();

    const bookId = location.state;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [chapters, setChapters] = useState("");
    const [planet, setPlanet] = useState("");
    const [system, setSystem] = useState("");
    const [shard, setShard] = useState("");
    const [startDate, setStartDate] = useState("");

    const [OGname, setOGName] = useState("");
    const [OGdescription, setOGDescription] = useState("");
    const [OGchapters, setOGChapters] = useState("");
    const [OGplanet, setOGPlanet] = useState("");
    const [OGsystem, setOGSystem] = useState("");
    const [OGshard, setOGShard] = useState("");
    const [OGstartDate, setOGStartDate] = useState("");

    const [canBeDeleted, setCanBeDeleted] = useState(false);


const [fetchDataOnce, setFetchDataOnce] = useState(false);

if (!fetchDataOnce) {
    axios.get('http://localhost:4000/books/' + bookId)
        .then(response => {
            let bookData = response.data.book;
            setName(bookData._title);
            setDescription(bookData._description);
            setChapters(bookData._chaptersFormat);
            setPlanet(bookData._planet);
            setSystem(bookData._system);
            setShard(bookData._shard);
            setStartDate(bookData._startDate);

            setOGName(bookData._title);
            setOGDescription(bookData._description);
            setOGChapters(bookData._chaptersFormat);
            setOGPlanet(bookData._planet);
            setOGSystem(bookData._system);
            setOGShard(bookData._shard);
            setOGStartDate(bookData._startDate);

            if (bookData._title.length !== 0){
                setCanBeDeleted(true);
            }
            setFetchDataOnce(true);
        })
        .catch(error => {
            console.error('Error fetching book with ID:', error);
        });
    }

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
        if(canBeDeleted){
                let confirmation = window.confirm("Sure you want to delete this?");
                if(confirmation){
                    axios.delete('http://localhost:4000/books/' + bookId)
                    navigate("/main");
            }
        }
    }

    const handleSave = () => {
        if(canBeSaved) {
            // if(rafoServ.containsBook(data) || rafoServ.isValidIdForNewBook(data))
            {
                axios.delete('http://localhost:4000/books/' + bookId)
                axios.post('http://localhost:4000/books', {
                id: bookId,
                title: name,
                description: description,
                chaptersFormat: chapters,
                planet: planet,
                system: system,
                shard: shard,
                date: startDate
            })
            .then(response => {
                console.log('New book added:', response.data.book);
            })
            .catch(error => {
                console.error('Error adding new book:', error);
            });
                navigate("/main");
            }
        }
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
                        bookId={bookId}
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
}


