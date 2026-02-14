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

let titleButton = document.getElementById("title");

{ /* functions for aesthetic purposes */
titleButton.addEventListener("mouseover", (e)=>{
    titleButton.style.borderColor = "lightgray";
});

titleButton.addEventListener("mouseout", (e)=>{
    titleButton.style.borderColor = "cyan";
})
}

// Randomizes the header when clicked
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

let grid = document.getElementById("grid");
let playerTurn = 0;

let gridData = [
    [],
    [],
    []
];

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

function checkDiag(){

}

function checkWin(gridData){
    console.log(gridData);
    return checkHorizontal(gridData) || checkVertical(gridData);
}

grid.addEventListener("click", (e)=>{
    // console.dir(e);
    if(e.target.innerText === ""){
        if(playerTurn %2 === 0){
            e.target.innerText = "O";
            gridData[e.target.id[0]][e.target.id[1]] = "O";
        }
        if(playerTurn %2 === 1){
            e.target.innerText = "X";
            gridData[e.target.id[0]][e.target.id[1]] = "X";
        }
        if(playerTurn >= 4){
            console.log(checkWin(gridData));
        }
        playerTurn++;
    }
});