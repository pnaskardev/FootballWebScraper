// IMPORTS FROM PACKAGES
const express=require('express');

// IMPORTS FROM FILES
const User = require('../models/user');
const authController=require('../controller/auth_controller');

// INIT
const authRouter=express.Router();

// MIDDLEWARES
authRouter.post("/tokenIsValid",authController.tokenIsValid);

// GET-USER-DATA
authRouter.get('/getUserData',authController.getUserData,async(req,res)=>
{
    const user=await User.findById(req.user);
    res.json({...user._doc,token:req.token})
});
// SIGN-UP
authRouter.post("/signup",authController.postSignupUser);

// SIGN-IN
authRouter.post("/signin",authController.postSignInUser);

module.exports=authRouter;