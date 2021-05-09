import './App.css';
import { Icon } from 'semantic-ui-react';
import One from './assets/one.png';
import Two from './assets/two.png';
import Online from './assets/online.png';
import Training from './assets/training.png';
import { useHistory} from 'react-router-dom';

function App() {
  let history = useHistory();
  const gameOptions = [
    {
      id:1,
      src:One,
      title:"Custom Game"
    },{
      id:2,
      src:Two,
      title:"Two Players"
    },{
      id:3,
      src:Online,
      title:"Game Online"
    },{
      id:4,
      src:Training,
      title:"Training Game"
    }
  ];
  const gameView = gameOptions.map(option=>{
    const {id,src,title} = option;
    return(
      <div className={`game-option--card${id!==1 ? ' game-option--card-'+id : ''}`} key={id} onClick={()=>redirect(id)}>
        <img src={src} alt={id} />  
        <span>{title}</span>
      </div>
    )
  });
  const redirect = (id) => {
    if(id===2){
      history.push('/gameform');
    }else{
      alert('Coming Soon');
    }  
  }
  return (
    <div className="App">
      <div className="game-header">
        <h1>CONNECT FOUR!</h1>
        <h3>Play with other players around the world.</h3>
      </div>
      <div className="game-container--outer">
        <div className="game-container--inner">
          <div className="play-container">
            <button className="play-btn">
              <Icon name='play circle outline' inverted size='big' />
              PLAY
            </button>
            <div className="game-bg"></div>
          </div>
          <div className="game-container--options">
            {gameView}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
