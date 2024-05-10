import React from 'react'
import '../sortFilterChartComponent.css'
import './chartComponent.css'

export const StateOptions: React.FC<{stateType: any, setStateType: any, isConnected: any}> = ({stateType, setStateType, isConnected}) => {
    const handleSelectServer = () => {
        setStateType("Server")
    }
    const handleSelectSocket = () => {
        setStateType("Socket")
    }
    return (
        <>
            <div className="choices-for-grid">
                <label className="title-for-filter-category"> State Options </label>
                    <div className="design-for-option-column">
                        <div className="checkable-option-for-filter-button">
                            <input type="radio" name="State" value={"Server"} id = {"Server"} className = "stilu-lu-vasile" 
                            onClick={handleSelectServer} defaultChecked= {true}/>
                            <label htmlFor={"Server"} className="stilu-lu-vasile-da-ptr-label"> Server </label>
                        </div>
                        <div className="checkable-option-for-filter-button">
                            <input type="radio" name="State" value={"Socket"} id = {"Socket"} className = "stilu-lu-vasile"
                            onClick={handleSelectSocket}/>
                            <label htmlFor={"Socket"} className="stilu-lu-vasile-da-ptr-label"> Socket </label>
                        </div>
                    </div>
                </div>
        </>
    )
}