const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const Resume = require("../models/resume-model");
const User = require("../models/user-model");
const Personalinfo = require("../models/personalInfo-model");
const Experience = require("../models/experience-model");
const Project = require("../models/project-model");
const Education = require("../models/education-model");
const HttpError = require("../util/http-error");

////////////////////////////////////////////////////// POST Controllers ////////////////////////////////////////////////////////////////

const createResume = async (req, res, next) => {
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }

    const userId = req.body.userId;

    let userFound;
    try{
        userFound = await User.findById(userId);
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!userFound){
        return next(new HttpError('User not found',500));
    }

    const newResume = new Resume({
        userId:userId,
        userName:userFound.name,
        personalInfo:null,
        experiences:[],
        education:[],
        skills:[],
        summary:null
    });

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();

        await newResume.save({session:sess});
        userFound.resumeId  = newResume._id;
        userFound.latestSection = "personalInfo";
        await userFound.save({session:sess});    

        sess.commitTransaction();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    res.json({resume:newResume.toObject({getters:true})});
}

const addPersonalInfo = async (req,res,next) => {
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }

    const resumeId = req.params.resumeId;

    const { fullName, address, city, country, email, phone } = req.body;
    
    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId).populate('userId');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume is not created yet!',500));
    }

    const newPersonalInfo = new Personalinfo({
        resumeId,
        fullName,
        address,
        city,
        country,
        email,
        phone
    });

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();

        await newPersonalInfo.save({session:sess});

        resumeFound.personalInfo = newPersonalInfo;
        await resumeFound.save({session:sess});

        resumeFound.userId.latestSection = "experience";
        await resumeFound.userId.save({session:sess});

        sess.commitTransaction();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!,Personal Info is not saved ',500));
    }

    res.json({resume:resumeFound.toObject({getters:true})});
}

const addExperience = async (req,res,next) => {
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }

    const resumeId = req.params.resumeId;

    const {company, jobTitle, city, state, startDate, endDate, jobDescription} = req.body;

    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId).populate('userId');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume is not created yet!',500));
    }

    const newExperience = new Experience({
        resumeId,
        company,
        jobTitle,
        city,
        state,
        startDate,
        endDate,
        jobDescription
    });

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();

        await newExperience.save({session:sess});

        resumeFound.experiences.push(newExperience);
        await resumeFound.save({session:sess});

        resumeFound.userId.latestSection = "allExperiences";
        await resumeFound.userId.save({session:sess});

        sess.commitTransaction();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!,Experience is not saved ',500));
    }

    res.json({resume:resumeFound.toObject({getters:true})});
}

const addProject = async (req,res,next) => {
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }

    const resumeId = req.params.resumeId;

    const {name, description, link} = req.body;

    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId).populate('userId');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume is not created yet!',500));
    }

    const newProject = new Project({
        resumeId,
        name,
        description,
        link
    });

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();

        await newProject.save({session:sess});

        resumeFound.projects.push(newProject);
        await resumeFound.save({session:sess});

        resumeFound.userId.latestSection = "allProjects";
        await resumeFound.userId.save({session:sess});

        sess.commitTransaction();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!,Project is not saved ',500));
    }

    res.json({resume:resumeFound.toObject({getters:true})});
}

const addEducation = async (req,res,next) => {
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }

    const resumeId = req.params.resumeId;

    const {institute, city, state, degree, graduationDate} = req.body;

    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId).populate('userId');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume is not created yet!',500));
    }

    const newEducation = new Education({
        resumeId,
        institute,
        city,
        state,
        degree,
        graduationDate
    });

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();

        await newEducation.save({session:sess});

        resumeFound.education.push(newEducation);
        await resumeFound.save({session:sess});

        resumeFound.userId.latestSection = "allEducations";
        await resumeFound.userId.save({session:sess});

        sess.commitTransaction();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!,Education is not saved ',500));
    }

    res.json({resume:resumeFound.toObject({getters:true})});
}

const addSkill = async (req,res,next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }

    const resumeId = req.params.resumeId;

    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId).populate('userId');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume is not created yet!',500));
    }

    const skills = req.body.skills;

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();

        resumeFound.skills = skills;
        await resumeFound.save({session:sess});

        resumeFound.userId.latestSection = "summary";
        await resumeFound.userId.save({session:sess});

        sess.commitTransaction();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!,Skills are not saved ',500));
    }

    res.json({resume:resumeFound.toObject({getters:true})});
}

const addSummary = async (req,res,next) => {
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }

    const resumeId = req.params.resumeId;

    const summary = req.body.summary;
    
    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId).populate('userId');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume not found!',500));
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();

        resumeFound.summary = summary;
        await resumeFound.save({session:sess});

        resumeFound.userId.latestSection = "summary";
        await resumeFound.userId.save({session:sess});

        sess.commitTransaction();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!,summary is not saved ',500));
    }

    res.json({resume:resumeFound.toObject({getters:true})});
}

////////////////////////////////////////////////////////////// GET Controllers /////////////////////////////////////////////////////////////

