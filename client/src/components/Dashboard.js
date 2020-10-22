import React, {useState, useEffect, useContext,useRef} from 'react';
import {UserContext} from '../App'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css';


const Dashboard = () => {
    const [items, setItems] = useState([])
    const [show,setShow] = useState(false)
    const RecomModal = useRef(null)
    const history = useHistory()   

    useEffect(()=>{
        M.Modal.init(RecomModal.current)
      },[])

    //to see all post on home
    useEffect(() => {
        fetch('/mytask', {
            headers: {
                "Content-Type":"application/json",
                "Authorization": "jwt "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(data => {
           console.log(data)
            setItems(data.tasks)
        })

    }, [])

   
   
  //for delete the task
  const deleteTask = (taskid) => {
      fetch(`/deletetask/${taskid}`,{
          method:'delete',
          headers:{
              Authorization:"jwt "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          //console.log(result)
          M.toast({html:"Deleted task successfully",classes:"#43a047 green darken-1"})          
          const newData = items.filter(item=>{
              return item._id !==result._id
          })
          setItems(newData)
          history.push('/dashboard')
          
      })
  }

  const toogle=()=>{
    setShow(!show)
}


console.log(items)

    return (
        <>

        <div className="dashboard-cards">
            <div className ='tabcard'>
                <div className ='title-box'>
                    <b>Todo</b>
                </div>
                { items?.map(item => {
                    if(item.status == 'todo'){
                        return (
                            <div className='task-box'>
                                <b>{item.title}</b>
                                <button className="deletebutton" onClick={() =>deleteTask(item._id)}><i class="material-icons">delete</i></button>
                            </div>
                            )}
               })   
                 }
            </div>
            <div className='tabcard'>
                <div className ='title-box'>
                    <b>In Progress</b>                
                </div>
                { items?.map(item => {
                    if(item.status == 'in progress'){
                        return (
                            <div className='task-box'>
                                <b>{item.title}</b>
                                <button className="deletebutton" onClick={() =>deleteTask(item._id)}><i class="material-icons">delete</i></button>
                            </div>
                            )}
               })   
                 }
            </div>
            <div className='tabcard'>
                <div className ='title-box'>
                    <b>Done</b>                
                </div>
                { items?.map(item => {
                    if(item.status == 'done'){
                        return (
                            <div className='task-box'>
                                <b>{item.title}</b>
                                <button className="deletebutton" onClick={() =>deleteTask(item._id)}><i class="material-icons">delete</i></button>
                            </div>
                            )}
               })   
                 }
            </div>
        </div>
        </>
    )
}

export default Dashboard;