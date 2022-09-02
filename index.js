import inquirer from 'inquirer';
// const fs = import('fs')

let compDeck = [];
let userDeck = [];
let user = new Player();
let computer = new Player('Computer');

startGame();

function startGame() {
    generateCards();

    inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
    }
]).then(({name}) => {

    user.name = name;

    console.log(`Hello, ${name}. Let me tell you about my game. You will be playing against the computer. You will each be given 10 cards between 0 (non-inclusive) and 20 (inclusive). Each round you will get to choose which card you want to play. To win a point, your card must be higher than the computer's choice! Following the round, the card you played will be removed from your hand (and so will the computer's). At the end of the game, the winner will be displayed! And luck is in your favor - should it be a tie, you will gain the W. So, let's get started!`)

    cardSelection();
})
}

function cardSelection() {
    console.log(`Your cards are ${userDeck}.`)
    inquirer.prompt([
        {
            name: 'cardSelection',
            type: 'list',
            choices: userDeck,
            message: 'Please pick a number.'
        }
    ]).then(({cardSelection})=>{
        let compChoice = randomCompSelection();
        let userChoice = cardSelection;
        compareCards(compChoice, userChoice)
    })
}

function generateCards() {
    for (let i=0; i<20; i++) {
        let random = Math.floor(Math.random()*20)+1;
        if (i<10){
            compDeck.push(random)
        } else {
            userDeck.push(random)
        }
    }
    }

function randomCompSelection(){
    return compDeck[Math.floor(Math.random() * (compDeck.length))];
}

function Player(input){
    this.name = input,
    this.wins = 0,
    this.pointsWon = 0,
    this.pointsLost = 0,
    this.pointsTied = 0
}

Player.prototype.addWinPoint = function(){
    this.pointsWon++;
}

Player.prototype.addLossPoint = function(){
    this.pointsLost++;
}

Player.prototype.addTiePoint = function(){
    this.pointsTied++;
}

Player.prototype.addWin = function(){
    this.wins++;
}

function compareCards(compChoice, userChoice){
    let winner;
    if (compChoice > userChoice){
        computer.addWinPoint();
        user.addLossPoint();
        winner = computer;
    } else if (userChoice > compChoice){
        user.addWinPoint();
        computer.addLossPoint();
        winner = user;
    } else {
        user.addTiePoint();
        computer.addTiePoint();
        winner = null;
    }

    if (winner == user){
        winner = user.name
    } else if (winner == computer) {
        winner = computer.name
    } else {
        winner = "~It's a tie!"
    }

    removeCard(userDeck, userChoice)
    removeCard(compDeck, compChoice)

    console.log(`You chose ${userChoice} and computer chose ${compChoice}. Winner this round is ${winner}.`)

        if (userDeck.length >0) {
            cardSelection();
        } else {
            let winner = compareStats(user, computer);
            console.log(`Gameover! Thanks for playing. The winner is ${winner.name}!`);
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'playagain',
                    message: 'Would you like to play again?',
                    choices: ['Yes', 'No']
                }
            ]).then(({playagain})=> {
                if (playagain == 'No'){
                    console.log('Goodbye!')
                } else {
                    user.pointsWon = 0;
                    user.pointsLost = 0;
                    user.pointsTied = 0;
                    computer.pointsWon = 0;
                    computer.pointsLost = 0;
                    computer.pointsTied = 0;
                    console.log(user)
                    generateCards();
                    cardSelection();
                }
            })
        }
}

function removeCard(array, num) {
    let index = array.indexOf(num);
    return array = array.splice(index, 1);

    // current set up allows for duplicates 
    // userDeck = userDeck.filter((num) => num != userChoice);
    // compDeck = compDeck.filter((num) => num != compChoice);
}

function compareStats(playerA, playerB) {
    let winner;
    if (playerA.pointsWon > playerB.pointsWon){
        winner = playerA;
    } else if (playerB.pointsWon > playerA.pointsWon){
        winner = playerB;
    } else {
        // default winner to user for now
        winner = playerA;
    };

    winner.addWin();
    return winner;
}