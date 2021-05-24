import React, { useState, useEffect } from 'react';
import TechSelectOptions from '../techs/TechSelectOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLog } from '../../actions/logActions';
import { clearCurrent } from '../../actions/logActions';
import { findTech } from '../../actions/techActions';
import { clearTech } from '../../actions/techActions';

const EditLogModal = ({ current, updateLog,findTech,loading,tech,clearTech,clearCurrent,user }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [techS, setTechS] = useState('');



  useEffect(() => {

    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTechS(current.tech._id);
    }


    if(tech!==null && !loading && current!==null){
      
      const updatedLog = {
        id: current._id,
        message,
        attention,
        tech
      };

      updateLog(updatedLog);
      tech && M.toast({ html: `Log updated by ${tech.firstname} ${tech.lastname}` });

      clearTech()
      clearCurrent()
      
    }

    // eslint-disable-next-line
  }, [current,tech]);

  const onSubmit = () => {
    if (message === '' || techS === '') {
      M.toast({ html: 'Please enter a message and select a tech' });
    } else {
      findTech(techS)
    }
  };

  // const updateTechState=(e)=>{
  //   setTech({...tech,[e.target.name]:e.target.value})
  // }

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>


        {
          user.isAdmin &&
          (

            <div className='row'>
              <div className='input-field'>
                <select
                  name='tech'
                  value={techS}
                  className='browser-default'
                  onChange={e=>setTechS(e.target.value)}
                >
                  <option value='' disabled>
                    Select Technician
                  </option>
                  <TechSelectOptions />
                </select>
              </div>
            </div>
          )
        }


        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={e => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect green waves-light btn'
        >
          Update
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%'
};

EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  clearTech: PropTypes.func.isRequired,
  findtech:PropTypes.func,
  loading:PropTypes.bool.isRequired,
  tech:PropTypes.object
};

const mapStateToProps = state => ({
  current: state.log.current,
  loading:state.tech.loading,
  tech:state.tech.tech,
  user:state.auth.user
});

export default connect(
  mapStateToProps,
  { updateLog,findTech,clearTech,clearCurrent }
)(EditLogModal);
