const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

const userControllers = require("../controllers/user-controllers");

router.post("/signup",
    [
        check('name').not().isEmpty(),
        check('email').isEmail(),
        check('password').isLength({min:5})
    ], userControllers.signup);

router.post("/login",
    [
        check('email').isEmail(),
        check('password').isLength({min:5})
    ], userControllers.login);

module.exports = router;