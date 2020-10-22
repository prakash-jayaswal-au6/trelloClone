const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const TaskController = require('../controllers/task')

const dotenv = require('dotenv');
dotenv.config();


router.get('/mytask',auth,TaskController.mytask)

router.post('/createtask',auth,TaskController.create_task)

router.put('/updatetaskstatus/:taskId',auth, TaskController.update_task_status)

router.delete('/deletetask/:taskId',auth, TaskController.delete_task)





module.exports = router;