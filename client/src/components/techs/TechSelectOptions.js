import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {getTechs} from '../../actions/techActions'
import setAuthToken from '../../utils/SetAuthToken'


const TechSelectOptions = ({getTechs,tech: { techs, loading }}) => {

    useEffect(() => {
        if(techs===null){ 
        if(localStorage.getItem('token')){
            setAuthToken(localStorage.token);
            
            getTechs()
            console.log(techs)
          }
        }
        // eslint-disable-next-line
    }, [])


    
    if(!techs) return <></>

    

    return (
        !loading &&
        techs.length!==0 &&
        techs.map(t => (
          <option key={t._id} value={t._id}>
            {t.firstname} {t.lastname}
          </option>
        ))
      );
}


TechSelectOptions.propTypes={
    tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired
}


const mapStateToProps=state=>({
    tech:state.tech
})

export default connect(mapStateToProps,{getTechs})(TechSelectOptions)
