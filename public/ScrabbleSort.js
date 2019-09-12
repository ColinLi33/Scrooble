pickLetters();
function pickLetters(){
  let letters = [];
  for(let i = 0; i < 8; i++){
    let number = Math.floor(Math.random() * (26 - 1)) + 1;
    switch(number){
      case 1:
      letters.push('A');
      break;
      case 2:
      letters.push('B');
      break;
      case 3:
      letters.push('C');
      break;
      case 4:
      letters.push('D');
      break;
      case 5:
      letters.push('E');
      break;
      case 6:
      letters.push('F');
      break;
      case 7:
      letters.push('G');
      break;
      case 8:
      letters.push('H');
      break;
      case 9:
      letters.push('I');
      break;
      case 10:
      letters.push('J');
      break;
      case 11:
      letters.push('K');
      break;
      case 12:
      letters.push('L');
      break;
      case 13:
      letters.push('M');
      break;
      case 14:
      letters.push('N');
      break;
      case 15:
      letters.push('O');
      break;
      case 16:
      letters.push('P');
      break;
      case 17:
      letters.push('Q');
      break;
      case 18:
      letters.push('R');
      break;
      case 19:
      letters.push('S');
      break;
      case 20:
      letters.push('T');
      break;
      case 21:
      letters.push('U');
      break;
      case 22:
      letters.push('V');
      break;
      case 23:
      letters.push('W');
      break;
      case 24:
      letters.push('X');
      break;
      case 25:
      letters.push('Y');
      break;
      case 26:
      letters.push('Z');
      break;
    }
    document.getElementById("letterDisplay" + i).innerHTML = letters[i];
  }
  checkWords();
}
  function submitAnswer(){
    let answer = document.getElementById("answer").value;
    console.log(answer);
  }
  function resetGame(){
    pickLetters();
  }
  function checkWords(){

  }
