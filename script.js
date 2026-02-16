function generateRandomInt(min, max){
    if(typeof min !== "number" || typeof max !== "number"){
        console.log(typeof min);
        console.log(typeof max);
        throw new TypeError("Expected argument type: Number ");
    }
    return (Math.floor(Math.random() * (max - min + 1) + min));
}

/**
 * Randomly picks the sequence of 'tic', 'tac', and 'toe' to appear in the title
 * @returns String representing a randomized sequence of 'tic', 'tac' and 'toe'
 */
function generateHeaderString(){
    titleElements = ["Tic", "Tac", "Toe"];
    let headerString = "";
    let headerStringIncomplete = true;
    let start = 0;
    let end = titleElements.length - 1;

    while(headerStringIncomplete){

        headerString = headerString.concat(titleElements.splice(generateRandomInt(start,end--),1)[0]);

        if(titleElements.length === 0){
            headerStringIncomplete = false;
        } else {
            headerString = headerString.concat("-");
        }
    }
    return headerString;
}

const titleButton = document.querySelector("#title");

{ /* eventListerners for aesthetic purposes */
titleButton.addEventListener("mouseover", (e)=>{
    titleButton.style.borderColor = "lightgray";
});

titleButton.addEventListener("mouseout", (e)=>{
    titleButton.style.borderColor = "cyan";
})
}

// Randomizes the header when clicking on it
titleButton.addEventListener("click", (e)=>{
    
    // console.log(e.target.id);
    // console.dir(titleButton);

    // Regenerates title if it's the same as the previous.
    let headerString = generateHeaderString();
    while(headerString === titleButton.innerText){
        headerString = generateHeaderString();
    }
    titleButton.innerText = headerString;

});

// Progresses the game and changes the notification text below the grid
function changeTurn(){
    // if the turncounter is even, it's O's turn, X's otherwise.
    playerTurn++;
    if (playerTurn%2 === 0){
        turnTracker.innerText = "Player Turn: O";
    } else {
        turnTracker.innerText = "Player Turn: X";
    }
    return playerTurn;
}

{ // functions pertaining to checking for wins:
// method for checking if any row is a winning sequence
function checkHorizontal(gridData){
    console.log("hor");
    // array for storing one row at a time, differs from gridData, in that undefined is added to this array to represent vacancy
    hArr = [];
    for(let i = 0; i < gridData.length; i++){
        for(let k = 0; k < gridData.length; k++){
            // copying a row to hArr
            hArr.push(gridData[i][k]);
        }
        // match is a boolean that represents if the row stored in hArr is a winning sequence
        let match = hArr.every( x => x === hArr[0] && x !== undefined);
        // if any row is a winning sequence, return true
        if(match){
            console.log(hArr, match);
            return true;
        }
        // current row is not a winning sequence, clear hArr to prep for the next row
        hArr = [];
    }
    return false;
}

// method for checking if any column is a winning sequence
function checkVertical(gridData){
    console.log("ver");
    // array fro storing one column at a time, differeces from gridData, in that undefined is added to this array to represent vacancy.
    vArr = [];
    for(let i = 0; i < gridData.length; i++){
        for(let k = 0; k < gridData.length; k++){
            // copying a column to vArr
            vArr.push(gridData[k][i]);
        }
        // match is a boolean that represents if the column stroed in hArr is a winning sequence
        let match = vArr.every(x => x === vArr[0] && x !== undefined);
        // if any column is a winning sequence, return true
        if(match){
            console.log(vArr, match);
            return true;
        }
        // current column is not a winning sequence, clear hArr to prep for the next column
        vArr = [];
    }
    return false;
}

// method to checks the diagonals of the grid for winning sequences
function checkDiags(gridData){
    console.log("diag");
    // array stores one diagonal at a time
    let diagArr = [];
    // storing the top-left to down-right diagonal
    for(let i = 0; i < gridData.length; i++){
        diagArr.push(gridData[i][i]);
    }
    // match is a boolean that represents if the diagonal is a winning sequence
    let match = diagArr.every( x => x === diagArr[0] && x !== undefined && diagArr.length > 2);
    console.log(diagArr, match);
    // match represents a winning sequence, return true
    if(match){
        return true; 
    }

    // clearing the array for the only other possible diagonal
    diagArr = [];
    
    for(let i = gridData.length - 1; i >= 0; i--){
        diagArr.push(gridData[i][gridData.length -1 -i])
    }

    // match is a boolean that represents if the diagonal is a winning sequence
    match = diagArr.every( x => x === diagArr[0] && x !== undefined);
    console.log(diagArr, match);
    // match represents a winning sequence, return true
    if(match){   
        return true; 
    }

    // no diagonal is a winning sequence, return false
    return false;
}

// checks if there is a winning sequence on the board
const victorText = document.querySelector("#victorText");
function checkWin(gridData){
    console.log(gridData);
    if(checkHorizontal(gridData) || checkVertical(gridData) || checkDiags(gridData)){
        if(playerTurn %2 === 0){
            console.log("O WON");
            victorText.innerText = "WINNER: PLAYER O";
        } else {
            console.log("X WON");
            victorText.innerText = "WINNER: PLAYER X";
        }
        return true;
    } 
    if ([...document.querySelectorAll(".cell")].every((cell) => cell.textContent !== "")){
        console.log("tie");
        victorText.innerText = "TIE!";
        return true;
        }
    return false;
}
}

// array used to store the state of the game as it appears on the document
let gridData;
let playerTurn;
// Counts the number of turns that have passed (unrelated to which player will play next): 
const turnTracker = document.querySelector("#turnTracker");
let playedTurns;
startGame();
function startGame(){
    gridData = [[],[],[]];
    // Randomized the starting player
    playerTurn = generateRandomInt(0,1);
    changeTurn(playerTurn);
    playedTurns = 0;    
}

const playAgainButton = document.querySelector("#playAgainButton");
// restarts the game:
playAgainButton.addEventListener("click", (e)=>{
    // starts the game:
    startGame();
    playAgainButton.classList.add("hidden");
    grid.classList.remove("hidden");
    turnTracker.classList.remove("hidden");
    victorText.classList.add("hidden");

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = "";
    })
});

const grid = document.querySelector("#grid");
grid.addEventListener("click", (e)=>{
    // prevents players from modifying the contents of cells that are already marked
    if(e.target.innerText === ""){
        if((playerTurn) %2 === 0){
            e.target.innerText = "O";
            gridData[e.target.id[0]][e.target.id[1]] = "O";
        }
        if((playerTurn)%2 === 1){
            e.target.innerText = "X";
            gridData[e.target.id[0]][e.target.id[1]] = "X";
        }

        playedTurns++;
        // no winning sequences are possible until the fifth turn of the game
        if(playedTurns >= 5){
            if(checkWin(gridData)){
                grid.classList.add("hidden");
                turnTracker.classList.add("hidden");
                playAgainButton.classList.remove("hidden");
                victorText.classList.remove("hidden");
            }
        }
        // counter used to track player turns
        playerTurn = changeTurn();
    }
});


