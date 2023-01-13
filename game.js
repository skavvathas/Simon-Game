var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


$(".btn").click(function() {
    //πχ class = "btn green" thelw to userClickedPattern na einai green
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

    playSound("sounds/" + userChosenColour + ".mp3");
    animatePress(userChosenColour);

});


$(document).keypress(function() {

    if (!started) {
        $("h1").text("Level 0");
        nextSequence();
        started = true;
    }
});



function nextSequence() {
    userClickedPattern = [];


    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4)

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound("sounds/" + randomChosenColour + ".mp3");

}

function playSound(name) {
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }


}

function startOver() {

    level = 0;
    started = false;
    gamePattern = [];

}