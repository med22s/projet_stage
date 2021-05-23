import React,{useRef,useEffect} from 'react'
import {connect} from 'react-redux'
import {searchLogs} from '../../actions/logActions'
import {clearFilter} from '../../actions/logActions'

const Search = ({searchLogs,clearFilter,filtered}) => {

    const text=useRef('')

    useEffect(() => {
        if (filtered === null) {
          text.current.value = '';
        }
      });

    const onChange=()=>{
        if(text.current.value!==''){
            searchLogs(text.current.value)
        }
        else{
            clearFilter()
        }
    }

    return (
        <>
            <nav style={{ marginBottom: '30px' }} className='green'>
                <div className="nav-wrapper" >
                    <form>
                        <div className="input-field">
                            <input id="search" type="search" required ref={text} onChange={onChange} />
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                    </form>
                </div>
            </nav>
        </>
    )
}


const mapStateToProps=state=>({
    filtered:state.log.filtered
})

export default connect(mapStateToProps,{searchLogs,clearFilter})(Search)
