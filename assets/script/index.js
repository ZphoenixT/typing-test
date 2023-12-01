'use strict';

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

   function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const randomizedWords = shuffleArray(words);



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
    }

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