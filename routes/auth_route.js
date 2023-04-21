// IMPORTS FROM PACKAGES
const express=require('express');

// IMPORTS FROM FILES
const authController=require('../controller/auth_controller');

// INIT
const authRouter=express.Router();

// MIDDLEWARES
authRouter.post("/tokenIsValid",authController.tokenIsValid);

// SIGN-UP
authRouter.post("/signup",authController.postSignupUser);

// SIGN-IN
authRouter.post("/signin",authController.postSignInUser);

module.exports=authRouter;