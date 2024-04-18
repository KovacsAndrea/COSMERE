import React from "react";
import { FaTimes } from "react-icons/fa";

export const PopUpTheme: React.FC<{
    isOpen: any, setIsOpen: any,  title: string, setFunctionalityShouldBeComputed: any, 
    insigniaLeftClassName: string, insigniaRightClassName: string,
    children: any, }> = 
    ({isOpen, setIsOpen, children, title, setFunctionalityShouldBeComputed, insigniaLeftClassName, insigniaRightClassName}) => {
    return (
        <>
        {isOpen && (
            <div className="pop-up">
                <div className="overlay">
                    <div className={insigniaLeftClassName}></div>
                    <div className="pop-up-content"> 
                        <div className="pop-up-header"> 
                            <p className="pop-up-title"> {title} </p>
                            <FaTimes className="pop-up-theme-close-button"
                            onClick = { () => {
                                setIsOpen(!isOpen);
                                if(setFunctionalityShouldBeComputed != null) {
                                    setFunctionalityShouldBeComputed(true); 
                                }
                                }}/>
                        </div>
                        {children}
                    </div>
                    <div className={insigniaRightClassName}></div>
                </div>
            </div>
            )}
        </>
    );
}