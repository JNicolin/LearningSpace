// Get references to the DOM
let headerDiv = document.getElementById("headerText");
let p1ScoreDiv = document.getElementById("p1ScoreDisplay");
let p2ScoreDiv = document.getElementById("p2ScoreDisplay");
let roundsDiv = document.getElementById("roundsDisplay");
let restartBtn = document.getElementById("restartBtn");
let rulesBtn = document.getElementById("rulesBtn");
let settingsBtn = document.getElementById("settingsBtn");
let boxes = document.getElementsByClassName("box");
let modal = new bootstrap.Modal(document.getElementById("myModal"));
let p1IconSelector = document.getElementById("p1Icon");
let p2IconSelector = document.getElementById("p2Icon");
let roundsSelector = document.getElementById("rounds");

// Custom class- and object-definitions
class Player {
    constructor(label, value, noOfWins, iconId, isWinner) {
    this.label = label;
    this.value = value;
    this.wins = noOfWins;
    this.icon = iconId;
    this.winner = isWinner;
    }
}

class Icon {
    constructor(label, src1, alt1, src2, alt2, src3, alt3) {
    this.label = label; 
    this.src1 = src1;
    this.alt1 = alt1;
    this.src2 = src2;
    this.alt2 = alt2;
    this.src3 = src3;
    this.alt3 = alt3;
    }
}

let gameSettings = {
    roundsPerGame: 3, //Initial value, can be changed by user input
    p1Icon: 0, //Initial value, can be changed by user input
    p2Icon: 1, //Initial value, can be changed by user input
};

let gameStats = {
    roundsPlayed: 0,
    gameOver: false,
    roundOver: false,
    currentPlayer: Player,
};

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Initialize varibles with known values
const icon1 = new Icon("Orange", "assets/img/1_OrN.png", "Neutral orange icon", "assets/img/1_OrH.png", "Happy orange icon", "assets/img/1_OrS.png", "Sad orange icon");
const icon2 = new Icon("Strawberry", "assets/img/2_StN.png", "Neutral strawberry icon", "assets/img/2_StH.png", "Happy strawberry icon", "assets/img/2_StS.png", "Sad strawberry icon");
const icon3 = new Icon("Apple", "assets/img/3_ApN.png", "Neutral apple icon", "assets/img/3_ApH.png", "Happy apple icon", "assets/img/3_ApS.png", "Sad apple icon");
const icon4 = new Icon("Pear", "assets/img/4_PeN.png", "Neutral pear icon", "assets/img/4_PeH.png", "Happy pear icon", "assets/img/4_PeS.png", "Sad pear icon");
const icon5 = new Icon("Citrus", "assets/img/5_CiN.png", "Neutral citrus icon", "assets/img/5_CiH.png", "Happy citrus icon", "assets/img/5_CiS.png", "Sad citrus icon");
const icons = [icon1, icon2, icon3, icon4, icon5];
const numOfRounds = [1,2,3,4,5];
let p1 = new Player("P1", 10, 0, icons[gameSettings.p1Icon], false);
let p2 = new Player("P2", -10, 0, icons[gameSettings.p2Icon], false);
let state = 0; // 0 newGame, 1 nextRound, 2 roundOver_win, 3 roundOver_tie
let clickedBoxes = Array(9).fill(0);
gameStats.currentPlayer = p1;
let winIndicator = getComputedStyle(document.body).getPropertyValue("--winningBoxColor");

// Add Events listeners 
restartBtn.addEventListener('click', restartGame);
rulesBtn.addEventListener('click', rulesModal);
settingsBtn.addEventListener('click', settingsModal);
p1IconSelector.addEventListener("change",p1IconSelectorChange);
p2IconSelector.addEventListener("change",p2IconSelectorChange);
roundsSelector.addEventListener("change",roundsSelectorChange);
const startGame = ()=> {
    for (var box of boxes) 
        box.addEventListener("click", gameBoardClicked);
};

// Main sequence. Runs after each click on the game board
function gameBoardClicked(e) {
    if (gameStats.gameOver) return; // Disregard click if new game not started
    if (gameStats.roundOver) return;  // Disregard click if new round not started
    if (clickedBoxes[this.id] === 0) { // Mark the box as clicked     
        clickedBoxes[this.id] = gameStats.currentPlayer.value;
        placeIcon(this.id, gameStats.currentPlayer.icon.src1, gameStats.currentPlayer.icon.alt1);
    }

    //1. Check if there is a winning sequence of boxes after each click
    const isWinner = checkForWinner();
    if (isWinner != false) { 
        state = 2;
        state = updateGameStats(2);
        updateBoardVisuals(state);  
        let winningBoxSequence = isWinner;   
        winningBoxSequence.map(box => boxes[box].style.backgroundColor = winIndicator);
        return;
    }

    // 2. Check if there is a tie / all boxes are clicked but no win
    if (!clickedBoxes.includes(0)) {
        state = 3;
        state = updateGameStats(state);
        updateBoardVisuals(state);   
    }

    // 3. No win or tie, continue the current round
    gameStats.currentPlayer = gameStats.currentPlayer == p1 ? p2 : p1;
    return;
}

