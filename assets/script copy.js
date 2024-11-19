// Get references to the DOM
let headerDiv = document.getElementById("headerText")
let p1ScoreDiv = document.getElementById("p1ScoreDisplay")
let p2ScoreDiv = document.getElementById("p2ScoreDisplay")
let roundsDiv = document.getElementById("roundsDisplay")
let restartBtn = document.getElementById("restartBtn")
let navBtnRules = document.getElementById("rulesBtn")
let navBtnSettings = document.getElementById("settingsBtn")
let boxes = document.getElementsByClassName("box")
let modal = new bootstrap.Modal(document.getElementById("myModal"))
let p1IconSelector = document.getElementById("p1Icon") 
let p2IconSelector = document.getElementById("p2Icon") 
let roundsSelector = document.getElementById("rounds")

// Custom class- and object-definitions
class Player {
    constructor(label, value, noOfWins, iconId, isWinner) {
    this.label = label;
    this.value = value;
    this.wins = noOfWins;
    this.icon = iconId;
    this.winner = isWinner;
    }
};

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
};

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
const icon1 = new Icon("Orange", "assets/img/1_OrN.png", "Neutral orange icon", "assets/img/1_OrH.png", "Happy orange icon", "assets/img/1_OrS.png", "Sad orange icon")
const icon2 = new Icon("Strawberry", "assets/img/2_StN.png", "Neutral strawberry icon", "assets/img/2_StH.png", "Happy strawberry icon", "assets/img/2_StS.png", "Sad strawberry icon")
const icon3 = new Icon("Apple", "assets/img/3_ApN.png", "Neutral apple icon", "assets/img/3_ApH.png", "Happy apple icon", "assets/img/3_ApS.png", "Sad apple icon")
const icon4 = new Icon("Pear", "assets/img/4_PeN.png", "Neutral pear icon", "assets/img/4_PeH.png", "Happy pear icon", "assets/img/4_PeS.png", "Sad pear icon")
const icon5 = new Icon("Citrus", "assets/img/5_CiN.png", "Neutral citrus icon", "assets/img/5_CiH.png", "Happy citrus icon", "assets/img/5_CiS.png", "Sad citrus icon")
const icons =[icon1, icon2, icon3, icon4, icon5]
let p1 = new Player("P1", 10, 0, icons[gameSettings.p1Icon], false);
let p2 = new Player("P2", -10, 0, icons[gameSettings.p2Icon], false);
let state = 0; // 0 newGame, 1 nextRound, 2 roundWin, 3 roundTie, 4 gameWin, 5 gameTie 
let clickedBoxes = Array(9).fill(0);
gameStats.currentPlayer = p1;
let winIndicator = getComputedStyle(document.body).getPropertyValue("--winningBoxColor")

// Add Events listeners 
restartBtn.addEventListener('click', restartGame)  
rulesBtn.addEventListener('click', rulesModal)
settingsBtn.addEventListener('click', settingsModal)
p1IconSelector.addEventListener("change",p1IconSelectorChange)
p2IconSelector.addEventListener("change",p2IconSelectorChange)
roundsSelector.addEventListener("change",roundsSelectorChange)
const startGame = ()=> {
    for (box of boxes) 
        box.addEventListener("click", gameBoardClicked);
}

// Main sequence. Runs after each click on the game board
function gameBoardClicked(e) {
     console.log(gameSettings.roundsPerGame)
    if (gameStats.gameOver) return // Disregard click if new game not started
    if (gameStats.roundOver) return  // Disregard click if new round not started
    if (clickedBoxes[this.id] === 0) { // Mark the box as clicked     
        clickedBoxes[this.id] = gameStats.currentPlayer.value
        placeIcon(this.id, gameStats.currentPlayer.icon.src1, gameStats.currentPlayer.icon.alt1)

    //1. Check if there is a winning sequence after each click
    const isWinner = checkForWinner()
    //There is a win
    if (isWinner != false) { 
        gameStats.roundsPlayed++
        //There are more rounds to play
        if (gameStats.roundsPlayed != gameSettings.roundsPerGame) {
            state = 2
            updateGameStats(state)
            updateBoardVisuals(state)    
        //All rounds are played, end the game
        } else {
            gameStats.currentPlayer.wins++ 
            state = p1.wins === p2.wins ? 5 : 4
            updateGameStats(state)
            updateBoardVisuals(state)
        }
        let winningBoxSequence = isWinner   
        winningBoxSequence.map(box => boxes[box].style.backgroundColor = winIndicator)
        return
    }

    // 2. There is a tie
    if (!clickedBoxes.includes(0)) {
        gameStats.roundsPlayed++
        // The round ended with a tie
        if (gameStats.roundsPlayed != gameSettings.roundsPerGame) { 
            state = 3
            updateGameStats(state)
            updateBoardVisuals(state)    
        // The game ended with a tie
        } else {
            state = 5 // gameTie 
            updateGameStats(state)
            updateBoardVisuals(state)    
        }
        return
    }

    // 3. No win or tie, continue the current round
    gameStats.currentPlayer = gameStats.currentPlayer == p1 ? p2 : p1
    }
}

