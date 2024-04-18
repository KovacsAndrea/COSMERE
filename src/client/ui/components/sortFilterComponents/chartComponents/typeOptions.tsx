import React from 'react'
import '../sortFilterChartComponent.css'
import './chartComponent.css'

export const TypeOptions: React.FC<{chartType: any, setChartType: any}> = ({chartType, setChartType}) => {
    const handleSelectPie = () => {
        setChartType("Pie")
        console.log(chartType)
    }
    const handleSelectBar = () => {
        setChartType("Bar")
        console.log(chartType)
    }
    return (
        <>
            <div className="choices-for-grid">
                <label className="title-for-filter-category"> Chart Options </label>
                    <div className="design-for-option-column">
                        <div className="checkable-option-for-filter-button">
                            <input type="radio" name="Chart" value={"Pie Chart"} id = {"PieChart"} className = "stilu-lu-vasile" 
                            onClick={handleSelectPie} defaultChecked= {true}/>
                            <label htmlFor={"PieChart"} className="stilu-lu-vasile-da-ptr-label"> Pie Chart </label>
                        </div>
                        <div className="checkable-option-for-filter-button">
                            <input type="radio" name="Chart" value={"Bar Chart"} id = {"BarChart"} className = "stilu-lu-vasile"
                            onClick={handleSelectBar}/>
                            <label htmlFor={"BarChart"} className="stilu-lu-vasile-da-ptr-label"> BarChart </label>
                        </div>
                    </div>
                </div>
        </>
    )
}