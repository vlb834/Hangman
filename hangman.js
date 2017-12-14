const prompt = require('prompt-promise');
const chalk = require('chalk');

console.log(chalk.yellow('H A N G M A N'));

// VARIABLES 
let word = '';
let hangman = [];
const displayHangman = () => console.log(chalk.blue(hangman.join('')));

// FUNCTIONS 
function start(val) {
    console.log(chalk.yellow('H A N G M A N. You need to guess the ' + word.length + '-letter word: '));
    displayHangman();
    prompt('Guess a letter: ').then(guess);
}

function guess(val) {
    if (hangman.includes('_ ')) {
        checkLetter(val);
        prompt('Guess another letter: ').then(guess);
    } else {
        console.log(chalk.green('You guessed the word!'));
        displayHangman();
        prompt.done();
    }
}

function checkLetter(val) {
    // if (val != ) check not a number
    if (val.length > 1) {
        console.log(chalk.red('Incorrect input type - too many letters!'));
    } else if (word.includes(val)) {
        console.log(chalk.green('You guessed a letter correctly!'));
        let index = word.indexOf(val);
        let letter = word.charAt(index);
        word = word.replace(letter, '_'); // hold this in an array an pop off an array. 
        hangman.splice(index, 1, val + ' ');
        displayHangman();
    } else {
        console.log(chalk.red('Wrong!'));
    }
}

// COMMAND LINE PROMPTS

prompt('Enter a word for Hangman: ').then(function setupGame(val) {
    word = val;
    for (let i = 0; i < val.length; i++) {
        hangman.push('_ ');
    }
    console.log('The hangman word is: ' + word);
    prompt('Press any key to start playing.').then(start);
}).catch(function rejected(err) {
    console.log('error: ', err.stack);
    prompt.finish();
});

