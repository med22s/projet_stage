import React, { useState,useEffect } from 'react';
import TechSelectOptions from '../techs/TechSelectOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLog } from '../../actions/logActions';
import { findTech } from '../../actions/techActions';
import { clearTech } from '../../actions/techActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddLogModal = ({ current,addLog,findTech,tech:{tech},loading,clearTech,user }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [techS, setTechS] = useState('');


  useEffect(() => {
    
    if(tech!==null && !loading && current===null){

      const newLog = {
        message,
        attention,  
        tech
      };

      addLog(newLog);

      tech && M.toast({ html: `Log added by ${tech.firstname} ${tech.lastname}` });

      setMessage('');
      setTechS('');
      setAttention(false);
      clearTech();
    }else{
      if(tech!==null) clearTech()
    }

    // eslint-disable-next-line
  }, [tech,loading])



  const onSubmit = () => {
    if (message === '' || techS === '') {
      M.toast({ html: 'Please enter a message and select a tech' });
    } else {
      findTech(techS.trim())
      // console.log('tech id',techS)
      // if(!loading){

      //   console.log(tech)        
      // }
    }
  };

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
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
            <label htmlFor='message' className='active'>
              Log Message
            </label>
          </div>
        </div>

        
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
          Add
        </a>
      </div>
    </div>
  );
};

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
  findTech:PropTypes.func.isRequired,
  clearTech:PropTypes.func.isRequired,
  tech:PropTypes.object.isRequired,
  current:PropTypes.object,
  loading:PropTypes.bool.isRequired
};

const modalStyle = {
  width: '75%',
  height: '75%'
};


const mapStateToProps=state=>({
  tech:state.tech,
  loading:state.tech.loading,
  current:state.log.current,
  user:state.auth.user
})

export default connect(
  mapStateToProps,
  { addLog,findTech,clearTech }
)(AddLogModal);
