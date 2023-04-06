const express = require('express');
const app = express();

const scrapeRoute=require('./routes/scrape_routes');

app.use('/scrape',scrapeRoute);
app.use('/',(req,res,next)=>
{
    console.log("Hello world");
});

app.listen(3000);