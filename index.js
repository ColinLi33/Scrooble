const express = require('express');
var fs = require('fs');
var readLine = require('readline');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var highScore;
var globalWordCount;

app.use(express.static('public'));


app.get('/', function (req, res) {
  res.render(__dirname + './public/index.html');
  res.render(__dirname + './public/scrooble.js');
  res.render(__dirname + './public/dictionary.txt');
  res.render(__dirname + './public/highScore.txt');
  res.render(__dirname + './public/wordCount.txt');
})
/*
function updateHighScore(score){
  fs.writeFile("./public/highScore.txt", score, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written HighScore to File.");
  });
}

function updateWordCount(wordCount){
  fs.writeFile("./public/wordCount.txt", wordCount, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written WordCount to File.");
  });
}

fs.readFile('./public/highscore.txt', "utf-8", function(err, score){
  if(err) { console.log(err) }
  highScore = score;
  console.log(highScore);
});

fs.readFile('./public/wordCount.txt', "utf-8", function(err, wordCount){
  if(err) { console.log(err) }
  globalWordCount = wordCount;
});





io.on('connection', function(socket){
  console.log(`Connected to ${socket.id}`);
  io.sockets.emit('highscore', highScore);
  io.sockets.emit('wordCount', globalWordCount);
  socket.on('updateHighScore', function(score){
    updateHighScore(score);
    highScore = score;
    io.sockets.emit('highscore', highScore);
  });
  socket.on('updateWordCount', function(wordCount){
    updateWordCount(wordCount);
    globalWordCount = wordCount;
    io.sockets.emit('wordCount', globalWordCount);
  });
}); */

http.listen(process.env.PORT, function(){
  console.log('listening on 3333');
});
