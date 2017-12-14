const prompt = require('prompt-promise');
const chalk = require('chalk');
console.log(chalk.yellow('H A N G M A N'));

// VARIABLES 
let word = ''; // value declared in setupGame function
let count = 0; // word.length value declared in setupGame function
let hangman = [];
let countdown = [];
const invalidWordInputs = /\W|[0-9]/;
const displayHangman = () => console.log(chalk.blue(hangman.join('')));

// FUNCTIONS 
function checkWordInvalid(value) { 
    return invalidWordInputs.test(value);
}

function setupGame(value) {
    if (checkWordInvalid(value) === true) {
        console.log(chalk.red('Invalid Input'));
        console.log('You must only use lower case letters A - Z for your word, and no spaces or punctuation.');
        prompt('Enter a new word for Hangman: ').then(setupGame);
    } else {
        word = value.toLowerCase();
        count = value.length;
        countdown = word.split('');
       
        for (let i = 0; i < count; i++) {
            hangman.push('_ ');
        }
    console.log('The hangman word is: ' + word);
    prompt('Press any key to start playing.').then(start);
    }
}

function start(anyKey) {
    console.log(chalk.yellow('H A N G M A N. You need to guess the ' + count + '-letter word: '));
    displayHangman();
    prompt('Guess a letter: ').then(guess);
}

function guess(letter) {
    if (hangman.includes('_ ')) {
        checkLetter(letter);
        prompt('Guess another letter: ').then(guess);
    } else {
        console.log(chalk.green('You guessed the word!'));
        displayHangman();
        prompt.done();
    }
}

function checkLetter(letter) {
    // if (val != ) check not a number
    if (letter.length > 1) {
        console.log(chalk.red('Incorrect input type - too many letters!'));
    } else if (word.includes(letter)) {
        console.log(chalk.green('You guessed a letter correctly!'));
        let index = word.indexOf(val);
        let leter = word.charAt(index);
        word = word.replace(leter, '_'); // hold this in an array an pop off an array. 
        hangman.splice(index, 1, val + ' ');
        displayHangman();
    } else {
        console.log(chalk.red('Wrong!'));
    }
}

// COMMAND LINE PROMPT

prompt('Enter a word for Hangman: ').then(setupGame).catch(function rejected(err) {
    console.log('error: ', err.stack);
    prompt.finish();
});

