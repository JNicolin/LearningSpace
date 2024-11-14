//Variable and Class declarations
let headerText = document.getElementById("headerText")
let restartBtn = document.getElementById("restartBtn")
let boxes = document.getElementsByClassName("box")
let p1Score = document.getElementById("pScore1")
let p2Score = document.getElementById("pScore2")

// var elem = document.createElement("img");
// elem.setAttribute("src", "images/hydrangeas.jpg");
// elem.setAttribute("height", "768");
// elem.setAttribute("width", "1024");
// elem.setAttribute("alt", "Flower");

class Player {
    constructor(label, symbol, value, wins, icon) {
    this.label = label;
    this.symbol = symbol;
    this.value = value;
    this.wins = wins;
    this.icon = icon;
    }
}

// Preparations, before running the game first time
    // Bring in CSS values
    let winIndicator = getComputedStyle(document.body).getPropertyValue("--winningBoxColor")

    // Initialize varibles with known values
    const player1 = new Player("P1", "X", 1, 0, "/assets/img/1_citrus_happy.png");
    const player2 = new Player("P2", "O", -1, 0, "/assets/img/2_orange_happy.png");
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
        //1. if the box has not already been clicked, then log it to the current player
        board_array[this.id] = current_player.value
        //this.innerText = current_player.symbol
        placeIcon(this.id, current_player.icon)

        //2. Check for win after each click
        const isWinner = checkForWinner()

        // Update the webpage if there is a win,
        if (isWinner !== false) {
            // Display a message of who has won and show the accumulated points
            headerText.innerHTML = `${current_player.label} has won!`
            current_player.wins++
            p1Score.innerText = `P1 wins: ${player1.wins}`
            p2Score.innerText = `P2 wins: ${player2.wins}`
            
            // Change colors of the winning combination of boxes
            let winningBoxCross = isWinner   
            winningBoxCross.map(box => boxes[box].style.backgroundColor = winIndicator)

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

// Function to re-iniitalise the game-board and game-parameters
function restart() {
    board_array.fill(0)

    for (box of boxes ) {
        box.innerText = ''
        box.style.backgroundColor = ''
    }

    gameOver = false
    headerText.innerHTML = `Let's Go ${current_player.label}! `
    headerText.style.color = ''
}

function placeIcon(id, icon) {
    var elem = document.createElement("img");
    elem.setAttribute("src", icon);
    elem.setAttribute("height", "60px");
    elem.setAttribute("width", "60px");
    elem.setAttribute("alt", "Happy citrus");
    document.getElementById(id).appendChild(elem);
 }


// Restart the game if the button is clicked 
restartBtn.addEventListener('click', restart)

// Start the game initially
startGame()
