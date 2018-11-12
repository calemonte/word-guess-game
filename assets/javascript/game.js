// Array of valid keys the user can press
var validLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Contain an array of 10 soccer player's last names in lowercase.
var players = ["messi", "cuadrado", "ozil", "morata", "hazard", "marcelo", "aubameyang", "mbappe", "pulisic", "firmino", "ronaldo", "welbeck"];

// Set number of guesses to 10. Set number of wins to 0. Set number of losses to 0. Display these values on the page.
var wins = 0;
var losses = 0;
var guesses = 12;

// Create variables that hold references to the places in the HTML where we want to display things.
var playerCharText = document.getElementById("soccer-player-char");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var wordsGuessedText = document.getElementById("words-guessed-text");
var guessesLeft = document.getElementById("guesses-left-text");
var playerPhoto = document.getElementById("player-photo");

// Randomly pick a name from the array of soccer player names and then split those names into a new array comprised of individual characters.
var currentPlayer = players[Math.floor(Math.random() * players.length)];
var currentPlayerChars = currentPlayer.split('');
console.log(currentPlayerChars);

// Create function that sets the board by looping over array of characters and drawing correct number of underscores corresponding to number of characters in array.
var setBoard = function (currentPlayerChars) {
    for (var i = 0; i < currentPlayerChars.length; i++) {
        playerCharText.textContent += " " + "_";
    };
    guesses = 12;
    guessesLeft.textContent = guesses;
};

// Set board for the first time.
setBoard(currentPlayerChars);

// User can input any alphabetical key to see if the character is part of the unknown player's last name. The user input is stored in a variable.
document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userGuess = event.key;
    var lettersGuessed = [];

    if (validLetters.indexOf(userGuess) !== -1) {
        
        // If user guesses a character that is in the soccer playrer's last name.
        if (currentPlayerChars.includes(userGuess)) {
                playerCharText.textContent += " " + userGuess;
        }
        
        // If entered letter has not been guessed yet and it isn't in player's name, push to array containing guessed letters and decrement guesses by 1.  
        if (!currentPlayerChars.includes(userGuess)) {    // If not in array, add letter to array of already guessed letters and decrement guesses by 1.
            lettersGuessed.push(userGuess);
            wordsGuessedText.textContent += " " + lettersGuessed + " ";
            guesses--;
            guessesLeft.textContent = guesses;
            console.log(lettersGuessed);
        }

        if (guesses === 0) {
            alert("You lost!");
            losses++;
            lossesText.textContent = losses;
            playerCharText = " ";
            setBoard(currentPlayerChars);
        }
    }
}


// If user input doesn't equal a character in the player's last name, decrement chances by 1. Display character guessed in the "Letters Already Guessed" box.  
// If user guesses a character that was already chosen, alert the user and say character already selected. Number of guesses remains the same.
// If all letters correctly guessed && guesses > 0, alert user that they've won by displaying a picture of the soccer player. Increment wins by 1. Display new set of hidden chars.
// If guesses === 0 and all chars haven't been guessed, alert user that they've lost, increment losses by 1, and display new set of hidden chars.