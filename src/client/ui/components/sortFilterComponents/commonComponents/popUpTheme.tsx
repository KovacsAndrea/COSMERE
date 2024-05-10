import React from "react";
import { FaTimes } from "react-icons/fa";

export const PopUpTheme: React.FC<{
    isOpen: any,  
    title: string, 
    insigniaLeftClassName: string, 
    insigniaRightClassName: string,
    onClickAction: any
    children: any, }> = ({
        isOpen, 
        children, 
        title, 
        insigniaLeftClassName, 
        insigniaRightClassName,
        onClickAction}) => {
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
                            onClick = { onClickAction}/>
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