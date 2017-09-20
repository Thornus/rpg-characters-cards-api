import mongoose from 'mongoose';

var CharacterSchema   = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true }
});

// Export the Mongoose model
module.exports = mongoose.model('Character', CharacterSchema);
