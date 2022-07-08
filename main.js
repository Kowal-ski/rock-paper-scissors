//Game logic map:
//rock = 1
//paper = 2
//scissors = 3

function computerPlay () {
    let randomNum = Math.random();
    
    if (randomNum <= 0.33) {
        return 1;
    }
    else if (randomNum > 0.33 && randomNum <= 0.66) {
        return 2;
    }
    else {
        return 3;
    }
}

function playerPlay () {
    let playerSelection = (prompt('Please enter: rock, paper or scissors')).toLowerCase();

    if (playerSelection == 'rock' || playerSelection == 'paper' || playerSelection == 'scissors') {
        return playerSelection;
    }
    else {
        while (playerSelection != 'rock' || playerSelection != 'paper' || playerSelection != 'scissors') {
            playerSelection = (prompt('That was an invalid choice, try again!')).toLowerCase();      
            if (playerSelection == 'rock' || playerSelection == 'paper' || playerSelection == 'scissors') break;        
        }    
        return playerSelection;
    }
}

function convert (input) {
    if (input == ' rock') {
        return 1;
    }
    else if (input == 'paper') {
        return 2;
    }
    else {
        return 3;
    }
}

function playRound () {
    let computerSelection = computerPlay();
    let playerSelection = convert(playerPlay());
    let calculate = (((playerSelection - computerSelection) % 3) + 3) % 3;

    switch (calculate) {
        case 0:
            return ('Its a tie! you got lucky ');
            break;
        case 1:
            return ('You win, you probably cheated...');
            break;
        case 2:
            return ('I win! you suck ');
            break;
        default:
            return ('error...');
            break;
    }
}
