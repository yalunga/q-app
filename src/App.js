import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './css/tailwind.css';
import Home from './components/home/Home';
import Search from './components/search/Search';

import { twitchReducer } from './redux/reducers/twitchReducer';

const store = createStore(twitchReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/twitch/:id' component={Home} />
          <Route exact path='/' component={Search} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
