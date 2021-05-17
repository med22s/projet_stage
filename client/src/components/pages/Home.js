import React,{useEffect} from 'react'
import SearchBar from '../layout/Search';
import Logs from '../logs/Logs';
import AddBtn from '../layout/AddBtn';
import AddLogModal from '../logs/AddLogModal';
import EditLogModal from '../logs/EditLogModal';
import {loadTech} from '../../actions/authActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

const Home = ({loadTech}) => {


    // useEffect(() => {
    //     loadTech()
    //     // eslint-disable-next-line
    // }, [])

    return (
        <>
        <SearchBar />
        <div className='container'>
          <AddBtn />
          <AddLogModal />
          <EditLogModal />
          <Logs />
        </div>
        </>
    )
}


Home.propTypes={
    loadTech:PropTypes.func.isRequired
}

export default connect(null,{loadTech})(Home)
