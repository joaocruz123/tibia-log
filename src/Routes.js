import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Log from './pages/Log/Log';

const Routes = (props) => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} {...props} />
      <Route exact path='/log' component={Log} {...props} />
    </Switch>
  </BrowserRouter>
}

export default Routes
