import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
import { UserContext } from '../App';


const ChangeName = () => {
    const [name, setName] = useState("")
    const {state, dispatch } = useContext(UserContext)
    const history = useHistory()


    const PostData = () => {  
        
        fetch("/updatename", {
            method:"put",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "jwt "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({          
                name
            })
            }).then(res =>res.json())
            .then(data => {
                //console.log(data)
                if(data.error){
                  return  M.toast({html: data.error, classes:"#f44336 red"})
                }else{
                    M.toast({html:data.message,classes:"#43a047 green darken-1"}) 
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push("/login")
                     
                    // history.push('/profile')
                }
                
            }).catch(err => {
                console.log(err)
            })
        
    }


    return (
        <div className="landing-page">
            <div className="cont box">
                <div className="form sign-in">
                    <h2>Change Name</h2>
                <label>
                    <span>Enter New Name</span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <button className="submit" type="button" onClick={() =>PostData()}>Change Name</button>
            </div>

        </div>
    </div>
    )
}

export default ChangeName;