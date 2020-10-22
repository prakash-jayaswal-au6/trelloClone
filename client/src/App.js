import React, {useEffect, createContext, useReducer, useContext} from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory,Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import TaskCreate from './components/CreateTask';
import ChangePassword from './components/ChangePassword';
import ChangeName from './components/ChangeName';
import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing=() =>{
  const history = useHistory()
  const { state,dispatch } = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user) {
      dispatch({type:"USER",payload:user})
    }
    else{
      history.push('/login') 
    }    
  },[])
  
  return (
      <Switch>
      <Route exact path='/dashboard' component={Dashboard}/>
      <Route path='/login'component={Login} />
      <Route path='/register' component={Register}/>
      <Route path='/createtask' component={TaskCreate}/>
      <Route exact path='/profile' component={Profile}/>
      <Route path="/updatepassword" component={ChangePassword} />
      <Route path="/updatename" component={ChangeName} />
      </Switch>
    
  );
}
function App (){
  const [state,dispatch] = useReducer(reducer,initialState)
  if(state){
    return ( 
      <UserContext.Provider value={{state,dispatch}}>
      <Router>
        <Navbar/>
        <Routing />
      </Router>
      </UserContext.Provider>
    )
  } else{
    return(
      <UserContext.Provider value={{state,dispatch}}>
      <Router>
        <Routing />
      </Router>
      </UserContext.Provider>
    )
  }
 
}
export default App;
