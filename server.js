var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var PLAYERS_COLLECTION = "players";
var GAMES_COLLECTION = "games";

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }
  
  /*  "/api/players"
   *    GET: finds all players
   *    POST: creates a new player
   */
  
  app.get("/api/players", function(req, res) {
    db.collection(PLAYERS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get players.");
        } else {
          res.status(200).json(docs);
        }
      });
  });
  
app.get("/api/games", function(req, res){
  db.collection(GAMES_COLLECTION).find({}).toArray(function(err, docs){
    if(err){
      handleError(res, err.message, "Failed to get games.");
    } else{
      res.status(200).json(docs);
    }
  })
})

  app.post("/api/players", function(req, res) {
    var newPlayer = req.body;
    newPlayer.createDate = new Date();
  
    if (!req.body.name) {
      handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
      db.collection(PLAYERS_COLLECTION).insertOne(newPlayer, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create new player.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
  });
  
  app.post("/api/games", function(req, res) {
    var newGame = req.body;
    newGame.createDate = new Date();
    if (!req.body.title) {
      handleError(res, "Invalid user input", "Must provide a title.", 400);
    } else {
      db.collection(GAMES_COLLECTION).insertOne(newGame, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create new game.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
  });

  /*  "/api/players/:id"
   *    GET: find player by id
   *    PUT: update player by id
   *    DELETE: deletes player by id
   */
  
  app.get("/api/players/:id", function(req, res) {
    db.collection(PLAYERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to get player.");
        } else {
          res.status(200).json(doc);
        }
      });
  });

  app.get("/api/games/:id", function(req, res) {
    db.collection(GAMES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to get game.");
        } else {
          res.status(200).json(doc);
        }
      });
  });
  
  app.put("/api/players/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;
    db.collection(PLAYERS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, {$set: updateDoc}, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update player.");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
  });

  app.put("/api/games/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;
    db.collection(GAMES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, {$set: updateDoc}, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update game.");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
  });
  
  app.delete("/api/players/:id", function(req, res) {
    db.collection(PLAYERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete player.");
        } else {
            res.status(200).json(req.params.id);
        }
        });
  });