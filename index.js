const express = require('express')
var requirejs = require("requirejs");

const app = express()
const port = 3333

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index.html');
  res.render('scrabblesort.js');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const fs = require('fs')

function submitAnswer(){
  console.log('hi');
  let answer = document.getElementById("answer").value;
  fs.readFile('dictionary.txt', 'utf-8', (err, data) => {
      if (err) throw err;
      console.log(data);
  })
}
