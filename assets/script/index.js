'use strict';

// const words = [
//     'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
//     'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
//     'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
//     'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
//     'philosophy', 'database', 'periodic', 'capitalism', 'abominable',
//     'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
//     'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'promise',
//     'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
//     'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
//     'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess',
//     'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library',
//     'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy',
//     'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous',
//     'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
//     'keyboard', 'window', 'beans', 'truck', 'sheep', 'band', 'level', 'hope',
//     'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'mask',
//     'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
//     'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort', 'escape'
//    ];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let randomizedWords = generateNewArray();

function generateNewArray() {
    const words = [
        'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
    'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
    'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
    'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
    'philosophy', 'database', 'periodic', 'capitalism', 'abominable',
    'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
    'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'promise',
    'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
    'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
    'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess',
    'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library',
    'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy',
    'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous',
    'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window', 'beans', 'truck', 'sheep', 'band', 'level', 'hope',
    'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'mask',
    'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
    'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort', 'escape'
    ];

    return shuffleArray([...words]); // Create a copy of the original array and shuffle it
}

function displayFirstWord() {
    const firstWord = randomizedWords[0];
    const wordDisplay = document.querySelector('.theWord');
    wordDisplay.textContent = firstWord;
}

function checkInput() {
    const typingArea = document.querySelector('.typingArea');
    const userTypedWord = typingArea.value.trim().toLowerCase();
    const wordDisplay = document.querySelector('.theWord');
    const displayedWord = wordDisplay.textContent.toLowerCase();

    if (userTypedWord === displayedWord) {
        // Add 1 to the score (assuming the score is displayed in the element with class 'score')
        const scoreElement = document.querySelector('.score');
        const currentScore = parseInt(scoreElement.textContent.split('/')[0]);
        const updatedScore = currentScore + 1;
        scoreElement.textContent = `${updatedScore}/120`;

        // Splice the first word in the array
        randomizedWords.splice(0, 1);

        // Clear the input field
        typingArea.value = '';

        // Display the next word
        if (randomizedWords.length > 0) {
            displayFirstWord();
        } else {
            wordDisplay.textContent = 'No more words';
        }
    } else {
        // Change the border color and shadow for 1 second
        const wordDisplay = document.querySelector('.theWord');
        const wordDisplay2 = document.querySelector('.typingArea');
        wordDisplay.style.border = '1px solid red';
        wordDisplay.style.boxShadow = '1px 1px 20px 1px red';
        wordDisplay2.style.border = '1px solid red';
        wordDisplay2.style.boxShadow = '1px 1px 20px 1px red';

        // Reset the styles after 1 second
        setTimeout(() => {
            wordDisplay.style.border = '1px solid #edeaea50';
            wordDisplay.style.boxShadow = '1px 1px 20px 1px #edeaea40';
            wordDisplay2.style.border = '1px solid #edeaea50';
            wordDisplay2.style.boxShadow = '1px 1px 20px 1px #edeaea40';
        }, 1000);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    let timerInterval;
    let timerValue = 100; // Initial timer value in seconds
    let isTimerRunning = false;

    const timerDisplay = document.querySelector('.timer');
    const startBtn = document.querySelector('.start');
    const pauseBtn = document.querySelector('.pause');
    const restartBtn = document.querySelector('.restart');

    function startTimer() {
        if (!isTimerRunning) {
            displayFirstWord();
            timerInterval = setInterval(() => {
                timerValue--;
                timerDisplay.textContent = timerValue;
                if (timerValue <= 0) {
                    clearInterval(timerInterval);
                    // You can add any actions after the countdown reaches 0 here
                }
            }, 1000);
            isTimerRunning = true;
        } else {
            clearInterval(timerInterval);
            isTimerRunning = false;
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerValue = 100; // Reset timer value
        timerDisplay.textContent = timerValue;
        isTimerRunning = false;
        startBtn.disabled = false; // Enable the Start button on reset
        
        // Clear input field
        const typingArea = document.querySelector('.typingArea');
        typingArea.value = '';
    
        // Reset the displayed word
        const wordDisplay = document.querySelector('.theWord');
        wordDisplay.textContent = 'Word Appears Here';

        // Reset the score
        const scoreElement = document.querySelector('.score');
        scoreElement.textContent = '0/120';

        // Generate a new shuffled array
        randomizedWords = generateNewArray();
    }

    const typingArea = document.querySelector('.typingArea');
    typingArea.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkInput();
        }
    });

    startBtn.disabled = true; // Disable Start button initially
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', startTimer); // Pauses the timer as well
    restartBtn.addEventListener('click', resetTimer);

    // Enable Start button when timer reaches 100
    setInterval(() => {
        if (timerValue === 100) {
            startBtn.disabled = false;
        } else {
            startBtn.disabled = true;
        }
    }, 1000);
});