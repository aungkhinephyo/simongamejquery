var btnColors = ['red','green','blue','yellow'];
var gamePattern =[];
var userCLickedPattern = [];
var level = 0;
var started = false;
$(document).keypress(function(){
   if (!started){
    $('#level-title').text("Level " + level);
    nextSequence();
    started = true;
   }
})


$('.btn').click(function(){
        var userChosenColor = $(this).attr("id");
        userCLickedPattern.push(userChosenColor);
        
        animatedPress(userChosenColor);
        makeSound(userChosenColor);

        checkAnswer(userCLickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userCLickedPattern[currentLevel]) {
        if(gamePattern.length === userCLickedPattern.length){
            console.log("success");
            
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }else {
        console.log("wrong");
        
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        $("#level-title").text("Game Over, Press Any Key To Restart.");

        startOver();

    }
}

function nextSequence(){
    userCLickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = btnColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeToggle(100).fadeToggle(100);

    makeSound(randomChosenColor);
}

function animatedPress(currentbtn){
    $("#" + currentbtn).addClass("pressed");

    setTimeout(function(){
        $("#" + currentbtn).removeClass("pressed");
    },200)
}

function makeSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function startOver(){
    gamePattern=[];
    level = 0;
    started = false;
}