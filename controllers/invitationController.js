const event = require('../models/eventModel');
const Events=require('../models/eventModel');
const Users=require('../models/userModel')
const {ObjectId}=require('mongodb');
async function invitation(req,res){
    // try {
    //     const user=await Users.findOne({email:req.body.email})
    //     if(!user){
    //         return res.status(400).json({msg:'Email id does not exists'})
    //     }
    //     const newInvitation=new Events({
    //         createdAt:req.params.id,
    //         invities:user.id
           
    //     })
    //     const invitation=await newInvitation.save()
    //     res.status(200).json({msg:"invitation sent",invitation})

    // } catch (error) {
    //     res.status(400).json({msg:'server error',error})
    // }
    try {
        
        const user=await Users.findOne({email:req.body.email})
            if(!user){
                return res.status(400).json({msg:'Email id does not exists'})
            }
       const eventId=req.url.split('/').pop();
       const newInvitation={
        eventId:ObjectId(eventId),
        invites:user.id,
        createdAt:new Date()
       }     
       const result=await Events.insertOne(newInvitation);
       res.status(200).json({msg:'invitation sent',invitation:newInvitation,result})
        
    } catch (error) {
        res.status(400).json({msg:'server error',error})
    }
}

async function rsvp(req,res){
 try {
    const user=await Users.findOne({email:req.body.email})
            if(!user){
                return res.status(400).json({msg:'Email id does not exists'})
            }
        
     const eventid=await Events.findOne(req.params.id)  
     if(!eventid){
        return res.status(400).json({msg:'event id does not exists'})
     }    
 } catch (error) {
    
 }
}

module.exports={invitation,rsvp}