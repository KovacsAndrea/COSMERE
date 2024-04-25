import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../../../../globalVariables";


export const CheckboxButton: React.FC<{name: string, category: string, selectedStuff: any, setSelectedStuff: any}> = ({name, category, selectedStuff, setSelectedStuff}) => {
    let listItems: string[] = selectedStuff;
    let checked = listItems.includes(name);

    const {usingLocal} = useGlobalState();
    const [isChecked, setIsChecked] = useState(checked)

    useEffect(() => {
        let listItems: string[] = selectedStuff;
        if(listItems.includes(name)){
            setIsChecked(true)
        }
        else{
            setIsChecked(false)
        }
    }, [isChecked, selectedStuff])

    const handleChange = (e: any) => {
        async function useLocalData() {
            const newValue = e.target.checked;
            axios.patch("http://localhost:4000/pagination/current", {currentPage: 1})
            setIsChecked(newValue); 
            console.log(newValue);
            if (listItems.includes(name)){
                listItems = listItems.filter(item => item !== name);
            }
            else {
                listItems.push(name);
            }
            setSelectedStuff(listItems);
            axios.patch("http://localhost:4000/filter/" + category, {data: listItems})
        }
        async function useCloudData() {
            console.log(" -----------USING CLOUD DATA -----------")
        }
        if(usingLocal){useLocalData()} else {useCloudData()}
    };


    return(
        <>
        <div className="checkable-option-for-filter-button">
            <input type="checkbox" checked = {isChecked} value={name} id = {name + category} className = "stilu-lu-vasile" onChange={(e) => {handleChange(e)}} />
            <label htmlFor={name + category} className="stilu-lu-vasile-da-ptr-label"> {name} </label>
        </div>
        </>
    )
}