const express = require('express');
var fs = require('fs');
var readLine = require('readline');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var highScore;

app.use(express.static('public'));


app.get('/', function (req, res) {
  res.render(__dirname + './public/index.html');
  res.render(__dirname + './public/scrooble.js');
  res.render(__dirname + './public/dictionary.txt');
})

function updateHighScore(score){
  fs.writeFile("highScore.txt", score, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
}

fs.readFile('highscore.txt', "utf-8", function(err, score){
  if(err) { console.log(err) }
  highScore = score;
  console.log(highScore);
});

//let io = socket('localhost:3333');
io.on('connection', function(socket){
  console.log(`Connected to ${socket.id}`);
  io.sockets.emit('highscore', highScore);
  socket.on('updateHighScore', function(score){
    updateHighScore(score);
    highScore = score;
    io.sockets.emit('highscore', highScore);
  });
});

http.listen(process.env.PORT || 3333, function(){
  console.log('listening on 3333');
});
