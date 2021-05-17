import React,{useState,useEffect} from 'react'
import {logTech} from '../../actions/authActions'
import M from 'materialize-css/dist/js/materialize.min.js';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';


const Login = (props) => {


    const {logTech,loading,isAuthenticated,error}=props

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')


    useEffect(() => {
        if(!loading && isAuthenticated){
            props.history.push('/')
        }

        if(error){
            M.toast({ html: `${error}` });
        }
    }, [error,isAuthenticated,props.history,loading])


    const onSubmit=(e)=>{
        e.preventDefault();

        if(email==='' || password===''){
            M.toast({ html: 'Email and Password must be valid !' });
        }else{
            logTech({email,password});
        }

    }

    return (

        <div className='form-container modal-content' style={{boxShadow:'2px 2px 2px 1px rgba(0, 0, 0, 0.2)'}}>

        <h1>
            Account <span className='lightblue-text'>Login</span>
        </h1>
        <div className="row">
            <form className="col s12" onSubmit={onSubmit}>

                <div className="row">
                    <div className="input-field col s12">
                    
                        <input id="email" type="email" className="validate" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                  
                    </div>
                </div>
            
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>

                <div className="row">
                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </form>
        </div>
        </div>
    )
}


Login.propTypes={
    loading:PropTypes.bool,
    isAuthenticated:PropTypes.bool,
    error:PropTypes.string,
    logTech:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
    loading:state.auth.loading,
    isAuthenticated:state.auth.isAuthenticated,
    error:state.auth.error
    
})

export default connect(mapStateToProps,{logTech})(Login)
