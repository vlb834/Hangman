const prompt = require('prompt-promise');
const chalk = require('chalk');
console.log(chalk.yellow('H A N G M A N'));

// GAME VARIABLES 
let word = ''; // value declared in setupGame function
let tracker = ''; // mutable word proxy
let count = 0; // word.length value declared in setupGame function
let hangman = [];
let countdown = [];
const invalidInputs = /\W|[0-9]/;
const displayHangman = () => console.log(chalk.magenta(hangman.join('')));

// FUNCTIONS
function checkWordInputInvalid(value) {
    return invalidInputs.test(value);
}

function checkLetterInputInvalid(letter) {
    if (letter.length > 1) {
        console.log(chalk.red('Invalid Input'));
        console.log(chalk.red('Too many letters! Guess just one.'));
        return true;
    } else if (invalidInputs.test(letter)) {
        console.log(chalk.red('Invalid Input'));
        console.log(chalk.red('You must only use lower case letters A - Z for your word, and no spaces or punctuation.'));
        return true;
    }
    return false;
}

function passLetter(letter) {
    let index = tracker.indexOf(letter);
    countdown.pop();
    tracker = tracker.replace(letter, 0);
    hangman.splice(index, 1, letter + ' ');
    console.log(tracker, word, letter, index);
    console.log(countdown);
}

function checkLetter(letter) {
    if (checkLetterInputInvalid(letter)) {
        return;
    } else if (tracker.includes(letter)) {
        console.log(chalk.green('You guessed a letter correctly!'));
        passLetter(letter);
    } else {
        console.log(chalk.red('Wrong!')); 
    }
    displayHangman();   
}

function guess(letter) {
    checkLetter(letter);
    if (countdown.length == 0) {
        console.log(chalk.green('You guessed the word!'));        prompt('Play again? Yes or No: ').then(playAgain);
    } else {
        prompt('Guess another letter: ').then(guess);
    }
}

function start(anyKey) {
    console.log(chalk.yellow('H A N G M A N.'));
    console.log(chalk.yellow('You need to guess the ' + count + '-letter word: '));
    displayHangman();
    prompt('Guess a letter: ').then(guess);
}

function setupGame(value) {
    if (checkWordInputInvalid(value) === true) {
        console.log(chalk.red('Invalid Input'));
        console.log('You must only use lower case letters A - Z for your word, and no spaces or punctuation.');
        prompt('Enter a new word for Hangman: ').then(setupGame);
    } else {
        word = value.toLowerCase();
        tracker = value.toLowerCase();
        count = value.length;
        countdown = word.split('');
        for (let i = 0; i < count; i++) {
            hangman.push('_ ');
        }
        console.log('The hangman word is: ' + word);
        prompt('Press any key to start playing.').then(start);
    }
}

function playAgain(answer) {
    answer = answer.toLowerCase();
    if (answer === 'yes' || answer === 'y') {
        word = ''; 
        tracker = ''; 
        count = 0; 
        hangman = [];
        countdown = [];
        newGame();
    } else if (answer === 'no' || answer === 'n') {
        console.log((chalk.yellow('Thanks for playing! Bye Bye!')));
        prompt.finish(); // same as process.exit();
    } else {
        prompt.finish(); // same as process.exit();
       
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



