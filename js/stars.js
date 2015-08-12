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
var velocity;
function preload() {
    game.load.image("raindrop", "../assets/raindrop.png");
    game.load.image("backgroundImg", "../assets/myAwesomeBackground.png");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("star", "../assets/star.png");
}
function create() {
    game.stage.setBackgroundColor("#00FF00");  // set the background colour of the scene (#B2C2D2 was good)
    var background = game.add.image(0, 0, "backgroundImg");
    background.width = 790;
    background.height = 400;
    game.add.text(160, 170, "Welcome to my game!",
        {font: "40px Cooper Std Black", fill: "#00FF00"});
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
        .onDown.add(spaceHandler);
    labelScore = game.add.text(50, 20, "0");
    star = game.add.sprite(0, 0, "star");
    var rand = game.rnd.integerInRange(1 , 750);
    star.x = rand;
    star.y = 0;
    velocity = 1
    //game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        //.onDown.add(moveStarDown);

}
function moveStarDown(){
    star.y = star.y + velocity
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


function spaceHandler(){
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
 // game.overlap(star, sprite5, changeScore);
}
function backToTop(){
    var rand = game.rnd.integerInRange(1 , 750);
    star.x = rand;
    star.y = 0;
    if(velocity <= 20){
        velocity = velocity + 1;
    }
    moveStarDown();
}
function changeScore(){
   score = score + 1;
    labelScore.setText(score.toString());
}