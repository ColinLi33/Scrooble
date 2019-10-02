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
var dbo;

app.use(express.static('public'));

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("Database opened!");
    dbo = db.db("scroobleDB");
  //get the highscore and word count from database
  dbo.collection("scrooble").find({}).toArray(function(err, result) {
      if (err) throw err;
      highScore = result[0].highScore;
      globalWordCount = result[1].globalWordCount;
      db.close();
    });
  });

//update highscore in database
function updateHighScore(score) {
	MongoClient.connect(url, {
		useNewUrlParser: true
	}, function(err, db) {
		if (err) throw err;
		dbo = db.db("scroobleDB");
		var myquery = {
			name: 'scroobleHS'
		};
		var newvalues = {
			$set: {
				highScore: score
			}
		};
		console.log(myquery);
		dbo.collection("scrooble").updateOne(myquery, newvalues, function(err, res) {
			if (err) throw err;
			console.log("Highscore Updated");
			db.close();
		});
	});
}
//update wordcount in database
function updateWordCount(wordCount) {
	MongoClient.connect(url, {
		useNewUrlParser: true
	}, function(err, db) {
		if (err) throw err;
		dbo = db.db("scroobleDB");
		var myquery = {
			name: 'scroobleWC'
		};
		var newvalues = {
			$set: {
				globalWordCount: wordCount
			}
		};
		dbo.collection("scrooble").updateOne(myquery, newvalues, function(err, res) {
			if (err) throw err;
			console.log("Global Word Count Updated");
			db.close();
		});
	});
}

app.get('/', function(req, res) {
	res.render(__dirname + './public/scrooble/index.html');
  res.render(__dirname + './public/multiplayerScrooble/lobby.html');
	res.render(__dirname + './public/scrooble/dictionary.txt');
});

var playerCount = 0;
var players = [];
//socket stuff
io.on('connection', function(socket) {
  console.log(`A user connected;`);
  if(players.length < 2){
    players.push(socket.id);
    io.sockets.emit('player', {playerIndex: players.length-1});
  }
  socket.on('ready', function(){
       if(playerCount == 1){
           socket.emit("userType", {'type': "player2"});
           io.sockets.emit('startGame');
           console.log('starting game');
       }else{
           playerCount++;
           socket.emit('userType', {'type': 'player1'})
       }
   });

  socket.on('disconnect', function(){
    console.log('A user disconnected');
  });

	io.sockets.emit('highscore', highScore); //send highscore from database to scrooble.js
	io.sockets.emit('wordCount', globalWordCount); //send global word count from database to scrooble.js

  //receive new highscore from scrooble.js
  socket.on('updateHighScore', function(score) {
		highScore = score;
		updateHighScore(score);
		io.sockets.emit('highscore', highScore);
	});

  //receive new word count from scrooble.js
	socket.on('updateWordCount', function(wordCount) {
		globalWordCount = wordCount;
		updateWordCount(wordCount);
		io.sockets.emit('wordCount', globalWordCount);
	});

  //multiplayer stuff


});

http.listen(process.env.PORT || 3333, function() {
	console.log('listening on ' + process.env.PORT || '3333');
});
