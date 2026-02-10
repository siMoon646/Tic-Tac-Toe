let titleElements = ["tic", "tac", "toe"];

let arr = [];

function generateRandomInt(min, max){
    if(typeof min !== "number" || typeof max !== "number"){
        console.log(typeof min);
        console.log(typeof max);
        throw new TypeError("Expected argument type: Number ");
    }
    return (Math.floor(Math.random() * (max - min + 1) + min));
}

function checkCompleteness(str){
    let completeness = 0;

    if(typeof str !== "string"){
        throw new TypeError("Expected argument type: String ");
    }

    for(let i = 0; i < 2; i++){
        if(str.includes(titleElements[i])){
            completeness++;
        }
    }
    if(completeness === 2){
        return true;
    }
    return false;
}

function generateHeaderString(){
    titleElements = ["tic", "tac", "toe"];
    let headerString = "";
    let headerStringIncomplete = true;
    let start = 0;
    let end = titleElements.length - 1;
    while(headerStringIncomplete){
        
        // let temp = titleElements[generateRandomInt(0, 2)];
        // if(!headerString.includes(temp)){
        //     headerString = headerString.concat(temp);
        // }
        // if(checkCompleteness(headerString)){
        //     headerStringIncomplete = false;
        // } else {

        //     headerString = headerString.concat("-");
        // }

        headerString = headerString.concat(titleElements.splice(generateRandomInt(start,end--),1)[0]);

        if(titleElements.length === 0){
            headerStringIncomplete = false;
        } else {
            headerString = headerString.concat("-");
        }
    }
    return headerString;

}

let headerString = generateHeaderString();
console.log(headerString);
// console.log(checkCompleteness("toe-tac-tic"));

for(let i = 0; i < 50; i++){
    console.log(generateHeaderString());
}