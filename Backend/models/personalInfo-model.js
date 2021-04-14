const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({

    resumeId:{ type:mongoose.Types.ObjectId  , required:true , ref:'Resume'},
    
    fullName:{ type:String , required:true},
    
    address: { type:String , required:true},
    
    city: { type:String , required:true},
    
    country: { type:String , required:true},
    
    email: { type:String , required:true},
    
    phone: { type:Number , required:true}
});

module.exports = mongoose.model("Personalinfo",personalInfoSchema);