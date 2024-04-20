import { Link, useLocation } from "react-router-dom";
import './chapterComponentsStyle.css'
import { useEffect, useRef, useState } from "react";
import { adjustAreaHeight, adjustAreaHeightGrid, validateContent } from "../bookComponents/utils";
import { REGEX } from "../../../../server/core/dummyData/regex";
export const EditableChapterCard: React.FC<{}> = ({}) => {
    const location = useLocation();
    const bookId = location.state.bookId
    const chapterId = location.state.chapterId;
    const chapterNumber = location.state.chapterNumber;
    const bookTitle = location.state.bookTitle;

    const [title, setTitle] = useState(location.state.title);
    const [description, setDescription] = useState(location.state.description);
    const [wordcount, setWordcount] = useState(location.state.wordcount);
    const [pov, setPov] = useState(location.state.pov);

    const [titleValidator, setTitleValidator] = useState(false);
    const [descriptionValidator, setDescriptionValidator] = useState(false);
    const [wordcountValidator, setWordcountValidator] = useState(false);
    const [povValidator, setpovValidator] = useState(false);

    const [canBeSaved, setCanBeSaved] = useState(false);
    let allFieldsAreValid  = false;
    let anyFieldIsDifferent = false;

    const validateAllContent = () => {
        console.log("im validating")
        validateContent(title, REGEX.chapterTitle, setTitleValidator);
        validateContent(description, REGEX.chapterDescription, setDescriptionValidator);
        validateContent(wordcount, REGEX.chapterWordCount, setWordcountValidator)
        validateContent(pov, REGEX.pov, setpovValidator)
    }

    useEffect (() => {
        validateAllContent();
    }, [])
    const titleAreaRef= useRef<HTMLTextAreaElement>(null);
    const chapterTitleAreaRef = useRef<HTMLTextAreaElement>(null);
    const descriptionAreaRef = useRef<HTMLTextAreaElement>(null);
    const wordcountAreaRef = useRef<HTMLTextAreaElement>(null);
    const povAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleTitleChange = (e: any) => {setTitle(e.target.value); adjustAreaHeight(chapterTitleAreaRef); validateContent(title, REGEX.chapterTitle, setTitleValidator)}
    const handleDescriptionChange = (e: any) => {setDescription(e.target.value); adjustAreaHeight(descriptionAreaRef); validateContent(description, REGEX.chapterDescription, setDescriptionValidator)}
    const handleWordcountChange = (e: any) => {setWordcount(e.target.value); adjustAreaHeightGrid(wordcountAreaRef, povAreaRef); validateContent(wordcount, REGEX.chapterWordCount, setWordcountValidator)}
    const handlePovChange = (e: any) => {setPov(e.target.value); adjustAreaHeightGrid(povAreaRef, wordcountAreaRef); validateContent(pov, REGEX.pov, setpovValidator)}
    
    useEffect(() => {
        adjustAreaHeight(titleAreaRef)
        adjustAreaHeight(chapterTitleAreaRef)
    }, [titleAreaRef, chapterTitleAreaRef])

    let cardTitle = "Ch." + chapterNumber + " of " + bookTitle; 
    return (<>
        <div className = 'editable-entity-card-style'>
            <div className="editable-entity-card-wrapper">
                <textarea className = {"large-uneditable-section-editable-entity-card"}
                value = {cardTitle}
                title = "Chapter Title"
                placeholder="Chapter Title"
                id = "chapterTitle"
                rows={1} 
                readOnly = {true}
                ref={titleAreaRef} />


                <div className="medium-editable-section-editable-entity-card-wrapper"> 
                    <textarea className="medium-editable-section-editable-entity-card" 
                        value = {title}
                        onChange={handleTitleChange}
                        onBlur={validateAllContent}
                        title = "Chapter Title"
                        placeholder="Chapter Title"
                        id = "chapterTitle"
                        rows={1} 
                        ref = {chapterTitleAreaRef}
                    />
                </div>

                <div className="small-editable-section-editable-entity-card-wrapper"> 
                    <textarea className={`small-editable-section-editable-entity-card ${!descriptionValidator ? 'shadow' : ''}`} 
                        value = {description}
                        onChange={handleDescriptionChange}
                        onBlur={validateAllContent}
                        title = "Chapter Description"
                        placeholder="Chapter Description"
                        id = "chapterDescription"
                        rows={1} 
                        ref = {descriptionAreaRef}
                    />
                </div>

                <div className="column-section-editable-entity-card">
                    <div className="small-editable-section-editable-entity-card-wrapper"> 
                        <textarea className={`small-editable-section-editable-entity-card ${!wordcountValidator ? 'shadow' : ''}`}  
                            value = {wordcount}
                            onChange={handleWordcountChange}
                            onBlur={validateAllContent}
                            title = "Word count"
                            placeholder="Word count"
                            id = "chapterWordCount"
                            rows={1} 
                            ref = {wordcountAreaRef}
                        />
                    </div>

                    <div className="small-editable-section-editable-entity-card-wrapper"> 
                        <textarea className={`small-editable-section-editable-entity-card ${!povValidator ? 'shadow' : ''}`}  
                            value = {pov}
                            onChange={handlePovChange}
                            onBlur={validateAllContent}
                            title = "Character Point of View"
                            placeholder="Character Point of View"
                            id = "chapterPov"
                            rows={1} 
                            ref = {povAreaRef}
                        />
                    </div>
                </div>

                <div className='details-button-expand-chapters'>
                        <Link to ={`/details/${bookId}`}
                            state={bookId}>
                            <button className='discardButton'>See Book</button>
                        </Link>
                </div>
            </div>
        </div>
    </>)
}