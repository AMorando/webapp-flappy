// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var star;
var rand;
var sprite5;
var velocitystar;
var player;
//jQuery("#greeting-form").on("submit", function(event_details) {
    //var greeting = "Hello ";
   // var name1 = jQuery("#fullName").val();
   // var greeting_message = greeting + name;
  //  $("#greeting-form").hide();
  //  $("#greeting").append("<p>" + greeting_message + "</p>");
   // event_details.preventDefault();
//});

jQuery("#greeting-form").on("submit", function(event_details) {
    var greeting = "Hello ";
    var name = jQuery("#email").val();
    var name1 = jQuery("#fullName").val();
    var greeting_message = greeting + name1 + name;
    $("#greeting-form").hide();
    $("#greeting").append("<p>" + greeting_message + "</p>");
});

function preload() {
    game.load.image("raindrop", "../assets/raindrop.png");
    game.load.image("backgroundImg", "../assets/myAwesomeBackground.png");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("star", "../assets/star.png");
    game.load.image("playerImg", "../assets/flappy.png");
}
function create() {
    game.stage.setBackgroundColor("#00FF00");  // set the background colour of the scene (#B2C2D2 was good)
    var background = game.add.image(0, 0, "backgroundImg");
    background.width = 790;
    background.height = 400;
    game.add.text(160, 170, "Use arrows to move from side to side. Click to make raindrops :)",
        {font: "17px Cooper Std Black", fill: "#00FF00"});
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(80, 200, "playerImg");
    game.physics.arcade.enable(player);
    //
    player.body.velocity.y = -100;
    player.body.gravity.y = 200;


    var sprite1 = game.add.sprite(10, 350, "raindrop");
    sprite1.width = 20;
    sprite1.height = 30;
    var sprite2 = game.add.sprite(10, 30, "raindrop");
    sprite2.width = 20;
    sprite2.height = 30;
    var sprite3 = game.add.sprite(700, 30, "raindrop");
    sprite3.width = 20;
    sprite3.height = 30;
    var sprite4 = game.add.sprite(700, 350, "raindrop");
    sprite4.width = 20;
    sprite4.height = 30;
    game.input
        .onDown
        .add(clickHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);
    labelScore = game.add.text(50, 20, "0");
    star = game.add.sprite(0, 0, "star");
    game.physics.arcade.enable(star);
    var rand = game.rnd.integerInRange(1 , 750);
    star.x = rand;
    star.y = 0;
    velocitystar = 1;
    //game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        //.onDown.add(moveStarDown);

}
function moveStarDown(){
    star.y = star.y + velocitystar
}

function moveRight(){
    //player.x += 10;
    player.body.velocity.x = 100;
}
function moveLeft(){
    //player.x -= 10;
    player.body.velocity.x = -100;
}
/*
 * Loads all resources for the game and gives them names.
 */

// Stars/fires and raindrops put them out. If raindrop touches fire, gain point and fire disappears.

function clickHandler(event){
   // alert("The position is:" + event.x + "," + event.y);
    var sprite5 = game.add.sprite(event.x, event.y, "raindrop");
    sprite5.width = 20;
    sprite5.height = 30;
    changeScore();
}

function playerJump() {
    player.body.velocity.y = -200;
    game.sound.play("score");
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  if(star.y < 360){
    moveStarDown();
  }
  if(star.y >= 360){
      backToTop();
  }
  if(player.y > 390){
      gameOver();
  }
   if(star==null){console.log("star")};
   // console.log(player);
  game.physics.arcade.overlap(player, star, changeScore);

 // game.overlap(star, sprite5, changeScore);
}
function gameOver(){
    game.destroy();
    $("#score").val(score.toString());
    $("#greeting").show();
    setTimeout(formhide, 20000);
}


function formhide(){
    $("#greeting").hide();
}

function backToTop(){
    var rand = game.rnd.integerInRange(1 , 750);
    star.x = rand;
    star.y = 0;
    if(velocitystar <= 10){
        velocitystar = velocitystar + 1;
    }
    moveStarDown();
}

function generateStar(){
    star = game.add.sprite(0, 0, "star");
    var rand = game.rnd.integerInRange(1 , 750);
    star.x = rand;
    star.y = 0;
    velocitystar = 1;
}



function changeScore(){
    score ++;
    labelScore.setText(score.toString());

    var rand = game.rnd.integerInRange(1 , 750);
    star.x = rand;
    star.y = 0;
    velocitystar = 1;
}


//function game_over(){
   // player.kill();
   // $("#score").val(score.toString());
//}