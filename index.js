const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


const getData=require('./controller/scrape').getData;
const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// IMPORTS FROM FILES
const authRouter = require('./routes/auth_route');


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

// MIDDLEWARES
app.use(express.json());
app.use('/auth', authRouter);

app.use('/', (req, res, next) => 
{
    console.log('Hello World');
    res.json({ message: 'OK!!' });
});



mongoose.connect(process.env.DB_URI).then(()=>
{
    console.log('Mongoose connected');
    app.listen(3000);
    setInterval(scrapeData, 12 * 60 * 60 * 1000 / 2);
}).catch(error=>console.log(error))
