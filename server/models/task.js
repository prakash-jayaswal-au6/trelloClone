const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default: "todo"
    },  
    postedBy: {
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true});

const Task = module.exports = mongoose.model('Task',taskSchema); 
