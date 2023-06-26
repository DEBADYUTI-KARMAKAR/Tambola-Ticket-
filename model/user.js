const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        requires:true,
        default:null
    },
    email:{
        type:String,
        unique:true,
        requires:true
        
    },
    password:{
        type:String
    },
    token:{
        type:String
    }
});

module.exports=mongoose.model('user',userSchema);