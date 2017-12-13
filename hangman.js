const prompt = require('prompt-promise');
const chalk = require('chalk');
console.log(chalk.blue('H A N G M A N'));

emitter.setMaxListeners(100);

let word = '';
let guesses = [];
let hangman = [];
const displayHangman = () => console.log(chalk.yellow(hangman.join('')));

prompt('Enter a word for Hangman: ')
    .then(function setUpGame(val) {
        word = val;
        for (let i = 0; i < val.length; i++) {
            hangman.push('_ ');
        }    
        console.log('The hangman word is: ' + word);
        console.log(chalk.yellow('The game ready. You need to guess the ' + word.length + '-letter word: '));
        displayHangman();
        return prompt('Guess any letter to start: ');
    })
    .then(function guess(val) {
        if (hangman.includes('_ ')) {
            if (word.includes(val)) {
                console.log(chalk.green('You guessed a letter correctly!'));
                let index = word.indexOf(val);
                let letter = word.charAt(index);
                word = word.replace(letter, '_');
                hangman.splice(index, 1, val + ' ');
                displayHangman(); 
                return guess(prompt('Guess another letter: '));
            } else {
                console.log(chalk.red('Wrong!'));
                return guess(prompt('Guess another letter: '));
            }
        } else {
            console.log(chalk.green('You guessed the word!'));
            displayHangman(); 
            prompt.done();
        }
    })
    .catch (function rejected(err) {
        console.log('error: ', err.stack);
        prompt.finish();
    });
