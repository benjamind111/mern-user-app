const mongoose = require('mongoose');

// This is the blueprint for our data
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  city:String
});

module.exports = mongoose.model('User', UserSchema);