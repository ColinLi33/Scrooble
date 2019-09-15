const express = require('express');
var fs = require('fs');
var readLine = require('readline');
const http = require('http');

const app = express();

app.use(express.static('public'))

let server = app.listen(process.env.PORT || 3333, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.get('/', function (req, res) {
  res.render(__dirname + './public/index.html');
  res.render(__dirname + './public/ScrabbleSort.js');
  res.render(__dirname + './public/dictionary.txt');
})
//dictionary map stuff
/*
var dictSet = new Set();
const readInterface = readLine.createInterface({
  input: fs.createReadStream('dictionary.txt'),
//  output: process.stdout,
  console: false
});
readInterface.on('line', function(line){
  dictSet.add(line)
})

/*
var router = express.Router();
router.get('/dictionary', function(req, res){
  var responseObject = { map: dictMap}
  res.send(responseObject);
})

module.exports = dictMap;
*/
