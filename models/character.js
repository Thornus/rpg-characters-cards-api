import mongoose from 'mongoose';

<<<<<<< HEAD
// Define character schema
var CharacterSchema = new mongoose.Schema({
=======
var CharacterSchema   = new mongoose.Schema({
>>>>>>> c10a968ef3eac6de91813a31acd8b5b378b26a87
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true }
});

// Export the Mongoose model
module.exports = mongoose.model('Character', CharacterSchema);
