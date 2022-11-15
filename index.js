// alert("hello");
var buttoncolor=["red","blue","green","yellow"];

var gamepattern=[];
var userclickedpattern=[];
var started=false;
var level =0;

$(document).keypress(function(){
  if(!started){
    $('#level-title').text("level "+level);
    nextsequence();
    started=true;
  }
});

$(".btn").click(function(){
  var userchoosencolor=$(this).attr("id");
  userclickedpattern.push(userchoosencolor);

  playsound(userchoosencolor);
  animatepress(userchoosencolor);

  checkAnswer(userclickedpattern.length-1);
});

function checkAnswer(currentlevel){
  if(gamepattern[currentlevel]===userclickedpattern[currentlevel]){
    console.log("succes");

    if (userclickedpattern.length === gamepattern.length) {
      setTimeout(function(){
        nextsequence();
      }, 100);
    }

  }else {
    console.log("wrong");
    playsound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game-Over, press Any Key To Start");

    startOver();

  }
}

 function nextsequence(){
  userclickedpattern=[];
  level++;
  $('#level-title').text("level "+level);

  var randomnumber=Math.floor(Math.random()*4);
  var randomchoosencolor= buttoncolor[randomnumber];
  gamepattern.push(randomchoosencolor);

  $("#"+ randomchoosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomchoosencolor);

}

function playsound(name){
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();

}

function animatepress(currentcolor){
  $("#"+currentcolor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentcolor).removeClass("pressed");
  },100);
}

function startOver(){
  level=0;
  gamepattern=[];
  started= false;
}
