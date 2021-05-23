import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTech } from '../../actions/techActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import { getTechs } from '../../actions/techActions';
import { getLogs } from '../../actions/logActions';

const TechItem = ({ tech: { _id, firstname, lastname }, deleteTech }) => {
  const onDelete = () => {
    deleteTech(_id);
    getLogs();
    M.toast({ html: 'Technician deleted' });
  };

  return (
    <li className='collection-item'>
      <div>
        {firstname} {lastname}
        <a href='#!' className='secondary-content' onClick={onDelete}>
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired,
  getTechs: PropTypes.func.isRequired,
  getLogs: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteTech ,getTechs,getLogs}
)(TechItem);
