//Variable and Class declarations
let headerText = document.getElementById("headerText")
let restartBtn = document.getElementById("restartBtn")
let boxes = document.getElementsByClassName("box")
let p1Score = document.getElementById("pScore1")
let p2Score = document.getElementById("pScore2")
class Player {
    constructor(symbol, value, wins) {
    this.symbol = symbol;
    this.value = value;
    this.wins = wins;
    }
}

// Preparations, before running the game first time
    // Bring in CSS values
    let winIndicator = getComputedStyle(document.body).getPropertyValue("--winningBoxColor")

    // Initialize varibles with known values
    const player1 = new Player("X", 1, 0);
    const player2 = new Player("O", -1, 0);
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
        this.innerText = current_player.symbol

        //2. Check for win after each click
        const isWinner = checkForWinner()

        // If there is a win,
        if (isWinner !== false) {
            // display a message with who has won and stop the game
            headerText.innerHTML = `${current_player.symbol} has won!`
            current_player.wins++
            p1Score.innerText = `P1 wins: ${player1.wins}`
            p2Score.innerText = `P2 wins: ${player2.wins}`
            
            // and change the color of the boxes in the winning streak
            let winningBoxCross = isWinner   
            winningBoxCross.map(box => boxes[box].style.backgroundColor = winIndicator)

            // and set gameOVer variable
            gameOver = true;
            return
        }

        // 3. Check for a tie 
        if (!board_array.includes(0)) {
            // display a message and stop the game
            headerText.innerHTML = "It's a tie!";
            gameOver = true;
            return;
        }

        // 4. If there is no win and no tie,
        //then let the next player click a box
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
    headerText.innerHTML = "Let's Go!"
    headerText.style.color = ''
    current_player = player1
}

// Restart the game if the button is clicked 
restartBtn.addEventListener('click', restart)

// Start the game initially
startGame()
