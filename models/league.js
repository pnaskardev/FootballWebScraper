const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema
({
  name: { type: String, required: true },
  code: { type: String, required: true }
});

const league = mongoose.model('League', leagueSchema);
module.exports={league,leagueSchema};