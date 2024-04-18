import React from "react"
import "./insignia.css"

export const Insignia: React.FC<{resource: string}> =({resource}) =>{
    return (
        <>
        <div className="patternCenter">
            <div>
                <img 
                className="pattern"
                src ={"../../../../src/assets/photos/" + resource}
                alt = "Insignia">
                </img>
            </div>
        </div>
        </>
    )
}