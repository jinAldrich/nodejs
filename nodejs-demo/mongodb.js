var MongoClient = require('mongodb').MongoClient;

// var url = 'mongodb://23.105.199.23:27017/user';

// var mongoose = require('mongoose');
// mongoose.connect(url);

var assert = require('assert');

// Connection URL
var url = 'mongodb://23.105.199.23:27017/user';
// var url = 'mongodb://localhost:27017/user';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    console.log(err);
    if (err) throw err;
    console.log("Connected successfully to server");

    db.close();
});