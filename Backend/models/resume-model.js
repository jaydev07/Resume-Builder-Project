const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({

    userId: {type:mongoose.Types.ObjectId , required:true , ref:'User' },

    userName: { type:String , required:true },

    personalInfo: { type:mongoose.Types.ObjectId , ref:'Personalinfo'},

    experiences: [{ type:mongoose.Types.ObjectId , required:true , ref:'Experience' }],

    projects: [{ type:mongoose.Types.ObjectId , required:true , ref:'Project' }],

    education: [{ type:mongoose.Types.ObjectId , required:true , ref:'Education'}],

    skills: [{ 
        name:{ type:String },
        level:{ type:Number }
     }],

    summary:{ type:String }

});

module.exports = mongoose.model('Resume',resumeSchema);

