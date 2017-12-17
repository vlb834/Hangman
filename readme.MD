### A Hangman Game Programmed in Javascript in Node.JS

### Goals: 
* Practice using the **Terminal**
* Install and use [**Node.JS**][node link] for a project
* Learn how to install and use simple [**NPM packages**][npm link] (using [**Yarn**][yarn link])
* Practice more **Javascript** coding and control flow

### Outcomes:
* Built functional Hangman game that accounts for valid/invalid user inputs.
* Found NPM packages useful and easy to install. Good documentation also made them easy to use and good practice working with other people's code. 
* Got more experience using Regex to determine valid user inputs. Think I am finally starting to wrap my head around Regex.
* Learnt about [**JS Promise Object**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* Learning and practicing [**Markdown**](https://www.markdowntutorial.com/) by writing my first ReadMe documentation here. 


### Getting Started

I've been using [Visual Studio Code](https://www.visualstudio.com/) for my programming environment to date which has an easy to use intergrated Terminal. From there I installed [**Node.JS**][node link].

To run a Node JS file, I first had to use the commmand line to create a directory and javascript file to work with and run: 

```
$ mkdir Hangman
$ cd Hangman
$ touch game.js
```

Once I created my ```game.js``` file, I could open it within VSCode and add the code below: 

```
console.log('hello world');
```

Switching back to the terminal, I make sure I am in the right Hangman directory and type ```node <filename>``` to run the JS file, in this case called ```game.js```

```
$ cd Hangman
$ node game.js
```

And voila, ```hello world``` will display in the Terminal.  Now I was ready to attempt some coding. 

### NPM Packages

According to their website, [**NPM**][npm link] is a package registry of "almost half a million packages of free, reusable code — the largest software registry in the world." The make it easy to find, download and use existing JS code, by packaging it up into "plug in and play" type modules. 

When you install an NPM package or module into your code directory, it becomes a code **"dependency"**. That it, your code is dependent on it to run properly. NPM also makes it easy to check for package updates and keep things running smoothly, so it's best described as a *Package Manager*.

While NPM is automatically installed with Node.JS, it was recommended I use [**Yarn**][yarn link] instead as it had advantages and improvements to NPM. To be perfectly honest, I don't quite know enough about coding to understand the pros anc cons, but Yarn was easy to use and install (with Homebrew). 

[**Installation info for Yarn**][yarn link]

In practice, when you install packages they will appear under a ```node_modules``` directiory in your Hangman directory. I recommend added this folder to your **.gitignore** file. 


[yarn link]: https://yarnpkg.com/en/docs/getting-started
[npm link]: https://www.npmjs.com/
[node link]: https://nodejs.org/en/
