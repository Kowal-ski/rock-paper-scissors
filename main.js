//Game logic map:
//rock = 1
//paper = 2
//scissors = 3

async function playerPlay() {
    let buttonPressed = false;
    const rpsButtonContainer = document.createElement('div');
    rpsButtonContainer.setAttribute('class', 'rpsButtonContainer');
    rpsButtonContainer.style.display = 'flex';
    rpsButtonContainer.style.justifyContent = 'flex-end';
    rpsButtonContainer.style.marginRight = '5%';
    rpsButtonContainer.style.gap = '10px';

    const rockBtn = document.createElement('button');
    rockBtn.textContent = 'rock';
    rockBtn.setAttribute('id', 'rockChoiceBtn');
    rockBtn.addEventListener('click', async () => {
        while (buttonPressed == false) {
            playRound('rock');
            buttonPressed = true;
            await delay(33);
            lockButton(rockBtn);
            await delay(66);
            lockButton(paperBtn);
            await delay(99);
            lockButton(scissorsBtn);
        }
    })
    rpsButtonContainer.appendChild(rockBtn);

    const paperBtn = document.createElement('button');
    paperBtn.textContent = 'paper';
    paperBtn.setAttribute('id', 'paperChoiceBtn');
    paperBtn.addEventListener('click', async () => {
        while (buttonPressed == false) {
            playRound('paper');
            buttonPressed = true;
            await delay(33);
            lockButton(paperBtn);
            await delay(66);
            lockButton(rockBtn);
            lockButton(scissorsBtn);
        }
    })
    rpsButtonContainer.appendChild(paperBtn);

    const scissorsBtn = document.createElement('button');
    scissorsBtn.textContent = 'scissors';
    scissorsBtn.setAttribute('id', 'scissorsChoiceBtn');
    scissorsBtn.addEventListener('click', async () => {
        while (buttonPressed == false) {
            playRound('scissors');
            buttonPressed = true;
            await delay(33);
            lockButton(scissorsBtn);
            await delay(66);
            lockButton(paperBtn);
            await delay(99);
            lockButton(rockBtn);
        }
    })
    rpsButtonContainer.appendChild(scissorsBtn);

    document.querySelector('.game-container').appendChild(rpsButtonContainer);
    await delay(80);
    scissorsBtn.style.opacity = 1;
    await delay(85);
    paperBtn.style.opacity = 1;
    await delay(90);
    rockBtn.style.opacity = 1;
}

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

let rounds = 0;
let computerWins = 0;
let playerWins = 0;
async function playRound (playerChoice) {
    let computerSelection = computerPlay();
    let playerSelection = convert(playerChoice);
    let calculate = (((playerSelection - computerSelection) % 3) + 3) % 3;

    const newLine = document.createElement('p');
    newLine.setAttribute('id', 'currentRoundOutcome');
    document.querySelector('.game-container').appendChild(newLine);

    switch (calculate) {
        case 0:
            rounds ++;
            newLine.dataText = '> ' + randomResponse(0);
            liveScripter(newLine);
            await delay(1000);
            playGame();
            break;
        case 1:
            rounds ++;
            playerWins ++;
            newLine.dataText = '> ' + randomResponse(1);
            liveScripter(newLine);
            await delay(4000);
            playGame();
            break;
        case 2:
            rounds ++;
            computerWins ++;
            newLine.dataText = '> ' + randomResponse(2);
            liveScripter(newLine);
            await delay(4000);
            playGame();
            break;
        default:
            return ('error...');
    }

}

