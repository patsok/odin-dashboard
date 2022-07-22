let arrRPS = ["rock", "paper", "scissors"];
let userScore = 0;
let computerScore = 0;
let gamesNumber = 5;
let actualGame = 0;
let gameArray = [];

function computerPlay() {
    return arrRPS[Math.floor(Math.random() * arrRPS.length)];
}

let result = document.querySelector(".result");
let score = document.querySelector(".score");
let endMessage = document.querySelector(".endMessage");
let header = document.querySelector(".header");
let iconsContainer = document.querySelector(".icons");
let easyDifficulty = document.querySelector("#easy")
let hardDifficulty = document.querySelector("#hard")
let buttonLizard = document.querySelector("#lizard img")
let buttonSpock = document.querySelector("#spock img")
let resetButtons = document.querySelector(".resetButtons");
let resetButton = document.querySelector(".reset");
let modeButton = document.querySelector(".modes");
let buttons = document.querySelectorAll("img.icon");

easyDifficulty.addEventListener('click', () => {
    header.classList.add('hidden');
    iconsContainer.classList.remove('hidden');
    arrRPS = ["rock", "paper", "scissors"];
    buttonLizard.classList.add('hidden');
    buttonSpock.classList.add('hidden');
})

hardDifficulty.addEventListener('click', () => {
    header.classList.add('hidden');
    iconsContainer.classList.remove('hidden');
    buttonLizard.classList.remove('hidden');
    buttonSpock.classList.remove('hidden');
    arrRPS = ["rock", "paper", "scissors", "lizard", "spock"];
})

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        endMessage.textContent = '';
        playerSelection = button.alt.toLowerCase();
        computerSelection = computerPlay();
        playRound(playerSelection, computerSelection)
        showText();
        if (userScore == gamesNumber || computerScore == gamesNumber) {
            chooseWinner();
            iconsContainer.classList.add('hidden');
        }
    })
})

function showText() {
    if (actualGame > 1 && gameArray[actualGame - 1][1] == gameArray[actualGame - 2][1] && gameArray[actualGame - 1][2] == gameArray[actualGame - 2][2]) {
        endMessage.textContent = `Close call...`;
    } else {
        if (userScore == gamesNumber - 1 && computerScore == gamesNumber - 1) {
            endMessage.textContent = `Final battle! All in your hands! But no pressure, really...`;
        } else if (userScore == gamesNumber - 1) {
            endMessage.textContent = `Wooah! One more and you will beat machines!`;
        } else if (computerScore == gamesNumber - 1) {
            endMessage.textContent = `Watch out! One game and the mankind is doomed :(`;
        } else if (userScore == 1 && computerScore == 0) {
            endMessage.textContent = `First won battle! You rock!`
        } else if (userScore == 0 && computerScore == 1) {
            endMessage.textContent = `Common! You can do better than losing the first battle!`
        } else if (userScore == gamesNumber - 2) {
            endMessage.textContent = `Two more to go! Beat them!`
        } else if (computerScore == gamesNumber - 2) {
            endMessage.textContent = `You're losing... Maybe think more? A LOT MORE?`
        } else if (userScore == gamesNumber - 3) {
            endMessage.textContent = `Okay, you're on the right track!`
        } else if (computerScore == gamesNumber - 3) {
            endMessage.textContent = `Another 3 loses and we will be ashamed of you`;
        } else {
            endMessage.textContent = `Your friends count on you!`;
        }
    }
}



