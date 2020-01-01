import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import Login from './components/auth/Login';
import Home from './components/home/Home';
import Followers from './components/followers/Followers';

function App() {
  return (
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/followers' component={Followers} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
  );
}

export default App;
