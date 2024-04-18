import { Link } from 'react-router-dom'
import './noPage.css'

export const NoPage = () => {
    return <div className='no-page-background'>
        <Link to = "/">
        <img 
                className="noPageCosmereMagic"
                src ={"../../../../src/assets/photos/CosmereMagic.png"}
                alt = "Insignia">
        </img>
        </Link>
    </div>
}
