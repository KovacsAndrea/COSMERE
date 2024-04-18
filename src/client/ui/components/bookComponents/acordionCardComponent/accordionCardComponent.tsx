import { useState } from 'react'
import './accordionCardComponent.css'
export const AccordionCArdComponent: React.FC<{infoMessage: string, errorMessage: string}> 
= ({infoMessage, errorMessage}) => {
    const [selected, setSelected] = useState(false)
    const handleSelect = () =>{
        if (selected == true){setSelected(false)}
        else{setSelected(true)}
    } 
    return (
        <>
        <div className= "expandItem">
            <div className ="expandIcon" onClick={handleSelect}><span>{selected === true ? "-" : "+"}</span></div>
                <div className = {selected === true ? "expandContentshow" : "expandContent"}>
                    <p className="hiddenInfoMessage">{infoMessage}</p>
                    <p className="hiddenErrorMessage">{errorMessage}</p>
            </div>
        </div>
        </>
    )
} 