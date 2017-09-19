import mongoose from 'mongoose';

// Define our beer schema
var CharacterSchema   = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('Character', CharacterSchema);