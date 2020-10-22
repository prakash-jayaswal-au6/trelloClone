const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middleware/auth');

const dotenv = require('dotenv');
dotenv.config();


router.post('/register',UserController.register_user);


 router.post('/login',UserController.login_user);


// //get self profile
router.get('/profile',auth,UserController.profile)

router.put('/updatename',auth, UserController.update_name)

router.put('/updatepic',auth, UserController.update_profile_pic)

router.put('/updatepassword',auth,UserController.change_password)





module.exports = router;