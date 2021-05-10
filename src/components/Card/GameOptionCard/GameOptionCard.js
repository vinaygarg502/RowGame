import './GameOptionCard.css';
const GameOptionCard = (props)=>{
    const {id,redirect,src,title}=props;
    return (
        <div className={`game-option--card${id!==1 ? ' game-option--card-'+id : ''}`} key={id} onClick={()=>redirect(id)}>
            <img src={src} alt={id} />  
            <span>{title}</span>
        </div>
    )
}

export default GameOptionCard;