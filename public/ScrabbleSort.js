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
  for(let i = 0; i < 8; i++){
    document.getElementById("letterDisplay" + i).innerHTML = letters[i];
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
