let headerText = document.getElementById("headerText")
let restartBtn = document.getElementById("restartBtn")
let boxes = document.getElementsByClassName("box")

// Preparations
// Bring in CSS values
let winIndicator = getComputedStyle(document.body).getPropertyValue("--winningBoxColor")

// Initialize varibles with known values
const cross_X = "X" //p1 will play with this symbol
const round_O = "O" //p2 will play with this symbol
let currentPlayer = cross_X //p1 will start playing
let board_array = Array(9).fill(null) //Array to keep track of what squares have been clicked
let gameOver = false; //State of game, it is not over from start

// Add eventlisteners to each box, react if a box is clicked
const startGame = ()=> {
    for (box of boxes) 
        box.addEventListener("click", boxClicked);
}

// Main sequence. Runs after each click
function boxClicked(e){
    // Stop if the game is already over
    if (gameOver) return

    // Store the id of the box that was clicked
    const id = this.id

    // Evaluate the effect of a click. Look for a win, a tie or go on to the next round 
    if (board_array[id] == null) {      
        //1. if the box has not already been clicked, then log it to the current player
        board_array[id] = currentPlayer
        this.innerText = currentPlayer

        //2. Check for win after each click
        const isWinner = checkForWinner()

            // If there is a win,
            if (isWinner !== false) {
                // display a message with who has won and stop the game
                headerText.innerHTML = `${currentPlayer} has won!`
                
                // and change the color of the boxes in the winning streak
                let winningBoxCross = isWinner   
                winningBoxCross.map(box => boxes[box].style.backgroundColor = winIndicator)

                // and set gameOVer variable
                gameOver = true;
                return
            }

        // 3. Check for a tie 
            if (!board_array.includes(null)) {
                // display a message and stop the game
                headerText.innerHTML = "It's a tie!";
                gameOver = true;
                return;
            }

        // 4. If there is no win and no tie
            //then let the next player click a box
            currentPlayer = currentPlayer == cross_X ? round_O : cross_X
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

// function to if the check if the current click was a winner
function checkForWinner(){
    for(const combination of winningCombinations){
        let [a,b,c] = combination

        if (board_array[a] && (board_array[a]==board_array[b] && board_array[a]==board_array[c])) {
            return [a,b,c]
        }
    }
    return false
}

// Function to re-iniitalise the game-board, texts and game-parameters
function restart(){
    board_array.fill(null)

    for (box of boxes ) {
        box.innerText = ''
        box.style.backgroundColor = ''
    }

    gameOver = false

    headerText.innerHTML = "Let's Go!"
    headerText.style.color = ''

    currentPlayer = cross_X
}

// Restart the game if the button is clicked 
restartBtn.addEventListener('click', restart)

// Start the game for the first time
startGame()
