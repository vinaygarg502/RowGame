import './Row.css';
const GameRow = (props)=>{
    let className='';
    const {handleClick,rowIndex,columnIndex, winnerCoordinates,row, srcArray} = props;
    let style = {};
    if(row===1){
        className = ' board-row-pl1';
        style  = {...style, 'background-image':`url(${srcArray[0]})`}
    } else if(row===2){
        className = ' board-row-pl2'; 
        style  = {...style, 'background-image':`url(${srcArray[1]})`}
    }
    
    winnerCoordinates.forEach(winner=>{
        if(winner[0]===columnIndex && winner[1]===rowIndex){
            className+=' winner'
        }
    });
   
    return (
        <div 
            className={`board-row${className ? className : ''}`} 
            onClick={()=>{handleClick(columnIndex)}}
            style ={style}>
        </div>
    )
}

export default GameRow;