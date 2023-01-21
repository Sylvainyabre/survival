const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
        
    },
    partners:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:'User'}
    ],
    phone_number:{
        type:String,
        required:true
    },
    preferred_com_mode:{
        type:String,
        default:"text",
        enum:["text","email"]
    },
    subjects:[
      {
        type:String,
      }
    ],
    tasks:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
        }
    ]
   

}, {timestamps:true})

module.exports = mongoose.model('User', UserSchema)