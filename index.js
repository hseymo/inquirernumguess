import inquirer from 'inquirer';
const fs = import('fs')

let compDeck = [];
let userDeck = [];
let user;
let computer;

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
    
    user = new Player(name);
    computer = new Player('Computer');
    console.log(user);
    inquirer.prompt([
        {
            name: 'welcome',
            message: `Hello, ${name}. Your numbers are ${userDeck}. Please press enter to contine.`
        }
    ]).then(()=>{
        cardSelection();
    })
})
}

function cardSelection() {
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
    // console.log(`Comp deck is ${compDeck}`)
    // console.log(`User deck is ${userDeck}`)
    }

function randomCompSelection(){
    return compDeck[Math.floor(Math.random() * (compDeck.length))];
}

function Player(input){
    this.name = input,
    this.currentPoints = 0,
    this.wins = 0,
    this.losses = 0,
    this.ties = 0
}

Player.prototype.addWin = function(){
    this.wins++;
}

Player.prototype.addLoss = function(){
    this.losses++;
}

Player.prototype.addTie = function(){
    this.ties++;
}

function compareCards(compChoice, userChoice){
    inquirer.prompt([
        {
            name: 'computer choice',
            message: `You chose ${userChoice} and computer chose ${compChoice}.`
        }
    ]).then(()=>{
        console.log(compChoice)
        if (compChoice > userChoice){
            computer.addWin();
            user.addLoss();
        } else if (userChoice > compChoice){
            user.addWin();
            computer.addLoss();
        } else {
            user.addTie();
            computer.addTie();
        }

        removeCard(userDeck, userChoice)
        removeCard(compDeck, compChoice)

        if (userDeck.length >0) {
            cardSelection();
        } else {
            let winner = compareStats(user, computer);
            console.log(winner);
            inquirer.prompt([
                {
                    name: 'gameover',
                    message: `Gameover! Thanks for playing. The winner is ${winner.name}!`
                }
            ]).then((res)=> {})
        }

    })
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
    if (playerA.wins > playerB.wins){
        winner = playerA;
    } else if (playerB.wins > playerA.wins){
        winner = playerB;
    } else {
        // default winner to user for now
        winner = playerA;
    };
    return winner;
}