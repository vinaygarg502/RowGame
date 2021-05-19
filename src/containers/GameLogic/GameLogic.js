import './GameLogic.css';
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import GameRow from '../../components/Row/Row';
import GameColumn from '../../components/Column/Column';
import PlayerCard from '../../components/Card/PlayerCard/PlayerCard';
import GameActions from '../../components/GameActions/GameActions';

const GameLogic = (props)=>{
    let history = useHistory();
    const {player1,player2, whos="Alternative Turn", numberOfT="5 Games"} = props.location.state || {};
    const gameData = [
        {
            id:1,
            name:player1.name,
            score:0,
            src:player1.imageSrc
        },
        {
            id:2,
            name:player2.name,
            score:0,
            src:player2.imageSrc
        }
    ];
    const [gameState,setGameState] = useState({
       boardmodel:[],
       turn:1,
       winnerCoordinates:[],
       winnerName:'',
       currentGame:1,
       gameData,
       tournamentWinner:''
    });

    useEffect(() => {
        let newTurn = 1;
        let newBoard = generateModel();
        if(whos === 'Always player 02'){
            newTurn=2;
        }
        setGameState(prev=>{return {...prev,boardmodel:newBoard, turn:newTurn}});
      },[]);
    
    const generateModel=()=>{
        let newBoard = [];
        
        for(let i=0;i<8;i++){
            var newcolumn = [];
            for(var k =0;k<8;k++){
                newcolumn.push(0);
            }
            newBoard.push(newcolumn);
        }
        return newBoard;
    }  
    
    const handleClick = (i)=>{
        let {boardmodel,turn,winnerCoordinates} = gameState;
        let coordinates = [];
        let identifier;
        if(winnerCoordinates.length>0){
            return;
        }

        for(var k=0;k<boardmodel[i].length;k++){
            if(boardmodel[i][k]===0){
                boardmodel[i][k] = turn===1?1:2;
                identifier = boardmodel[i][k];
                coordinates = [i,k];  
                break;
            }
        }
        winnerCoordinates = checkpositiveDiagonal(coordinates,boardmodel,identifier) 
        || checknegativeDiagonal(coordinates,boardmodel,identifier) 
        || checkHorizontal(coordinates,boardmodel,identifier) 
        || checkVertical(coordinates,boardmodel,identifier);

        if(winnerCoordinates){
            executeWinner(winnerCoordinates,identifier,boardmodel);
        }else{
            setGameState((prev)=>{return{...prev,boardmodel:boardmodel,turn:identifier===1?2:1}});
        }  
    };
    const startNextGame = ()=>{
        let turn=1;
        let boardmodel = generateModel();
        let {winnerName, gameData, currentGame}= gameState;
        if(currentGame===(+numberOfT.split(' ')[0])){
            return;
        } else {
            currentGame = currentGame+1;
        }
        
        if(whos==='Winner First'){
            if(winnerName===player1.name){
                turn=1
            } else{
                turn=2;
            }
        } else if(whos==='Looser First' || whos==='Alternative Turn'){
            if(winnerName===player1.name){
                turn=2;
            } else{
                turn=1;
            }
        } else if(whos==='Always player 01'){
            turn=1;
        } else if(whos==='Always player 02'){
            turn=2;
        }
        setGameState({
            boardmodel,
            turn,
            winnerCoordinates:[],
            tournamentWinner:'',
            winnerName:'',
            currentGame,
            gameData
         })
    }
    const resetGame = ()=>{
        let turn=1;
        let boardmodel = generateModel();
        if(whos==='Always player 02'){
            turn=2;
        }
        setGameState({
            boardmodel,
            turn,
            winnerCoordinates:[],
            tournamentWinner:'',
            winnerName:'',
            currentGame:1,
            gameData
         })
    }
    const backToHome = ()=>{
        history.push('/');
    }
    const executeWinner = (winnerCoordinates,identifier,boardmodel)=>{
        let {winnerName,gameData, currentGame,tournamentWinner} = gameState;

        gameData[identifier-1].score+=1; 
        if(identifier===1){
            winnerName = player1.name;
        }else{
            winnerName = player2.name;
        }
        const reducer = (accumulator, currentValue)=>accumulator.score + currentValue.score;
        const totalGamesPlayed = gameData.reduce(reducer);
        if(totalGamesPlayed>=(Math.floor((+numberOfT.split(' ')[0])/2)+1)){
            if(gameData[identifier-1].score===(Math.floor((+numberOfT.split(' ')[0])/2)+1)){
                tournamentWinner = winnerName;
            } 
        }
        setGameState({
            boardmodel,
            winnerCoordinates,
            winnerName,
            currentGame,
            gameData,
            tournamentWinner,
            turn:0
        })
    }
    const checkpositiveDiagonal = (coordinates,newBoard,identifier)=>{
        let counter =0;
        let backCounter = 0;
        let winCounter = 0;
        let winnerArray = [];
        while(true){
            if((coordinates[0]+counter+1)===8){
                break;
            } else if((coordinates[1]+counter+1)===8){
                break;
            }
            counter+=1;
        }
        while(true){
            if(newBoard[coordinates[0]+counter-backCounter][coordinates[1]+counter-backCounter]===identifier){
                winCounter+=1;
                winnerArray.push([coordinates[0]+counter-backCounter,coordinates[1]+counter-backCounter]);
                if(winCounter===4){
                    return winnerArray;
                }
            } else {
                winCounter=0;
                winnerArray = [];
            }
            if((coordinates[0]+counter-backCounter-1)===-1){
                break;
            } else if((coordinates[1]+counter-backCounter-1)===-1){
                break;
            }
            backCounter+=1;
        }
        return false;
    };
    const checknegativeDiagonal = (coordinates,newBoard,identifier)=>{
        let counter =0;
        let backCounter = 0;
        let winCounter = 0;
        let winnerArray = [];
        while(true){
            if((coordinates[0]-counter-1)===-1){
                break;
            } else if((coordinates[1]+counter+1)===8){
                break;
            }
            counter+=1;
        }
        while(true){
            if(newBoard[coordinates[0]-counter+backCounter][coordinates[1]+counter-backCounter]===identifier){
                winCounter+=1;
                winnerArray.push([coordinates[0]-counter+backCounter,coordinates[1]+counter-backCounter]);
                if(winCounter===4){
                    return winnerArray;
                }
            } else {
                winCounter=0;
                winnerArray=[];
            }
            if((coordinates[0]-counter+backCounter+1)===8){
                break;
            } else if((coordinates[1]+counter-backCounter-1)===-1){
                break;
            }
            backCounter+=1;
        }
        return false;
    };
    const checkHorizontal = (coordinates,newBoard,identifier)=>{
        let counter =0;
        let backCounter = 0;
        let winCounter = 0;
        let winnerArray = [];
        while(true){
            if((coordinates[0]+counter+1)===8){
                break;
            }
            counter+=1;
        }
        while(true){
            if(newBoard[coordinates[0]+counter-backCounter][coordinates[1]]===identifier){
                winCounter+=1;
                winnerArray.push([coordinates[0]+counter-backCounter,coordinates[1]]);
                if(winCounter===4){
                    return winnerArray;
                }
            } else {
                winCounter=0;
                winnerArray = [];
            }
            if((coordinates[0]+counter-backCounter-1)===-1){
                break;
            }
            backCounter+=1;
        }
        return false;
    };
    const checkVertical = (coordinates,newBoard,identifier)=>{
        let counter =0;
        let backCounter = 0;
        let winCounter = 0;
        let winnerArray = [];
        while(true){
            if((coordinates[1]+counter+1)===8){
                break;
            }
            counter+=1;
        }
        while(true){
            if(newBoard[coordinates[0]][coordinates[1]+counter-backCounter]===identifier){
                winCounter+=1;
                winnerArray.push([coordinates[0],coordinates[1]+counter-backCounter]);
                if(winCounter===4){
                    return winnerArray;
                }
            } else {
                winCounter=0;
                winnerArray=[];
            }
            if((coordinates[1]+counter-backCounter-1)===-1){
                break;
            }
            backCounter+=1;
        }
        return false;
    };

    const updatemodel = (gameState.boardmodel).map((column,i)=>{
        return (
            <GameColumn key ={`Column`+i}>
                
                {column.map((row,j)=>(
                    
                    <GameRow row={row} 
                        winnerCoordinates={gameState.winnerCoordinates} 
                        handleClick={handleClick} 
                        rowIndex={j} 
                        columnIndex={i}
                        srcArray ={[player1.imageSrc,player2.imageSrc]}
                        key ={`Row`+j}>
                    </GameRow>
                ))}
            </GameColumn>
        )
    });
    const playersInfo = (gameState.gameData).map((playerInfo)=>{
        return (
            <PlayerCard 
                playerInfo = {playerInfo} 
                turn = {gameState.turn} 
                key={playerInfo.id}>
            </PlayerCard>
        )
    });

    return (
        <div className="main-container">
            <div className="logic-container">
                <div className="inner-container">
                    {updatemodel}
                </div> 
            </div>
            <div className="info-container">
                <h1> {numberOfT} Tournament</h1>
                {
                    gameState.winnerCoordinates.length===0 && 
                    <p>Playing Game {gameState.currentGame}</p>
                }
                {   
                    gameState.winnerCoordinates.length>0 && 
                    <div className='winner-container'>
                        <h2>Congratulation!</h2>
                        {
                            !(gameState.tournamentWinner) ? 
                            <p>{gameState.winnerName}, you won game {gameState.currentGame}</p>:
                            <p>{gameState.winnerName}, you won tournament</p>
                        }
                    </div>
                }
                <div className ="card-container">
                    {playersInfo}
                </div>
                <GameActions {...gameState} startNextGame={startNextGame} resetGame={resetGame} backToHome={backToHome}></GameActions>
            </div>
        </div>
    )
};
export default GameLogic;