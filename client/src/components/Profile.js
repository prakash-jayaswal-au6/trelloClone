import React,{useEffect, useState, useContext} from 'react';
import { UserContext } from '../App';
import {Link} from 'react-router-dom'

const Profile = () => {
    const [mypics, setPics] = useState([])
    const {state, dispatch } = useContext(UserContext)
    const [image, setImage] = useState("")
    

    useEffect(() => {
        if(image) {
            const data = new FormData()
            data.append("file",image)
            data.append("upload_preset","chitchat-clone")
            data.append("clound_name","dnjqxnccx")
            
            fetch("https://api.cloudinary.com/v1_1/dnjqxnccx/image/upload", {
                method:"post",
                body:data

            })
            .then(res =>res.json())
            .then(data => {
                fetch('/updatepic',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"jwt "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                })
                .then(res => res.json())
                .then(result => {
                    //console.log(result)
                    localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                    dispatch({type:"UPDATE PIC", payload:result.pic})
                })
                // window.location.reload()
            }).catch(err => {
                console.log(err)
            })
        }

    }, [image])

    const updatePhoto = (file) => {
        setImage(file)        
    }

    return (
        <>
        <div style={{maxWidth:"550px", margin: "0px auto"}}>
            <div style={{ 
                display:"flex",
                justifyContent: "space-around",
                margin:"18px 0px",
              borderBottom:"1px solid gray"
              }}> 
                <div>
                    <img style={{ width:"160px", height:"160px",borderRadius:"80px"}}
                    src={state ? state.pic : "Loading..."} />
                </div>
                <div>
                    <div style={{display:"flex",justifyContent:"left"}}>
                        <h4>{state ? state.name: "Loading..."}<h6><Link to='/updatename'>Update Name</Link></h6></h4>
                        
                    </div>
                    <h5>{state ? state.email: "Loading..."}</h5>
                    <div style={{display:"flex",
                        justifyContent:"space-between",
                        width:"108%"}}>
                    </div>
                    <h5><Link to='/updatepassword'><i class="material-icons">settings</i>Change Password</Link></h5>

                </div>
            </div>
            
            <div className="file-field input-field" style={{margin:"10px"}}>
                <div className="btn #42a5f5 blue lighten-1">
                    <span> <i className="material-icons">update</i></span>
                        <input type="file" onChange={(e) =>updatePhoto(e.target.files[0])}/>            
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
        </div>
    </>   
    )
}

export default Profile;