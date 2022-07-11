//Game logic map:
//rock = 1
//paper = 2
//scissors = 3
//--------------------------------- game code --------------------------------------

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
            return ('Its a tie! you got lucky.');
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

async function game() {
    let computerWins = 0;
    let playerWins = 0;

    for (let i = 1; i <= 5; i++) {
        let roundNum = 'round ' + i;
        const roundNumPara = document.createElement('p');
        roundNumPara.dataText = roundNum;
        document.querySelector('.game-container').appendChild(roundNumPara);
        liveScripter(roundNumPara);
        await delay(1000);
        

        let currentOutput = playRound();
        const currentOutputPara = document.createElement('p');
        currentOutputPara.dataText = currentOutput;
        document.querySelector('.game-container').appendChild(currentOutputPara);
        liveScripter(currentOutputPara);
        await delay(1000);

        switch (currentOutput) {
            case 'You win, you probably cheated...':
                playerWins = playerWins + 1;
                break;
            case 'I win! you suck ':
                computerWins = computerWins + 1;
                break;
        }
    }

    let winnerPara = document.createElement('p');

    if (playerWins > computerWins) {
        winnerPara.dataText = 'You win, I know you cheated tho, but I\'ll let it slide this time.';
    }
    else if (computerWins > playerWins) {
        winnerPara.dataText = 'I win, wow your terrible at this.';
    }
    else {
        winnerPara.dataText = 'Lets call it a draw...'; 
    }

    document.querySelector('.game-container').appendChild(winnerPara);
    liveScripter(winnerPara);
    await delay(1000);
}

//--------------------------------- game code --------------------------------------

//--------------------------------- utlity code ------------------------------------
window.setInterval(function() {
    var elem = document.querySelector('.scroll-container');
    elem.scrollTop = elem.scrollHeight;
  }, 100);
//--------------------------------- utlity code ------------------------------------

function scripter(elementID) {
    let typeWriter = document.querySelector(elementID);
    let dataText = typeWriter.getAttribute('data-text');

    let count = 0;  
    let dataTextLength = dataText.length;
 
    setText();

    function setText() {
        setTimeout(() => {
            typeWriter.textContent += dataText.charAt(count);
            count++;
            if (count <= dataTextLength) {
                setText();
            } 
        }, 30);
    }
}

function liveScripter(typeWriter) {
    let dataText = typeWriter.dataText
    let count = 0;  
    let dataTextLength = dataText.length;
 
    setText();

    function setText() {
        setTimeout(() => {
            typeWriter.textContent += dataText.charAt(count);
            count++;
            if (count <= dataTextLength) {
                setText();
            } 
        }, 30);
    }
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function introductionScript() {
    // const elements = [...document.querySelectorAll('.chatWrapper *[id]')];
    // let arr = elements.map(({ id }) => id);
    await delay(500);
    scripter('#message');
    await delay(6500);
    scripter('#message2');
    await delay(3500);
    scripter('#message3');
    await delay(2200);
    const startGameButton = document.querySelector('.scroll-container button');
    startGameButton.style.opacity = 1;
}

function throttle(func, timeFrame) {
    var lastTime = 0;
    return function (...args) {
        var now = new Date();
        if (now - lastTime >= timeFrame) {
            func(...args);
            lastTime = now;
        }
    };
}

let introTriggered = false;
const container = document.querySelector('.container');
container.addEventListener('scroll', throttle(() => {
    while (introTriggered == false) {
        introductionScript();
        introTriggered = true;
    }
}, 1000))

document.getElementById('start-game-btn').addEventListener('click', function(e) {
    game();
});