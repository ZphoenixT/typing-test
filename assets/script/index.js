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
let gameSound = document.getElementById('music');

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

function playGameSound() {
    gameSound.play();
}

function stopGameSound() {
    gameSound.pause();
    gameSound.currentTime = 0;
}

const startBtn = document.querySelector('.start');
const reStartBtn = document.querySelector('.restart');
const hideSB = document.querySelector('.scores');

startBtn.addEventListener('click', switchStart, playGameSound);
reStartBtn.addEventListener('click', switchReStart, stopGameSound);

function switchStart() {
    const startButton = document.querySelector('.start');
    const restartButton = document.querySelector('.restart');

    startButton.style.display = 'none';
    restartButton.style.display = 'inline';
    hideSB.style.opacity = '0';
}

function switchReStart() {
    const startButton = document.querySelector('.start');
    const restartButton = document.querySelector('.restart');

    startButton.style.display = 'inline';
    restartButton.style.display = 'none';
    hideSB.style.opacity = '1';
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
        updatedScore = currentScore + 1;
        scoreElement.textContent = `${updatedScore}/120`; //score-------------------
        localStorage.setItem(`score`, `${updatedScore}`);

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
            wordDisplay.style.border = '2px solid #01a6e8';
            wordDisplay.style.boxShadow = '1px 1px 20px 1px #01a6e890';
            wordDisplay2.style.border = '1px solid #01a6e8';
            wordDisplay2.style.boxShadow = '1px 1px 20px 1px #01a6e890';
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
                    hideSB.style.opacity = '1';

                    // Save the final score in localStorage
                localStorage.setItem('finalScore', updatedScore);

                // Retrieve the latest score from localStorage
                const latestScore = localStorage.getItem('finalScore');

                updateDialogScores(parseInt(latestScore));
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

function updateDialogScores(updatedScore) {
    const dialog = document.querySelector('.scores');
    const theScoreDiv = dialog.querySelector('.theScore');
    const scores = theScoreDiv.querySelectorAll('p');

    let placed = false;

    // Check if there are already 10 scores and remove the lowest score
    if (scores.length === 10) {
        const lowestScore = parseInt(scores[scores.length - 1].textContent);
        if (updatedScore > lowestScore) {
            theScoreDiv.removeChild(scores[scores.length - 1]);
        } else {
            return; // If the new score is not greater, don't add it
        }
    }

    for (let i = 0; i < scores.length; i++) {
        const currentScore = parseInt(scores[i].textContent);
        if (updatedScore > currentScore) {
            const newScoreElement = document.createElement('p');
            newScoreElement.textContent = updatedScore;

            // Place the updated score before the current score
            theScoreDiv.insertBefore(newScoreElement, scores[i]);

            placed = true;
            break;
        }
    }

    if (!placed && scores.length < 9) {
        const newScoreElement = document.createElement('p');
        newScoreElement.textContent = updatedScore;

        // If the updated score is not greater than any existing score and there are less than 10 scores, add it at the end
        theScoreDiv.appendChild(newScoreElement);
    }
}