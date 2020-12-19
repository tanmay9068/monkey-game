
  var monkey , monkey_running,ground;
  var banana ,bananaImage, obstacle, obstacleImage;
  var FoodGroup, obstacleGroup;
  var survivalTime;
  var jungle ,jungleImg;
  var gameState = "play"

function preload(){
    
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImg = loadImage("jungle.jpg");
 
}

function setup() {
  createCanvas(500,500);
  
  jungle = createSprite(250,250,200,200);
  jungle.addImage(jungleImg);
  
  
  monkey = createSprite(80,430,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(400,490,1000,10);
 
  console.log(ground.x)
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  survivalTime = 0;
}

function draw() {
//background("lightblue")
  
  monkey.velocityY = monkey.velocityY + 0.9;
  
  monkey.collide(ground);
  
 // monkey.collide(obstaclesGroup);
  
  if(gameState === "play"){
    
    ground.velocityX = -4;
  ground.x = ground.width/2;
    jungle.velocityX = -4;
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
  }
    
      if(frameCount % 20===0){
    survivalTime = survivalTime+1 
  }
    if(obstaclesGroup.isTouching(monkey)){
       monkey.destroy();
       gameState = "end"
     }
     if(bananaGroup.isTouching(monkey)){
       monkey.destroy();
       gameState = "end"
     }
    
    
   
   spawnBanana();
   spawnObstacle(); 
    
  }
  drawSprites();
    
     if(gameState==="end"){
    stroke("black")
    fill("black")
    textSize(30)
    text("gameOver",230,250)
    ground.velocityX = 0;
    jungle.velocityX = 0;
  }
  ground.visible = false;
   stroke("black")
     textSize(20)
     fill("black")
     text("survival Time:  "+survivalTime,150,110);
}

 function spawnObstacle(){
   if (frameCount % 60 === 0) {
   obstacle = createSprite(490,470,20,20);
   //obstacle.x = Math.round(random(490,150));
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -5;
    obstacle.lifetime = 200;
   obstacle.scale = 0.10;
    obstaclesGroup.add(obstacle);
    obstacle.depth = monkey.depth
    monkey.depth = monkey.depth+1
  }
}

function spawnBanana(){
  if(frameCount % 50===0){
    banana = createSprite(500,300,20,20);
    //  banana.x = Math.round(random(490,150));
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.lifetime = 200;
    banana .scale = 0.1;
    bananaGroup.add(banana);
  }
}
