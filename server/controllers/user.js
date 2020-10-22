const mongoose = require('mongoose');
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const dotenv = require('dotenv');
dotenv.config();



exports.register_user = (req,res) => {
    const {name ,email ,password ,pic} = req.body
    if(!name || !email || !password){
     return  res.status(422).json({error:"please Fill all fields"})
    }
    //make sure that user not exist already in database
    User.find({email:email}).exec().then(user => {
        if(user.length >= 1){
            return res.status(409).json({message:"user already exist can't register"});
        } else {
            bcrypt.hash(password,10,(err,hash) => {
                if(err) {
                    return res.status(500).json({error:err});
                } else {
                
                    let newUser = new User({
                        name:name,
                        email:email,
                        password: hash,
                        pic:pic
                    });
                   
                    newUser.save().then(response => {
                        console.log(response);                         
                        res.status(201).json({message:"user created succesfully",User:response})    
                               
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({error:err});
                        });   
                }
            })
        }
    }).catch();   
}


exports.login_user = (req,res,next) => {
    const {email ,password } = req.body
    if(!email || !password){
     return  res.status(422).json({error:"please Fill all fields"})
    }

    User.find({email:email}).exec().then(user => {
        if(user.length < 1){
            return res.status(401).json({error:"User Doesn't Exist"});
        }
        bcrypt.compare(password, user[0].password,(err,isMatch) => {             
            if(isMatch){
                const {_id, name, email,pic} = user[0]
                const token = jwt.sign({email: user[0].email, userId: user[0]._id},process.env.secretKey,{expiresIn:500000});
                return res.status(200).json({message:"Authentication successful",Token : token,user:{_id,name,email,pic} })
            }
            else {
                return res.status(401).json({error:"Authentication Failed"});
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
}


exports.profile = (req,res) => {
    User.findOne({_id:req.user[0]._id})
    .select("-password")
    .then(user => {
        console.log(user)
            res.json({ user})
    }).catch(err => {
        return res.status(404).json({error:"somthing went wrong"})
    }) 
}

exports.update_name = (req,res)=>{
    User.findByIdAndUpdate(req.user[0]._id,{$set:{name:req.body.name}},{new:true},
       (err,result)=>{
         if(err){
             return res.status(422).json({error:"data can't update"})
         }
         return res.status(200).json({message:"name updated succefullly, Please Login Again"})
        })
}

exports.change_password =(req,res)=> {
    const {oldPassword,newPassword,confirmPassword} = req.body
    console.log(oldPassword,newPassword,confirmPassword)
    if(!oldPassword || !newPassword || !confirmPassword){
        return  res.status(422).json({error:"please Fill all fields"})
       }
   // console.log(req.user[0])
    User.findOne({_id:req.user[0]._id}).exec().then(user => {
        if(user != null){
            console.log(user)
            const hash = user.password;
            bcrypt.compare(oldPassword,hash,(err,isMatch)=>{
                if(isMatch){
                    //means password matched
                    if(newPassword == confirmPassword){
                        bcrypt.hash(newPassword,10,(err,hash)=>{
                            user.password =hash;
                            user.save((err,user)=>{
                                if(err) return console.log(err)
                                console.log(user.name +' !your password has been changed');
                                //return res.status(204).json({message:"password updated succefullly"})
                                return res.status(200).json({message:"password updated succefullly"})
                            })
                        })
                    }
                }
                else {
                    return res.status(401).json({error:"Old Password not mathed"});
                 } 
            })
        }  
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    }); 
}

exports.update_profile_pic = (req,res) => {
    console.log(req)
    User.findByIdAndUpdate(req.user[0]._id,
        {$set:{pic:req.body.pic}},{new: true}, 
        (err, result) => {
            if(err) {
                return res.status(422).json({err:"Image can't update"})
            }
                res.json(result)
    })
}






