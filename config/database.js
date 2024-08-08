var mongoose = require("mongoose");
var dotenv = require("dotenv");

dotenv.config();

function connectDB() {
  var url = process.env.MONGODB_URI;

  if (!url) {
    console.error("MongoDB URI is not defined in environment variables");
    process.exit(1);
  }

  mongoose.connect(url).then(function() {
    console.log("Database connected: " + url);
  }).catch(function(err) {
    console.error("Connection error: " + err.message);
    process.exit(1);
  });

  var dbConnection = mongoose.connection;

  dbConnection.on("error", function(err) {
    console.error("Connection error: " + err);
  });
}

module.exports = connectDB;