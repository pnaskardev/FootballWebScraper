const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamPosition: {
    type: String,
    required: true,
    trim: true
  },
  teamLogo: {
    type: String,
    required: true,
    trim: true
  },
  teamName: {
    type: String,
    required: true,
    trim: true
  },
  gp: {
    type: String,
    required: true,
    trim: true
  },
  w: {
    type: String,
    required: true,
    trim: true
  },
  d: {
    type: String,
    required: true,
    trim: true
  },
  l: {
    type: String,
    required: true,
    trim: true
  },
  f: {
    type: String,
    required: true,
    trim: true
  },
  a: {
    type: String,
    required: true,
    trim: true
  },
  gd: {
    type: String,
    required: true,
    trim: true
  },
  p: {
    type: String,
    required: true,
    trim: true
  }
});
const Team = mongoose.model('Team', teamSchema);
module.exports={Team,teamSchema};