const getResume = async ( req,res,next) => {
    const resumeId = req.params.resumeId;
    
    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId).populate('personalInfo').populate('experiences').populate('projects').populate('education');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume not found!',500));
    }

    res.json({resume: resumeFound.toObject({getters:true})});
}

const getPersonalInfo = async (req,res,next) => {
    const resumeId = req.params.resumeId;

    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId).populate('personalInfo');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume not found!',500));
    }

    res.json({personalInfo: resumeFound.personalInfo.toObject({getters:true})});
} 

const getExperiences = async (req,res,next) => {
    const resumeId = req.params.resumeId;

    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId).populate('experiences');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume not found!',500));
    }

    res.json({experiences:resumeFound.experiences.map(exp => exp.toObject({getters:true}))});
}

const getProjects = async (req,res,next) => {
    const resumeId = req.params.resumeId;

    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId).populate('projects');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume not found!',500));
    }

    res.json({projects:resumeFound.projects.map(pro => pro.toObject({getters:true}))});
}

const getEducation = async (req,res,next) => {
    const resumeId = req.params.resumeId;

    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId).populate('education');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume not found!',500));
    }

    res.json({education:resumeFound.education.map(edu => edu.toObject({getters:true}))});
}

const getSkills = async (req,res,next) => {
    const resumeId = req.params.resumeId;

    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId);
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume not found!',500));
    }

    res.json({skills:resumeFound.skills.map(skill => skill.toObject({getters:true}))});
}

const getSummary = async (req,res,next) => {
    const resumeId = req.params.resumeId;

    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId);
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume not found!',500));
    }

    res.json({summary:resumeFound.summary});
}

const getExperienceById = async (req,res,next) => {
    const experienceId = req.params.experienceId;

    let experienceFound;
    try{
        experienceFound = await Experience.findById(experienceId);
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!experienceFound){
        return next(new HttpError('Experience not found!',500));
    }

    res.json({experience:experienceFound.toObject({getters:true})});
}

const getProjectById = async (req,res,next) => {
    const projectId = req.params.projectId;

    let projectFound;
    try{
        projectFound = await Project.findById(projectId);
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!projectFound){
        return next(new HttpError('Project not found!',500));
    }

    res.json({project:projectFound.toObject({getters:true})});
}

const getEducationById = async (req,res,next) => {
    const educationId = req.params.educationId;

    let educationFound;
    try{
        educationFound = await Education.findById(educationId);
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!educationFound){
        return next(new HttpError('Education not found!',500));
    }

    res.json({education:educationFound.toObject({getters:true})});
}

////////////////////////////////////////////////////////////// PATCH Controllers ///////////////////////////////////////////////////////////

const updatePersonalInfo = async (req,res,next) => {
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }

    const personalInfoId = req.params.personalInfoId;

    const { fullName, address, city, country, email, phone } = req.body;
    
    let personalInfoFound;
    try{
        personalInfoFound = await Personalinfo.findById(personalInfoId);
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!personalInfoFound){
        return next(new HttpError('Personal-info not found!',500));
    }

    personalInfoFound.fullName = fullName;
    personalInfoFound.address = address;
    personalInfoFound.city = city;
    personalInfoFound.country = country;
    personalInfoFound.email = email;
    personalInfoFound.phone = phone;

    let resume;
    try{
        await personalInfoFound.save();
        resume = await Resume.findById(personalInfoFound.resumeId).populate('personalInfo').populate('experiences').populate('projects').populate('education');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!,Personal Info is not saved ',500));
    }

    res.json({resume:resume.toObject({getters:true})});
}

const updateExperience = async (req,res,next) => {
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }

    const experienceId = req.params.experienceId;

    const {company, jobTitle, city, state, startDate, endDate, jobDescription} = req.body;

    let experienceFound;
    try{
        experienceFound = await Experience.findById(experienceId);
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!experienceFound){
        return next(new HttpError('Experience not found!',500));
    }

    experienceFound.company = company;
    experienceFound.jobTitle = jobTitle;
    experienceFound.city = city;
    experienceFound.state = state;
    experienceFound.startDate = startDate;
    experienceFound.endDate = endDate;
    experienceFound.jobDescription = jobDescription;

    let resume;
    try{
        await experienceFound.save();
        resume = await Resume.findById(experienceFound.resumeId).populate('experiences');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!,Experience is not saved ',500));
    }

    res.json({experiences:resume.experiences.map(exp => exp.toObject({getters:true}))});
}

const updateProject = async (req,res,next) => {
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }

    const projectId = req.params.projectId;

    const {name, description, link} = req.body;

    let projectFound;
    try{
        projectFound = await Project.findById(projectId);
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!projectFound){
        return next(new HttpError('Project not found!',500));
    }

    projectFound.name = name;
    projectFound.description = description;
    projectFound.link = link;

    let resume;
    try{
        await projectFound.save();
        resume = await Resume.findById(projectFound.resumeId).populate('projects');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!,Project is not saved ',500));
    }

    res.json({projects:resume.projects.map(pro => pro.toObject({getters:true}))});
}

