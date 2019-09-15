const express = require('express');
var fs = require('fs');
var readLine = require('readline');
const http = require('http');

const app = express();
const port = process.env.port || 3333;

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index.html');
  res.render('scrabbleSort.js');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//Dictionary map stuff
var dictMap = new Map();

const readInterface = readLine.createInterface({
  input: fs.createReadStream('dictionary.txt'),
//  output: process.stdout,
  console: false
  export { dictMap };
});
var key = 1;
readInterface.on('line', function(line){
  dictMap.set(key, line)
})

var router = express.Router();
router.get('/dictionary', function(req, res){
  var responseObject = { map: dictMap}
  res.send(responseObject);
})

module.exports = router;
