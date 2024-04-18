import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import './inputBar.css'
import React from "react";
export const InputBar: React.FC<{inputText: string, setInputText: any}> = 
({inputText, setInputText}) => {
    return (
        <div className = "inputBoxWrapper">
        <div className="inputBox">
                <input type='search' 
                placeholder="Filter Coppermind" 
                className='textInput'
                value={inputText}
                onChange={(e) => {setInputText(e.target.value);
                console.log(inputText)}}
                name="FilterCoppermind"
                >
                </input>
                <Link to ="/main"> 
                    <FaSearch className='inputIcon' 
                    onClick={() => inputHandleClick(inputText)}/>
                </Link>
            </div>
        </div>
        
    )
}

function inputHandleClick(inputText: string) {
    console.log(inputText);
}