// ----------- Helper functions and declarations -------------

// Checks if there is a winning combination of clicked boxes
function checkForWinner() {
    for (const combination of winningCombinations) {
        //select one winning combination of boxes at a time
        let [a,b,c] = combination
        //check if all boxes in the combination have been clicked by the same player
        if (Math.abs((clickedBoxes[a] + clickedBoxes[b] + clickedBoxes[c])) === 30) {
            return [a,b,c]
        }
    }   
    return false
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
    for (i = 0; i<clickedBoxes.length; i++) {
        let boxId = i
        let boxValue = clickedBoxes[i]
        let currentBox = document.getElementById(boxId)
        if (boxValue === player.value && player.winner) {
            currentBox.removeChild(currentBox.firstChild); //remove old Icon
            placeIcon(boxId, player.icon.src2, player.icon.alt2) //place new Icon, happy
        } else if (boxValue === player.value && !player.winner) {
            currentBox.removeChild(currentBox.firstChild); //remove old Icon
            placeIcon(boxId, player.icon.src3, player.icon.alt3) //place new Icon, sad
        }
    }
}

// Update the visual texts and boxes on the Webpage. Adapted to the state of the game
function updateBoardVisuals(state) {
    switch (state) { 
        case 0: // new game, reset all
            headerDiv.innerHTML = `<h1>Tic Tac Toe</h1>`
            p1ScoreDiv.innerHTML = `P1 score`
            p2ScoreDiv.innerHTML = `P2 score`
            roundsDiv.innerHTML = `Rounds played`
            restartBtn.innerHTML = `New round`
            for (box of boxes ) {
                box.innerText = ''
                box.style.backgroundColor = ''
            }
            break;
        case 1: // new round, reset round
            headerDiv.innerHTML = `<h1>Tic Tac Toe</h1>`
            for (box of boxes ) {
                box.innerText = ''
                box.style.backgroundColor = ''
            }
            roundsDiv.innerHTML = `${gameStats.roundsPlayed} out of ${gameSettings.roundsPerGame} played`
            break;   
        case 2: // round finished with a win
            headerDiv.innerHTML = `<h1>${gameStats.currentPlayer.label} has won the round!</h1>`
            p1ScoreDiv.innerHTML = `P1 wins<br> ${p1.wins}`
            p2ScoreDiv.innerHTML = `P2 wins<br> ${p2.wins}`
            roundsDiv.innerHTML = `${gameStats.roundsPlayed} out of ${gameSettings.roundsPerGame} played`
            flipIcons(p1)
            flipIcons(p2)
            break;
        case 3:  // round finished with a tie
            headerDiv.innerHTML = `<h1>This round is a Tie!</h1>`
            p1ScoreDiv.innerHTML = `P1 wins<br> ${p1.wins}`
            p2ScoreDiv.innerHTML = `P2 wins<br> ${p2.wins}`
            roundsDiv.innerHTML = `${gameStats.roundsPlayed} out of ${gameSettings.roundsPerGame} played`
            break;
        case 4: // game finished with a win
            gameStats.currentPlayer.wins++

            if (p1.winner && !p2.winner) {
                headerDiv.innerHTML = `<h1>${p1.label} has won the game!</h1>`
            } else if (!p1.winner && p2.winner) {
                headerDiv.innerHTML = `<h1>${p2.label} has won the game!</h1>`
            } else if (p1.winner && p2.winner) {
                headerDiv.innerHTML = `It's a Tie!</h1>`
            }
            p1ScoreDiv.innerHTML = `P1 wins<br> ${p1.wins}`
            p2ScoreDiv.innerHTML = `P2 wins<br> ${p2.wins}`
            roundsDiv.innerHTML = `${gameStats.roundsPlayed} out of ${gameSettings.roundsPerGame} played`
            restartBtn.innerText = `New game`
            flipIcons(p1)
            flipIcons(p2)
            break;
        case 5: // game finished with a tie
            headerDiv.innerHTML = `<h1>It is a tie!</h1>`
            p1ScoreDiv.innerHTML = `P1 wins<br> ${p1.wins}`
            p2ScoreDiv.innerHTML = `P2 wins<br> ${p2.wins}`
            roundsDiv.innerHTML = `${gameStats.roundsPlayed} out of ${gameSettings.roundsPerGame} played`
            restartBtn.innerText = `New game`
            break;   
    }
}

