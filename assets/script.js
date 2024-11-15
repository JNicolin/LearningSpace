// References to the DOM
let headerText = document.getElementById("headerText")
let restartBtn = document.getElementById("restartBtn")
let settingsBtn = document.getElementById("settingsBtn")
let boxes = document.getElementsByClassName("box")
let p1Score = document.getElementById("pScore1")
let p2Score = document.getElementById("pScore2")

// References to the CSS styling
    let winIndicator = getComputedStyle(document.body).getPropertyValue("--winningBoxColor")

// Declaration of Custom classes
class Player {
    constructor(label, value, wins, fruit, winner) {
    this.label = label;
    this.value = value;
    this.wins = wins;
    this.fruit = fruit;
    this.winner = winner;
    }
}

class Icon {
    constructor(label, src1, alt1, src2, alt2, src3, alt3) {
        this.label = label; 
        this.src1 = src1;
        this.alt1 = alt1;
        this.src2 = src2;
        this.alt2 = src2;
        this.src3 = src3;
        this.alt3 = src3;
    }
}

// Initialize varibles with known values
const ic_orange = new Icon("Orange", "assets/img/1_OrN.png", "Neutral orange icon", "assets/img/1_OrH.png", "Happy orange icon", "assets/img/1_OrS.png", "Sad orange icon")
const ic_strawberry = new Icon("Strawberry", "assets/img/2_StN.png", "Neutral strawberry icon", "assets/img/2_StH.png", "Happy strawberry icon", "assets/img/2_StS.png", "Sad strawberry icon")
const ic_apple = new Icon("Apple", "assets/img/3_ApN.png", "Neutral apple icon", "assets/img/3_ApH.png", "Happy apple icon", "assets/img/3_ApS.png", "Sad apple icon")
const ic_pear = new Icon("Pear", "assets/img/4_PeN.png", "Neutral pear icon", "assets/img/4_PeH.png", "Happy pear icon", "assets/img/4_PeS.png", "Sad pear icon")
const ic_citrus = new Icon("Citrus", "assets/img/5_CiN.png", "Neutral citrus icon", "assets/img/5_CiH.png", "Happy citrus icon", "assets/img/5_CiS.png", "Sad citrus icon")
const player1 = new Player("P1", 1, 0, ic_apple, false);
const player2 = new Player("P2", -1, 0, ic_orange, false);
let current_player = player1 //p1 will start playing
let board_array = Array(9).fill(0) //Array to keep track of what squares have been clicked
let gameOver = false; //State of game, it is not over from start

// Add eventlisteners to each box, initiate the main sequence after any click
const startGame = ()=> {
    for (box of boxes) 
        box.addEventListener("click", boxClicked);

}

// Main sequence. Runs after each user click
function boxClicked(e) {
// Stop if the game is already over
if (gameOver) return

// Evaluate the effect of a click. Look for a win, a tie or go on to the next round 
if (board_array[this.id] === 0) {      
    //1. if the box has not already been clicked, then log value and add a user-icon
    board_array[this.id] = current_player.value
    placeIcon(this.id, current_player.fruit.src1, current_player.fruit.alt1)

    //2. Check for win after each click
    const isWinner = checkForWinner()

    // Update the webpage if there is a win,
    if (isWinner !== false) {
        current_player.winner = true;
        current_player.wins++
        headerText.innerHTML = `${current_player.label} has won!`
        p1Score.innerText = `P1 wins: ${player1.wins}`
        p2Score.innerText = `P2 wins: ${player2.wins}`
        flipIcons(player1)
        flipIcons(player2)
        
        // Change colors of the winning combination of boxes
        let winningBoxSequence = isWinner   
        winningBoxSequence.map(box => boxes[box].style.backgroundColor = winIndicator)

        // Close this turn of the game
        gameOver = true;
        current_player = current_player == player1 ? player2 : player1
        return
    }

    // 3. Check for tie 
    if (!board_array.includes(0)) {
        // Display a message to show there is a tie
        headerText.innerHTML = "It's a tie!";
        
        // Close this turn of the game
        gameOver = true;
        current_player = current_player == player1 ? player2 : player1
        return;
    }

    // 4. If there is no win and no tie,
    //then continue the current game let the next player click a box
    current_player = current_player == player1 ? player2 : player1
    }
}

// Helper functions and declarations
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// function to if the check if the current click gave a winner
function checkForWinner() {
    for(const combination of winningCombinations){
        //select one winning combination of boxes at a time
        let [a,b,c] = combination
        //check if all boxes in the combination have been clicked by the same player
        if (Math.abs((board_array[a] + board_array[b] + board_array[c]))==3) {
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
    for (i = 0; i<board_array.length; i++) {
        let boxId = i
        let boxValue = board_array[i]
        let currentBox = document.getElementById(boxId)
        if (boxValue === player.value && player.winner) {
            currentBox.removeChild(currentBox.firstChild); //remove old Icon
            placeIcon(boxId, player.fruit.src2, player.fruit.alt2) //place new Icon, happy
        } else if (boxValue === player.value && !player.winner) {
            currentBox.removeChild(currentBox.firstChild); //remove old Icon
            placeIcon(boxId, player.fruit.src3, player.fruit.alt3) //place new Icon, sad
        }
    }
}

// Function to re-iniitalise the game-board and game-parameters
function restart() {
    board_array.fill(0)

    for (box of boxes ) {
        box.innerText = ''
        box.style.backgroundColor = ''
    }

    gameOver = false
    player1.winner = false
    player2.winner = false
    headerText.innerHTML = `Let's Go ${current_player.label}! `
    headerText.style.color = ''
    
}

// Restart the game if the button is clicked 
restartBtn.addEventListener('click', restart)

// Start the game initially
startGame()
