var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var zombieGroup;
var heart1, heart1Img;
var heart2, heart2Img;
var heart3, heart3Img;
var bullets = 5, bulletImg;
var gameState = "fight"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")



}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.5

//creating the player sprite
player = createSprite(displayWidth-1500, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.5
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)




  

zombieGroup = new Group();
bulletGroup = new Group();

/*heart1 = createSprite(displayWidth-150,40,20,20);
heart1.visible = false;
heart1.addImage("heart1",heart1Img);
heart1.scale = 0.4

heart2 = createSprite(displayWidth-150,40,20,20);
heart2.visible = false;
heart2.addImage("heart2",heart2Img);
heart2.scale = 0.4

heart3 = createSprite(displayWidth-150,40,20,20);
heart3.visible = true;
heart3.addImage("heart3",heart3Img);
heart3.scale = 0.4*/

}

function draw() {
  background(0); 
  if (gameState === "fight"){
    if(keyWentDown("UP_ARROW")){
      player.y = player.y-20;
    }
    if(keyWentDown("DOWN_ARROW")){
      player.y = player.y+20;
    }
  
    //moving the player up and down and making the game mobile compatible using touches
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth - 1150, player.y-30, 20, 10)
  bullet.velocityX = 20;
  bulletGroup.add(bullet)
  player.addImage(shooter_shooting)
  player.depth = bullet.depth;
  player.depth = player.depth + 2;
  bullets = bullets - 1;
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if (bullets === 0){
  gameState = "bullet";
}


if (zombieGroup.isTouching(bulletGroup)){

for (var i = 0; i < zombieGroup.length; i++){
  if(zombieGroup[i].isTouching(bulletGroup)){
    zombieGroup[i].destroy()
    bulletGroup.destroyEach()
  }
  }
}
for (var i = 0; i < zombieGroup.length; i++){
  if(zombieGroup[i].isTouching(player)){
    zombieGroup[i].destroy()
  }
  }

}

  




enemy();

drawSprites();

if(gameState === "lost"){
  fill("white")
  textSize(80)
  text("GAME OVER", 400,400)
  zombieGroup.destroyEach()
  player.destroy();
}
else if (gameState === "won"){
  fill("white")
  textSize(80)
  text("VICTORY", 400,400)
  zombieGroup.destroyEach()
  player.destroy();
}

else if(gameState === "bullet"){
  fill("white")
  textSize(80)
  text("OUT OF BULLETS!!!", 400,400)
  zombieGroup.destroyEach()
  player.destroy();
  bulletGroup.destroyEach();
}


}

function enemy() {
  if (frameCount % 60 === 0) {
    var zombie = createSprite(random(1600,1800), random(400,800), 50, 50);
    zombie.addImage(zombieImg)
    zombie.scale = 0.2
    zombie.velocityX = -5
    zombie.setCollider("rectangle",0,0,300,300)
    zombie.debug = true
    zombie.lifetime = 550
    zombieGroup.add(zombie)
  }
}
//Movement to player up and down
//How to spawn zomnbies a different y position everytime
