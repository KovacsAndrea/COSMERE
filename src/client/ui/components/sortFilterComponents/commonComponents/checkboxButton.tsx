
import React from "react";
import { useEffect, useState } from "react";


export const CheckboxButton: React.FC<{
    name: any, 
    category: string, 
    selectedStuff: any, 
    setSelectedStuff: any}> = ({
        name, 
        category, 
        selectedStuff, 
        setSelectedStuff, }) => {

    let listItems: any[] = selectedStuff;
    let checked = listItems.includes(name);
    const [isChecked, setIsChecked] = useState(checked)

    useEffect(() => {
        let listItems: any[] = selectedStuff;
        setIsChecked(listItems.includes(name))
    }, [selectedStuff])

    const updateSelectedItemsOnChange = () => {
        if (listItems.includes(name)){
            listItems = listItems.filter(item => item !== name);
        } else {listItems.push(name)}
    }

    const handleChange = (e: any) => {
        setIsChecked(e.target.checked)
        updateSelectedItemsOnChange();
        setSelectedStuff(listItems);
    };

    return(
        <>
        <div className="checkable-option-for-filter-button">
            <input 
            type="checkbox" 
            className = "stilu-lu-vasile" 
            id = {name + category} 
            checked = {isChecked} 
            value={name.toString()}
            onChange={(e) => {handleChange(e)}} />

            <label 
            className="stilu-lu-vasile-da-ptr-label"
             htmlFor={name + category}> {name} </label>
        </div>
        </>
    )
}