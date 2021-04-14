const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    resumeId:{ type:mongoose.Types.ObjectId  , required:true , ref:'Resume'},

    name: { type:String , required:true },

    description: { type:String , required:true },

    link: { type:String , required:true }

});

module.exports = mongoose.model('Project',projectSchema);