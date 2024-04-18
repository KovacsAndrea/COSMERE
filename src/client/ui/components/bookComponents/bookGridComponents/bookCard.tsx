import { Link } from 'react-router-dom';
import './bookCard.css'
import React from "react";
import { Book } from '../../../../../server/core/model/book';
export function writeChapters(chapters: string[]) {
    let formattedChapters = '';
    for (let i = 0; i < chapters.length; i++) {
        formattedChapters += `Ch.${i + 1}: ${chapters[i]}; `;
    }
    formattedChapters = formattedChapters.slice(0, -2);
    return formattedChapters;
}

// bookTitle = {book._title}
//                 bookDescription = {book._description}
//                 bookChapters = {[]}
//                 bookChaptersFormat = {book._chaptersFormat}
//                 bookPlanet = {book._planet}
//                 bookSystem = {book._system}
//                 bookShard = {book._shard}
//                 bookDate = {book._startDate}
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
        bookChapers,
        bookChaptersFormat,
        bookPlanet,
        bookSystem,
        bookShard,
        bookDate,
         setDeleteBook}) => {
    const setUpBookForDelete = () => {setDeleteBook(bookId)}
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
                        <Link to ={`/details/${bookId}`}
                            state={bookId}>
                            <button className="edit">Details</button>
                        </Link>
                    <button className="delete" onClick={setUpBookForDelete}>Delete</button>

                    </div>
            </div>
        </>
    )
}



export default BookCard;