// Update statistics, state, loggs of the progress of the game
function updateGameStats(state) {
    switch(state) {
        case 0: // New game, reset all
            gameStats.roundsPlayed = 0
            gameStats.roundOver = false
            gameStats.gameOver = false
            gameStats.currentPlayer = p1
            p1.wins = 0
            p2.wins = 0
            p1.winner = false
            p2.winner = false
            for (i=0; i<9; i++) {
                clickedBoxes[i] = 0
            }
            break;
        case 1: // new round, reset round
            for (i=0; i<9; i++) {
                clickedBoxes[i] = 0
            }
            gameStats.roundOver = false
            break;
        case 2: // round finished with a win
            gameStats.currentPlayer.wins++
            gameStats.roundOver = true
            p1.winner = gameStats.currentPlayer === p1 ? true : false
            p2.winner = gameStats.currentPlayer === p2 ? true : false 
            gameStats.currentPlayer === p1 ? p2 : p1
            break;
        case 3: // round finished with a tie
            gameStats.roundOver = true
            gameStats.currentPlayer === p1 ? p2 : p1
            p1.winner = false
            p2.winner = false
            break;
        case 4: // game finished with a win
            if (`${p1.wins}` > `${p2.wins}`) {
                p1.winner = true
                p2.winner = false
            } else if (`${p2.wins}` > `${p1.wins}`) {
                p1.winner = false
                p2.winner = true
            } else if (`${p2.wins}` === `${p1.wins}`) {
                p1.winner = true
                p2.winner = true
            }
            gameStats.gameOver = true
            gameStats.roundOver = true
            break;
        case 5: // game finished with a tie
            gameStats.gameOver = true
            gameStats.roundOver = true
            break;
    }
} 

// // take a user input to set how many rounds to play per game
// function updateSelectedRounds(selectedValue) {
//     gameSettings.roundsPerGame = selectedValue
// }

// // take user input to set player 1 icon
// function updateP1Icon(selectedValue) {
//     gameSettings.p1Icon = selectedValue
// }

// // take user input to set player 2 icon
// function updateP2Icon(selectedValue) {
//     gameSettings.p2Icon = selectedValue
// }

// start a new round or game
function restartGame() {
    state = gameStats.gameOver === true ? 0 : 1 // newGame : nextRound 
    updateGameStats(state)
    updateBoardVisuals(state)
    return
}
    
function welcomeModal() {
    resetModalContent()
    let wModal = document.getElementById("welcomeModal")
    wModal.classList.remove("hide")
    modal.show()
}

function rulesModal() {
    resetModalContent()
    rModal = document.getElementById("rulesModal")
    rModal.classList.remove("hide")
    modal.show()
}

function settingsModal() {
    resetModalContent()
    let sModal = document.getElementById("settingsModal")
    sModal.classList.remove("hide")
    modal.show()
 }

function winnersModal() {
    resetModalContent()
    winModal = document.getElementById("winnersModal")
    winModal.classList.remove("hide")
    `<p>The winner is ${gameStats.currentPlayer.label}</p>
    <p>Want to play again?</p>`
    modal.show()
}

function resetModalContent() {
    document.getElementById("rulesModal").classList.add("hide")
    document.getElementById("settingsModal").classList.add("hide")
    document.getElementById("winnersModal").classList.add("hide")
    document.getElementById("welcomeModal").classList.add("hide")
}

function p1IconSelectorChange(event) {
    p1.icon = icons[event.target.value]
}

function p2IconSelectorChange(event) {
    p2.icon = icons[event.target.value]
}

function roundsSelectorChange(event) {
    gameSettings.roundsPerGame = 2 // event.target.value
    gameStats.gameOver = true
}

// Initial actions: Welcome players. Set the board and gamestats. Start the game
updateBoardVisuals(0)
updateGameStats(0)
window.onload = function() {
    welcomeModal()
}
startGame()