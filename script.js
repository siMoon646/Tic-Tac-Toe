const titleElements = ["tic", "tac", "toe"];
let arr = [];

function generateRandom(min, max){
    if(typeof min !== "number" || typeof max !== "number"){
        console.log(typeof min);
        console.log(typeof max);
        throw new Error("Arguments are not of type 'number' ");
    }
    return (Math.floor(Math.random() * (max - min + 1) + min));
}

// function contains(String, targetPhrase){
//     if(typeof String !== "string" || targetPhrase !== "strings"){
//         throw new Error("Arguments are not of type 'string' ");
//     }
//     let stringEnded = false;
//     let startIndex = 0;
//     while(!stringEnded){
        
//     }
// }

let headerString = "";

// for(let i = 2; i >= 0; i--){

// }