import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

export const RadioButton: React.FC<{name: string, category: string, 
    sortCriteria: any, setSortCriteria: any, 
    sortDirection: any, setSortDirection: any,

}> = ({name, category, 
    sortCriteria, setSortCriteria,
    sortDirection, setSortDirection
}) => {
    const handleClick = () =>{
        console.log("am dat click")
        setSortCriteria(category)
        setSortDirection(name)
        axios.patch("http://localhost:4000/sort/criteria", { sortCriteria: category})
        axios.patch("http://localhost:4000/sort/direction", { sortDirection: name})
    }

    const handleChange = () =>{
    }

    const [isChecked, setIsChecked] = useState(sortCriteria == category && sortDirection == name)

    useEffect(() => {setIsChecked(sortCriteria == category && sortDirection == name)}, [sortCriteria, sortDirection])

    return(
        <>
        <div className="checkable-option-for-filter-button">
            <input type="radio" name="SORT" value={name} id = {name + category} checked = {isChecked} className = "stilu-lu-vasile" onClick={handleClick} onChange={handleChange}/>
            <label htmlFor={name + category} className="stilu-lu-vasile-da-ptr-label"> {name} </label>
        </div>
        </>
    )
}