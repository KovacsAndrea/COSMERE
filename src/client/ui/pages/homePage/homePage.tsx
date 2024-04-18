import { Link } from 'react-router-dom'
import './homePage.css'

export const HomePage = () => {
    return <div  className="start-page-background">
        <Link to="/main" className='cosmere'>THE COSMERE</Link>
    </div>
}
