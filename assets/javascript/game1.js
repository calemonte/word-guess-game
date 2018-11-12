// Array of valid keys the user can press.
var validLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Array of 5 soccer player's stored as objects.
var playerList = [
    { 
        firstName: "Mohamed",
        lastName: "Salah",
        lastNameChars: ["s", "a", "l", "a", "h"]
    },
    {
        firstName: "Pierre-Emerick",
        lastName: "Aubameyang",
        lastNameChars: ["a", "u", "b", "a", "m", "e", "y", "a", "n", "g"]
    },
    {
        firstName: "Eden",
        lastName: "Hazard",
        lastNameChars: ["h", "a", "z", "a", "r", "d"]
    },
    {
        firstName: "Raheem",
        lastName: "Sterling",
        lastNameChars: ["s", "t", "e", "r", "l", "i", "n", "g"]
    },
    {
        firstName: "Romelu",
        lastName: "Lukaku",
        lastNameChars: ["l", "u", "k", "a", "k", "u"]
    },
];

// Create variables that hold references to the places in the HTML where game events are displayed.
var playerCharText = document.getElementById("soccer-player-char");
var lettersGuessedText = document.getElementById("letters-guessed-text");
var guessesRemainingText = document.getElementById("guesses-remaining-text");
var winsText = document.getElementById("wins-text");

// Arrays of values that will be incremented or added to.
var playersPicked = 0;
var score = 0;
var guessesRemaining = 12;
var lettersGuessed = [];

// Function that picks the next soccer player from the array of objects and sets the board with . 
function setBoard() {
    // Only draw underlines if there are still players to be picked. 
    if (playersPicked <= (playerList.length - 1)) {

        // Clear the board to get started.
        playerCharText.innerHTML = '';
        // Create local variable to keep tabs on which player is selected (DELETE LATER ONCE COMPLETE).
        var currentPlayer = playerList[playersPicked];
        // Loop over characters in array of characters and display # of underlines corresponding to number of characters in player's last name.        
        for (var i = 0; i < playerList[playersPicked].lastNameChars.length; i++) {
            playerCharText.innerHTML += " " + "_";
        }
        // Reset guesses remaining counter 
        guessesRemaining = 12;
        guessesRemainingText.innerHTML = guessesRemaining;

        // Reset letters guessed array
        lettersGuessed = [];
        lettersGuessedText.innerHTML = lettersGuessed;

    // If there are no more players left to guess, display message ending the game.
    } else {
        playerCharText.innerHTML = "That's full-time! No more players left!";
    }
    // Show me the current player selected (DELETE LATER ONCE COMPLETE).
    console.log(currentPlayer);
};

// Function that displays the letters already guessed.
function updateLettersGuessed() {
    lettersGuessedText.innerHTML = lettersGuessed;
};

// Function that decrements guesses remaining and displays the number.
function updateGuessesRemaining() {
    guessesRemaining--;
    guessesRemainingText.innerHTML = guessesRemaining;
}

// Start the game
setBoard();

// Accept user guess and compare to 
document.onkeyup = function(event) {

    // Stop if all of the players have been picked.
    if (playersPicked >= playerList.length) {
        return;
    }

    // Determines which key was pressed and sets to lowercase.
    var userGuess = event.key.toLowerCase();

    // Only run if valid letter is pressed
    if (validLetters.includes(userGuess)) {

        // If letter guessed is in the player's last name, determine index of letter in player's name, and display that letter in it's proper place.
        if (playerList[playersPicked].lastNameChars.includes(userGuess)) {

            playerCharText.innerHTML += playerList[playersPicked].lastNameChars.indexOf(userGuess);

        // If not in the player's last name and the letter hasn't already been guessed, push into array containing guesses and decrement guesses remaining.
        } else if (!playerList[playersPicked].lastNameChars.includes(userGuess) && !lettersGuessed.includes(userGuess)) {
            lettersGuessed.push(userGuess);
            updateLettersGuessed();
            updateGuessesRemaining();
        // Alert user if they already guessed an incorrect letter. Do not dock them a guess.
        } else {
            alert("You already guessed " + userGuess + "!");
        }
    }

    // Reset the board if guesses reach 0.
    if (guessesRemaining <= 0) {
        playersPicked++;
        setBoard();
    }

};