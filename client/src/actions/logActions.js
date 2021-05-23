import {
    GET_LOGS,
    SET_LOADING,
    LOGS_ERROR,
    ADD_LOG,
    DELETE_LOG,
    UPDATE_LOG,
    SEARCH_LOGS,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_FILTER
  } from './types';

import axios from 'axios'
  

  export const getLogs = () => async dispatch => {
    try {
      setLoading();
  
      const response = await axios.get('/api/logs');
  
      dispatch({
        type: GET_LOGS,
        payload: response.data
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
         payload: err.response.data.msg
      });
    }
  };
  
  export const addLog = log => async dispatch => {


    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }

    try {
      setLoading();
  
      const response = await axios.post('/api/logs',log,config);
      
  
      dispatch({
        type: ADD_LOG,
        payload: response.data
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.response.data.msg
      }); 
    }
  };
  
  export const deleteLog = id => async dispatch => {
    try {
      setLoading();
  
      await axios.delete(`/api/logs/${id}`);
  
      dispatch({
        type: DELETE_LOG,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.response.data.msg
      });
    }
  };
  
  export const updateLog = log => async dispatch => {

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
      setLoading();
  
      const response = await axios.put(`/api/logs/${log.id}`,log,config);
  
     console.log(response.data);
  
      dispatch({
        type: UPDATE_LOG,
        payload: response.data
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.response.data.msg
      });
    }
  };
  
  export const searchLogs = text =>{

    return {
      type: SEARCH_LOGS,
      payload: text
    };
    
  };

  export const clearFilter = () =>{

    return {
      type: CLEAR_FILTER
    };
    
  };

  export const setCurrent = log => {
    return {
      type: SET_CURRENT,
      payload: log
    };
  };
  

  export const clearCurrent = () => {
    return {
      type: CLEAR_CURRENT
    };
  };
  

  export const setLoading = () => {
    return {
      type: SET_LOADING
    };
  };
  