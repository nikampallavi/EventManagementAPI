const express=require('express');
const router=express.Router();

const auth=require('../middleware/auth')

const{createEvent,getEvent,updateEvent,deleteEvent}=require('../controllers/eventController')


router.post('/',auth,createEvent);
router.get('/allEvent',getEvent);
router.put('/updateEvent/:id',auth,updateEvent);
router.delete('/delete/:id',deleteEvent);





module.exports=router;