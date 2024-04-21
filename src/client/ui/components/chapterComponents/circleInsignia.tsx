import './chapterComponentsStyle.css'
export const CircleInsignia: React.FC<{position: string}> = ({position}) => {
    let positionStyle = "circle-container " + position;
    let bigCirclePositionStyle = "circle big-circle " + position + "-circle"
    let smallCirclePositionStyle = "circle small-circle " + position + "-small-circle"
    let minusculeCirclePositionStyle = "circle minuscule-circle"
    return (
        <div className= {positionStyle}>
            <div className={minusculeCirclePositionStyle}> </div>
            <div className={smallCirclePositionStyle}></div>
            {/* <div className={bigCirclePositionStyle}></div> */}
            <div className={bigCirclePositionStyle}></div>
            <div className={smallCirclePositionStyle}></div>
            <div className={minusculeCirclePositionStyle}> </div>
        </div>
    );
}