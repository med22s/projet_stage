import React,{useEffect} from 'react'
import SearchBar from '../layout/Search';
import Logs from '../logs/Logs';
import AddBtn from '../layout/AddBtn';
import AddLogModal from '../logs/AddLogModal';
import EditLogModal from '../logs/EditLogModal';
import TechListModal from '../techs/TechListModal'
import {loadTech} from '../../actions/authActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

const Home = ({loadTech,user}) => {


    

    return (
        <>
        <SearchBar />
        <div className='container'>
          <AddBtn />
          <AddLogModal />
          <EditLogModal />
          <TechListModal />
          <Logs />
        </div>
        </>
    )
}


Home.propTypes={
    loadTech:PropTypes.func.isRequired
}


const mapStateToProps=state=>({
    user:state.auth.user
})

export default connect(mapStateToProps,{loadTech})(Home)
