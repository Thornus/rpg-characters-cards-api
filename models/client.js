import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// Define our client schema
var ClientSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  id: { type: String },
  secret: { type: String },
  userId: { type: String, required: true }
});

ClientSchema.methods.verifySecret = function(secret, cb) {
  bcrypt.compare(secret, this.secret, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Export the Mongoose model
module.exports = mongoose.model('Client', ClientSchema);