import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import './css/tailwind.css';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import Viewers from './components/viewers/Viewers';
import { client } from './utils/ApiUtils';


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/viewers' component={Viewers} />
          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
