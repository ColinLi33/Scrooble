pickLetters();
function pickLetters(){
  var letterString = "";
  let letters = [];
  for(let i = 0; i < 8; i++){
    var pickedLetter = String.fromCharCode((Math.floor(Math.random() * (26 - 1)) + 1) + 65);
    letters.push(pickedLetter);
    letterString = letterString + pickedLetter;
  }
  //if(checkWords(letterString)){
  for(let i = 0; i < 8; i++) {
    document.getElementById("letterDisplay" + i).innerHTML = letters[i];
    switch(letters[i]) {
      case "A":
      document.getElementById("tileScore" + i).innerHTML = "1";
      break;
      case "B":
      document.getElementById("tileScore" + i).innerHTML = "3";
      break;
      case "C":
      document.getElementById("tileScore" + i).innerHTML = "3";
      break;
      case "D":
      document.getElementById("tileScore" + i).innerHTML = "2";
      break;
      case "E":
      document.getElementById("tileScore" + i).innerHTML = "1";
      break;
      case "F":
      document.getElementById("tileScore" + i).innerHTML = "4";
      break;
      case "G":
      document.getElementById("tileScore" + i).innerHTML = "2";
      break;
      case "H":
      document.getElementById("tileScore" + i).innerHTML = "4";
      break;
      case "I":
      document.getElementById("tileScore" + i).innerHTML = "1";
      break;
      case "J":
      document.getElementById("tileScore" + i).innerHTML = "8";
      break;
      case "K":
      document.getElementById("tileScore" + i).innerHTML = "5";
      break;
      case "L":
      document.getElementById("tileScore" + i).innerHTML = "1";
      break;
      case "M":
      document.getElementById("tileScore" + i).innerHTML = "3";
      break;
      case "N":
      document.getElementById("tileScore" + i).innerHTML = "1";
      break;
      case "O":
      document.getElementById("tileScore" + i).innerHTML = "1";
      break;
      case "P":
      document.getElementById("tileScore" + i).innerHTML = "3";
      break;
      case "Q":
      document.getElementById("tileScore" + i).innerHTML = "10";
      break;
      case "R":
      document.getElementById("tileScore" + i).innerHTML = "1";
      break;
      case "S":
      document.getElementById("tileScore" + i).innerHTML = "1";
      break;
      case "T":
      document.getElementById("tileScore" + i).innerHTML = "1";
      break;
      case "U":
      document.getElementById("tileScore" + i).innerHTML = "1";
      break;
      case "V":
      document.getElementById("tileScore" + i).innerHTML = "4";
      break;
      case "W":
      document.getElementById("tileScore" + i).innerHTML = "4";
      break;
      case "X":
      document.getElementById("tileScore" + i).innerHTML = "8";
      break;
      case "Y":
      document.getElementById("tileScore" + i).innerHTML = "4";
      break;
      case "Z":
      document.getElementById("tileScore" + i).innerHTML = "10";
}
  }
//  } else {
  //    pickLetters();
  //}
}

  function submitAnswer(){
    let answer = document.getElementById("answer").value;
    location.replace("http://localhost:3333/dictionary")
  }
  function resetGame(){
    pickLetters();
  }
  function checkWords(words){
    var dictionary = getDictionary('dictionary.txt'); // create array of dictionary words
    var combinations = getCombinations(words); // create array of letter combinations

    let amountOfWords = 0;
    for(let i = 0; i < combinations.length; i++){
      for(let j = 0; j < dictionary.length; j++){
        if(combinations[i] == dictionary[j])
          amountOfWords++;
      }
    }
    if(amountOfWords >= 1)
      return true;
    else
      return false;
  }
    //this puts all the words in the dictionary into an array named list
  //function getDictionary(filePath){
    /*
        var result = null;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", filePath, false);
        xmlhttp.send();
        if (xmlhttp.status==200) {
          result = xmlhttp.responseText.split("\n");
        }
        return result; */
        var httpClient = function(){
          this.get = function(url, callback){
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(){
              if(httpRequest.readyState == 4 && httpRequest.status == 200)
                callback(httpRequest.responseText);
              }
              httpRequest.open("GET", url, true);
              httpRequest.send(null);
          }
        }
        var theUrl = 'http://localhost:3333/dictionary';
        var client = new HttpClient();
          client.get(theUrl, function(response){
            var response1 = JSON.parse(response);
            alert(response1);
          })
    //}

    //this puts every combination of characters into an array
    function getCombinations(str){
      var fn = function(active, rest, a) {
        if (!active && !rest)
          return;
        if (!rest) {
          a.push(active);
        } else {
            fn(active + rest[0], rest.slice(1), a);
            fn(active, rest.slice(1), a);
          }
            return a;
          }
            return fn("", str, []);
      }
