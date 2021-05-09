import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import GameForm from './components/GameForm/GameForm';
import GameLogic from './components/GameLogic/GameLogic';


ReactDOM.render(
    <BrowserRouter>
       <Switch>
         <Route exact path="/" component={App} />
         <Route path="/gameForm" component={GameForm} />
         <Route path="/gameLogic" component={GameLogic} />
       </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
