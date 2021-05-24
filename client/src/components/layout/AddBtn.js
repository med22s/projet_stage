import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux'
import {logout} from '../../actions/authActions'

const AddBtn = ({logout,user}) => {

  // const [user,setUser]=useState({
  //   _id:'',firstname:'',lastname:'',email:''
  // })

  // useEffect(()=>{
  //   setUser({...user,...JSON.parse(localStorage.getItem('user'))})
  //   console.log(JSON.parse(localStorage.getItem('user')))

  // },[])

  return (
    <div className='fixed-action-btn'>
    <a
      href='#add-log-modal'
      className='btn-floating btn-large red darken-2 modal-trigger'
    >
      <i className='large material-icons'>add</i>
    </a>
    <ul>
      {
        user.isAdmin &&
        (
          <li>
              <a
                href='#tech-list-modal'
                className='btn-floating green modal-trigger'
              >
                <i className='material-icons'>person</i>
              </a>
            </li>
        )
      }
      <li>
        <a href="!#" onClick={(e) => {e.preventDefault(); logout() }} className="btn-floating indigo waves-effect waves-light"><i className="material-icons">fingerprint</i></a>
      </li>
    </ul>
  </div>
  );
};


const mapStateToProps=state=>({
  user:state.auth.user
})

export default connect(mapStateToProps,{logout})(AddBtn);
