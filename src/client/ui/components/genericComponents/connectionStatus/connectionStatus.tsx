import { useEffect} from 'react';
import './connectionStatus.css'
import { useGlobalState } from '../../../../../globalVariables';


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
    const { clientIsConnectedToInternet, setClientIsConnectedToInternet } = useGlobalState();
    const { serverIsRunning, setServerIsRunning} = useGlobalState();
    useEffect(() => {
        checkInternetConnection().then((connected) => {
            setClientIsConnectedToInternet(connected);
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
            clientIsConnectedToInternet === false || serverIsRunning === false ?
            <>

<div className='status-alert-grid'>
            <div className='status-alert-insignia'>
                <div className='left-background-image-status-component'></div>
            </div>
        <div className = "status-alert-component">
                {clientIsConnectedToInternet === true ? <></> :
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