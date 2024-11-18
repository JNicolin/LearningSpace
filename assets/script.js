// Get references to the DOM
let headerDiv = document.getElementById("headerText")
let p1ScoreDiv = document.getElementById("p1ScoreDisplay")
let p2ScoreDiv = document.getElementById("p2ScoreDisplay")
let roundsDiv = document.getElementById("roundsDisplay")
let restartBtn = document.getElementById("restartBtn")
let navBtnRules = document.getElementById("rulesBtn")
let navBtnSettings = document.getElementById("settingsBtn")
let boxes = document.getElementsByClassName("box")
let p1IconSelector = document.getElementById("p1Icon").value 
let p2IconSelector = document.getElementById("p2Icon").value 
let roundsSelector = document.getElementById("noOfRounds").value
let modal = new bootstrap.Modal(document.getElementById("myModal"))

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
    p2Icon: 4, //Initial value, can be changed by user input
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
const p1 = new Player("P1", 10, 0, icons[gameSettings.p1Icon], false);
const p2 = new Player("P2", -10, 0, icons[gameSettings.p2Icon], false);
let state = 0; // 0 newGame, 1 nextRound, 2 roundWin, 3 roundTie, 4 gameWin, 5 gameTie 
let clickedBoxes = Array(9).fill(0);
gameStats.currentPlayer = p1;
let winIndicator = getComputedStyle(document.body).getPropertyValue("--winningBoxColor")

// Add Events listeners 
restartBtn.addEventListener('click', restartGame) // restart button clicked 
rulesBtn.addEventListener('click', rulesModal) // Navbar button clicked
settingsBtn.addEventListener('click', settingsModal) // Navbar button clicked

const startGame = ()=> {
    for (box of boxes) 
        box.addEventListener("click", boxClicked);
}

// Main sequence. Runs after each user click
function boxClicked(e) {
    if (gameStats.gameOver) return // Stop if the game is already over
    if (gameStats.roundOver) return // Stop if the round is already over

    // Evaluate the effect of a click. Look for a win, a tie or go on to the next round 
    if (clickedBoxes[this.id] === 0) {      
        //1. if the box has not already been clicked, then log value and add a user-icon
        clickedBoxes[this.id] = gameStats.currentPlayer.value
        placeIcon(this.id, gameStats.currentPlayer.icon.src1, gameStats.currentPlayer.icon.alt1)

    //2. Check if there is a winning sequence after each click
    const isWinner = checkForWinner()

    // Update the webpage if there is a win,
    if (isWinner !== false) {
        gameStats.roundsPlayed++
        if (gameStats.roundsPlayed !== gameSettings.roundsPerGame) {
            state = 2 // roundWin 
            updateGameStats(state)
            updateBoardVisuals(state)    
        } else {
            state = p1.wins === p2.wins ? 5 : 4 //gameTie : gameWin
            updateGameStats(state)
            updateBoardVisuals(state)
        }
        let winningBoxSequence = isWinner   
        winningBoxSequence.map(box => boxes[box].style.backgroundColor = winIndicator)
        return
    }

    // 3. Check for tie 
    if (!clickedBoxes.includes(0)) {
        gameStats.roundsPlayed++
        if (gameStats.roundsPlayed !== gameSettings.roundsPerGame) { 
            state = 3 // roundTie
            updateGameStats(state)
            updateBoardVisuals(state)    
        } else {
            state = 5 // gameTie 
            updateGameStats(state)
            updateBoardVisuals(state)    
        }
        return
    }

    // 4. Continue the current round if the round is not over, wait for next click
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

function placeIcon(id, src, alt) {
    var elem = document.createElement("img");
    elem.setAttribute("src", src);
    elem.setAttribute("height", "60px");
    elem.setAttribute("width", "60px");
    elem.setAttribute("alt", alt);
    document.getElementById(id).appendChild(elem);
 }

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
            headerDiv.innerHTML = `<h1>It's a Tie!</h1>`
            p1ScoreDiv.innerHTML = `P1 wins<br> ${p1.wins}`
            p2ScoreDiv.innerHTML = `P2 wins<br> ${p2.wins}`
            roundsDiv.innerHTML = `${gameStats.roundsPlayed} out of ${gameSettings.roundsPerGame} played`
            break;
        case 4: // game finished with a win
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

function updateGameStats(state) {
    switch(state) {
        case 0: // New game, reset all
            gameStats.roundsPlayed = 0
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
            gameStats.currentPlayer.wins++
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
            break;
        case 5: // game finished with a tie
            gameStats.gameOver = true
            break;
    }
} 

function restartGame() {
    state = gameStats.gameOver === true ? 0 : 1 // newGame : nextRound 
    updateGameStats(state)
    updateBoardVisuals(state)
    return
}
    
//Problem - class does not toggle back. 
function rulesModal() {
    document.getElementById("rulesModal").classList.toggle("hide")
    modal.show()
}

function settingsModal() {
    document.getElementById("settingsModal").classList.toggle("hide")
    modal.show()
 }

function welcomeModal() {
    document.getElementById("welcomeModal").classList.toggle("hide")
    modal.show()
}

function winnersModal() {
    document.getElementById("winnersModal").classList.toggle("hide")
    modal.show()
}

window.onload = function() {
    winnersModal()
}

// Start the game initially
updateBoardVisuals(0)
updateGameStats(0)
startGame()