function playRound(playerSelection, computerSelection) {
    let actionMessage = ['cuts', 'covers', 'crushes', 'poisons', 'smashes', 'decapitates', 'eats', 'disproves', 'vaporizes'];
    let i;
    if (playerSelection == computerSelection) {
        result.textContent = `${capitalizeFirstLetter(playerSelection)} vs ${computerSelection} - It's a tie!`
    } else {
        if (playerSelection == "rock") {
            if (computerSelection == "scissors" || computerSelection == "lizard") {
                userScore++;
                result.textContent = `${capitalizeFirstLetter(playerSelection)} ${actionMessage[2]} ${computerSelection}! You won!`;
            } else {
                computerScore++
                computerSelection == "paper" ? i = 1 : i = 8;
                result.textContent = `${capitalizeFirstLetter(computerSelection)} ${actionMessage[i]} ${playerSelection}! You lost!`;
            }
        } else if (playerSelection == "paper") {
            if (computerSelection == "rock" || computerSelection == "spock") {
                userScore++;
                computerSelection == "rock" ? i = 1 : i = 7;
                result.textContent = `${capitalizeFirstLetter(playerSelection)} ${actionMessage[i]} ${computerSelection}! You won!`;
            } else {
                computerScore++;
                computerSelection == 'lizard' ? i = 6 : i = 0;
                result.textContent = `${capitalizeFirstLetter(computerSelection)} ${actionMessage[i]} ${playerSelection}! You lost!`;
            }
        } else if (playerSelection == "scissors") {
            if (computerSelection == "lizard" || computerSelection == "paper") {
                userScore++;
                computerSelection == "lizard" ? i = 5 : i = 0;
                result.textContent = `${capitalizeFirstLetter(playerSelection)} ${actionMessage[i]} ${computerSelection}! You won!`;
            } else {
                computerScore++;
                computerSelection == 'rock' ? i = 2 : i = 4;
                result.textContent = `${capitalizeFirstLetter(computerSelection)} ${actionMessage[i]} ${playerSelection}! You lost!`;
            }
        } else if (playerSelection == "lizard") {
            if (computerSelection == "paper" || computerSelection == "spock") {
                userScore++;
                computerSelection == "paper" ? i = 6 : i = 3;
                result.textContent = `${capitalizeFirstLetter(playerSelection)} ${actionMessage[i]} ${computerSelection}! You won!`;
            } else {
                computerScore++;
                computerSelection == 'rock' ? i = 2 : i = 5;
                result.textContent = `${capitalizeFirstLetter(computerSelection)} ${actionMessage[i]} ${playerSelection}! You lost!`;
            }
        } else {
            if (computerSelection == "scissors" || computerSelection == "rock") {
                userScore++;
                computerSelection == "rock" ? i = 8 : i = 4;
                result.textContent = `${capitalizeFirstLetter(playerSelection)} ${actionMessage[i]} ${computerSelection}! You won!`;
            } else {
                computerScore++;
                computerSelection == 'lizard' ? i = 3 : i = 7;
                result.textContent = `${capitalizeFirstLetter(computerSelection)} ${actionMessage[i]} ${playerSelection}! You lost!`;
            }
        }
        score.textContent = `You ${userScore}:${computerScore} Computer`
        actualGame++;
        let gameArraySingle = []
        gameArraySingle.push(actualGame, userScore, computerScore);
        gameArray.push(gameArraySingle)
    }
}

function chooseWinner() {
    if (userScore == gamesNumber) {
        endMessage.innerHTML = `You won the battle!<br>Humanity is saved! Want to beat them again or change mode?`
    } else {
        endMessage.innerHTML = `You lost the battle! <br />HUMANITY IS DOOMED AND IT'S YOUR FAULT!<br /> Ready to try again? You can also change the mode`
    }
    resetButtons.classList.remove("hidden");
    resetButton.addEventListener('click', () => resetGame())
    modeButton.addEventListener('click', () => resetMode())
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    score.textContent = ''
    result.textContent = '';
    endMessage.textContent = '';
    resetButtons.classList.add("hidden");
    iconsContainer.classList.remove('hidden');
}

function resetMode() {
    userScore = 0;
    computerScore = 0;
    score.textContent = ''
    result.textContent = '';
    endMessage.textContent = '';
    resetButtons.classList.add("hidden");
    header.classList.remove('hidden');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}