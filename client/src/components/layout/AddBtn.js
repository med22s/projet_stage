import React from 'react';

const AddBtn = () => {
  return (
    <div className='fixed-action-btn'>
      <a
        href='#add-log-modal'
        className='btn-floating btn-large green darken-2 modal-trigger'
      >
        <i className='large material-icons'>add</i>
      </a>
      <ul>
        <li>
          <a
            href='#tech-list-modal'
            className='btn-floating green modal-trigger'
          >
            <i className='material-icons'>person</i>
          </a>
        </li>
        {/* log out button */}
        <li>
          <a href='#log-tech' className='btn-floating red modal-trigger'>
            <i className='material-icons'>pan_tool</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AddBtn;
