var scroobleBag = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ".split("");
var tileNumber = 8;
var combinationArray = [];
var dictSet;
var answer = ['1123123123123123123123'];
var alreadyAnswered = false;
var score = 0;
var letterString = "";
var answerCombos = [];
var answerSet;
var amountOfWords;
var validWordList = [];
var validWordSet;

var scoreBoxR = 0;
var scoreBoxG = 0;
var scoreBoxB = 0;

var highScoreR = 0;
var highScoreG = 0;
var highScoreB = 0;
var highScore;

var globalWordCount;

//let socket = io.connect(/*'http://www.scrooble.net/' ||* 'https://www.scrooble.net/' ||/* 'localhost:3333' *///);
let socket = io.connect('https://scrooble.herokuapp.com/');
//let socket = io.connect('localhost:3333');
//let socket = io.connect('http://www.scrooble.net/');
socket.on('highscore', function(coolerScore) {
    highScore = coolerScore;
    document.getElementById("highScoreBoard").innerHTML = "Highscore: " + highScore;
    if(highScore == null){
      document.getElementById("highScoreBoard").innerHTML = "Highscore: 0";
    }
});
socket.on('wordCount', function(countOfWords) {
    globalWordCount = countOfWords;
    document.getElementById("wordCountGlobal").innerHTML = "A total of " + globalWordCount + " words have been played!";
});
/*
socket.on('dictionary', function(dict) {
  dictSet = dict;
  console.log(dictSet);
}); */
document.getElementById("scoreBoard").innerHTML = "Score: 0";
getDictionary('dictionary.txt');
pickLetters();

//main function that does the stuff
function pickLetters() {
    let letters = [];
    for (let i = 0; i < tileNumber; i++) {
        var pickedLetter = scroobleBag[Math.floor(Math.random() * 97)];
        letters.push(pickedLetter);
        letterString = letterString + pickedLetter;
    }
    if (checkWords(letterString)) {
        for (let i = 0; i < tileNumber; i++) {
            document.getElementById("letterDisplay" + i).innerHTML = letters[i];
            setTileScore(letters[i], i);
            getLetterCombos(letterString);
        }
    } else {
        resetGame();
        console.log('repicked Letters');
    }
}


function setTileScore(letter, i) {
    switch (letter) {
        case "A":
            document.getElementById("tileScore" + i).innerHTML = 1;
            break;
        case "B":
            document.getElementById("tileScore" + i).innerHTML = 3;
            break;
        case "C":
            document.getElementById("tileScore" + i).innerHTML = 3;
            break;
        case "D":
            document.getElementById("tileScore" + i).innerHTML = 2;
            break;
        case "E":
            document.getElementById("tileScore" + i).innerHTML = 1;
            break;
        case "F":
            document.getElementById("tileScore" + i).innerHTML = 4;
            break;
        case "G":
            document.getElementById("tileScore" + i).innerHTML = 2;
            break;
        case "H":
            document.getElementById("tileScore" + i).innerHTML = 4;
            break;
        case "I":
            document.getElementById("tileScore" + i).innerHTML = 1;
            break;
        case "J":
            document.getElementById("tileScore" + i).innerHTML = 8;
            break;
        case "K":
            document.getElementById("tileScore" + i).innerHTML = 5;
            break;
        case "L":
            document.getElementById("tileScore" + i).innerHTML = 1;
            break;
        case "M":
            document.getElementById("tileScore" + i).innerHTML = 3;
            break;
        case "N":
            document.getElementById("tileScore" + i).innerHTML = 1;
            break;
        case "O":
            document.getElementById("tileScore" + i).innerHTML = 1;
            break;
        case "P":
            document.getElementById("tileScore" + i).innerHTML = 3;
            break;
        case "Q":
            document.getElementById("tileScore" + i).innerHTML = 10;
            break;
        case "R":
            document.getElementById("tileScore" + i).innerHTML = 1;
            break;
        case "S":
            document.getElementById("tileScore" + i).innerHTML = 1;
            break;
        case "T":
            document.getElementById("tileScore" + i).innerHTML = 1;
            break;
        case "U":
            document.getElementById("tileScore" + i).innerHTML = 1;
            break;
        case "V":
            document.getElementById("tileScore" + i).innerHTML = 4;
            break;
        case "W":
            document.getElementById("tileScore" + i).innerHTML = 4;
            break;
        case "X":
            document.getElementById("tileScore" + i).innerHTML = 8;
            break;
        case "Y":
            document.getElementById("tileScore" + i).innerHTML = 4;
            break;
        case "Z":
            document.getElementById("tileScore" + i).innerHTML = 10;
    }
}



