import Character from '../models/character';

// Create endpoint /api/characters for POSTS
exports.postCharacters = function(req, res) {
  // Create a new instance of the Character model
  var character = new Character();

  // Set the character properties that came from the POST data
  character.name = req.body.name;
  character.type = req.body.type;
  character.description = req.body.description;
  character.userId = req.user._id;

  // Save the character and check for errors
  character.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Character added to the database!', data: character });
  });
};

// Create endpoint /api/characters for GET
exports.getCharacters = function(req, res) {
  // Use the Character model to find all characters
  Character.find(function(err, characters) {
    if (err)
      res.send(err);

    res.json(characters);
  });
};

// Create endpoint /api/characters/me for GET
exports.getUserCharacters = function(req, res) {
  // Use the Character model to find characters created by the authenticated user
  Character.find({ userId: req.user._id }, function(err, characters) {
    if (err)
      res.send(err);

    res.json(characters);
  });
};

// Create endpoint /api/characters/:character_id for GET
exports.getCharacter = function(req, res) {
  // Use the Character model to find a specific character
  Character.findById(req.params.character_id, function(err, character) {
    if(err)
      res.send(err);

    if(character != null)
      res.json(character);
    else
      res.json({ message: "Character with id "+req.params.character_id+" doesn't exist." });
  });
};

// Create endpoint /api/characters/:character_id for PUT
exports.putCharacter = function(req, res) {
  // Use the Character model to find a specific character
  Character.findById({ userId: req.user._id, _id: req.params.character_id }, function(err, character) {
    if(err)
      res.send(err);

    // Update the existing character name
    character.name = req.body.name;

    // Update the existing character description
    character.description = req.body.description;

    // Update the existing character type
    character.type = req.body.type;

    // Save the character and check for errors
    character.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: "The character has been modified!", data: character});
    });
  });
};

// Create endpoint /api/characters/:character_id for DELETE
exports.deleteCharacter = function(req, res) {
  // Use the Character model to find a specific character and remove it
  Character.findByIdAndRemove({ userId: req.user._id, _id: req.params.character_id }, function(err, character) {
    if (err)
      res.send(err);

    if(character)
      res.json({ message: 'Character removed from database!' });
    else
      res.json({ message: "Character with id "+req.params.character_id+" doesn't exist." });
  });
};