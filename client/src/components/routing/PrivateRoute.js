import React from 'react'
import {connect} from 'react-redux'
import {Route,Redirect} from 'react-router-dom'


const PrivateRoute = ({component:Component,isAuthenticated,loading,...rest}) => {
    return (
        <Route {...rest} render={(props)=>
            !isAuthenticated && !loading && !localStorage.user ? <Redirect to='/login' /> : <Component {...props}/>
        }/>
    )
}


const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated,
    loading:state.auth.loading
})

export default connect(mapStateToProps)(PrivateRoute)
