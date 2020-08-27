const SERVE = 0;
const PLAY = 1;
const END = 2;

var gameState = SERVE;
var background_img;
var backgr;
var astronaut_Flying_img;
var astronaut_Flying;
var asteroids_img, alien_img;
var asteroidGroup, alienGroup;
var destination,destination_img;
var gameOver;
var distance = 0;
var gameEndSound;


function preload() 
{
    background_img = loadImage("assets/images/space-background.png");
    astronaut_Flying_img = loadImage("assets/images/astronaut3.png");
    asteroids_img = loadImage("assets/images/asteroids.png");
    alien_img = loadImage("assets/images/alien.png");
    destination_img = loadImage("assets/images/astronaut-reached-moon.jpg");
    gameOverSprite = loadImage("assets/images/game-oversprite.png");

    gameEndSound = loadSound("assets/sound/destroySound.mp3");
    gameOverSound = loadSound("assets/sound/cometSound.mp3");
     
}

function setup()
{
    var canvas = createCanvas(displayWidth,displayHeight-150);

   //adding background and giving velocity
    asteroidGroup = new Group();
    alienGroup = new Group();

    

    backgr = createSprite(600,0,1200,1600);
    backgr.addImage(background_img);
    backgr.y=backgr.height/2;
    
    backgr.scale = 4;
    
    //Flying astronaut
    astronautFlying =  createSprite(800,600,20,20);
    astronautFlying.addImage(astronaut_Flying_img);
    astronautFlying.scale = 0.12;
     
    destination = createSprite(800,400,displayWidth,displayHeight);
    destination.addImage(destination_img);
    destination.scale = 1.7;
    destination.visible = false;
    
    
    
    
    
    

  
}


function draw(){
    background(0);

    if(gameState === PLAY)
    {
        distance = distance+Math.round(getFrameRate());
        asteroids();
        aliens();
        
        if (backgr.y > 400) 
        {
            backgr.y = backgr.height/2;
        }
        backgr.velocityY = 4;
        astronautFlying.x = World.mouseX;

        //if asteroids hit astronaut
        if( alienGroup.isTouching(astronautFlying))
        {
            gameState = END;

            gameEndSound.play();
        }
    
       if(asteroidGroup.isTouching(astronautFlying))
        {
            gameState = END;
            gameOverSound.play();
        }
    }else if(gameState === END){
        gameOver = createSprite(800,350,0,0);
        gameOver.addImage(gameOverSprite);
        backgr.velocityY = 0;
        astronautFlying.destroy();
        asteroidGroup.destroyEach();
        asteroidGroup.setVelocityYEach(0);
        asteroidGroup.setLifetimeEach(-1);
        alienGroup.destroyEach();
        alienGroup.setVelocityYEach(0);
        alienGroup.setLifetimeEach(-1);
        
    }

    if(keyDown("space")){
        gameState = PLAY;
    }
    //game ends once it reaches distance of 200
    if(distance === 200){
        gameState = END;
        destination.visible = true;
    }
    
    drawSprites();

    if(gameState === SERVE){
        text("PRESS SPACE TO START THE GAME", 500, 300,fill("yellow"),textSize(30));
        text("WHEN THE ASTRONAUT REACHES THE DISTANCE OF 50000 MILES WITHOUT BEING HIT BY OBSTACLES, GAME ENDS", 270,350,textSize(18));
    }

    text("DISTANCE :" + distance, 10,60,textSize(18),fill("lightgreen"));
    
}

function asteroids(){
    console.log(World.frameCount);
    if(World.frameCount % 60 === 0){
        asteroid = createSprite(random(100,900),0,40,40);
        asteroid.addImage(asteroids_img);
        asteroid.velocityY = 5;
        asteroid.lifetime = 240;
        asteroidGroup.add(asteroid);
        
    }
}

function aliens(){
    console.log(World.frameCount);
    if(World.frameCount % 150 === 0){
        alien = createSprite(random(50,1000),0,40,40);
        alien.scale = 2;
        alien.addImage(alien_img);
        alien.velocityY = 5;
        alien.lifetime = 240;
        alienGroup.add(alien);
        
    }
}

