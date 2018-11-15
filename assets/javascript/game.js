// Array of valid keys the user can press.
var validLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Array of 5 soccer player's stored as objects.
var players = [
    { 
        firstName: "Mohamed",
        lastName: "Salah",
        team: "Liverpool F.C.",
        image: "assets/images/salah.jpg",
        imageAltText: "Mohamed Salah sticking his tongue out after celebrating a goal for Liverpool F.C.",
        lastChars: ["s", "a", "l", "a", "h"],
        lastUlines: []
    },
    {
        firstName: "Pierre-Emerick",
        lastName: "Aubameyang",
        team: "Arsenal F.C.",
        image: "assets/images/aubameyang.jpg",
        imageAltText: "Pierre-Emerick Aubameyang celebrates scoring a goal for Arsenal F.C.",
        lastChars: ["a", "u", "b", "a", "m", "e", "y", "a", "n", "g"],
        lastUlines: []
    },
    {
        firstName: "Eden",
        lastName: "Hazard",
        team: "Chelsea F.C.",
        image: "assets/images/hazard.jpg",
        imageAltText: "Eden Hazard dribbles a soccer ball for Chelsea F.C.",
        lastChars: ["h", "a", "z", "a", "r", "d"],
        lastUlines: []
    },
    {
        firstName: "Raheem",
        lastName: "Sterling",
        team: "Manchester City F.C.",
        image: "assets/images/sterling.jpg",
        imageAltText: "Raheem Sterling dribbles a soccer ball for Manchester City F.C.",
        lastChars: ["s", "t", "e", "r", "l", "i", "n", "g"],
        lastUlines: []
    },
    {
        firstName: "Romelu",
        lastName: "Lukaku",
        team: "Manchester United F.C.",
        image: "assets/images/lukaku.jpeg",
        imageAltText: "Romelu Lukaku walks on a soccer pitch in a Manchester United F.C. kit.",
        lastChars: ["l", "u", "k", "a", "k", "u"],
        lastUlines: []
    }
];

// Create variables that hold references to the places in the HTML where game events are displayed.
var playerCharText = document.getElementById("soccer-player-char");
var lettersGuessedText = document.getElementById("letters-guessed-text");
var guessesRemainingText = document.getElementById("guesses-remaining-text");
var winsText = document.getElementById("wins-text");
var firstNameText = document.getElementById("first-name-text");
var LastNameText = document.getElementById("last-name-text");
var teamNameText = document.getElementById("team-name-text");

// Arrays of values that will be incremented or added to.
var playersPicked = 0;
var wins = 0;
var guessesRemaining = 8;

// Function that picks the next soccer player from the array of objects and sets the board with underlines. 
function setBoard() {
    // Only draw underlines if there are still players to be picked. 
    if (playersPicked <= (players.length - 1)) {

        // Clear the board to get started.
        playerCharText.innerHTML = '';
        
        // Loop over characters array and display # of underlines corresponding to player's last name.        
        for (var i = 0; i < players[playersPicked].lastChars.length; i++) {
            // For next player, push number of underlines into any empty array. 
            players[playersPicked].lastUlines.push("_");
            // Display those underlines (I used join to get rid of the commas).
            playerCharText.innerHTML = players[playersPicked].lastUlines.join(" ");
        }
        // Reset guesses remaining counter.
        guessesRemaining = 8;
        guessesRemainingText.innerHTML = guessesRemaining;

        // Reset letters guessed array.
        lettersGuessed = [];
        lettersGuessedText.innerHTML = lettersGuessed;

    // If there are no more players left to guess, display message ending the game.
    } else {
        playerCharText.innerHTML = "That's full-time! No more players left!";
    }
};

// Function that displays the letters already guessed.
function updateLettersGuessed() {
    lettersGuessedText.innerHTML = lettersGuessed.join(" ").toUpperCase();
};

// Function that decrements guesses remaining and displays the value.
function updateGuessesRemaining() {
    guessesRemaining--;
    guessesRemainingText.innerHTML = guessesRemaining;
}

// Function that increments wins and displays the value.
function updateWins() {
    wins++;
    winsText.innerHTML = wins;
}

// Function that displays a player's first and last name, image, and team name.
function displayPlayer() {
    firstNameText.innerHTML = players[playersPicked].firstName;
    LastNameText.innerHTML = players[playersPicked].lastName;
    teamNameText.innerHTML = players[playersPicked].team;
    document.getElementById("player-photo").src = players[playersPicked].image;
    document.getElementById("player-photo").alt = players[playersPicked].imageAltText;
}

// Function that compares user guess against last name array and then replaces underline with correct letter at index location(s).
function compareGuess(arr1, arr2, userGuess) {
    for (var i = 0; i < arr1.length; i++) {
        if (userGuess === arr1[i]) {
            arr2[i] = arr1[i];
        } 
    }
    playerCharText.innerHTML = arr2.join(" ");
};

// Function that checks to see if two arrays are equal.
function equalArray(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
};

// Start the game
setBoard();

// Execute all of these conditions if key is pressed.
document.onkeyup = function(event) {

    // Stop if all of the players have been picked.
    if (playersPicked >= players.length) {
        return;
    }

    // Determines which key was pressed and sets to lowercase.
    var userGuess = event.key.toLowerCase();

    // Only run if valid letter is pressed.
    if (validLetters.includes(userGuess)) {
        // If letter guessed is in the player's last name, run the compareGuess function to display correct letters.
        if (players[playersPicked].lastChars.includes(userGuess)) {
            compareGuess(players[playersPicked].lastChars, players[playersPicked].lastUlines, userGuess);
        // If not in the player's last name and the letter hasn't already been guessed, push into array containing guesses and decrement guessesRemaining.
        } else if (!players[playersPicked].lastChars.includes(userGuess) && !lettersGuessed.includes(userGuess)) {
            lettersGuessed.push(userGuess);
            updateLettersGuessed();
            updateGuessesRemaining();
        // Alert user if they already guessed an incorrect letter. Do not dock them a guess.
        } else {
            alert("You already guessed " + userGuess + "!");
        }
    }

    // If player guesses name correctly, display the player's photograph and details, increment words and playersPicked counter, and reset the board.
    if (equalArray(players[playersPicked].lastChars, players[playersPicked].lastUlines)) {
        updateWins();
        displayPlayer();
        playersPicked++;
        setBoard();
    }
    // Reset the board if guesses reach 0.
    if (guessesRemaining <= 0) {
        playersPicked++;
        setBoard();
    }
};