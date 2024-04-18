import { useEffect, useState } from 'react';
import './connectionStatus.css'
async function checkInternetConnection(): Promise<boolean> {
    try {
        const response = await fetch("https://api.ipify.org?format=json", { method: "GET" });
        return response.ok;
    } catch (error) {
        return false;
    }
}

async function checkServerStatus(): Promise<boolean> {
    try {
        const response = await fetch("http://localhost:4000/ping", { method: "GET" });
        return response.ok;
    } catch (error) {
        return false;
    }
}
export const ConnectionStatus: React.FC<{}> = ({}) => {
    const [isConnected, setIsConnected] = useState(true);
    const [serverIsRunning, setServerIsRunning] = useState(true);
    useEffect(() => {
        checkInternetConnection().then((connected) => {
            setIsConnected(connected);
        });
    }, []);
    
    useEffect(() => {
        checkServerStatus().then((connected) => {
            setServerIsRunning(connected);
        });
    })
    return (
        <>
        {
            isConnected === false || serverIsRunning === false ?
            <>

<div className='status-alert-grid'>
            <div className='status-alert-insignia'>
                <div className='left-background-image-status-component'></div>
            </div>
        <div className = "status-alert-component">
                {isConnected === true ? <></> :
                    <p className="check-internet-conneciton"> It seems that your internet connection is not working at the moment. </p>}
                    {serverIsRunning === true ? <></> :
                    <p className="check-internet-conneciton"> Oops! We are currently having issues with our server. Please come back later. </p>}
        </div>
            <div className='status-alert-insignia'>
            <div className='right-background-image-status-component'></div>
            </div>
        </div>


            </>
            :
            <>
            </>
        }
        
        
            
        </>
    )
}