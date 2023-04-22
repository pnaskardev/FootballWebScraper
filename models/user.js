const mongoose = require('mongoose');
const validator=require('../utils/validator');
const leagueSchema=require('./league').leagueSchema;
const userSchema = new mongoose.Schema
(
    {
        email: 
        {
            type: String,
            required: true,
            unique: true,
            trim:true,
            validate:
            {
                validator:function(value)
                {
                    return validator.emailRegex.test(value);
                }
            },
            message: props => `${props.value} is not a valid email address!`
        },
        password: 
        {
            type: String,
            required: true,
            trim:true
        },
        selectedLeagues: 
        { 
            type: [String], 
            default: [] 
        }
    }
);
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;