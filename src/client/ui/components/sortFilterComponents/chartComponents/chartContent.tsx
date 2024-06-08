
import './chartComponent.css'
import '../sortFilterChartComponent.css'
import { TypeOptions } from "./typeOptions.tsx";
import { ContentOptions } from "./contentOptions.tsx";
import { PieChartElement } from "./pieChartElement.tsx";
import { BarChartElement } from "./barChartElement.tsx";
import { useEffect, useState } from "react";
import React from "react";
import axios from 'axios';
import { io } from 'socket.io-client';
import { StateOptions } from './stateOptions.tsx';
import { useGlobalState } from '../../../../../globalVariables.tsx';
import ErrorComponent from '../../../../errorComponent.tsx';
import { ChartData, ChartElement } from '../../../../../server/app/api/routes/mongoBooks.ts';
import CuteLoadingComponent from '../../loadingComponent/loadingComponent.tsx';
export const ChartContent: React.FC<{}> = ({}) => {
    const [chartType, setCharType] = useState("Pie")
    const [chartContent, setChartContent] = useState("Planets")
    const [backendPlanetData, setBackendPlanetData] = useState<ChartElement[]>([])
    const [backendSystemData, setBackendSystemData] = useState<ChartElement[]>([]);
    const [backendShardData, setBackendShardData] = useState<ChartElement[]>([]);
    const [backendDateData, setBackendDateData] = useState<ChartElement[]>([]);
    const URL = 'http://localhost:5000';

    const {cosmerePath} = useGlobalState()
    const socket = io(URL, { reconnectionAttempts: 1 });

    const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
    const [stateType, setStateType] = useState("Server")
    const [socketPlanetData, setSocketPlanetData] = useState<ChartElement[]>([]);
    const [socektSystemData, setSocketSystemData] = useState<ChartElement[]>([])
    const [socketShardData, setSocketShardData] = useState<ChartElement[]>([]);
    const [socketDateData, setSocketDateData] = useState<ChartElement[]>([]);
    const {usingLocal} = useGlobalState();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if(usingLocal){useLocalData()} else {useCloudData()}

        async function useLocalData() {
            function onPlanetDataFromSocket(data: any) {
                setSocketPlanetData(data);
            }
        
            function onSystemDataFromSocket(data: any) {
                setSocketSystemData(data);
            }
        
            function onShardDataFromSocket(data: any) {
                setSocketShardData(data);
            }
        
            function onDateDataFromSocket(data: any) {
                setSocketDateData(data);
            }
        
            function onConnect() {
                setSocketIsConnected(true);
            }
        
            function onDisconnect() {
                setSocketIsConnected(false);
            }
        
            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);
            const interval = 1000;
            let planetInterval= null;
            let systemInterval= null;
            let shardInterval= null;
            let dateInterval = null;
        
            if (stateType === "Socket") {
                socket.connect();
                if(socketIsConnected){
                    if (chartContent === "Planets") {

                        console.log("Requesting planet data from socket");
                        socket.emit('requestPlanetData');
                        socket.on('planetDataFromSocket', onPlanetDataFromSocket);
                        planetInterval = setInterval(() => {
                            socket.emit('requestPlanetData');
                            console.log("Requesting planet data from socket");
                        }, interval);
                        socket.on('planetDataFromSocket', onPlanetDataFromSocket);
                        if (systemInterval) clearInterval(systemInterval);
                        if (shardInterval) clearInterval(shardInterval);
                        if (dateInterval) clearInterval(dateInterval);

                    } else if (chartContent === "Systems") {
                        console.log("Requesting system data from socket");
                        socket.emit('requestSystemData');
                        socket.on('systemDataFromSocket', onSystemDataFromSocket);
                        systemInterval = setInterval(() => {
                            socket.emit('requestSystemData')
                            console.log("Requesting system data from socket");
                        }, interval)
                        if (planetInterval) clearInterval(planetInterval);
                        if (shardInterval) clearInterval(shardInterval);
                        if (dateInterval) clearInterval(dateInterval);

                    } else if (chartContent === "Shards") {
                        console.log("Requesting shard data from socket");
                        socket.emit('requestShardData');
                        socket.on('shardDataFromSocket', onShardDataFromSocket);
                        shardInterval = setInterval(() => {
                            socket.emit('requestShardData')
                            console.log("requesting shard")
                        }, interval)
                        if (planetInterval) clearInterval(planetInterval);
                        if (systemInterval) clearInterval(systemInterval);
                        if (dateInterval) clearInterval(dateInterval);

                    } else if (chartContent === "Dates") {
                        console.log("Requesting date data from socket");
                        socket.emit('requestDateData');
                        socket.on('dateDataFromSocket', onDateDataFromSocket);
                        dateInterval = setInterval(() => {
                            socket.emit('')
                            console.log("requesting dates")
                        }, interval)
                        if (planetInterval) clearInterval(planetInterval);
                        if (systemInterval) clearInterval(systemInterval);
                        if (shardInterval) clearInterval(shardInterval);
                    }
                }
                }
    
            if (stateType === "Server") {
                socket.disconnect();
                setSocketIsConnected(false); // Update socket connection status
        
                // Clear all intervals
                if (planetInterval) clearInterval(planetInterval);
                if (systemInterval) clearInterval(systemInterval);
                if (shardInterval) clearInterval(shardInterval);
                if (dateInterval) clearInterval(dateInterval);
            }
        
            return () => {
                socket.off('connect', onConnect);
                socket.off('disconnect', onDisconnect);
        
                // Clean up event listeners based on chartContent
                if (chartContent === "Planets") {
                    socket.off('planetDataFromSocket', onPlanetDataFromSocket);
                } else if (chartContent === "Systems") {
                    socket.off('systemDataFromSocket', onSystemDataFromSocket);
                } else if (chartContent === "Shards") {
                    socket.off('shardDataFromSocket', onShardDataFromSocket);
                } else if (chartContent === "Dates") {
                    socket.off('dateDataFromSocket', onDateDataFromSocket);
                }
                if(planetInterval) {clearInterval(planetInterval);}
                if(systemInterval) {clearInterval(systemInterval);}
                if(shardInterval) {clearInterval(shardInterval)}
                if(dateInterval) {clearInterval(dateInterval)}
            };
        }

        async function useCloudData() {
            console.log("CLOUD DATA FOR THIS SECTION NOT IMPLEMENTED YET")
        }
       
    }, [stateType, chartContent]);
    
    //#region  node
    useEffect (() => {

        async function useLocalData() {
            axios.get(cosmerePath + "/chart/planets").then(
                result => {
                    setBackendPlanetData(result.data.chartData)
                }
            ).catch(error => {console.error("Failed fetching chart data for planets", error)})
    
            axios.get(cosmerePath + "/chart/systems")
            .then(result => {
                setBackendSystemData(result.data.chartData);
            })
            .catch(error => {
                console.error("Failed fetching chart data for systems", error);
            });
    
            axios.get(cosmerePath + "/chart/shards")
                .then(result => {
                    setBackendShardData(result.data.chartData);
                })
                .catch(error => {
                    console.error("Failed fetching chart data for shards", error);
                });
    
            axios.get(cosmerePath + "/chart/dates")
                .then(result => {
                    setBackendDateData(result.data.chartData);
                })
                .catch(error => {
                    console.error("Failed fetching chart data for dates", error);
                });
        }

        async function useCloudData() {
            console.log("FETCHING CHART DATA")
            const result = await axios.get<{chartData: ChartData}>(cosmerePath + "/mongoBooks/chart/data")
            // After 2 seconds, set the fetched data and hide the loading indicator
            setBackendPlanetData(result.data.chartData.planets);
            setBackendSystemData(result.data.chartData.systems);
            setBackendShardData(result.data.chartData.shards);
            setBackendDateData(result.data.chartData.dates);
            setIsLoading(false);
        }

        async function fetchData() {
            if (usingLocal) {
                // Fetch data from the local server
                await useLocalData();
            } else {
                // Fetch data from the cloud
                await useCloudData();
            }
        }
       fetchData();
     
    }, [])
    //#endregion
    
    if(isLoading) {
        return <CuteLoadingComponent />
    }

    return (
    <>
    <div className="chart-wrapper">
        <div className= "option-column-chart-grid">
            <TypeOptions chartType = {chartType} setChartType = {setCharType}/>
            <ContentOptions chartContent = {chartContent} setChartContent = {setChartContent}/>
            <StateOptions stateType={stateType} setStateType={setStateType} isConnected = {socketIsConnected}></StateOptions>
        </div>
        <div className="chart-column-chart-pop-up"> 
            
            {stateType === "Socket" ? 
            
            <>
            {socketIsConnected === true? 
            <>
            {chartType ==="Pie" ? 
                chartContent === "Planets" ? <PieChartElement data = {socketPlanetData}/> :
                chartContent === "Systems" ? <PieChartElement data = {socektSystemData}/> :
                chartContent === "Shards" ? <PieChartElement data={socketShardData}/>:
                <PieChartElement data={socketDateData} />
             : chartContent === "Planets" ? <BarChartElement data = {socketPlanetData}/>:
                chartContent === "Systems" ? <BarChartElement data = {socektSystemData}/> :
                chartContent === "Shards" ? <BarChartElement data={socketShardData}/>:
                <BarChartElement data={socketDateData} />
            }
            </> : 
            <>
            <ErrorComponent message={"Can't connect to the socket right now!"}  />
            </>}
            
            </>
            : 
            <>
            {chartType === "Pie" ? 
                chartContent === "Planets" ? <PieChartElement data = {backendPlanetData}/> : 
                chartContent === "Systems" ? <PieChartElement data = {backendSystemData}/> : 
                chartContent === "Shards" ? <PieChartElement data={backendShardData}/> :
                <PieChartElement data={backendDateData}/> 
            : chartContent === "Planets" ? <BarChartElement data = {backendPlanetData}/> :
                chartContent === "Systems" ? <BarChartElement data = {backendSystemData}/> :
                chartContent === "Shards" ? <BarChartElement data = {backendShardData}/> :
                <BarChartElement data = {backendDateData}/>
            }
            </>}
            
            
        </div>
    </div>
    </>
    )
}