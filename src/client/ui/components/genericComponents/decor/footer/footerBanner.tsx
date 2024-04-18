import React from 'react';
import './footerBanner.css'
export const FooterBanner: React.FC = () => {
    const backgroundImageUrl = "../../src/assets/photos/ElendelDaily.png";
    return (
        <>
        <div className='footerBannerWrapper'>
            <div className="footerBanner"  style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            </div>
        </div>
        <div className='footerBannerCosmere' />
        </>
    )
}