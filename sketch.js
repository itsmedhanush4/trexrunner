var trex,trexImg;
var ground,groundImg, invisibleGround;
var cloud,cloudImg;
var obstacle, obs1,obs2,obs3,obs4,obs5,obs6;
var cloudsGroup,obstacleGroup;
var gamestate = "play"
var score=0
var gameover,gameoverImg
var restart,restartImg
var boom

function preload(){
  trexImg = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImg=loadImage("ground2.png");
  cloudImg=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  gameoverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  boom=loadAnimation("trex_collided.png");
}


function setup(){
  createCanvas(600,200);
  
  ground=createSprite(300,175);
  ground.addImage(groundImg);

  trex=createSprite(100,160);
  trex.addAnimation("trexRun",trexImg );
  trex.addAnimation("boom",boom);
  trex.scale=0.4;

  invisibleGround= createSprite(100,180, 200,3);
  invisibleGround.visible= false;
  cloudsGroup=createGroup();
  obstacleGroup=createGroup();
  trex.debug=false
  trex.setCollider("circle",0,0,50)
  gameover=createSprite(300,80);
  gameover.addImage(gameoverImg);
  gameover.scale=0.5;
  restart=createSprite(300,120);
  restart.addImage(restartImg);
  restart.scale=0.5;
  gameover.visible=false;
  restart.visible=false;
}

function clouds(){
  if(frameCount%70==0){
    cloud=createSprite(580,20);
    cloud.addImage(cloudImg);
    cloud.velocityX=-5;
    cloud.scale=random(0.3,0.9);
    cloud.y=random(20,100);
    cloud.lifetime=130;
    trex.depth=cloud.depth+1;
    cloudsGroup.add(cloud);
  }
}

function cactus(){
    if(frameCount%50 == 0){
      obstacle=createSprite(600,170);
      obstacle.lifetime=130;
      var num= Math.round(random(1,6));
      switch(num){
        case 1 :obstacle.addImage(obs1);
        break;
        case 2:obstacle.addImage(obs2);
        break;
        case 3:obstacle.addImage(obs3);
        break;
        case 4: obstacle.addImage(obs4);
        break;
        case 5 :obstacle.addImage(obs5);
        break;
        case 6 :obstacle.addImage(obs6);
        break;
        default: break;
      }

      obstacle.velocityX=-6;
      obstacle.scale=0.45;
      obstacleGroup.add(obstacle);
    }
   
}

function draw(){
  
  background("black");

  if(gamestate == "play"){
    score=score+Math.round(frameRate()/60)
  
    ground.velocityX=-5;

    if(ground.x<0){
      ground.x=ground.width/2;
    }
    if(keyDown("space") && trex.y>150 ){
      trex.velocityY= -12;
    }
    restart.visible=false
    gameover.visible=false
    clouds()
    cactus();

    if(trex.isTouching(obstacleGroup)){
      gamestate="end"
    }
    
  }
  if(gamestate == "end"){
    ground.velocityX=0;
    trex.velocityY=0;
    cloudsGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    gameover.visible=true;
    restart.visible=true;
    trex.changeAnimation("boom",boom); 
    if (mousePressedOver(restart)) {
     reset() 
    }
  }
  


  trex.velocityY=trex.velocityY+0.7;
  trex.collide(invisibleGround);
  
  drawSprites();
fill("white")
textSize(15)
text("score="+score,500,30)
 
}
function reset (){
  gamestate="play"
  obstacleGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("trexRun",trexImg ); 
  score=0
}
//it is amazing from mimi
//good job

