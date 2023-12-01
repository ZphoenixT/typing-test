'use strict';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let randomizedWords = generateNewArray();
let updatedScore = 0;

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
        const wordDisplay = document.querySelector('.gameBoard');
        const wordDisplay2 = document.querySelector('.typingArea');
        wordDisplay.style.border = '2px solid red';
        wordDisplay.style.boxShadow = '1px 1px 20px 1px red';
        wordDisplay2.style.border = '1px solid red';
        wordDisplay2.style.boxShadow = '1px 1px 20px 1px red';

        // Reset the styles after 1 second
        setTimeout(() => {
            wordDisplay.style.border = '2px solid #edeaea50';
            wordDisplay.style.boxShadow = '1px 1px 20px 1px #edeaea40';
            wordDisplay2.style.border = '1px solid #edeaea50';
            wordDisplay2.style.boxShadow = '1px 1px 20px 1px #edeaea40';
        }, 1000);
    }

    if (updatedScore === 120) {
        const finalScoreDisplay = document.querySelector('.final-score');
        finalScoreDisplay.textContent = updatedScore;
        const endGameModal = document.querySelector('.end-game-modal');
        endGameModal.style.display = 'block';
    }

    checkEndGame();
};

function checkEndGame() {
    const timerDisplay = document.querySelector('.timer');
    const timerValue = parseInt(timerDisplay.textContent);

    if (timerValue === 0) {
        const endGameModal = document.querySelector('.end-game-modal');
        endGameModal.style.display = 'block';
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
    const helpBtn = document.querySelector('.help');
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.close');


    helpBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function startTimer() {
        if (!isTimerRunning) {
            displayFirstWord();
            timerInterval = setInterval(() => {
                timerValue--;
                timerDisplay.textContent = timerValue;
                checkEndGame();
                if (timerValue <= 0) {
                    clearInterval(timerInterval);
                    // You can add any actions after the countdown reaches 0 here
                }
            }, 1000);
            isTimerRunning = true;
            const typingArea = document.querySelector('.typingArea');
            typingArea.focus();
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
        
        // Clear input box
        const typingArea = document.querySelector('.typingArea');
        typingArea.value = '';
    
        // Reset displayed word
        const wordDisplay = document.querySelector('.theWord');
        wordDisplay.textContent = 'Word Appears Here';

        // Reset score
        const scoreElement = document.querySelector('.score');
        scoreElement.textContent = '0/120';

        // Generate new array
        randomizedWords = generateNewArray();
        
        // Modal for end of game
        if (timerValue === 0 || updatedScore === 120) {
            const endGameModal = document.querySelector('.end-game-modal');
            endGameModal.style.display = 'block';
        }
    }

    function closeEndGameModal() {
        const endGameModal = document.querySelector('.end-game-modal');
        endGameModal.style.display = 'none';
    }

    const closeEndGameBtn = document.querySelector('.end-game-modal .close');
    closeEndGameBtn.addEventListener('click', closeEndGameModal);

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