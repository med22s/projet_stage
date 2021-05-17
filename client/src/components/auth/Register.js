import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {registerTech} from '../../actions/authActions'
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';


const Register = (props) => {
    const [tech,setTech]=useState({
        firstname:'',
        lastname:'',
        email:'',
        password:''
    })


    const {registerTech,loading,isAuthenticated,error}=props

    useEffect(() => {
        
        if(!loading && isAuthenticated){
            M.toast({ html: `registered successfully` });
            props.history.push('/')
        }

        if(error){
            M.toast({ html: `${error}` });
        }
    }, [isAuthenticated,loading,error,props.history])

    const {firstname,lastname,email,password}=tech

   


    const onChange=(e)=>{
        setTech({...tech,[e.target.name]:e.target.value})
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        registerTech(tech)



    }

    return (
    <div className='form-container' style={{boxShadow:'2px 2px 2px 1px rgba(0, 0, 0, 0.2)'}}>
        <h1 className='center '>Registration</h1>

        <div className="row">
            <form className="col s12" onSubmit={onSubmit}>
                <div className="row">
                    <div className="input-field col s6">
                        <input required id="first_name" type="text" className="validate" name='firstname' value={firstname} onChange={onChange} />
                        <label htmlFor="first_name">First Name</label>
                    </div>
                    <div  className="input-field col s6">
                        <input required id="last_name" type="text" className="validate" name='lastname' value={lastname} onChange={onChange} />
                        <label htmlFor="last_name">Last Name</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input required id="email" type="email" className="validate" name='email' value={email} onChange={onChange} />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
            
                <div className="row">
                    <div className="input-field col s12">
                        <input required id="password" type="password" className="validate" name='password' value={password} onChange={onChange} />
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

Register.propTypes={
    registerTech:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool.isRequired,
    loading:PropTypes.bool.isRequired,
    error:PropTypes.object.isRequired
}



const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated,
    loading:state.auth.loading,
    error:state.auth.error
})


export default connect(mapStateToProps,{registerTech})(Register)
