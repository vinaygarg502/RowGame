import './PlayerCard.css';
const PlayerCard = (props)=>{
    const {playerInfo,turn} = props;
    const {id,src,pname,name,score} = playerInfo;
    return (
        <div className={`gameform-card${id ===2? ' gameform-card--2' : ''}`}>
            <div className={`img-container${turn===id ? ' img-container-turn' : ''}`}>
                <img src ={src} alt={pname}/>
            </div>
            <div className="player-info">
                <div>
                    <p>Player 0{id}</p>
                    <p>{name}</p>
                </div>
                <div>
                    <p>Score</p>
                    <p>0{score}</p>
                </div>
            </div>
        </div>
    )
}

export default PlayerCard;