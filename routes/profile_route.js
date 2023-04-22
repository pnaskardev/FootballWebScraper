// IMPORTS FROM PACKAGES
const express=require('express');

// IMPORTS FROM FILES
const profileController=require('../controller/profile_controller');

// INIT
const profileRouter=express.Router();

// MIDDLEWARES

// ADD OR PATCH CONTROLLERS 
profileRouter.patch("/edit-selectedLeagues",profileController.patchSelectedLeagues);



module.exports=profileRouter;