import React, {useEffect } from 'react';

import { Provider } from 'react-redux';
import store from './store';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import Home from './components/pages/Home'
import About from './components/pages/About'

import setAuthToken from './utils/SetAuthToken'

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import Login from './components/auth/Login'
import Register from './components/auth/Register'

const App = () => {
  useEffect(() => {
    M.AutoInit();
    
    if(localStorage.token) setAuthToken(localStorage.token)
  });
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
