import {REGISTER_SUCCESS,SET_LOADING,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL} from './types'
import axios from 'axios'
import setAuthToken from '../utils/SetAuthToken'




export const setLoading = () => {
    return {
      type: SET_LOADING
    };
  };


export const loadTech=()=>async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    

    try {
        setLoading()
        const response=await axios.get('/api/auth')
        dispatch({
            type:USER_LOADED,
            payload:response.data
        })  
        
    } catch (error) {
        dispatch({
            type:AUTH_ERROR,
            payload:error.response.data.msg
        })
    }
    

}


export const registerTech=(tech)=> async dispatch=>{

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        setLoading()
        const response=await axios.post('/api/techs',tech,config)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:response.data
        })
        loadTech()
    } catch (error) {
        dispatch({
            type:REGISTER_FAIL,
            payload:error.response.data.msg
        })
    }
}


export const logTech=(tech)=> async dispatch=>{

    
    try {


        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }


        setLoading()
        const response=await axios.post('/api/auth',tech,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:response.data
        })
        loadTech()
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.msg
        })
    }
}