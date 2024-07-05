const Events=require('../models/eventModel')
const jwt=require('jsonwebtoken')
const secreteKey='secretekey'
const {ObjectId}=require('mongodb')

async function createEvent(req,res){
    console.log("*****creating event*****")
    
    try {
        const{title,description,date}=req.body;
        console.log(req.body);
        // const addEvent= new Events({title:title,description:description,date:date,userId:req.userId.id})
        // const newEvent=await addEvent.save();
        console.log(req.user.Id)
        
        const event=new Events({
            title,
            description,
            date,
            user:req.user.Id
            
        });
        const newEvent=await event.save();
        return res.status(201).json({result:'event successfully created',newEvent});
        
    } catch (error) {
        return res.status(500).send({
            msg:'Server Error. Plesae try again later'
        })
    }
}

 function getEvent(req,res){
    try {
        jwt.verify(req.token,secreteKey,async(err,data)=>{
        const events=await Events.find({})
        if(!events){
            return res.status(400).json({msg:"Data is empty"});
        }
        else{
            return res.status(201).json({result:'get all event successfully',data:events});
        }
    })
    } catch (error) {
        return res.status(500).send({
            msg:'Server Error. Plesae try again later'
        })
    }
}

async function updateEvent(req,res){
    // try {
    //     const id=req.params.id;
    //     // if(!ObjectId.isValid(id)){
    //     //     return res.status(400).json({msg:"Invalid Event Id"})
        
    //     const updateData=await Events.updateOne({_id:ObjectId(id)} ,{$set:req.body});
    //     if(!updateData){
    //         return res.status(400).json({msg:"Data not updated"});
    //     }
    //     else{
    //         return res.status(201).json({result:'Data updated successfully',data:updateData});
    //     }
        
    //     }
    //  catch (error) {
    //     return res.status(500).send({msg:'Server Error. Plesae try again later'})
    //  }
    const { title, description, date, time } = req.body;

  try {
    let event = await Events.findByIdAndUpdate(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    event.title = title;
    event.description = description;
    event.date = date;
    

    event = await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

async function deleteEvent(req,res){
    try {
        const id=req.params.id;
        const deleteData=await Events.findByIdAndDelete(id);
        if(!deleteData){
            return res.status(400).json({msg:"Data not deleted"});
        }
        else{
            return res.status(201).json({result:'Data deleted successfully',data:deleteData});
        }
        }
     catch (error) {
        return res.status(500).send({msg:'Server Error. Plesae try again later'})
     }
        
    
}

module.exports={createEvent,getEvent,updateEvent,deleteEvent}