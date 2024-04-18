

import { useEffect } from 'react'
import { AccordionCArdComponent } from '../acordionCardComponent/accordionCardComponent.tsx'
import { adjustAreaHeightGrid, errorMessage, infoMessage, validateContent } from '../utils.tsx'

import React from "react";
import { REGEX } from '../../../../../server/core/dummyData/regex.tsx';
export const ShardCardComponent: React.FC<{
 shard: any
 setShard: any
 shardValidator: any,
 setShardValidator: any,
 shardAreaRef: any
 startDateAreaRef: any
 }> =
 ({shard, setShard, shardValidator, setShardValidator, shardAreaRef, startDateAreaRef}) => {
    const handleshardChange = (e:any) => {setShard(e.target.value); validateShard()}
    useEffect(() => {adjustAreaHeightGrid(shardAreaRef, startDateAreaRef), validateShard()})
            
    const validateShard =  () => validateContent(shard, REGEX.shard, setShardValidator)

    return (
        <>
            <div className="textAreaWrapper">
                <textarea className = {shardValidator === true ? "textAreaStyle" : "textAreaStyleError"}  
                    maxLength={100}
                    onChange={handleshardChange}
                    onBlur={validateShard}
                    value ={shard}
                    title = "Novel shard"
                    placeholder="Input novel shard"
                    id = "shard"
                    rows = {1}
                    ref = {shardAreaRef}/>
                <AccordionCArdComponent infoMessage={infoMessage.shard} errorMessage={errorMessage.shard}/>
            </div>
        </>
    )
}