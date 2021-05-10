import {Button} from 'react-bootstrap';
import './GameActions.css';

const GameActions = (props)=>{
    const {winnerCoordinates,tournamentWinner,startNextGame,resetGame,backToHome} = props;
    return (
        <div className="btn-container">
        {
            winnerCoordinates.length===0 && <Button variant="primary" className="btn-logic" onClick={()=>alert('Coming Soon')}>
                Undo Step
            </Button>
        }
        {
            winnerCoordinates.length >0 && !tournamentWinner && <Button variant="primary" className="btn-logic" onClick={startNextGame}>
                Next Game
            </Button>
        }
        {
            tournamentWinner && <Button variant="primary" className="btn-logic" onClick={resetGame}>
                Play Again
            </Button>
        }
        <Button variant="outline-danger" className="btn-logic" onClick={backToHome}>
            End Tournament
        </Button>
    </div>  
    )
}

export default GameActions;