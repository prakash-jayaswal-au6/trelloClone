const Task = require('../models/task')

//TO SEE all TASKs
exports.mytask = (req,res) => {
    Task.find({ postedBy:req.user[0]._id})
    .populate("postedBy", "_id name")
    .exec((err,tasks) => {
        if(err) {
            return res.status(422).json({error:err})
        }
        res.json({ tasks})
    })
}


//For CREATE Task
exports.create_task = (req,res) => {
    const { title,status} = req.body;
    //for sequrity not send the user password with task
    req.user[0].password = undefined
    const task = new Task ({
        title,
        status,
        postedBy:req.user[0]
    })
    task.save()
    .then(result =>{
        res.json({message:"task created successfully"})
    })
    .catch(err => {
        console.log(err)
    })
}

exports.update_task_status = (req,res) => {
    Task.findByIdAndUpdate(req.params.taskId,
        {$set:{status:req.body.status}},{new: true}, (err, result) => {
            if(err) {
                return res.status(422).json({err:"Task can't update"})
            }
                res.json(result)
    })
}


//deleteing the post we will get postid from user as PARAMs
exports.delete_task = (req,res) => {
    Task.findOne({_id:req.params.taskId}).populate("postedBy","_id").exec((err,task)=>{
        console.log(task)
        if(err || !task){
            return res.status(422).json({error:err})
        }
        //these are objectId so I have to cconvert it into string
        //console.log(req.user[0]._id)
        //I checking the user is same which created task and  make sure now logged in
        if(task.postedBy._id.toString() === req.user[0]._id.toString()){
            task.remove()
            .then(result=>{
                res.json({message:"task deleted successfully,please refresh"})
            }).catch(err=>{
                console.log(err)
            })
        }
    })
}

