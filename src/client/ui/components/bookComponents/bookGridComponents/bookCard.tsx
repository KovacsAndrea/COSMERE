import { useNavigate } from 'react-router-dom';
import './bookCard.css'
import React from "react";
import { Book } from '../../../../../server/core/model/book';


const BookCard: React.FC<{
    bookId: any
    bookTitle: any,
    bookDescription: any,
    bookChapers: any,
    bookChaptersFormat: any,
    bookPlanet: any,
    bookSystem: any,
    bookShard: any,
    bookDate: any
    setDeleteBook: any}> = ({
        bookId,
        bookTitle,
        bookDescription,
        bookChaptersFormat,
        bookPlanet,
        bookSystem,
        bookShard,
        bookDate,
         setDeleteBook}) => {

    const setUpBookForDelete = async () =>{setDeleteBook(bookId); 
        
    }
    const navigate = useNavigate();
    let bookData = new Book(
        bookId,
        bookTitle,
        bookDescription,
        bookPlanet,
        bookSystem,
        bookShard,
        bookDate,
        bookChaptersFormat
    )
    
    const handleExpandBook = () => {
        navigate(`/details/${bookData._id.toString()}`, {state: {bookData}})
    }
    return(
        <>
            <div className="card">
                    <div className="cardHeader">{bookTitle}</div>
                    <div className="cardBody"> 
                        <div className="cardContent">{bookDescription}</div>
                        <div className="cardContent">{bookChaptersFormat}</div>
                        <div className="cardContent">{bookPlanet}</div>
                        <div className="cardContent">{bookSystem}</div>
                        <div className="cardContent">{bookShard}</div>
                        <div className="cardContent">{bookDate}</div>
                    </div>
                    <div className="cardFooter">
                            <button className="edit" onClick={handleExpandBook}>Details</button>
                    <button className="delete" onClick={setUpBookForDelete}>Delete</button>

                    </div>
            </div>
        </>
    )

}
export default BookCard;