const updateEducation = async (req,res,next) => {
  
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }

    const educationId = req.params.educationId;

    const {institute, city, state, degree, graduationDate} = req.body;

    let educationFound;
    try{
        educationFound = await Education.findById(educationId);
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!educationFound){
        return next(new HttpError('Education not found!',500));
    }

    educationFound.institute = institute;
    educationFound.city = city;
    educationFound.state = state;
    educationFound.degree = degree;
    educationFound.graduationDate = graduationDate;

    let resume;
    try{
        await educationFound.save();
        resume = await Resume.findById(educationFound.resumeId).populate('education');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!,Project is not saved ',500));
    }

    res.json({education:resume.education.map(edu => edu.toObject({getters:true}))});
}

const updateSkills = async (req,res,next) => {
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }
    
    const resumeId = req.params.resumeId;

    const skills = req.body.skills;

    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId).populate('personalInfo').populate('experiences').populate('projects').populate('education');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume is not created yet!',500));
    }

    resumeFound.skills = skills;
    try{
        await resumeFound.save();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!,Skills are not saved ',500));
    }

    res.json({resume:resumeFound.toObject({getters:true})});
}

const updateSummary = async (req,res,next) => {
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }
    
    const resumeId = req.params.resumeId;

    const summary = req.body.summary;

    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId).populate('personalInfo').populate('experiences').populate('projects').populate('education');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!resumeFound){
        return next(new HttpError('Resume not found!',500));
    }

    resumeFound.summary = summary;
    try{
        await resumeFound.save();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!,Summary is not saved ',500));
    }

    res.json({resume:resumeFound.toObject({getters:true})});
}

/////////////////////////////////////////////////////////// DELETE Controllers /////////////////////////////////////////////////////////

const deleteExperience = async (req,res,next) => {

    const experienceId = req.params.experienceId;

    let experienceFound;
    let resume;
    try{
        experienceFound = await Experience.findById(experienceId);
        resume = await Resume.findById(experienceFound.resumeId).populate('experiences');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));   
    }

    if(!experienceFound){
        return next(new HttpError('Experience not found!',500));
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();

        resume.experiences.pull(experienceFound);
        await resume.save({session:sess});

        await experienceFound.remove({session:sess});

        sess.commitTransaction();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!,Experience is not removed ',500));
    }

    res.json({experiences: resume.experiences.map(exp => exp.toObject({getters:true}))});
}

const deleteProject = async (req,res,next) => {

    const projectId = req.params.projectId;

    let projectFound;
    let resume;
    try{
        projectFound = await Project.findById(projectId);
        resume = await Resume.findById(projectFound.resumeId).populate('projects');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));   
    }

    if(!projectFound){
        return next(new HttpError('Project not found!',500));
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();

        resume.projects.pull(projectFound);
        await resume.save({session:sess});

        await projectFound.remove({session:sess});

        sess.commitTransaction();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong,Project is not removed ',500));
    }

    res.json({projects: resume.projects.map(pro => pro.toObject({getters:true}))});
}

const deleteEducation = async (req,res,next) => {

    const educationId = req.params.educationId;

    let educationFound;
    let resume;
    try{
        educationFound = await Education.findById(educationId);
        resume = await Resume.findById(educationFound.resumeId).populate('education');
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));   
    }

    if(!educationFound){
        return next(new HttpError('Education not found!',500));
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();

        resume.education.pull(educationFound);
        await resume.save({session:sess});

        await educationFound.remove({session:sess});

        sess.commitTransaction();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong,Education is not removed ',500));
    }

    res.json({education: resume.education.map(edu => edu.toObject({getters:true}))});
}

const deleteSkill = async (req,res,next) => {
    
    const resumeId = req.params.resumeId;
    const skillId = req.params.skillId;

    let resumeFound;
    try{
        resumeFound = await Resume.findById(resumeId);
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));   
    }

    if(!resumeFound){
        return next(new HttpError('Resume not found!',500));
    }

    resumeFound.skills.pull(skillId);
    try{
        await resumeFound.save();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong,Skill is not removed ',500));
    }

    res.json({skills: resumeFound.skills})
}


exports.createResume =  createResume;
exports.addPersonalInfo = addPersonalInfo;
exports.addExperience = addExperience;
exports.addProject = addProject;
exports.addEducation = addEducation;
exports.addSkill = addSkill;
exports.addSummary = addSummary;
exports.getPersonalInfo = getPersonalInfo;
exports.getExperiences = getExperiences;
exports.getProjects = getProjects;
exports.getEducation = getEducation;
exports.getSkills = getSkills;
exports.getSummary = getSummary;
exports.getResume = getResume;
exports.updatePersonalInfo = updatePersonalInfo;
exports.updateExperience = updateExperience;
exports.updateProject = updateProject;
exports.updateEducation = updateEducation;
exports.updateSkills = updateSkills;
exports.updateSummary = updateSummary;
exports.deleteExperience = deleteExperience;
exports.deleteProject = deleteProject;
exports.deleteEducation = deleteEducation;
exports.deleteSkill = deleteSkill;
exports.getExperienceById = getExperienceById;
exports.getProjectById = getProjectById;
exports.getEducationById = getEducationById;