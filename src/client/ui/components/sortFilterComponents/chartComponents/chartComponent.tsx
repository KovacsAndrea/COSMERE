import { useState } from 'react';
import '../sortFilterChartComponent.css'
import { togglePopup } from '../utils.tsx';
import { FaChartPie } from 'react-icons/fa';
import { PopUpTheme } from '../commonComponents/popUpTheme.tsx';
import React from 'react';
import { ChartContent } from './chartContent.tsx';


export const ChartComponent: React.FC<{}> = ({}) => {
    const [chartIsOpen, setChartIsOpen] = useState(false);
    const onCloseChartPopup = () => {
        setChartIsOpen(false)
    }
    
    return (
    <>
        <div className='chart-component-wrapper' 
            onClick={() => {
            togglePopup(chartIsOpen, setChartIsOpen)}}>
            <span className="tag" ><p>Chart </p> <FaChartPie className='sort-filter-chart-icons'/></span>
        </div>
        <PopUpTheme 
        isOpen={chartIsOpen} 
        title = "Chart"
        insigniaLeftClassName="pop-up-decoration-right-chart" 
        insigniaRightClassName="pop-up-decoration-left-chart"
        onClickAction={onCloseChartPopup}>
            <ChartContent />
        </PopUpTheme>
    </>
    )
}