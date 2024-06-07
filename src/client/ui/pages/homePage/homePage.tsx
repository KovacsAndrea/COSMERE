import { Link } from 'react-router-dom'
import './homePage.css'

export const HomePage = () => {
    return <div  className="start-page-background">
        <Link to="/auth" className='cosmere'>THE COSMERE</Link>
    </div>
}