function submitAnswer() {
    alreadyAnswered = false;
    var answeredString = (document.getElementById("answer").value).toUpperCase();
    //  location.replace("http://localhost:3333/dictionary")
    if (answerSet.has(answeredString)) {
        for (let i = 0; i < answer.length; i++) {
            if (answeredString == answer[i]) {
                document.getElementById('answer').value = "";
                //This turns the scoreBox grey
                boxColor(168, 168, 168);
                return;
            }
        }
    }
    //Correct Answer
    if (validWordSet.has(answeredString)) {
        answer.push(answeredString);
        for (let j = 0; j < answeredString.length; j++) {
            //Calculates score
            switch (answeredString.charAt(j).toUpperCase()) {
                case "A":
                    score += 1;
                    break;
                case "B":
                    score += 3;
                    break;
                case "C":
                    score += 3;
                    break;
                case "D":
                    score += 2;
                    break;
                case "E":
                    score += 1;
                    break;
                case "F":
                    score += 4;
                    break;
                case "G":
                    score += 2;
                    break;
                case "H":
                    score += 4;
                    break;
                case "I":
                    score += 1;
                    break;
                case "J":
                    score += 8;
                    break;
                case "K":
                    score += 5;
                    break;
                case "L":
                    score += 1;
                    break;
                case "M":
                    score += 3;
                    break;
                case "N":
                    score += 1;
                    break;
                case "O":
                    score += 1;
                    break;
                case "P":
                    score += 3;
                    break;
                case "Q":
                    score += 10;
                    break;
                case "R":
                    score += 1;
                    break;
                case "S":
                    score += 1;
                    break;
                case "T":
                    score += 1;
                    break;
                case "U":
                    score += 1;
                    break;
                case "V":
                    score += 4;
                    break;
                case "W":
                    score += 4;
                    break;
                case "X":
                    score += 8;
                    break;
                case "Y":
                    score += 4;
                    break;
                case "Z":
                    score += 10;
            }
        }
        //Finds if long word for extra points
        if (answeredString.length == 7) {
            score += 50;
        }
        if(answeredString.length == 150){
            score += 150;   
        }
        amountOfWords--;
        document.getElementById("remainingWords").innerHTML = "Remaining Words: " + amountOfWords;
        //This turns the scoreBox green
        boxColor(36, 255, 94);
        checkHighScore();
        globalWordCount++;
        console.log('hi');
        socket.emit('updateWordCount', globalWordCount);

    } else {
        //Wrong Answer
        document.getElementById('answer').value = "";
        //This turns the scoreBox red
        boxColor(255, 41, 41);
    }

    document.getElementById("scoreBoard").innerHTML = "Score: " + score;
    document.getElementById('answer').value = "";
}



function resetGame() {
    score = 0;
    document.getElementById("scoreBoard").innerHTML = "Score: " + score;
    combinationArray = [];
    answer = ['1123123123123123123123'];
    validWordList = [];
    alreadyAnswered = false;
    letterString = "";
    answerCombos = [];
    //answerSet.clear();
    pickLetters();
}

function checkWords(words) {
    getCombinations(words); // create array of letter combinations
    amountOfWords = 0;
    for (let i = 0; i < combinationArray.length; i++) {
        if (dictSet.has(combinationArray[i].toUpperCase())) {
            validWordList.push(combinationArray[i]);
        }
    }
    validWordSet = new Set(validWordList);
    amountOfWords = validWordSet.size;
    document.getElementById("remainingWords").innerHTML = "Remaining Words: " + amountOfWords;
    if (amountOfWords >= tileNumber * 12)
        return true;
    else
        return false;
}


//this puts all the words in the dictionary into an array named list

