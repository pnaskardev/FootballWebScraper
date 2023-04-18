const mongoose = require('mongoose');
const { Schema } = mongoose;


const teamSchema=require('./team').teamSchema;
const standingsSchema = new Schema
(
    {
        leagueName: 
        {
            type: String,
            required: true
        },
        teams: [teamSchema]
    }
);

const Standings=mongoose.model('Standings', standingsSchema);
module.exports=Standings;