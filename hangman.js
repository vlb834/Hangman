const prompt = require('prompt-promise');
const chalk = require('chalk');
const hangmanFigure = require('hangman-ascii');
console.log(chalk.yellow('H A N G M A N'));

// GAME VARIABLES 
let word = ''; // value declared in setupGame function
let tracker = ''; // mutable word proxy to display guesses to player correctly
let count = 0; // word.length value declared in setupGame function
let hangman = []; // displayed to player
let complete = []; // needed to determine if word guess is complete
let turns = 0; // guess turns left before you hang
const validInputs = /^[a-zA-Z]+$/; // check everything from start to end of string contains only letters
const displayHangman = () => console.log(chalk.yellow(hangman.join('')));

// FUNCTIONS

function checkWordInputValid(wordInput) {
    return validInputs.test(wordInput);
}

function checkLetterInputValid(letterInput) {
    if (letterInput.length > 1) {
        console.log(chalk.red('Invalid Input'));
        console.log(chalk.red('Too many letters! Guess just one.'));
        return false;
    } else if (validInputs.test(letterInput) === false) {
        console.log(chalk.red('Invalid Input'));
        console.log(chalk.red('You must only use lower case letters A - Z for your word, and no spaces or punctuation.'));
        return false;
    }
    return true;
}

function passLetter(letter) {
    let index = tracker.indexOf(letter);
    complete.pop();
    tracker = tracker.replace(letter, 0);
    hangman.splice(index, 1, letter + ' ');
}


function correct(letter) {
    console.log(chalk.green('You guessed a letter correctly!'));
    passLetter(letter);
}

function wrong(letter) {
    turns = turns + 1;
    let remainingTurns = 6 - turns; // displayed to player
    hangmanFigure.drawLevel(turns, 'magenta');
    console.log(chalk.red('Wrong!'));
    console.log(chalk.red('You have ' + remainingTurns + ' incorrect guesses left.'));
}

function checkLetter(letterInput) {
    if (checkLetterInputValid(letterInput)) {
        let letter = letterInput.toLowerCase();
        if (tracker.includes(letter)) {
            correct(letter);
        } else {
            wrong(letter);
        }
    } else {
        return;
    }
}

function checkGuess(letterInput) {
    if (letterInput.toLowerCase() === word) {
        complete = [];
        hangman = word.toLowerCase().split('');
    } else {
        checkLetter(letterInput);
    }
    displayHangman();
}

function guess(letterInput) { // guess recursion plus winning/game over results
    checkGuess(letterInput);
    if (complete.length == 0) {
        console.log(chalk.green('You guessed the word!')); 
        prompt('Play again? Yes or No: ').then(playAgain);
    } else if (turns == 6) {
            console.log(chalk.red('G A M E  O V E R'));
            console.log(chalk.red('You ran out of incorrect guesses.'));
            prompt('Play again? Yes or No: ').then(playAgain); 
    } else {
        prompt('Guess another letter: ').then(guess);
    }
}

function start(anyKey) {
    hangmanFigure.drawLevel(0, 'magenta');
    hangmanFigure.drawLevel(1, 'magenta');
    hangmanFigure.drawLevel(2, 'magenta');
    hangmanFigure.drawLevel(3, 'magenta');
    hangmanFigure.drawLevel(4, 'magenta');
    hangmanFigure.drawLevel(5, 'magenta');
    hangmanFigure.drawLevel(6, 'magenta');
    console.log(chalk.yellow('H A N G M A N.'));
    console.log(chalk.yellow('You need to guess the ' + count + '-letter word.'));
    console.log(chalk.yellow('You have 6 incorrect guesses before you hang!'));
    hangmanFigure.drawLevel(turns, 'magenta');
    displayHangman();    
    prompt('Guess a letter: ').then(guess);
}

function setupGame(wordInput) {
    if (checkWordInputValid(wordInput)) {
        word = wordInput.toLowerCase();
        tracker = wordInput.toLowerCase();
        count = wordInput.length;
        complete = word.split('');
        for (let i = 0; i < count; i++) {
            hangman.push('_ ');
        }
        console.log('The hangman word is: ' + word);
        prompt('Press any key to start playing.').then(start);
    } else {
        console.log(chalk.red('Invalid Input'));
        console.log('You must only use lower case letters A - Z for your word, and no spaces or punctuation.');
        prompt('Enter a new word for Hangman: ').then(setupGame);
    }
}

function playAgain(answer) {
    answer = answer.toLowerCase();
    if (answer === 'yes' || answer === 'y') {
        // reset variables for new game
        word = '';
        tracker = '';
        count = 0;
        hangman = [];
        complete = [];
        turns = 0;
        newGame();
    } else if (answer === 'no' || answer === 'n') {
        console.log((chalk.yellow('Thanks for playing! Bye Bye!')));
        prompt.finish();
    } else {
        prompt.finish();
    }
}

function newGame() {
    prompt('Enter a word for Hangman: ').then(setupGame).catch(function rejected(err) {
        console.log('error: ', err.stack);
        prompt.finish(); // same as process.exit();
    });
}

// COMMAND LINE PROMPT

newGame();



