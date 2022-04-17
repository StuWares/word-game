// User writes 3 lines of text, next user is presented with their last line only and writes 3 of their own.
// Continues until the page is full
// Final user is informed they are writing the last lines.
// 36 lines per 'page' = 12 users per story
// 100 characters per line

// TODO: Optional twitter handle

// how to avoid duplication? Will need to give players a time limit to complete?

// Firebase backend?
// can firebase do anonymous sessions?
// database: Story ID, line number, text, twitter handle, user's session id, is locked, is complete.
// Twitter bot to post the completed stories.
// Page load > check for existing session id > if none then generate one >
// find oldest unlocked story that ID hasn't worked on (if no unlocked stories available, offer one already worked on that at least one other has added to since,
// else start a new story) >
// mark the story as in use and send last line to client >
// if user takes longer than 5 mins to submit, kill session and unlock story (offer client a refresh button to try again) > recieve lines from client >
// (optional) recieve twitter handle > unlock story > check if we've hit 36 lines > if so mark as complete and trigger the twitter bot.

// for local play, show the story so far then add a 'next player' button which clears the story so far box

var lineOne = "";
var lineTwo = "";
var lineThree = "";
var wholeStory = [];
var welcomeMessage = "";
var titleMessage = "";
const numberOfLines = 9; // set to 9 for quick debugging, 36 for the full site!

// Not being used at the moment
if (wholeStory.length <= 0) {
    welcomeMessage = "No pressure!";
    titleMessage = "Start the story...";
} else {
    document.getElementById("lastLineWritten").innerHTML = "The last line written was...";
    welcomeMessage = wholeStory[wholeStory.length -1];
    titleMessage = "Continue the story..."
    
}

// Update the story so far - local version will need to supress this until the last line is entered
var combineTheStory = function() {
    for (let i = 0; i < wholeStory.length; i++) {
        document.getElementById('storySoFar').innerHTML += wholeStory[i] + "<br/>";
    }
    document.getElementById("lastLineWritten").innerHTML = "The story so far...";
    document.getElementById('titleText').innerHTML = "Continue the story...";
    document.getElementById("introText").innerHTML =wholeStory[wholeStory.length -1];

    // end the story when 36 lines have been entered
    if (wholeStory.length == numberOfLines) {
        document.getElementById('intro').hidden = true;
        document.getElementById('submitButton').hidden = true;
        document.getElementById('titleText').innerHTML = "The End!";
        document.getElementById("introText").innerHTML = "Enjoy...";
    }
}

// triggered by the button click in game.html
var getNewLines = function() {
    lineOne = document.getElementById('firstLine').value;
    lineTwo = document.getElementById('secondLine').value;
    lineThree = document.getElementById('thirdLine').value;
    document.getElementById('lineOneCount').innerHTML = 100;
    document.getElementById('lineTwoCount').innerHTML = 100;
    document.getElementById('lineThreeCount').innerHTML = 100;

    // check that all 3 lines have been populated
    if (lineOne == "" || lineTwo == "" || lineThree == "") {
        document.getElementById('titleText').innerHTML = "Please write 3 lines";
    } else {
        wholeStory.push(lineOne,lineTwo,lineThree);
        document.getElementById('firstLine').value = "";
        document.getElementById('secondLine').value = "";
        document.getElementById('thirdLine').value = "";
        document.getElementById('storySoFar').innerHTML = ""

        combineTheStory();
    }
}

function lineOneCharCount(str) {
    let strCount = str.length;
    document.getElementById('lineOneCount').innerHTML = 100 - strCount;
} 

function lineTwoCharCount(str) {
    let strCount = str.length;
    document.getElementById('lineTwoCount').innerHTML = 100 - strCount;
} 

function lineThreeCharCount(str) {
    let strCount = str.length;
    document.getElementById('lineThreeCount').innerHTML = 100 - strCount;
} 
