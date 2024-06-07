import { useNavigate } from "react-router-dom"
import './addButton.css'
import React, { useEffect } from "react"
import axios from "axios";
import { useGlobalState } from "../../../../../globalVariables";
import { Book } from "../../../../../server/core/model/book";

export const AddButton: React.FC<{link: string}> = ({link}) => {
    let bookData: Book;
    const {usingLocal} = useGlobalState()
    
    useEffect(() => {
        async function fetchNewBookId() {
            async function useLocalData() {
            }
            async function useCloudData() {
                // try {
                //     const response = await axios.get('http://localhost:4000/mongoBooks/mockBook/book');
                //     setBookData(response.data.book)
                // } catch (error) {
                //     console.error('Error fetching new book ID:', error);
                // } 
            }
           if(usingLocal){useLocalData()} else {useCloudData()}
            
        }
        fetchNewBookId()
    }, [])
    

    const navigate = useNavigate()
    const handleGoToAddBook = async () => {
        try {
            const response = await axios.get('http://localhost:4000/mongoBooks/mockBook/book');
            bookData = response.data.book
            console.log("BOOD DATA " + bookData._id)
            console.log("BOOK TITLE _>" + bookData._title)
        } catch (error) {
            console.error('Error fetching new book ID:', error);
        }
        navigate(`${link}${bookData._id}`,{state: {bookData}})
    }

    return(
        <>
        <div className="addButtonCenter">
                <button className = "addButtonStyle" onClick={handleGoToAddBook}>Expand Coppermind</button>
        </div>
        </>
    )
}