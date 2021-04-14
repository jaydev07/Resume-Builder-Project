const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

const resumeControllers = require("../controllers/resume-controllers");

router.get("/personalInfo/:resumeId", resumeControllers.getPersonalInfo);

router.get("/experience/:resumeId", resumeControllers.getExperiences);

router.get("/project/:resumeId", resumeControllers.getProjects);

router.get("/education/:resumeId", resumeControllers.getEducation);

router.get("/skill/:resumeId", resumeControllers.getSkills);

router.get("/summary/:resumeId", resumeControllers.getSummary);

router.get("/:resumeId", resumeControllers.getResume);

router.post("/",
            [
                check('userId').not().isEmpty()
            ]
            ,resumeControllers.createResume);

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

router.post("/project/:resumeId",
            [
                check('name').not().isEmpty(),
                check('description').not().isEmpty(),
                check('link').not().isEmpty()
            ]
            , resumeControllers.addProject);

router.post("/education/:resumeId",
            [
                check('institute').not().isEmpty(),
                check('city').not().isEmpty(),
                check('state').not().isEmpty(),
                check('degree').not().isEmpty(),
                check('graduationDate').not().isEmpty()
            ]
            , resumeControllers.addEducation);

router.post("/skill/:resumeId",
            [
                check('skills').not().isEmpty(),
            ]
            , resumeControllers.addSkill);

router.post("/summary/:resumeId",
            [
                check('summary').not().isEmpty(),
            ]
            , resumeControllers.addSummary);

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

router.patch("/updateProject/:projectId",
            [
                check('name').not().isEmpty(),
                check('description').not().isEmpty(),
                check('link').not().isEmpty()
            ]
            , resumeControllers.updateProject);

router.patch("/updateEducation/:educationId",
            [
                check('institute').not().isEmpty(),
                check('city').not().isEmpty(),
                check('state').not().isEmpty(),
                check('degree').not().isEmpty(),
                check('graduationDate').not().isEmpty()
            ]
            , resumeControllers.updateEducation);

router.patch("/updateSkill/:resumeId",
            [
                check('skills').not().isEmpty(),
            ]
            , resumeControllers.updateSkills);

router.patch("/updateSummary/:resumeId",
            [
                check('summary').not().isEmpty(),
            ]
            , resumeControllers.updateSummary);

router.delete("/experience/:experienceId", resumeControllers.deleteExperience);

router.delete("/project/:projectId", resumeControllers.deleteProject);

router.delete("/education/:educationId", resumeControllers.deleteEducation);

router.delete("/skill/:resumeId/:skillId", resumeControllers.deleteSkill);

module.exports = router;