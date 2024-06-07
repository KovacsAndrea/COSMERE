import React from "react"
import "./insignia.css"
export const Insignia: React.FC<{resource: string}> =({resource}) =>{
    console.log(resource)
    return (
        <>
        <div className="patternCenter">
            <div className = "insignia-spears">
            </div>
        </div>
        </>
    )
}