// ----------- Helper functions and declarations -------------

// Checks if there is a winning combination of clicked boxes
function checkForWinner() {
    for (const combination of winningCombinations) {
        //select one winning combination of boxes at a time
        let [a,b,c] = combination;
        //check if all boxes in the combination have been clicked by the same player
        if (Math.abs((clickedBoxes[a] + clickedBoxes[b] + clickedBoxes[c])) === 30) {
            return [a,b,c];
        }
    }   
    return false;
}

// Add a fruit-icon to a box on the board
function placeIcon(id, src, alt) {
    var elem = document.createElement("img");
    elem.setAttribute("src", src);
    elem.setAttribute("height", "60px");
    elem.setAttribute("width", "60px");
    elem.setAttribute("alt", alt);
    document.getElementById(id).appendChild(elem);
 }

 // Replace all icons on the board with Happy/Sad fruits
function flipIcons(player){
    for (let i = 0; i<clickedBoxes.length; i++) {
        let boxId = i;
        let boxValue = clickedBoxes[i];
        let currentBox = document.getElementById(boxId);
        if (boxValue === player.value && player.winner) {
            currentBox.removeChild(currentBox.firstChild); //remove old Icon
            placeIcon(boxId, player.icon.src2, player.icon.alt2); //place new Icon, happy
        } else if (boxValue === player.value && !player.winner) {
            currentBox.removeChild(currentBox.firstChild); //remove old Icon
            placeIcon(boxId, player.icon.src3, player.icon.alt3); //place new Icon, sad
        }
    }
}

// Update the visual texts and boxes on the Webpage. Adapted to the state of the game
function updateBoardVisuals(state) {
    switch (state) { 
        case 0: // new game, reset all
            headerDiv.innerHTML = `<h1>Tic Tac Toe</h1>`;
            p1ScoreDiv.innerHTML = `P1 score`;
            p2ScoreDiv.innerHTML = `P2 score`;
            roundsDiv.innerHTML = `Rounds played`;
            restartBtn.innerHTML = `New round`;
            for (box of boxes ) {
                box.innerText = '';
                box.style.backgroundColor = '';
            }
            break;
        case 1: // new round, reset round
            headerDiv.innerHTML = `<h1>Tic Tac Toe</h1>`;
            for (var box of boxes ) {
                box.innerText = '';
                box.style.backgroundColor = '';
                restartBtn.innerHTML = `New round!`;
            }
            roundsDiv.innerHTML = `${gameStats.roundsPlayed} out of ${gameSettings.roundsPerGame} played`;
            break;   
        case 2: // round finished with a win
            p1ScoreDiv.innerHTML = `P1 wins<br> ${p1.wins}`;
            p2ScoreDiv.innerHTML = `P2 wins<br> ${p2.wins}`;
            roundsDiv.innerHTML = `${gameStats.roundsPlayed} out of ${gameSettings.roundsPerGame} played`;
            flipIcons(p1);
            flipIcons(p2);
            if (gameStats.roundOver && !gameStats.gameOver) {
                if (p1.winner) {
                headerDiv.innerHTML = `<h1>${p1.label} has won the round!</h1>`;
                } else if (p2.winner) {
                    headerDiv.innerHTML = `<h1>${p2.label} has won the round!</h1>`;
                }
                restartBtn.innerText = `New round`;
            }
            if (gameStats.gameOver) {
                if (p1.winner && !p2.winner) {
                    headerDiv.innerHTML = `<h1>${p1.label} has won the game!</h1>`;
                } else if (!p1.winner && p2.winner) {
                    headerDiv.innerHTML = `<h1>${p2.label} has won the game!</h1>`;
                } else if (p1.winner && p2.winner) {
                    headerDiv.innerHTML = `This game is a Tie!</h1>`;
                }
                restartBtn.innerText = `New game`;
            }
                break;
        case 3:  // round finished with a tie
            p1ScoreDiv.innerHTML = `P1 wins<br> ${p1.wins}`;
            p2ScoreDiv.innerHTML = `P2 wins<br> ${p2.wins}`;
            roundsDiv.innerHTML = `${gameStats.roundsPlayed} out of ${gameSettings.roundsPerGame} played`;
            if (gameStats.roundOver && !gameStats.gameOver) {            
                headerDiv.innerHTML = `<h1>This round is a Tie!</h1>`;
                restartBtn.innerText = `New round`;
            } else if (gameStats.gameOver) {            
                headerDiv.innerHTML = `<h1>This game is a tie!</h1>`;
                restartBtn.innerText = `New game`;
            }
            break;
    }
}

