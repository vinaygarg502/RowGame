import './Row.css';
const GameRow = (props)=>{
    let className='';
    const {handleClick,rowIndex,columnIndex, winnerCoordinates,row} = props;
    
    if(row===1){
        className = ' board-row-pl1';
    } else if(row===2){
        className = ' board-row-pl2'; 
    }
    
    winnerCoordinates.forEach(winner=>{
        if(winner[0]===columnIndex && winner[1]===rowIndex){
            className+=' winner'
        }
    });
    return (
        <div 
            className={`board-row${className ? className : ''}`}
            onClick={()=>{handleClick(columnIndex)}}>
        </div>
    )
}

export default GameRow;