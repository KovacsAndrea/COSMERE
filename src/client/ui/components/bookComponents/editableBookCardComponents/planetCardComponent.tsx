import { useEffect } from 'react'
import { AccordionCArdComponent } from '../acordionCardComponent/accordionCardComponent.tsx'
import { adjustAreaHeightGrid, errorMessage, infoMessage, validateContent } from '../utils.tsx'

import React from "react";
import { REGEX } from '../../../../../server/core/dummyData/regex.tsx';
export const PlanetCardComponent: React.FC<{
 planet: any
 setPlanet: any
 planetValidator: any,
 setPlanetValidator: any,
 planetAreaRef: any
 systemAreaRef: any
 }> =
 ({planet, setPlanet, planetValidator, setPlanetValidator, planetAreaRef, systemAreaRef}) => {
    const handlePlanetChange = (e:any) => {setPlanet(e.target.value); validatePlanet()}
    useEffect(() => {adjustAreaHeightGrid(planetAreaRef, systemAreaRef), validatePlanet()})
            
    const validatePlanet = () => {validateContent(planet.toString(), REGEX.planet, setPlanetValidator)}
    return (
        <>
            <div className="textAreaWrapper">
                <textarea className = {planetValidator === true ? "textAreaStyle" : "textAreaStyleError"}  
                    maxLength={100}
                    onChange={handlePlanetChange}
                    onBlur={validatePlanet}
                    value ={planet}
                    title = "Novel planet"
                    placeholder="Input novel planet"
                    id = "planet"
                    rows = {1}
                    ref = {planetAreaRef}/>
                <AccordionCArdComponent infoMessage={infoMessage.planet} errorMessage={errorMessage.planet}/>
            </div>
        </>
    )
}