import {REGISTER_SUCCESS,SET_LOADING,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL} from '../actions/types'

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:false,
    loading:false,
    user:null,
    error:null
}


const AuthReducer=(state=initialState,action)=>{
    switch(action.type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return {...state,...action.payload,loading:false,isAuthenticated:true,error:null}
        case USER_LOADED:
                
                return {...state,user:action.payload,loading:false,isAuthenticated:true,error:null}
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {...state,token:null,user:null,isAuthenticated:false,error:action.payload,loading:false}
        
        case SET_LOADING:
            return {...state,loading:true}

        default:
            return state
    }
}


export default AuthReducer

