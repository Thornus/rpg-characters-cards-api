import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import characterController from './controllers/character';
import userController from './controllers/user';
import passport from 'passport';
import authController from './controllers/auth';
import clientController from './controllers/client';
import oauth2Controller from './controllers/oauth2';

// Connect to MongoDB
mongoose.connect('mongodb://heroku_vbq3bzsp:vtbipd0q7e9ds2n7safe5dq1ai@ds141524.mlab.com:41524/heroku_vbq3bzsp');

// Create our Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /characters
router.route('/characters')
  .post(authController.isAuthenticated, characterController.postCharacters)
  .get(characterController.getCharacters);

// Create endpoint handlers for /characters/me
router.route('/characters/me')
  .get(authController.isAuthenticated, characterController.getUserCharacters);

// Create endpoint handlers for /characters/:character_id
router.route('/characters/:character_id')
  .get(characterController.getCharacter)
  .put(authController.isAuthenticated, characterController.putCharacter)
  .delete(authController.isAuthenticated, characterController.deleteCharacter);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for /clients
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log("Listening on localhost:"+port);