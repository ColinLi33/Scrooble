const express = require('express');
var fs = require('fs');
var readLine = require('readline');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mysql = require('mysql');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://scrooble:8sowmvsU@scroobledb-06tsw.mongodb.net/test?retryWrites=true&w=majority';
var highScore;
var globalWordCount;

app.use(express.static('public'));

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("Database opened!");
    var dbo = db.db("scroobleDB");
  //get the highscore and word count from database
  dbo.collection("scrooble").find({}).toArray(function(err, result) {
      if (err) throw err;
      highScore = result[0].highScore;
      globalWordCount = result[1].globalWordCount;
      db.close();
    });
  });



/*
  const collection = client.db("scroobleDB").collection("scrooble");
  // perform actions on the collection object
  var myobj = [
    { name: 'scroobleHS', highScore: '0'},
    { name: 'scroobleWC', globalWordCount: '0'},
  ];
  dbo.collection("scrooble").insertMany(myobj, function(err, res) {
  if (err) throw err;
  console.log("Number of documents inserted: " + res.insertedCount);
  db.close();
  });
  dbo.collection("scrooble").find({}).toArray(function(err, result) {
    if (err) throw err;
    highScore = result[0].highScore;
    globalWordCount = result[1].globalWordCount;
    db.close();
  });*/

//connect to database
/*
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("scroobleDB");
  var myobj = [
  { name: 'scroobleHS', highScore: '0'},
  { name: 'scroobleWC', globalWordCount: '0'},
];
dbo.collection("scrooble").insertMany(myobj, function(err, res) {
  if (err) throw err;
  console.log("Number of documents inserted: " + res.insertedCount);
  db.close();
});
//get the highscore and word count from database
dbo.collection("scrooble").find({}).toArray(function(err, result) {
    if (err) throw err;
    highScore = result[0].highScore;
    globalWordCount = result[1].globalWordCount;
    db.close();
  });
}); */
//update highscore in database
function updateHighScore(score){
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("scroobleDB");
    var myquery = { name: 'scroobleHS' };
    var newvalues = { $set: {highScore: score} };
    console.log(myquery);
    dbo.collection("scrooble").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("Highscore Updated");
      db.close();
    });
  });
}
//update wordcount in database
function updateWordCount(wordCount){
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("scroobleDB");
    var myquery = { name: 'scroobleWC' };
    var newvalues = { $set: {globalWordCount: wordCount} };
    dbo.collection("scrooble").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("Global Word Count Updated");
      db.close();
    });
  });
}

app.get('/', function (req, res) {
  res.render(__dirname + './public/index.html');
  res.render(__dirname + './public/scrooble.js');
  res.render(__dirname + './public/dictionary.txt');
});

//socket stuff to send to scrooble.js
io.on('connection', function(socket){
  console.log(`Connected to ${socket.id}`);
  io.sockets.emit('highscore', highScore);
  io.sockets.emit('wordCount', globalWordCount);
  socket.on('updateHighScore', function(score){
    highScore = score;
    updateHighScore(score);
    io.sockets.emit('highscore', highScore);
  });
  socket.on('updateWordCount', function(wordCount){
    globalWordCount = wordCount;
    updateWordCount(wordCount);
    io.sockets.emit('wordCount', globalWordCount);
  });
});

http.listen(process.env.PORT || 3333, function(){
  console.log('listening on 3333');
});
