const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({

    resumeId:{ type:mongoose.Types.ObjectId  , required:true , ref:'Resume'},

    company: {type: String , required: true},

    jobTitle: {type: String , required: true},

    city: {type: String , required: true},

    state: {type: String , required: true},

    startDate: {type: String , required: true},

    endDate: {type: String , required: true},

    jobDescription: {type: String , required: true}
});

module.exports = mongoose.model("Experience",experienceSchema);