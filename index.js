import inquirer from 'inquirer';
const fs = import('fs')

const compDeck = [];
const userDeck = [];

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

generateCards();

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
    }
]).then((res) => {
    inquirer.prompt([
        {
            name: 'welcome',
            message: `Hello, ${res.name}. Your numbers are ${userDeck}. Please press enter to contine.`
        }
    ]).then(()=>{
        cardSelection();
    })
})

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
        // console.log(compDeck)
        // console.log(Math.floor(Math.random() * (compDeck.length)))
        console.log(compChoice)
    })
}

function randomCompSelection(){
    return compDeck[Math.floor(Math.random() * (compDeck.length))];
}
