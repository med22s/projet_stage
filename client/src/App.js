import React, {useEffect } from 'react';


import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import setAuthToken from './utils/SetAuthToken'

import Home from './components/pages/Home'
import About from './components/pages/About'
import {loadTech} from './actions/authActions'
import {connect} from 'react-redux'


import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import PrivateRoute from './components/routing/PrivateRoute'

const App = ({loadTech,user}) => {
  useEffect(() => {
    M.AutoInit();
    if(localStorage.token){
      setAuthToken(localStorage.token)
    } 

    
      console.log(user)
  },[user]);
  return (
    
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register} />
        </Switch>
      </Router>
    
  );
};


const mapStateToProps=state=>({
  user:state.auth.user
})


export default connect(mapStateToProps,{loadTech})(App);
