import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grommet } from 'grommet';
import { ApolloProvider } from '@apollo/react-hooks';

import './App.css';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import Followers from './components/followers/Followers';
import { client } from './utils/ApiUtils';

const brand = '#1483FE';
const theme = {
  global: {
    elevation: {
      dark: {
        medium: "0px 6px 8px rgb(38,38,49)",
        none: "none",
        xsmall: "0px 2px 2px rgb(38,38,49)",
        small: "0px 4px 4px rgb(38,38,49)",
        large: "0px 8px 16px rgb(38,38,49)",
        xlarge: "0px 10px 24px rgb(38,38,49)"
      }
    },
    font: {
      family: "'Rubik', sans-serif"
    },
    colors: {
      brand
    }
  }
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Grommet theme={theme}>
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/followers' component={Followers} />
            <Route path='/' component={Home} />
          </Switch>
        </Router>
      </Grommet>
    </ApolloProvider>
  );
}

export default App;
