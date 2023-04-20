const mongoose = require('mongoose');

const leagueSchema=require('./league').leagueSchema;
const userSchema = new mongoose.Schema
(
    {
        name: 
        {
            type: String,
            required: true,
            trim:true
        },
        email: 
        {
            type: String,
            required: true,
            unique: true,
            trim:true
        },
        password: 
        {
            type: String,
            required: true,
            trim:true
        },
        selectedLeagues: 
        { 
            type: [leagueSchema], 
            default: [] 
        }
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;