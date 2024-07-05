const mongoose=require('mongoose');

const Eventschema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
       type:Date,
       required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    },
    createdAt:
    {
        type:mongoose.Schema.Types.ObjectId,ref:'userModel'
    },
    invites:[{type:mongoose.Schema.Types.ObjectId,ref:'userModel'}],
    rsvps:[{
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'userModel'},
        response:{type:String,enum:['yes','no','maybe']}
    }]
})

const event=mongoose.model('Events',Eventschema);

module.exports=event;