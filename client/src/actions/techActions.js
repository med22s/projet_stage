import {
    FIND_TECH,
    TECHS_ERROR,
    DELETE_TECH,
    SET_LOADING,
    GET_TECHS
  } from './types';

import axios from 'axios'


export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};


export const findTech=(id)=>async dispatch=>{
    
    try {
        setLoading()
        const response=await axios.get(`/api/techs/${id}`)
        dispatch({
            type:FIND_TECH,
            payload:response.data
        })
    } catch (error) {
        dispatch({
            type:TECHS_ERROR,
            payload:error.response.data.msg
        })
    }
}


  

  export const getTechs = () => async dispatch => {
    try {
      setLoading();
  
      const response = await axios.get('/api/techs');
      
      dispatch({
        type: GET_TECHS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: TECHS_ERROR,
        payload: error.response.data.msg
      });
    }
  };
  
  
  
  export const deleteTech = id => async dispatch => {
    try {
      setLoading();
  
      await axios.delete(`/api/techs/${id}`);
  
      dispatch({
        type: DELETE_TECH,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: TECHS_ERROR,
        payload: err.response.data.msg
      });
    }
  };
  

  