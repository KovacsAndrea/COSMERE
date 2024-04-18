import { Link } from "react-router-dom"
import './addButton.css'
import React, { useState } from "react"
import axios from "axios";

export const AddButton: React.FC<{}> = ({}) => {
    const [newBookId, setNewBookID] = useState("-1");

    async function fetchNewBookId() {
        try {
            const response = await axios.get('http://localhost:4000/newId');
            setNewBookID(response.data.newId);
        } catch (error) {
            console.error('Error fetching new book ID:', error);
        }
    }
    fetchNewBookId()
    return(
        <>
        <div className="addButtonCenter">
            <Link to ={`/details/${newBookId}`} state={newBookId}>
                <button className = "addButtonStyle">Expand Coppermind</button>
            </Link>
        </div>
        </>
    )
}