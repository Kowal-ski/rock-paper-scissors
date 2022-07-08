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
    let playerSelection = (prompt('Please enter: 1 - rock, 2 - paper or 3 - scissors')).toLowerCase();

    if (playerSelection == 1 || playerSelection == 2 || playerSelection == 3) {
        return playerSelection;
    }
    else {
        while (playerSelection != 1 || playerSelection != 2 || playerSelection != 3) {
            playerSelection = (prompt('That was an invalid choice, try again!')).toLowerCase();      
            if (playerSelection == 1 || playerSelection == 2 || playerSelection == 3) break;        
        }    
        return playerSelection;
    }
}

function playRound () {
    let computerSelection = computerPlay();
    let playerSelection = playerPlay();
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
