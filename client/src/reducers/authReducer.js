import {REGISTER_SUCCESS,SET_LOADING,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from '../actions/types'

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:false,
    loading:false,
    user:JSON.parse(localStorage.getItem('user')),
    error:null
}


const AuthReducer=(state=initialState,action)=>{
    switch(action.type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return {...state,...action.payload,error:null}
        case USER_LOADED:
            console.log('from api',action.payload)
            localStorage.setItem('user',JSON.stringify(action.payload))
            console.log('from local storage',JSON.parse(localStorage.getItem('user')))
            return {...state,user:action.payload,loading:false,isAuthenticated:true,error:null}
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {...state,token:null,user:null,isAuthenticated:false,error:action.payload,loading:false}
        case SET_LOADING:
            return {...state,loading:true}
        default:
            return state
    }
}


export default AuthReducer

