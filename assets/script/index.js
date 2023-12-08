'use strict';

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

const startBtn = document.querySelector('.start');
const reStartBtn = document.querySelector('.restart');

startBtn.addEventListener('click', switchStart);
reStartBtn.addEventListener('click', switchReStart);

function switchStart() {
    const startButton = document.querySelector('.start');
    const restartButton = document.querySelector('.restart');

    startButton.style.display = 'none';
    restartButton.style.display = 'inline';
}

function switchReStart() {
    const startButton = document.querySelector('.start');
    const restartButton = document.querySelector('.restart');

    startButton.style.display = 'inline';
    restartButton.style.display = 'none';
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
        // add 1 to the score
        const scoreElement = document.querySelector('.score');
        const currentScore = parseInt(scoreElement.textContent.split('/')[0]);
        const updatedScore = currentScore + 1;
        scoreElement.textContent = `${updatedScore}/120`;

        // Splice the first word in the array
        randomizedWords.splice(0, 1);

        // Clear input field
        typingArea.value = '';

        //next word
        if (randomizedWords.length > 0) {
            displayFirstWord();
        } else {
            wordDisplay.textContent = 'No more words';
        }
    } else {
        // Change the style for 1sec
        const wordDisplay = document.querySelector('.gameBoard');
        const wordDisplay2 = document.querySelector('.typingArea');
        wordDisplay.style.border = '2px solid red';
        wordDisplay.style.boxShadow = '1px 1px 20px 1px red';
        wordDisplay2.style.border = '1px solid red';
        wordDisplay2.style.boxShadow = '1px 1px 20px 1px red';

        // Reset the styles after 1sec
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
};


document.addEventListener("DOMContentLoaded", function() {
    let timerInterval;
    let timerValue = 15; // time ---------------------------------------
    let isTimerRunning = false;

    const timerDisplay = document.querySelector('.timer');
    const startBtn = document.querySelector('.start');
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
                if (timerValue <= 0) {
                    clearInterval(timerInterval);
                    const typingArea = document.querySelector('.typingArea');
                    typingArea.disabled = true; 
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
        timerValue = 15; //time2 -------------------------------------- 
        timerDisplay.textContent = timerValue;
        isTimerRunning = false;
        startBtn.disabled = false;
        
        // Clear input box
        const typingArea = document.querySelector('.typingArea');
        typingArea.value = '';
        typingArea.disabled = false;
    
        // Reset displayed word
        const wordDisplay = document.querySelector('.theWord');
        wordDisplay.textContent = 'Ready?';

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

    const typingArea = document.querySelector('.typingArea');
    typingArea.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkInput();
        }
    });

    startBtn.disabled = true;
    startBtn.addEventListener('click', startTimer); 
    restartBtn.addEventListener('click', resetTimer);

    // Enable Start button when timer reaches timerValue 
    setInterval(() => {
        if (timerValue === timerValue) {
            startBtn.disabled = false;
        } else {
            startBtn.disabled = true;
        }
    }, 1000);
});