// Contain an array of 10 soccer player's last names in lowercase.
var players = ["messi", "cuadrado", "ozil", "morata", "hazard", "marcelo", "aubameyang", "mbappe", "pulisic", "firmino", "ronaldo", "welbeck"];

// Set number of guesses to 10. Set number of wins to 0. Set number of losses to 0. Display these values on the page.
var wins = 0;
var losses = 0;
var guesses = 10;

// Create variables that hold references to the places in the HTML where we want to display things.
var playerCharText = document.getElementById("soccer-player-char");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var wordsGuessedText = document.getElementById("words-guessed-text");
var playerPhoto = document.getElementById("player-photo");

// Create function that randomly picks a name from the array of soccer player names.
var pickRandomPlayer = function(arr) {
	var randomPlayer = arr[Math.floor(Math.random() * arr.length)];
	return randomPlayer;
};

// Set current player to result of pickRandomPlayer function.
var currentPlayer =  pickRandomPlayer(players); 

// Split player's name into an array of individual characters
var currentPlayerChars = currentPlayer.split('');
console.log(currentPlayerChars);

// Loop over array of characters and draw correct number of underscores corresponding to correct number of characters in array.
for (var i = 0; i < currentPlayerChars.length; i++) {
    playerCharText.innerHTML += " " + "_";
};

// // Function that compares user's guess to the array element to see if there is a match.
// var compareChars = function(userGuess) {
//     if (currentPlayerChars.findIndex(userGuess)) {
//         alert("You have a match");
//         return compareChars = currentPlayerChars[i];
//     } else {
//         alert("You don't have a match");
//     }
// };

// IDEA: Actually display the letters above the but hide them. A correct guess changes makes it visible?

// User can input any alphabetical key to see if the character is part of the unknown player's last name. The user input is stored in a variable.
document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userGuess = event.key;
};

// If user guesses a character that is in the soccer player's last name, have the letter appear in the correct location in the list of underscores. Reduce number of guesses by 1. Display character guessed in the "Letters Already Guessed" box. 
// If user input doesn't equal a character in the player's last name, decrement chances by 1. Display character guessed in the "Letters Already Guessed" box.  
// If user guesses a character that was already chosen, alert the user and say character already selected. Number of guesses remains the same.
// If all letters correctly guessed && guesses > 0, alert user that they've won by displaying a picture of the soccer player. Increment wins by 1. Display new set of hidden chars.
// If guesses === 0 and all chars haven't been guessed, alert user that they've lost, increment losses by 1, and display new set of hidden chars.