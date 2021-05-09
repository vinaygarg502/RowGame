import React, { useState, useReducer } from 'react';
import './GameForm.css';
import player1 from '../../assets/avatar01.png';
import player2 from '../../assets/avatar02.png';
import winner from '../../assets/winner.png';
import run from '../../assets/run.png';
import RadioModal from '../Modal/Modal';
import formReducer from '../../reducers/formReducer';
import { useHistory} from 'react-router-dom';

const initialFormState = {
    player1:"",
    player2:"",
    whos:"Alternative Turn",
    numberOfT:"2 Games",
}
function GameForm() {
    let history = useHistory();
    //todo has to combine all
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState({});
    const [formState, dispatch] = useReducer(formReducer, initialFormState);
    const turnData = {
        title:'Whos Starts',
        formRadio:[
            {id:'alt',value:'Alternative Turn',name:'whos',viewvalue:'Alternative Turn'},
            {id:'los',value:'Looser First',name:'whos',viewvalue:'Looser First'},
            {id:'win',value:'Winner First',name:'whos',viewvalue:'Winner First'},
            {id:'pl1',value:'Always player 01',name:'whos',viewvalue:'Always player 01'},
            {id:'pl2',value:'Always player 02',name:'whos',viewvalue:'Always player 02'}
        ],
        name:'whos',
        defaultValue: formState.whos
    };
    const tournamentData = {
        title:'Number of game',
        formRadio:[
            {id:'2g',value:'2 Games',name:'numberOfT',viewvalue:'2 Games'},
            {id:'3g',value:'3 Games',name:'numberOfT',viewvalue:'3 Games'},
            {id:'5g',value:'5 Games',name:'numberOfT',viewvalue:'5 Games'},
            {id:'10g',value:'10 Games',name:'numberOfT',viewvalue:'10 Games'}
        ],
        name:'numberOfT',
        defaultValue: formState.numberOfT
    };
    const players = [
        {
            id:1,
            src:player1,
            name:'player1',
            label:'Player 01',
        },{
            id:2,
            src:player2,
            name:'player2',
            label:'Player 02',
        }
    ];
    const playersView = players.map(player=>{
        const {id,src,name,label}=player;
        return (
            <div className={`gameform-card${id!==1 ? ' gameform-card--'+id : ''}`} key={id}>
                <div className="img-container" ><img src ={src} alt={name}/></div>
                <div className="form-group">
                    <label htmlFor ={name}>{label}</label>
                    <input type="text" id={name} name={name} onChange={(e) => handleChange(e.target)}/>
                </div>
            </div>
        )
    })
    const handleModal = (data)=>{
        setModalData(data);
        setModalShow(true);
    }
    const handleChange = (data)=>{
        dispatch(
            {
                type:'HANDLE INPUT',
                field:data.name,
                payload:data.value
            }
        )
        setModalShow(false);
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        history.push({
            pathname: '/gameLogic',
            state: formState
        });
    }
  return (
    <div className="gameform-container">
        <form onSubmit={(e)=>onSubmit(e)}>
            <div className="gameform-input-wrapper">
                {playersView}
                <div className="gameform-card gameform-card--3">
                    <div className="img-container"><img src ={winner} alt="winner"/></div>
                    <div className="form-group">
                        <label htmlFor="NoG">Number of game</label>
                        <div className="extraInfo" onClick={() => handleModal(tournamentData)}>{formState.numberOfT}</div>
                    </div>
                </div>
                <div className="gameform-card gameform-card--3">
                <div className="img-container"><img src ={run} alt="run"/></div>
                <div className="form-group">
                    <label htmlFor="WhoS">Who Starts</label>
                    <div className="extraInfo" onClick={() => handleModal(turnData)}>{formState.whos}</div>
                </div>
            </div>
            </div>
            <button type="submit" className="gameform-btn gameform-btn--success">Start Game</button>
        </form>
        {modalShow && <RadioModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleradiochange={handleChange}
            backdrop="static"
            data={modalData}
        />}
    </div>
  );
}

export default GameForm;
