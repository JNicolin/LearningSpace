let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

// briging css values
let winIndicator = getComputedStyle(document.body).getPropertyValue('--winningBoxColor')

// console.log(boxes)

const round_O = "O"
const cross_X = "X"

let currentPlayer = cross_X

// click tracker, track the clicks on div
// keeping records of the X and O and empty spaces

let space_arr = Array(9).fill(null)

// game start

// game over state
let gameOver = false;

const startGame = ()=>{
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e){
    // if game over ture, stop clicks
    if (gameOver) return

    const id = e.target.id

// if space array position null, fill with current player 

    if (space_arr[id] == null) {      
        space_arr[id] = currentPlayer
        e.target.innerText = currentPlayer

        // if not == false, cause false by default
        const winResult = playerWin()
        if (winResult !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`
            let winningBoxCross = winResult

            // color change on win  
            winningBoxCross.map(box => boxes[box].style.backgroundColor = winIndicator)

            // game over state
            gameOver = true;
            return
        }

        // Check for a tie (if all boxes are filled and no winner)
        if (!space_arr.includes(null)) {
            playerText.innerHTML = "It's a tie!";
            playerText.style.color = "red"; // Change the color for a tie
            gameOver = true;
            return;
        }

        // if X then O else X
        currentPlayer = currentPlayer == cross_X ? round_O : cross_X
    }
}

//  player win condition 

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// travers through winConditions, if space arr matches with winConditions, 
// send it else send false

function playerWin(){
    for(const cond of winConditions){
        let [a,b,c] = cond

        if (space_arr[a] && (space_arr[a]==space_arr[b] && space_arr[a]==space_arr[c])) {
            return [a,b,c]
        }
    }
    return false
}

// restart the game

restartBtn.addEventListener('click', restart)

// space_arr will be null, box innertext values will ease, current player will be default
function restart(){
    space_arr.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    gameOver = false

    playerText.innerHTML = "Tic-Tac-Toe"
    playerText.style.color = ''

    currentPlayer = cross_X
}

startGame()