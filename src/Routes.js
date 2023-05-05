import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Poker from './pages/Poker/Poker';

const Routes = (props) => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} {...props} />
      <Route exact path='/tasks' component={Poker} {...props} />
    </Switch>
  </BrowserRouter>
}

export default Routes