function getDictionary(filePath) {
    var result = [];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText.split("\r\n");
        if (result.length != 276644)
            result = xmlhttp.responseText.split("\n");
    }
    dictSet = new Set(result);
}

//this puts every combination of characters into an array

function getCombinations(str) {
    var tree = function(leafs) {
        var branches = [];
        if (leafs.length == 1) return leafs;
        for (var k in leafs) {
            var leaf = leafs[k];
            tree(leafs.join('').replace(leaf, '').split('')).concat("").map(function(subtree) {
                branches.push([leaf].concat(subtree));
            });
        }
        return branches;
    };
    combinationArray = (tree(str.split('')).map(function(str) {
        return str.join('')
    }))
}

function getLetterCombos(str) {
    var tree = function(leafs) {
        var branches = [];
        if (leafs.length == 1) return leafs;
        for (var k in leafs) {
            var leaf = leafs[k];
            tree(leafs.join('').replace(leaf, '').split('')).concat("").map(function(subtree) {
                branches.push([leaf].concat(subtree));
            });
        }
        return branches;
    };
    answerCombos = (tree(str.split('')).map(function(str) {
        return str.join('')
    }))
    answerSet = new Set(answerCombos);
}


function boxColor(r, g, b) {
    var scoreBoard = document.getElementById('scoreBoard');
    scoreBoxR = r;
    scoreBoxG = g;
    scoreBoxB = b;
    //Have to concatinate bc can't have var names as part of string
    scoreBoard.style.borderColor = 'rgb(' + scoreBoxR + ', ' + scoreBoxG + ', ' + scoreBoxB + ')';
    //This runs the setTimeout 256 times (enough for all values of r g or b to become 0)
    for (let i = 0; i < 256; i++) {
        setTimeout(function() {
            checkReachColor(scoreBoxR, scoreBoxG, scoreBoxB, 0, 0, 0)
        }, 3 * (i + 1));
    }
}



function checkReachColor(r, g, b, ir, ig, ib) {
    if (r > ir && r >= 0)
        scoreBoxR = r - 1;
    else if (r < ir && r <= 255)
        scoreBoxR = r + 1;

    if (g > ig && g >= 0)
        scoreBoxG = g - 1;
    else if (g < ig && g <= 255)
        scoreBoxG = g + 1;

    if (b > ib && b >= 0)
        scoreBoxB = b - 1;
    else if (b < ib && b <= 255)
        scoreBoxB = b + 1;
    //changes the color to whatever scoreBoxVariable is
    scoreBoard.style.borderColor = 'rgb(' + scoreBoxR + ', ' + scoreBoxG + ', ' + scoreBoxB + ')';
}

function highScoreColor(r, g, b) {
    var highScoreBoard = document.getElementById('highScoreBoard');
    highScoreR = r;
    highScoreG = g;
    highScoreB = b;
    //Have to concatinate bc can't have var names as part of string
    highScoreBoard.style.color = 'rgb(' + highScoreR + ', ' + highScoreG + ', ' + highScoreB + ')';
    //This runs the setTimeout 256 times (enough for all values of r g or b to become 0)
    for (let i = 0; i < 256; i++) {
        setTimeout(function() {
            checkReachColorHS(highScoreR, highScoreG, highScoreB, 0, 0, 0)
        }, 3 * (i + 1));
    }
}

function checkReachColorHS(r, g, b, ir, ig, ib) {
    if (r > ir && r >= 0)
        highScoreR = r - 1;
    else if (r < ir && r <= 255)
        highScoreR = r + 1;

    if (g > ig && g >= 0)
        highScoreG = g - 1;
    else if (g < ig && g <= 255)
        highScoreG = g + 1;

    if (b > ib && b >= 0)
        highScoreB = b - 1;
    else if (b < ib && b <= 255)
        highScoreB = b + 1;
    //changes the color to whatever scoreBoxVariable is
    highScoreBoard.style.color = 'rgb(' + highScoreR + ', ' + highScoreG + ', ' + highScoreB + ')';
}

function checkHighScore(){
  if(score > highScore){
    highScore = score;
    document.getElementById("highScoreBoard").innerHTML = "highScore: " + highScore;
    highScoreColor(36, 255, 94);
    socket.emit('updateHighScore', highScore);
  }
}
