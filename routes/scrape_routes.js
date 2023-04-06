const express = require('express');

const router = express.Router();

const laligaController=require('../controller/laliga');

// GET SCRAPE LALIGA REQUESTS
// THIS BLOCK CONTAINS DIFFERENT ROUTES WHICH WILL ENVOKE
// DIFFERENT FUNCTIONS TO SCRAPE THE DATA
router.get('/laliga',laligaController.getlaliga);

module.exports=router;