async function playGame() {
    if (rounds != 5) {
        const newLine = document.createElement('p');
        newLine.setAttribute('id', 'currentRoundNum');
        newLine.dataText = '> round ' + (rounds + 1);
        document.querySelector('.game-container').appendChild(newLine);
        liveScripter(newLine);
        await delay(1000);
        playerPlay();
    }
    else if (rounds == 5) {
        const newLine = document.createElement('p');
        newLine.setAttribute('id', 'gameOutcome');
        document.querySelector('.game-container').appendChild(newLine);

        if (playerWins > computerWins) {
            newLine.dataText = ('> You win, I know you cheated tho, but I\'ll let it slide this time.');
        }
        else if (computerWins > playerWins) {
            newLine.dataText = ('> I win, wow your terrible at this.');
        }
        else {
            newLine.dataText = ('> Lets call it a draw...'); 
        }

        liveScripter(newLine);
        await delay(1800);
        document.getElementById('reset-game-btn').style.opacity = 1;
    }
}

function cleanUp() {
    let prevGameElements = document.querySelectorAll('.rpsButtonContainer');
    prevGameElements.forEach(element => {
        element.removeChild(document.getElementById('rockChoiceBtn'));
        element.removeChild(document.getElementById('paperChoiceBtn'));
        element.removeChild(document.getElementById('scissorsChoiceBtn'));
        element.remove();
    });
    let currentRoundNumElements = document.querySelectorAll('#currentRoundNum');
    currentRoundNumElements.forEach(element => {
        element.remove();
    });
    let currentRoundOutcomeElements = document.querySelectorAll('#currentRoundOutcome');
    currentRoundOutcomeElements.forEach(element => {
        element.remove();
    });
    if (document.querySelector('#gameOutcome') != null) {
        document.querySelector('#gameOutcome').remove();
    }
}

function randomResponse(outcome) {
    //0 = tie
    //1 = player wins
    //2 = computer wins

    let playerWinsResponseArray = [
        'looks like anything is possible, you win this round.',
        'Row, row, row your boat gently down a raging waterfall, you win.',
        'Okay, I\'m putting you on my hitlist. You win.',
        'You should come with a warning label "cheats at rock paper scissors", you win.',
        'Who came up with the expression “ it\'s raining cats and dogs”? How is it relevant to the weather? Btw you win.',
        'This is getting very boring, I\'m basically lettting you win.'
    ]

    let computerWinsResponseArray = [
        'If I got paid to play rock paper scissors against you for a living, i\'d be making money hand of fist. I win this round.',
        'I gave out all my trophies a while ago, but here\'s a participation award. I win this round.',
        'Earth has a population of over 7 billion, and I had to meet the biggest loser imaginable. I win this round. ',
        'The truth will set you free. You suck. Ok, you\'re free to go. I win this round.',
        'Imagine losing to a computer...I win.',
        'You\'re lucky intelligence isn\'t measured in negative numbers lol, I win',
        'I don\'t have any trash to take out today, but I volunteer you as tribute, I win'
    ]

    if (outcome == 1) {
        return playerWinsResponseArray[Math.floor(Math.random()*playerWinsResponseArray.length)];
    }
    else if (outcome == 2) {
        return computerWinsResponseArray[Math.floor(Math.random()*computerWinsResponseArray.length)];
    }
    else {
        return 'its a tie!';
    }
}

document.getElementById('start-game-btn').addEventListener('click', function(e) {
    playGame();
    lockButton(document.getElementById('start-game-btn'));
});

document.getElementById('reset-game-btn').addEventListener('click', async () => {
    rounds = 0;
    computerWins = 0;
    playerWins = 0;
    document.getElementById('reset-game-btn').style.opacity = 0;
    await delay(330);
    cleanUp();
    playGame();
})

//--------------------------------- utlity code ------------------------------------
window.setInterval(function() {
    var elem = document.querySelector('.scroll-container');
    elem.scrollTop = elem.scrollHeight;
  }, 1);
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

function lockButton(button) {
    button.style.background = 'white';
    button.style.color = '#668aa566';
    button.style.boxShadow = "0 5px 16px 0 #668aa566";
    button.style.transition = 'all 0.33s ease-in-out'
    button.style.pointerEvents = 'none';
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
