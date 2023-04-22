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
const profileRouter = require('./routes/profile_route');
const leagueToCountryMap=require('./utils/utils').leagueToCountryMap;
const standings=require('./models/standings');


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
app.use('/profile', profileRouter);
app.get('/standings',async (req, res, next) => 
{
    try 
    {
        const recievedLeague=await req.query.league;
        const leagueName=leagueToCountryMap.get(recievedLeague);
        const league=await standings.findOne({leagueName});
        if(!league)
        {
            res.status(404).json({message:"No league found"});
        }
        const teams=league.teams;
        if(!teams)
        {
            res.status(404).json({message:"teams not found"});
        }
        res.status(201).json(teams);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

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
