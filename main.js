function computerPlay () {
    let randomNum = Math.random();
    
    if (randomNum <= 0.33) {
        return('rock');
    }
    else if (randomNum > 0.33 && randomNum <= 0.66) {
        return('paper');
    }
    else {
        return ('scissors')
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

