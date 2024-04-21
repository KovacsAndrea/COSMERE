import { Link, useLocation, useNavigate } from "react-router-dom";
import './chapterComponentsStyle.css'
import { useEffect, useRef, useState } from "react";
import { FaBook } from "react-icons/fa";
import { adjustAreaHeight, adjustAreaHeightGrid, errorMessage, infoMessage, validateContent } from "../bookComponents/utils";
import { REGEX } from "../../../../server/core/dummyData/regex";
import { IoCheckmarkCircle, IoFilterCircle, IoInformationCircle } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { IoChevronBackCircle } from "react-icons/io5";
import { AccordionCArdComponent } from "../bookComponents/acordionCardComponent/accordionCardComponent";

export const EditableChapterCard: React.FC<{}> = ({}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const bookId = location.state.editableChapterCardData.bookId
    const chapterId = location.state.editableChapterCardData.chapterId;
    const chapterNumber = location.state.editableChapterCardData.chapterNumber;
    const bookTitle = location.state.editableChapterCardData.bookTitle;

    const [title, setTitle] = useState(location.state.editableChapterCardData.title);
    const [description, setDescription] = useState(location.state.editableChapterCardData.description);
    const [wordcount, setWordcount] = useState(location.state.editableChapterCardData.wordcount);
    const [pov, setPov] = useState(location.state.editableChapterCardData.pov);

    const [OGtitle, setOGTitle] = useState(location.state.editableChapterCardData.title);
    const [OGdescription, setOGDescription] = useState(location.state.editableChapterCardData.description);
    const [OGwordcount, setOGWordcount] = useState(location.state.editableChapterCardData.wordcount);
    const [OGpov, setOGPov] = useState(location.state.editableChapterCardData.pov);

    const [titleValidator, setTitleValidator] = useState(false);
    const [descriptionValidator, setDescriptionValidator] = useState(false);
    const [wordcountValidator, setWordcountValidator] = useState(false);
    const [povValidator, setpovValidator] = useState(false);

    let allFieldsAreValid  = false;
    let anyFieldIsDifferent = false;

        
    const [saveIconStatus, setSaveIconStatus] = useState("");
    const [deleteIconStatus, setDeleteIconStatus] = useState("");

    const [canBeSaved, setCanBeSaved] = useState(false);
    const [canBeDeleted, setCanBeDeleted] = useState(false);

    const validateAllContent = () => {
        console.log("im validating")
        validateContent(title, REGEX.chapterTitle, setTitleValidator);
        validateContent(description, REGEX.chapterDescription, setDescriptionValidator);
        validateContent(wordcount, REGEX.chapterWordCount, setWordcountValidator)
        validateContent(pov, REGEX.pov, setpovValidator)
    }

    useEffect (() => {
        validateAllContent();
        allFieldsAreValid = (
            titleValidator &&
            descriptionValidator &&
            wordcountValidator &&
            povValidator
        )
        anyFieldIsDifferent = (
            OGtitle != title ||
            OGdescription != description ||
            OGwordcount != wordcount ||
            OGpov != pov 
        )
        console.log("TITLE " + titleValidator)
        console.log("description " + descriptionValidator)
        console.log("count " + wordcountValidator)
        console.log("pov " + povValidator)

        let chapterCanBeSaved = (anyFieldIsDifferent && allFieldsAreValid)
        setCanBeSaved(chapterCanBeSaved)
        updateSaveIconStatus(chapterCanBeSaved)
        console.log("ALL FIELDS ARE VALID " + allFieldsAreValid)
        console.log("ANY FIELDS ARE CHANFED" + anyFieldIsDifferent)

        // let saveStatusStyle = "icon-chapter-section "
        // if (chapterCanBeSaved) ( saveStatusStyle += "chapter-save")
        //     else { saveStatusStyle += "disabled-chapter-icon"}
        // setSaveIconStatus(saveStatusStyle)

        //updateSaveIconStatus(chapterCanBeSaved);
        console.log(saveIconStatus)

        let chapterCanBeDeleted = (OGtitle.length !==0);
        updateDeleteIconStatus(chapterCanBeDeleted);
        setCanBeDeleted(chapterCanBeDeleted);

    }, [title, description, wordcount, pov, titleValidator, descriptionValidator, wordcountValidator, povValidator])
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
    }, [titleAreaRef])
    
    const handleSave = () => {
        if(canBeSaved){
            let confirmation = window.confirm("Book can be saved but not implemented yet")
            if(confirmation){
                navigate(`/chapters/book/${bookId}`, { state: { bookId } })
            }
        }
    }

    const handleDelete = () => {
        if(canBeDeleted){
            let confirmation = window.confirm("Book can be DELETED but not implemented yet")
            if(confirmation){
                navigate(`/chapters/book/${bookId}`, { state: { bookId } })
            }
        }
    }

    const handleDiscard = () => {
        if(anyFieldIsDifferent){
            let confirmation = window.confirm("Discard changes made?")
            if(confirmation){
                navigate(`/chapters/book/${bookId}`, { state: { bookId } })
            }
        }else{navigate(`/chapters/book/${bookId}`, { state: { bookId } })}

    }

    const handleBackToBook = () => {
        navigate(`/details/${bookId}`, { state: { bookId } })
    }

    const updateSaveIconStatus = (chapterCanBeSaved: boolean) => {
        console.log("FaKEM MARE STIl")
        let saveStatusStyle = "icon-chapter-section "
        if (chapterCanBeSaved) ( saveStatusStyle += "chapter-save")
            else { saveStatusStyle += "disabled-chapter-icon"}
        setSaveIconStatus(saveStatusStyle)
    }

    const updateDeleteIconStatus = (chaprerCanBeDeleted: boolean) => {
        let deleteStatusStyle = "icon-chapter-section "
        if (chaprerCanBeDeleted) ( deleteStatusStyle += "chapter-delete")
            else { deleteStatusStyle += "disabled-chapter-icon"}
        setDeleteIconStatus(deleteStatusStyle)
    }

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
                    <textarea className={`medium-editable-section-editable-entity-card ${!titleValidator ? 'shadow' : ''}`}
                        value = {title}
                        maxLength={150}
                        onChange={handleTitleChange}
                        onBlur={validateAllContent}
                        title = "Chapter Title"
                        placeholder="Chapter Title"
                        id = "chapterTitle"
                        rows={1} 
                        ref = {chapterTitleAreaRef}
                    />
                    <AccordionCArdComponent infoMessage={infoMessage.chapterTitle} errorMessage={errorMessage.chapterTitle}/>
                </div>

                

                <div className="small-editable-section-editable-entity-card-wrapper"> 
                    <textarea className={`small-editable-section-editable-entity-card ${!descriptionValidator ? 'shadow' : ''}`} 
                        value = {description}
                        maxLength={400}
                        onChange={handleDescriptionChange}
                        onBlur={validateAllContent}
                        title = "Chapter Description"
                        placeholder="Chapter Description"
                        id = "chapterDescription"
                        rows={1} 
                        ref = {descriptionAreaRef}
                    />
                    <AccordionCArdComponent infoMessage={infoMessage.chapterDescription} errorMessage={errorMessage.chapterDescription}/>
                </div>

                <div className="column-section-editable-entity-card">
                    <div className="small-editable-section-editable-entity-card-wrapper"> 
                        <textarea className={`small-editable-section-editable-entity-card ${!wordcountValidator ? 'shadow' : ''}`}  
                            value = {wordcount}
                            maxLength={6}
                            onChange={handleWordcountChange}
                            onBlur={validateAllContent}
                            title = "Word count"
                            placeholder="Word count"
                            id = "chapterWordCount"
                            rows={1} 
                            ref = {wordcountAreaRef}
                        />
                        <AccordionCArdComponent infoMessage={infoMessage.chapterWordcount} errorMessage={errorMessage.chapterWordcount}/>
                    </div>

                    <div className="small-editable-section-editable-entity-card-wrapper"> 
                        <textarea className={`small-editable-section-editable-entity-card ${!povValidator ? 'shadow' : ''}`}  
                            value = {pov}
                            maxLength={100}
                            onChange={handlePovChange}
                            onBlur={validateAllContent}
                            title = "Character Point of View"
                            placeholder="Character Point of View"
                            id = "chapterPov"
                            rows={1} 
                            ref = {povAreaRef}
                        />
                        <AccordionCArdComponent infoMessage={infoMessage.chapterPov} errorMessage={errorMessage.chapterPov}/>
                    </div>
                </div>

                <div className = "save-delete-discard-icons-wrapper">
                    <IoChevronBackCircle className = "icon-chapter-section chapter-discard" onClick={handleDiscard}/>
                    <IoCheckmarkCircle className = {saveIconStatus} onClick={handleSave}/>
                    <IoCloseCircle className = {deleteIconStatus} onClick={handleDelete}/>
                    <IoInformationCircle className = "icon-chapter-section chapter-discard" onClick={handleBackToBook}/>
                </div>

                
            </div>
        </div>
    </>)
}