// Update statistics, state, loggs of the progress of the game
function updateGameStats(state) {
    switch(state) {
        case 0: // New game requested, reset all
            gameStats.roundsPlayed = 0;
            gameStats.roundOver = false;
            gameStats.gameOver = false;
            gameStats.currentPlayer = p1;
            p1.wins = 0;
            p2.wins = 0;
            p1.winner = false;
            p2.winner = false;
            for (let i=0; i<9; i++) {
                clickedBoxes[i] = 0;
            }
            break;
        case 1: // New round requested, reset round
            for (let i=0; i<9; i++) {
                clickedBoxes[i] = 0;
            }
            gameStats.roundOver = false;
            gameStats.gameOver = false;
            break;
        case 2: // round finished with a win
            gameStats.roundOver = true;
            gameStats.roundsPlayed++;
            gameStats.currentPlayer.wins++;
            p1.winner = gameStats.currentPlayer === p1 ? true : false;
            p2.winner = gameStats.currentPlayer === p2 ? true : false;
            gameStats.currentPlayer = gameStats.currentPlayer === p1 ? p2 : p1;
            if (gameStats.roundsPlayed != gameSettings.roundsPerGame) {      
                gameStats.gameOver = false;
                state = 2;
            } else if (gameStats.roundsPlayed === gameSettings.roundsPerGame) {      
                gameStats.gameOver = true;
                if (`${p1.wins}` > `${p2.wins}`) {
                    p1.winner = true;
                    p2.winner = false;
                    state = 2;
                } else if (`${p1.wins}` < `${p2.wins}`) {
                    p1.winner = false;
                    p2.winner = true;
                    state = 2;
                } else if (`${p2.wins}` === `${p1.wins}`) {
                    p1.winner = true;
                    p2.winner = true;
                    state = 3;    
                }
            }
            return state;
        case 3: // round finished with a tie
            gameStats.roundOver = true;
            gameStats.roundsPlayed++;
            p1.winner = false;
            p2.winner = false;
            gameStats.currentPlayer = gameStats.currentPlayer === p1 ? p2 : p1;
            if (gameStats.roundsPlayed !== gameSettings.roundsPerGame) {            
                gameStats.gameOver = false;
                state = 3;
            } else if (gameStats.roundsPlayed === gameSettings.roundsPerGame) {            
                gameStats.gameOver = true;
                state = 3;
            }
            return state;
    } 
}

// start a new round or game
function restartGame() {
    if (gameStats.gameOver) {
        updateGameStats(0);
        updateBoardVisuals(0);       
    } else  if (gameStats.roundOver) {
        updateGameStats(1);
        updateBoardVisuals(1);      
    } 
    return;
}
    
function welcomeModal() {
    resetModalContent();
    let wModal = document.getElementById("welcomeModal");
    wModal.classList.remove("hide");
    modal.show();
}

function rulesModal() {
    resetModalContent();
    let rModal = document.getElementById("rulesModal");
    rModal.classList.remove("hide");
    modal.show();
}

function settingsModal() {
    resetModalContent();
    let sModal = document.getElementById("settingsModal");
    sModal.classList.remove("hide");
    modal.show();
 }

function resetModalContent() {
    document.getElementById("rulesModal").classList.add("hide");
    document.getElementById("settingsModal").classList.add("hide");
    document.getElementById("welcomeModal").classList.add("hide");
}

function p1IconSelectorChange(event) {
    p1.icon = icons[event.target.value];
}

function p2IconSelectorChange(event) {
    p2.icon = icons[event.target.value];
}

function roundsSelectorChange(event) {
    gameSettings.roundsPerGame = numOfRounds[event.target.value];
    gameStats.gameOver = true;
    restartGame();
}

// Initial actions: Welcome players. Set the board and gamestats. Start the game
updateBoardVisuals(0);
updateGameStats(0);
window.onload = function() {
    welcomeModal();
};
startGame();