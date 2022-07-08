function computerPlay () {
    let randomNum = Math.random();
    
    if (randomNum <= 0.33) {
        return('Rock');
    }
    else if (randomNum > 0.33 && randomNum <= 0.66) {
        return('Paper');
    }
    else {
        return ('Scissors')
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
