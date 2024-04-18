import { FaSearch } from "react-icons/fa";
import './searchBar.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
export const SearchBar: React.FC<{
    searchText: string, 
    setSearchText: any,
    searchShouldBeComputed: any,
    setSearchShouldBeComputed: any, 
}> = 
({searchText, 
    setSearchText,
    searchShouldBeComputed,
    setSearchShouldBeComputed,
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleSearchClick = () => {
        
            if(location.pathname != "/main"){
                let confirmationWindow = window.confirm("Are you sure you want to leave?")
                if (confirmationWindow){ 
                    navigate("/main");
                }
            }
            setSearchShouldBeComputed(searchText)
    }

    const handleChange = (message: any) => {
        setSearchText(message)
        if (message === ""){
            setSearchShouldBeComputed("NONE")
            axios.patch("http://localhost:4000/pagination/current", {currentPage: 1})
        }
    }
    return (
        <li className="searchBox">
            <input type='search' 
            placeholder="Access Coppermind" 
            className='searchInput'
            value={searchText}
            onChange={(e) => handleChange(e.target.value) }
        
            name="Access Coppermind"
            >
            </input>
                <FaSearch className='searchIcon' 
                onClick={handleSearchClick}/>
        </li>
    )
}

