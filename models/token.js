import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';

// Define our token schema
var TokenSchema   = new mongoose.Schema({
  value: { type: String, required: true },
  userId: { type: String, required: true },
  clientId: { type: String, required: true }
});

// Execute before each token.save() call
TokenSchema.pre('save', function(callback) {
  var token = this;

  // Randomly generate value
  //token.value = crypto.randomBytes(32).toString('hex');

  // Hash value
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(token.value, salt, null, function(err, hash) {
      if (err) return callback(err);
      token.value = hash;
      callback();
    });
  });
});

// Export the Mongoose model
module.exports = mongoose.model('Token', TokenSchema);