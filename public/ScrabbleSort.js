pickLetters();
function pickLetters(){
  let letters = [];
  for(let i = 0; i < 8; i++){
    letters.push(String.fromCharCode((Math.floor(Math.random() * (26 - 1)) + 1) + 65));
    document.getElementById("letterDisplay" + i).innerHTML = letters[i];
  }
  checkWords();
}
  function submitAnswer(){
    let answer = document.getElementById("answer").value;
  }
  function resetGame(){
    pickLetters();
  }
  function checkWords(){

  }
