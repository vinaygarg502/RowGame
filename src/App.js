import React from 'react';
import { Route, Switch } from "react-router-dom";
import GameForm from './containers/GameForm/GameForm';
import GameLogic from './containers/GameLogic/GameLogic';
import Home from "./components/Home/Home";

function App() {
  const routes = (<Switch>
    <Route exact path="/" component={Home} />
    <Route path="/gameForm" component={GameForm} />
    <Route path="/gameLogic" component={GameLogic} />
  </Switch>);

  return (
    <React.Fragment>{routes}</React.Fragment>
  )
}

export default App;
