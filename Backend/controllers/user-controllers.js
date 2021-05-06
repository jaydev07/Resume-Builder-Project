const User = require("../models/user-model");
const HttpError = require("../util/http-error");
const { validationResult } = require("express-validator");

const signup = async (req,res,next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }
    
    const {name,email,password} = req.body;
    
    let userExists;
    try{
        userExists = await User.findOne({email:email});
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(userExists){
        return next(new HttpError('User already exists.Please Login',500));
    }

    const newUser = new User({
        name,
        email,
        password,
        latestSection:null,
        resumeId:null
    });

    try{
        await newUser.save();
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    res.json({user:newUser.toObject({getters:true})});
}

const login = async (req,res,next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError('Invalid input.Please Check!',422));
    }
    
    const {email,password} = req.body;

    let userFound;
    try{
        userFound = await User.findOne({email:email});
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong!',500));
    }

    if(!userFound){
        return next(new HttpError('User not found.Please Signup',500));
    }else if(password !== userFound.password){
        return next(new HttpError('Worng Password',500));
    }

    res.json({user:userFound.toObject({getters:true})});
}

exports.signup = signup;
exports.login = login;