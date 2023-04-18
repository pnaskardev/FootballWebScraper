const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const getData=require('./controller/scrape').getData;
const app = express();
dotenv.config();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


async function scrapeData() 
{
    const countries=['eng','esp','ita','ger','fra','ind'];
    // const countries=['eng'];
    // your scraping logic here
    for (let i = 0; i < countries.length; i++) 
    {
        await getData(countries[i]);
    }
    console.log("Data scraped!");
} 



mongoose.connect(process.env.DB_URI).then(()=>
{
    console.log('Mongoose connected');
    app.listen(3000);
    setInterval(scrapeData, 12 * 60 * 60 * 1000 / 2);
}).catch(error=>console.log(error))
