var PLAY=1;
var END=0;
var gameState=1;
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

function preload(){
  
 
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  
}

function setup() {
   createCanvas(400,400);
  monkey=createSprite(70,315,40,40);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
 
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;

  
  score=0;
  
  var survivalTime=0;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
    
    FoodGroup=createGroup();
    obstacleGroup=createGroup();
}



function draw() {
 
  background("skyblue");
 
 text("score ="+ score, 350,40);

  
  
  if(gameState === PLAY){

    
    if(obstacleGroup.isTouching(monkey)){
     gameState = END;
    
   }
   
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   monkey.velocityY = monkey.velocityY + 0.8
    
    
     monkey.collide(ground);
    
    if(keyDown("space")&& monkey.y >= 270) {
        monkey.velocityY = -10;
    }
   
if (FoodGroup.isTouching(monkey)){
 score=score+1;
    }
  
spawnFood();
spawnObstacles();
   
  }
   else if (gameState === END) {
     
  
     background("black");
      stroke("yellow") ;
      fill("yellow");
      textSize(30);
      text("GAMEOVER",230,250);
     
      monkey.visible=false;
      obstacle.visible=false;
      banana.visible=false;
      ground.visible=false;
     
      ground.velocityX = 0;
      monkey.velocityY = 0;
   

      
     
      
    obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
   }
  
  drawSprites();
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
    obstacle = createSprite(160,325,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -(6 + score/100);
   
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
    
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   
   obstacleGroup.add(obstacle);
 }
}

function spawnFood() {
  
 if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(300,330));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     
    banana.lifetime = 200;
    
    
   banana.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
    
    
  FoodGroup.add(banana);
  }
}

  
