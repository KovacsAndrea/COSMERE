import './navBar.css'
import { Link, useNavigate } from 'react-router-dom'
import { SearchBar } from './searchBar.tsx'
import React, { useEffect, useState } from "react";
import { useGlobalState } from '../../../../../globalVariables.tsx';
export const NavBar: React.FC<{
    searchText: string, 
    setSearchText: any,
    searchShouldBeComputed: any,
    setSearchShouldBeComputed: any, 
}> = 
({searchText, 
    setSearchText,
    searchShouldBeComputed,
        setSearchShouldBeComputed,
}) =>{
    const { 
        user,
        refreshUser
     } = useGlobalState();
     const navigate = useNavigate();
    useEffect(() => {
        refreshUser();
    }, [])

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        sessionStorage.setItem('token', '')
        navigate("/auth")
    };

    const handleSettings = () => {
        navigate("/profile")
    };
    return (
        <>
            <nav>
                <ul className='nav-bar-content'>
                    
                    
                    <div className='logo'>
                        <Link to = "/main" className="cosmereLogo">THE COSMERE</Link>
                    </div>
                    
                    <SearchBar 
                     searchText = {searchText} 
                     setSearchText = {setSearchText}
                     searchShouldBeComputed = {searchShouldBeComputed}
                    setSearchShouldBeComputed = {setSearchShouldBeComputed}
                    />
                    {user.username ? <div className = 'user-profile' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                        <p> {user.username} </p> 
                        <div className="dropdown-menu">
                            <div className="dropdown-option" onClick={handleSettings}>Settings</div>
                            <div className="dropdown-option" onClick={handleLogout}>Log Out</div>
                        </div>
                    </div> :
                    <p className = "user-profile" onClick={handleLogout}>
                        ?
                    </p>
                    
                    }
                    
                </ul>
            </nav>
        </>
    )
}