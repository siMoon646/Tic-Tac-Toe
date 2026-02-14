function generateRandomInt(min, max){
    if(typeof min !== "number" || typeof max !== "number"){
        console.log(typeof min);
        console.log(typeof max);
        throw new TypeError("Expected argument type: Number ");
    }
    return (Math.floor(Math.random() * (max - min + 1) + min));
}
/**
 * Given an array of Strings, the checkCompletenessFunction checks if all elements of an array are present as substrings in the string
 * passed as an argument.
 * @param {String} str 
 * @returns true if str contains all elements of 
 */

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

titleButton.addEventListener("mouseover", (e)=>{
    titleButton.style.borderColor = "lightgray";
});

titleButton.addEventListener("mouseout", (e)=>{
    titleButton.style.borderColor = "cyan";
})

