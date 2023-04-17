const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { error } = require('console');


const getData=require('./controller/scrape').getData;
const app = express();
dotenv.config();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


// async function scrapeData() 
// {
//     const countries=['eng','esp','ita','ger','fra'];
//     // your scraping logic here
//     for (let i = 0; i < countries.length; i++) 
//     {
//         await getData(countries[i]);
//     }
//     console.log("Data scraped!");
// }

// setInterval(scrapeData, 10 * 60 * 1000); 



mongoose.connect(process.env.DB_URI).then(()=>
{
    console.log('Mongoose connected');
    app.listen(3000);
}).catch(error=>console.log(error))
