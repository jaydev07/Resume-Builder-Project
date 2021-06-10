const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

const resumeControllers = require("../controllers/resume-controllers");
 
// Use to get personal information of user providing in resume.
router.get("/personalInfo/:resumeId", resumeControllers.getPersonalInfo);

// Use to get experience of user providing in resume.
router.get("/experience/:resumeId", resumeControllers.getExperiences);

// Use to get projrct of user providing in resume.
router.get("/project/:resumeId", resumeControllers.getProjects);

// Use to get education of user providing in resume.
router.get("/education/:resumeId", resumeControllers.getEducation);

// Use to get skills of user providing in resume.
router.get("/skill/:resumeId", resumeControllers.getSkills);

// Use to get summary of user providing in resume.
router.get("/summary/:resumeId", resumeControllers.getSummary);

// Use to get resumeId of user providing in resume.
router.get("/:resumeId", resumeControllers.getResume);

// Use to get a particular Experience by experienceId.
router.get("/getexperience/:experienceId", resumeControllers.getExperienceById);

// Use to get a particular project by projectId.
router.get("/getproject/:projectId", resumeControllers.getProjectById);

// Use to get a particular education by educationId.
router.get("/geteducation/:educationId", resumeControllers.getEducationById);

// To create a resume
router.post("/",
            [
                check('userId').not().isEmpty()
            ]
            ,resumeControllers.createResume);

// To create a personal Information            
router.post("/personalInfo/:resumeId",
            [
                check('fullName').not().isEmpty(),
                check('address').not().isEmpty(),
                check('city').not().isEmpty(),
                check('country').not().isEmpty(),
                check('email').not().isEmpty(),
                check('phone').not().isEmpty()
            ]
            , resumeControllers.addPersonalInfo);

// To create an experience
router.post("/experience/:resumeId",
            [
                check('company').not().isEmpty(),
                check('jobTitle').not().isEmpty(),
                check('city').not().isEmpty(),
                check('state').not().isEmpty(),
                check('startDate').not().isEmpty(),
                check('endDate').not().isEmpty(),
                check('jobDescription').not().isEmpty()
            ]
            , resumeControllers.addExperience);

// To create a project
router.post("/project/:resumeId",
            [
                check('name').not().isEmpty(),
                check('description').not().isEmpty(),
                check('link').not().isEmpty()
            ]
            , resumeControllers.addProject);

// To create an education
router.post("/education/:resumeId",
            [
                check('institute').not().isEmpty(),
                check('city').not().isEmpty(),
                check('state').not().isEmpty(),
                check('degree').not().isEmpty(),
                check('graduationDate').not().isEmpty()
            ]
            , resumeControllers.addEducation);

//to create skils
router.post("/skill/:resumeId",
            [
                check('skills').not().isEmpty(),
            ]
            , resumeControllers.addSkill);

// To create a summary
router.post("/summary/:resumeId",
            [
                check('summary').not().isEmpty(),
            ]
            , resumeControllers.addSummary);

// To update a personal Information
router.patch("/updatePersonalInfo/:personalInfoId",
            [
                check('fullName').not().isEmpty(),
                check('address').not().isEmpty(),
                check('city').not().isEmpty(),
                check('country').not().isEmpty(),
                check('email').not().isEmpty(),
                check('phone').not().isEmpty()
            ]
            , resumeControllers.updatePersonalInfo);

// To update an experience            
router.patch("/updateExperience/:experienceId",
            [
                check('company').not().isEmpty(),
                check('jobTitle').not().isEmpty(),
                check('city').not().isEmpty(),
                check('state').not().isEmpty(),
                check('startDate').not().isEmpty(),
                check('endDate').not().isEmpty(),
                check('jobDescription').not().isEmpty()
            ]
            , resumeControllers.updateExperience);

// To update a project
router.patch("/updateProject/:projectId",
            [
                check('name').not().isEmpty(),
                check('description').not().isEmpty(),
                check('link').not().isEmpty()
            ]
            , resumeControllers.updateProject);

// To update an education
router.patch("/updateEducation/:educationId",
            [
                check('institute').not().isEmpty(),
                check('city').not().isEmpty(),
                check('state').not().isEmpty(),
                check('degree').not().isEmpty(),
                check('graduationDate').not().isEmpty()
            ]
            , resumeControllers.updateEducation);

// To update a skill
router.patch("/updateSkill/:resumeId",
            [
                check('skills').not().isEmpty(),
            ]
            , resumeControllers.updateSkills);

// To update a summary
router.patch("/updateSummary/:resumeId",
            [
                check('summary').not().isEmpty(),
            ]
            , resumeControllers.updateSummary);

// To delete an experience
router.delete("/experience/:experienceId", resumeControllers.deleteExperience);

// To delete a project
router.delete("/project/:projectId", resumeControllers.deleteProject);

// To delete an education
router.delete("/education/:educationId", resumeControllers.deleteEducation);

// To delete a skill
router.delete("/skill/:resumeId/:skillId", resumeControllers.deleteSkill);


module.exports = router;