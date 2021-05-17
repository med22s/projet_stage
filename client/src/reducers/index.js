import {combineReducers} from 'redux'

import LogReducer from './logReducer';
import TechReducer from './techReducer';
import AuthReducer from './authReducer';

export default combineReducers({
  log: LogReducer,
  auth:AuthReducer,
  tech:TechReducer
});