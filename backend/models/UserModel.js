const mongoose = require('mongoose');

// This is the blueprint for our data
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  city: String,
  image: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Inactive'],
    default: 'Pending'
  }
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('User', UserSchema);