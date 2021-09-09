 //Fetch DOM Elements
 const word = document.getElementById('word');
 const IncorrectLetters = document.getElementById('incorrect-letters');
 const PopupContainer = document.getElementById('popup-container');
 const GameOverMsg = document.getElementById('final-message');
 const NotificationContainer = document.getElementById('notification-container');
 const playAgainBtn = document.getElementById('play-btn');

//Fetch DOM Element for Hangman Body parts
const FigurePart = document.querySelectorAll('.figure-part');

// Array of all words that will be displayed for the game
 const words = ["scientist","song","built","word","spell","value","support","heavy","men","dead","bad","here","street","dream","eventually","original","broad","floating","daily","tool","swimming","mostly","escape","fourth","within","government","somewhere","means","fight","section","longer","clear","creature","situation","who","were","turn","table","sure","sugar","sister","wool"];
 
 // Select a word at random from words array
 let SelectedWord = words[Math.floor(Math.random() * words.length)];

// Tracking arrays for correct and incorrect guesses
const correctLettersArray = [];
const incorrectLettersArray = [];

// function to display a word to guess on the screen with the condition that the word contains all the letter that are present on correctLetterArray
function renderWord(){

    word.innerHTML = `
        
    ${SelectedWord.split('').map( letter => `
   
     <span class = "letter">${correctLettersArray.includes (letter) ? letter : ''} </span>`).join('')}
    `;

     // Replace new line character and form inner word
     const innerWord = word.innerText.replace(/\n/g, '');

     // Compare inner word to selected word, if it's the same then game over and user won
     if(innerWord === SelectedWord) {
        GameOverMsg.innerText = 'Congratulations! You won! 🎉'
         PopupContainer.style.display = 'flex';
     }
 
};

function updateIncorrectLetters(){

}

// Function to show the notification
function showNotification() {
    // Add class show to the notification container
    NotificationContainer.classList.add('show');
    // After 2 seconds, hide the notification
    setTimeout(() => {
        NotificationContainer.classList.remove('show');
    }, 2000);
}

// Function to update incorrect letters
function updateIncorrectLetters() {
    // Display the incorrect letters
    IncorrectLetters.innerHTML = `
        ${incorrectLettersArray.length > 0 ? '<p>Incorrect letters</p>' : ''}
        ${incorrectLettersArray.map(letter => `<span>${letter}</span>`)}
    `;

    // Display the hangman part
    FigurePart.forEach((part, index) => {
        // How many incorrect letters has the user guessed
        const errors = incorrectLettersArray.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if user lost
    if(incorrectLettersArray.length === FigurePart.length) {
        GameOverMsg.innerText = 'You Lost! 😔';
        PopupContainer.style.display = 'flex';
    }
}

// Event Handlers
// 1. Listen for keyboard key press
window.addEventListener('keydown', e => {
    // Check if key pressed is a letter a = 65 and z = 90
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        // Check if letter is in the selected word
        if (SelectedWord.includes(letter)) {
            // Check if letter is already in correctLettersArray
            if (!correctLettersArray.includes(letter)) {
                // Add letter into the correctLettersArray
                correctLettersArray.push(letter);
                // Run the renderWord function again to display new letter
                renderWord();
            } else {
                showNotification();
            }
        } else {
            // Check if letter is already in incorrectLettersArray
            if(!incorrectLettersArray.includes(letter)) {
                // Add letter into the incorrectLettersArray
                incorrectLettersArray.push(letter);
                // Update the incorrect letters UI
                updateIncorrectLetters();
            } else {
                showNotification();
            }
        }
    }
});

// 2. Listen for click on play again button
playAgainBtn.addEventListener('click', () => {
    // Empty correctLettersArray & incorrectLettersArray
    correctLettersArray.splice(0);
    incorrectLettersArray.splice(0);
    // Select a new random word
    SelectedWord = words[Math.floor(Math.random() * words.length)];
    // Clear incorrect letters display
    updateIncorrectLetters();
    // Hide the popup
    PopupContainer.style.display = 'none';
    // refresh displayed word
    renderWord();
})
renderWord();