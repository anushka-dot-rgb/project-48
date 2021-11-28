var asteroid,earth,burningEarth,rocket,score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0 ;

function preload(){
  asteroidImage=loadImage("asteroid.png");
  earthImage=loadImage("earth.png");
  burningEarthImage=loadImage("burntEarth.png");
  rocketImage=loadImage("rocket2.png");
  bg=loadImage("bg1.jpg");
  asteroid2Image=loadImage("asteroid2.png");
  asteroid3Image=loadImage("asteroid3.png");
  asteroid4Image=loadImage("asteroid4.png");
  gameoverImage=loadImage("gameover.png");
  resetImage=loadImage("reset.png");
  laserImage=loadImage("laser.png");
  bulletSound=loadSound("bulletSound.wav");
  blastSound=loadSound("blast.wav")
}

function setup(){
createCanvas(1400,600);

rocket=createSprite(255,310);
rocket.addImage(rocketImage);
rocket.scale=0.3;

earth=createSprite(650,520);
earth.addImage("earth",earthImage);
earth.addImage("burningEarth",burningEarthImage)
earth.scale=0.6;

earth1=createSprite(650,450);

reset=createSprite(650,300);
reset.addImage(resetImage);
reset.scale=0.4

gameover=createSprite(650,220);
gameover.addImage(gameoverImage);
gameover.scale=0.4;

gameover.visible = false;
reset.visible = false;

burningEarthImage.scale=0.6;

asteroidGroup=new Group();
asteroid2Group=new Group();
asteroid3Group=new Group();
asteroid4Group=new Group();
laserGroup=new Group();
}

function draw(){

background(bg);

if(gameState===PLAY){
  edges=createEdgeSprites();

  rocket.collide(edges);
  earth1.visible=false;
  
  rocket.x=World.mouseX;
  
  if (keyDown("space")) {
    createLaser();
    bulletSound.play();
  }

  if (laserGroup.isTouching(asteroidGroup)) {
    asteroidGroup.destroyEach();
    laserGroup.destroyEach();
    score=score+1;  
  }
  
  if (laserGroup.isTouching(asteroid2Group)) {
    asteroid2Group.destroyEach();
    laserGroup.destroyEach();
    score=score+1;  
  }
  
  if (laserGroup.isTouching(asteroid3Group)) {
    asteroid3Group.destroyEach();
    laserGroup.destroyEach();
    score=score+1;  
  }
  
  if (laserGroup.isTouching(asteroid4Group)) {
    asteroid4Group.destroyEach();
    laserGroup.destroyEach();
    score=score+1;  
  }

  

spawnAsteroids();
spawnAsteroids2();
spawnAsteroids3();
spawnAsteroids4();

  if(asteroidGroup.isTouching(earth1) ||asteroid2Group.isTouching(earth1)||asteroid3Group.isTouching(earth1)||asteroid4Group.isTouching(earth1) ){ 
    
    gameState = END;
    
 
  }
  if(score>=2){
  textSize(75);
  fill ("red");
  text("YOU WON THE GAME: ", 300,150);
  }
  drawSprites()

}
if(gameState===END){

  gameover.visible = true;
  reset.visible = true;
  earth.changeImage("burningEarth",burningEarthImage);

  //set velcity of each game object to 0
  rocket.velocityX = 0;
  
  asteroidGroup.setVelocityYEach(0);
  asteroid2Group.setVelocityYEach(0);
  asteroid3Group.setVelocityYEach(0);
  asteroid4Group.setVelocityYEach(0);

 
 
  //set lifetime of the game objects so that they are never destroyed

  asteroidGroup.setLifetimeEach(-1);
  asteroid2Group.setLifetimeEach(-1);
  asteroid3Group.setLifetimeEach(-1);
  asteroid4Group.setLifetimeEach(-1);
  
  
  if(mousePressedOver(reset)) {
    reset();
  }

}



textSize(25);
fill ("yellow");
text("Score: "+ score, 1200,50);

}

function spawnAsteroids(){
  if (frameCount % 60 === 0) {
    var asteroid = createSprite(400,1,40,10);
    asteroid.x = Math.round(random(10,1200));
    asteroid.addImage(asteroidImage);
    asteroid.scale = 0.2;
    asteroid.velocityY = 3;
    
     //assign lifetime to the variable
    asteroid.lifetime = 200;
    
    //add each cloud to the group
    asteroidGroup.add(asteroid);
  }
}

function spawnAsteroids2(){
  if (frameCount % 120 === 0) {
    var asteroid2 = createSprite(400,1,40,10);
    asteroid2.x = Math.round(random(30,1000));
    asteroid2.addImage(asteroid2Image);
    asteroid2.scale = 0.2;
    asteroid2.velocityY = 3;
    
     //assign lifetime to the variable
    asteroid2.lifetime = 200;
   
    //add each cloud to the group
    asteroid2Group.add(asteroid2);
  }
}

function spawnAsteroids3(){
  if (frameCount % 180 === 0) {
    var asteroid3 = createSprite(400,1,40,10);
    asteroid3.x = Math.round(random(50,1100));
    asteroid3.addImage(asteroid3Image);
    asteroid3.scale = 0.2;
    asteroid3.velocityY = 3;
    
     //assign lifetime to the variable
    asteroid3.lifetime = 200;
    
    //add each cloud to the group
    asteroid3Group.add(asteroid3);
  }
}

function spawnAsteroids4(){
  if (frameCount % 240 === 0) {
    var asteroid4 = createSprite(400,1,40,10);
    asteroid4.x = Math.round(random(60,900));
    asteroid4.addImage(asteroid4Image);
    asteroid4.scale = 0.3;
    asteroid4.velocityY = 3;
    
     //assign lifetime to the variable
    asteroid4.lifetime = 200;
    
    //add each cloud to the group
    asteroid4Group.add(asteroid4);
  }
}

function createLaser() {
  var laser= createSprite(100, 360, 60, 10);
  laser.addImage(laserImage);
  laser.y = 360;
  laser.x=rocket.x;
  laser.velocityY= -5;
  //laser.lifetime = 100;
  laser.scale = 0.3;
  laserGroup.add(laser);
   
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  reset.visible = false;
  
  asteroidGroup.destroyEach();
  asteroid2Group.destroyEach();
  asteroid3Group.destroyEach();
  asteroid4Group.destroyEach();
  
  score = 0;
}
