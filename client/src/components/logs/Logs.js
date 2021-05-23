import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';
import setAuthToken from '../../utils/SetAuthToken'

const Logs = ({ log: { logs, loading,filtered  }, getLogs,tech:{techs} }) => {
  useEffect(() => {
    if(localStorage.getItem('token')){
      setAuthToken(localStorage.token);
      getLogs();
    }
    
    // eslint-disable-next-line
  }, [techs]);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>Environment Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show...</p>
      ) : filtered!==null ? (
          filtered.map(log => <LogItem log={log} key={log._id} />)
      ): (
        logs.map(log => <LogItem log={log} key={log._id} />)
    )}
    </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log,
  tech:state.tech
})

export default connect(
  mapStateToProps,
  { getLogs }
)(Logs);
