pickLetters();
function pickLetters(){
  let letters = [];
  for(let i = 0; i < 8; i++){
    letters.push(String.fromCharCode((Math.floor(Math.random() * (26 - 1)) + 1) + 65));
  }
  checkWords();
/*  if(checkWords()){
    for(let i = 0; i < 8; i++){
      document.getElementById("letterDisplay" + i).innerHTML = letters[i];
    }
  }*/

}
  function submitAnswer(){
    let answer = document.getElementById("answer").value;
  }
  function resetGame(){
    pickLetters();
  }
  function checkWords(){
	   var mydata = JSON.parse(dictionary);
	    alert(mydata[0].a);

  }
