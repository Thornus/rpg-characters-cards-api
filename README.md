# RPG Characters Cards API
This is a Node.js and MongoDB powered API that implements CRUD functionalities to manage information about characters of RPG game and stories, or just characters invented on the moment!

# Documentation
- [Authentication](#authentication)
  - [OAuth2](#oauth2)
- [Users](#users)
  - [Adding users](#adding-users)
  - [Getting users](#getting-users)
- [Characters](#characters)
  - [Adding characters](#adding-characters)
  - [Getting characters](#getting-characters)
  - [Updating characters](#updating-characters)
  - [Deleting characters](#deleting-characters)
- [Client applications](#client-applications)
  - [Adding client applications](#adding-client-applications)
  - [Getting client applications](#getting-client-applications)

<a name="authentication"></a>
## Authentication
To make some requests, you will need to be authenticated.

To be authenticated, create a user for yourself and use basic auth in your requests.
<a name="oauth2"></a>
### OAuth2
OAuth2 has been implemented for demonstrational purposes.

<a name="users"></a>
## Users
<a name="adding-users"></a>
### Adding users
To add a user, make a POST request to ```/api/users```

On the live version, make a POST request to ```https://rpg-characters-cards-api.herokuapp.com/api/users/```

You are required to insert the following data in the body of the request:

- ```username``` - String
- ```password``` - String

Example of successful response:
```
{
    "message": "New user added!"
}
```
<a name="getting-users"></a>
### Getting users
To get users' data, make a GET request to ```/api/users```

On the live version, make a GET request to ```https://rpg-characters-cards-api.herokuapp.com/api/users```

Example of successful response:
```
{
    "_id": "59c2a3cb1d5c000012d7a5a6",
    "username": "thornus",
    "password": "$2a$05$9nPyefy0qVU.GZjBNUavfeF7RIMC1X/gfn9wXNWTb/R9nU90BKGzW",
    "__v": 0
}
```

<a name="characters"></a>
## Characters
<a name="adding-characters"></a>
### Adding characters
To add a character, make a POST request to ```/api/characters```

On the live version, make a POST request to ```https://rpg-characters-cards-api.herokuapp.com/api/characters```

You are required to be **authenticated** and insert the following data in the body of the request:
- ```name``` - String
- ```description``` - String
- ```type``` - String (might be Hero, Enemy, Monster...)

Example of successful response:
```
{
    "message": "Character added to the database!",
    "data": {
        "__v": 0,
        "userId": "59c2a3cb1d5c000012d7a5a6",
        "description": "The famous hero of \"The Legend of Zelda\" series.",
        "type": "Hero",
        "name": "Link",
        "_id": "59c4477fee01e800123c5cf5"
    }
}
```
<a name="getting-characters"></a>
### Getting characters
To get all the characters, make a GET request to ```/api/characters```

On the live version, make a GET request to ```https://rpg-characters-cards-api.herokuapp.com/api/characters```
#### Getting a specific character
To get a specific character, make a GET request to ```/api/characters/:character_id```

On the live version, make a GET request to ```https://rpg-characters-cards-api.herokuapp.com/api/characters/:character_id```

An example of request would be ```https://rpg-characters-cards-api.herokuapp.com/api/characters/59c2c1dd751db00012655e60``` which would get you the following response:
```
{
    "_id": "59c2c1dd751db00012655e60",
    "userId": "59c2a3cb1d5c000012d7a5a6",
    "description": "The famous hero of \"The Legend of Zelda\" series.",
    "type": "Hero",
    "name": "Link",
    "__v": 0
}
```
<a name="updating-characters"></a>
### Updating characters
To update a character, make a PUT request to ```/api/characters/:character_id```

On the live version, make a PUT request to ```https://rpg-characters-cards-api.herokuapp.com/api/characters/:character_id```

You must be **authenticated** and can modify only the characters you created. All the following parameters must be in the body of the request:
- ```name``` - String
- ```description``` - String
- ```type``` - String (might be Hero, Enemy, Monster...)

If we want to modify the ```type``` of a character from "Hero" to "Legendary Hero", we make a PUT request to ```https://rpg-characters-cards-api.herokuapp.com/api/characters/59c2c1dd751db00012655e60``` with ```type``` set to "Legendary Hero" and ```name``` and ```description``` unchanged.

The successful response would be:
```
{
    "message": "The character has been modified!",
    "data": {
        "_id": "59c4f107780f6200120202dd",
        "userId": "59c2a3cb1d5c000012d7a5a6",
        "description": "The famous hero of \"The Legend of Zelda\" series.",
        "type": "Legendary Hero",
        "name": "Link",
        "__v": 0
    }
}
```
<a name="deleting-characters"></a>
### Deleting characters
To delete a character, make a DELETE request to ```/api/characters/:character_id```

On the live version, make a DELETE request to ```https://rpg-characters-cards-api.herokuapp.com/api/characters/:character_id```

You must be **authenticated** and can only delete the characters you created.

Example of successful response:
```
{
    "message": "Character deleted!"
}
```
<a name="client-applications"></a>
## Client applications
<a name="adding-client-applications"></a>
### Adding client applications
To add a client application, make a POST request to ```/api/clients```

On the live version, make a POST request to ```https://rpg-characters-cards-api.herokuapp.com/api/clients```

You are required to be **authenticated** and insert the following data in the body of the request:
- ```name``` - String

Example of successful response:
```
{
    "message": "Client added! Store your clear secret somewhere safe. We won't be able to recover it!",
    "data": {
        "__v": 0,
        "secret": "$2a$05$Lgjt2y50dGzp1LD1a.LxC.2Rcdw2CSECeBe/Ynege60/OI0pPFuJm",
        "id": "dd97cbf89a86ffbda4689c18aaf745902d31030abaad2acdda3458c379cd706b",
        "userId": "59c2a3cb1d5c000012d7a5a6",
        "name": "Test client application",
        "_id": "59c53a02ce408d0012fe6bd5"
    },
    "clear_secret": "f7e6fca9bd1f99c138f874493621f03327184cb112d9de2b84dc4c720e63530d4d3932427df4b82879aa55139f9c383f"
}
```
<a name="getting-client-applications"></a>
### Getting client applications
To get a client application, make a GET request to ```/api/clients```

On the live version, make a GET request to ```https://rpg-characters-cards-api.herokuapp.com/api/clients```

You must be **authenticated** and can only retrieve the client applications you created.

Example of successful response:
```
    {
        "_id": "59c53a02ce408d0012fe6bd5",
        "secret": "$2a$05$Lgjt2y50dGzp1LD1a.LxC.2Rcdw2CSECeBe/Ynege60/OI0pPFuJm",
        "id": "dd97cbf89a86ffbda4689c18aaf745902d31030abaad2acdda3458c379cd706b",
        "userId": "59c2a3cb1d5c000012d7a5a6",
        "name": "Test client application",
        "__v": 0
    }
```
