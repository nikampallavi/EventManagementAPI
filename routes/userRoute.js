
const express=require('express');
const router=express.Router();

const {registerData,loginData}=require('../controllers/userController')

router.post('/register',registerData);
router.post('/login',loginData);






module.exports=router;