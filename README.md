# Scrooble
![](https://img.shields.io/github/stars/ColinLi33/Scrooble) ![](https://img.shields.io/github/forks/ColinLi33/Scrooble) ![](https://img.shields.io/github/tag/ColinLi33/Scrooble) ![](https://img.shields.io/github/release/ColinLi33/Scrooble) ![](https://img.shields.io/github/issues/ColinLi33/Scrooble)

A game of anagrams with the rules of Scrabble.

Play Scrooble Now!: [[scrooble.net]](http://scrooble.net "scrooble.net") [[scrooble.herokuapp.com]](http://scrooble.herokuapp.com "[scrooble.herokuapp.com]")

### Current Features
- Simplistic UI
- Random Letter Generation
- Tile Point Value Identification
- Reload Letter Feature
- Automatic Dictionary Integration
- Automatic Valid Word Identification
- Score Box
- Amount of Remaining Words
- Color Alerts (Correct Word, Invalid Word, Word Used Already)

### To-Do List
- Better Backend Structure
- Better GUI in general (CSS IS HARD)
- Custom Tile Amount (Based on user input)
- Timer/Stopwatch
- Different Modes (Time Attack, Find All Words, etc.)
- Leaderboard 

### Out of Reach Goals
- Multiplayer (How are we going to do that lol)


<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Lobby</title>
    <script src="/socket.io/socket.io.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="lobby.css">
    
</head>
<body>
    <h1>Game Lobby</h1>
    <div>
        <div class="player" id="player0">Finding Player...</div>
        <div class="player" id="player1">Finding Player...</div>
        <div class = "player" id="player2">Finding Player...</div>
        <div class = "player" id = "player3">Finding Player...</div>
    </div>
    <div>
        <img src="https://res.cloudinary.com/teepublic/image/private/s--UPdxKveU--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1495828700/production/designs/1627194_1.jpg" alt="Ghost">
        <img src="https://res.cloudinary.com/teepublic/image/private/s--UPdxKveU--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1495828700/production/designs/1627194_1.jpg" alt="Ghost">
        <img src="https://res.cloudinary.com/teepublic/image/private/s--UPdxKveU--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1495828700/production/designs/1627194_1.jpg" alt="Ghost">
        <img src="https://vignette.wikia.nocookie.net/uncyclopedia/images/1/18/Pacman.png/revision/latest?cb=20100427203035" alt="Pacman" id = "pacman">
    </div>
    <script src="lobby.js"></script>


    
</body>
</html>
