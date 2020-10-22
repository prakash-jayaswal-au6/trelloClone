import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';


const TaskCreate = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    let [status, setStatus] = useState("")
    
    const PostData = () => {
        
            if(!title ){
                M.toast({html: "Please Fill all details", classes:"#f44336 red"})
                return
            }
            if(!status){
                status = 'todo'
            }
            fetch("/createtask", {
                method:"post",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":"jwt "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                   title,status
                })
                }).then(res =>res.json())
                .then(data => {
                   if(data.error) {
                        M.toast({html: data.error, classes:"#f44336 red"})
                   }
                   else {
                       M.toast({html:data.message,classes:"#43a047 green darken-1"})
                       history.push('/dashboard')
                   }
                }).catch(err => {
                    console.log(err)
                })
        
        
    }
   
        return (
            <div className='box'>
            <h3>CREATE TODO</h3>
            <label>
                <h5>Enter title of todo</h5>
                <input type="text"placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text"placeholder='Enter status{optional)' value={status} onChange={(e) => setStatus(e.target.value)} />
            </label>  
            <button type="button" className="submit" onClick={() =>PostData()}>CREATE Now</button>
        </div>
        )
    }
    


export default TaskCreate;