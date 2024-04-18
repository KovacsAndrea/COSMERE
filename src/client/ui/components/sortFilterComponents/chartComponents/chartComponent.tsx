import { useState } from 'react';
import '../sortFilterChartComponent.css'
import { togglePopup } from '../utils.tsx';
import { FaChartPie } from 'react-icons/fa';
import { ChartContent } from './chartContent.tsx';
import { PopUpTheme } from '../commonComponents/popUpTheme.tsx';
import React from 'react';


export const ChartComponent: React.FC<{}> = ({}) => {
    const [chartIsOpen, setChartIsOpen] = useState(false);
    return (
    <>
        <div className='chart-component-wrapper' onClick={() => togglePopup(chartIsOpen, setChartIsOpen)}>
        <div className="tag" ><p>Chart</p> <FaChartPie className='sort-filter-chart-icons'/></div>
        </div>
        <PopUpTheme isOpen={chartIsOpen} setIsOpen={setChartIsOpen} title = "Chart"
        setFunctionalityShouldBeComputed={null}
        insigniaLeftClassName="pop-up-decoration-right-chart" insigniaRightClassName="pop-up-decoration-left-chart">
            <ChartContent />
        </PopUpTheme>
    </>
    )
}