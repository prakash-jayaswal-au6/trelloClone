import React,{useContext,useRef,useEffect,useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css'

const Navbar = () => {
  const {state, dispatch } = useContext(UserContext)
  const history = useHistory()

  const renderList = () => {
    if(state) {
      return [
        <li key="3"><Link to='/dashboard'><i className="material-icons">home</i></Link></li>,
        <li key="4"><Link to='/createtask'>Add Task</Link></li>,
        <li key="5"><Link to="/profile"><i className="material-icons">person</i></Link></li>,
        <li key="6">
          <button
                    onClick={() =>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push("/login")
                    }}> <i className="material-icons">power_settings_new</i></button>
        </li>,
        
      ]
    }
  }

 
    return (
        <nav>
            <div className="nav-wrapper #e8eaf6  lighten-5">
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderList()}
                </ul>
            </div>
      </nav>
    )
}
export default Navbar;