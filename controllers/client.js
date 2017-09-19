import Client from '../models/client';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';

// Create endpoint /api/client for POST
exports.postClients = function(req, res) {
  // Create a new instance of the Client model
  var client = new Client();

  // Set the client properties that came from the POST data
  client.name = req.body.name;
  client.userId = req.user._id;

  // Randomly generate client id and secret
  client.id = crypto.randomBytes(32).toString('hex');
  client.secret = crypto.randomBytes(48).toString('hex');
  var clearSecret = client.secret;

  // Hash secret
  var err = bcrypt.genSalt(5, function(err, salt) {
    if (err) return err;

    bcrypt.hash(client.secret, salt, null, function(err, hash) {
      if (err) return err;
      client.secret = hash;
    });
  });

  // Save the client and check for errors
  client.save(function(err, data) {
    if (err)
      res.send(err);

    res.json({ message: 'Client added! Store your clear secret somewhere safe. We won\'t be able to recover it!', data: client, clear_secret: clearSecret});
  });
};

// Create endpoint /api/clients for GET
exports.getClients = function(req, res) {
  // Use the Client model to find all clients
  Client.find({ userId: req.user._id }, function(err, clients) {
    if (err)
      res.send(err);

    res.json(clients);
  });
};