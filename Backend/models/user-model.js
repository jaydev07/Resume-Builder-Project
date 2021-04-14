const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({

    name:{ type:String , required:true },

    email:{ type:String , required:true , unique:true},

    password:{ type:String , required:true , minLength:5},

    latestSection:{ type:String },

    resumeId:{ type:mongoose.Types.ObjectId  , ref:'Resume'}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);