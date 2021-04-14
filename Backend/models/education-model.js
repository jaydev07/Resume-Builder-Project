const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({

    resumeId:{ type:mongoose.Types.ObjectId  , required:true , ref:'Resume'}, 
    
    institute: { type:String , required:true },

    city: { type:String , required:true },
    
    state:  { type:String , required:true },
    
    degree: { type:String , required:true },
    
    graduationDate: { type:String , required:true }

});

module.exports = mongoose.model('Education',educationSchema);